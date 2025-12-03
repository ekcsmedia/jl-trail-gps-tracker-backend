// routes/document.routes.ts
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {B2_BUCKET, deleteObject, s3} from "../../utils/b2";
import {DocumentModel} from "../models/Document";

export const documentRoutes = fp(async (fastify: FastifyInstance, _opts: FastifyPluginOptions) => {
    // expects fastify-multipart to be registered globally:

    fastify.post("/documents/upload", async (req, reply) => {
        if (!req.isMultipart()) return reply.code(400).send({ message: "multipart/form-data required" });

        const fields: Record<string, string> = {};
        let fileBuffer: Buffer | undefined;
        let fileMime = "application/octet-stream";
        let fileName = "upload.bin";

        for await (const part of req.parts()) {
            if (part.type === "field") { fields[part.fieldname] = (part.value as string) ?? ""; continue; }
            if (part.type === "file") {
                if (part.fieldname !== "file") { part.file.resume(); continue; }
                fileMime = part.mimetype || fileMime;
                fileName = part.filename || fileName;
                fileBuffer = await part.toBuffer();
            }
        }

        if (!fileBuffer) return reply.code(400).send({ message: "file required" });

        const userId = (fields["userId"] || "").trim() || null;
        const draftId = (fields["draftId"] || "").trim() || null;          // 👈 NEW
        const documentType = (fields["documentType"] || "").trim() || null;// 👈 NEW (AADHAAR, DL, etc.)
        const driverId = (fields["driverId"] || "").trim() || null;        // optional direct attach

        const folder = (fields["folder"] || "drivers").replace(/[^a-z0-9/_-]/gi, "_");
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth()+1).padStart(2,"0");
        const dd = String(now.getDate()).padStart(2,"0");
        const safeName = fileName.replace(/[^\w.\-]/g, "_");
        const key = `${folder}/${yyyy}/${mm}/${dd}/${Date.now()}_${safeName}`;

        await s3.send(new PutObjectCommand({
            Bucket: B2_BUCKET,
            Key: key,
            Body: fileBuffer,
            ContentType: fileMime,
            ContentLength: fileBuffer.length,
        }));

        const url = `/files/download?key=${encodeURIComponent(key)}`;

        const doc = await DocumentModel.create({
            userId,
            driverId: driverId || null,                  // stays null until claimed if not provided
            bucket: B2_BUCKET,
            key,
            contentType: fileMime,
            size: fileBuffer.length,
            url,
            metadata: { originalName: fileName, draftId: draftId || undefined, documentType: documentType || undefined },
        });

        return reply.code(201).send({ ok: true, document: doc });
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

// routes/document.routes.ts (snippet)
    fastify.get("/documents", async (req, reply) => {
        const { page = 1, pageSize = 20, driverId } = (req.query as any);

        // Enforce driver scoping
        if (!driverId || typeof driverId !== "string" || driverId.trim() === "") {
            return reply.code(400).send({ ok: false, error: "driverId query param is required" });
        }

        const pageNum = Math.max(1, Number(page) || 1);
        const pageSz = Math.min(100, Math.max(1, Number(pageSize) || 20));

        const { rows, count } = await DocumentModel.findAndCountAll({
            where: { driverId: driverId.trim() },
            order: [["createdAt", "DESC"]],
            offset: (pageNum - 1) * pageSz,
            limit: pageSz,
        });

        return reply.send({ ok: true, count, page: pageNum, pageSize: pageSz, items: rows });
    });

});
