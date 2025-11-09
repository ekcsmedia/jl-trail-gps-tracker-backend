// routes/document.routes.ts
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {B2_BUCKET, deleteObject, s3} from "../../utils/b2";
import {DocumentModel} from "../models/Document";

export const documentRoutes = fp(async (fastify: FastifyInstance, _opts: FastifyPluginOptions) => {
    // expects fastify-multipart to be registered globally:

    fastify.post<{ Body: any }>("/documents/upload", async (req, reply) => {
        if (!req.isMultipart()) return reply.code(400).send({ message: "multipart/form-data required" });

        const fields: Record<string, string> = {};
        let fileBuffer: Buffer | undefined;
        let fileMime = "application/octet-stream";
        let fileName = "upload.bin";

        for await (const part of req.parts()) {
            if (part.type === "field") {
                fields[part.fieldname] = (part.value as string) ?? "";
                continue;
            }
            if (part.type === "file") {
                if (part.fieldname !== "file") { part.file.resume(); continue; }
                fileMime = part.mimetype || fileMime;
                fileName = part.filename || fileName;
                fileBuffer = await part.toBuffer(); // read into memory (simple)
            }
        }

        if (!fileBuffer) return reply.code(400).send({ message: "file required" });

        // optional: who owns this file?
        const userId = (fields["userId"] || "").trim() || null;

        // where to store: optional folder params
        const folder = (fields["folder"] || "uploads").replace(/[^a-z0-9/_-]/gi, "_");
        const key = `${folder}/${new Date().getFullYear()}/${String(new Date().getMonth()+1).padStart(2,"0")}/${String(new Date().getDate()).padStart(2,"0")}/${Date.now()}_${fileName.replace(/[^\w.\-]/g,"_")}`;

        try {
            await s3.send(new PutObjectCommand({
                Bucket: B2_BUCKET,
                Key: key,
                Body: fileBuffer,
                ContentType: fileMime,
                ContentLength: fileBuffer.length,
            }));

            const url = `/api/files/download?key=${encodeURIComponent(key)}`;

            const doc = await DocumentModel.create({
                userId,
                bucket: B2_BUCKET,
                key,
                contentType: fileMime,
                size: fileBuffer.length,
                url,
                metadata: { originalName: fileName },
            });

            return reply.code(201).send({ ok: true, document: doc });
        } catch (err: any) {
            req.log.error({ err }, "Upload failed");
            return reply.code(500).send({ ok: false, message: "Upload failed", details: err?.message });
        }
    });

    fastify.delete<{ Params: { id: string } }>("/documents/:id", async (req, reply) => {
        const doc = await DocumentModel.findByPk(req.params.id);
        if (!doc) return reply.code(404).send({ ok: false, message: "Not found" });

        try {
            await deleteObject(doc.key);
            await doc.destroy();
            return reply.code(204).send();
        } catch (err: any) {
            req.log.error({ err }, "Delete failed");
            return reply.code(500).send({ ok: false, message: "Delete failed" });
        }
    });

    fastify.get("/documents", async (req, reply) => {
        const { page = 1, pageSize = 20, userId } = (req.query as any);
        const where: any = {};
        if (userId) where.userId = userId;

        const pageNum = Number(page) || 1;
        const pageSz = Math.min(100, Number(pageSize) || 20);

        const { rows, count } = await DocumentModel.findAndCountAll({
            where,
            order: [["createdAt", "DESC"]],
            offset: (pageNum - 1) * pageSz,
            limit: pageSz,
        });
        return reply.send({ ok: true, count, page: pageNum, pageSize: pageSz, items: rows });
    });
});
