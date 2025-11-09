import { FastifyInstance } from "fastify";
import {
    PutObjectCommand,
    DeleteObjectCommand,
    HeadObjectCommand,
    GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

import { Document } from "../../infrastructure/models/Document";
import { s3 } from "../../utils/b2";

const BUCKET = (process.env.B2_BUCKET_NAME || "").trim();
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || "").trim();

if (!BUCKET) throw new Error("B2_BUCKET_NAME missing");

export async function documentRoutes(fastify: FastifyInstance) {
    // Create presigned PUT for one or many files
    fastify.post("/documents/presign", async (req, reply) => {
        try {
            const body = (req.body as any) ?? {};
            const files = Array.isArray(body.files) ? body.files : [];
            const userId = body.userId ?? null;

            if (!files.length) {
                return reply.code(400).send({ ok: false, error: "files array required" });
            }

            const now = new Date();
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, "0");
            const dd = String(now.getDate()).padStart(2, "0");

            const results = await Promise.all(
                files.map(async (f: any) => {
                    const id = randomUUID();
                    const fileName = String(f.fileName || "file.bin").replace(/[^\w.\-]/g, "_");
                    const key = `uploads/${yyyy}/${mm}/${dd}/${id}_${fileName}`;
                    const contentType = f.contentType || "application/octet-stream";

                    const cmd = new PutObjectCommand({
                        Bucket: BUCKET,
                        Key: key,
                        ContentType: contentType,
                    });

                    // With checksum middleware removed on the client, URL won't include x-amz-sdk-checksum-*
                    const putUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 * 10 });

                    const publicUrl = PUBLIC_BASE_URL ? `${PUBLIC_BASE_URL}/${key}` : "";

                    const doc = await Document.create({
                        userId,
                        bucket: BUCKET,
                        key,
                        contentType,
                        size: f.size ?? null,
                        url: publicUrl,
                        metadata: { originalName: f.fileName },
                    });

                    return { id: doc.id, key, putUrl, publicUrl };
                })
            );

            return reply.send({ ok: true, results });
        } catch (e: any) {
            fastify.log.error(e, "presign error");
            return reply.code(500).send({ ok: false, error: e?.message || "internal_error" });
        }
    });

    // Confirm upload (optional): HEAD object -> update size/contentType
    fastify.post("/documents/:id/confirm", async (req, reply) => {
        try {
            const { id } = req.params as any;
            const doc = await Document.findByPk(id);
            if (!doc) return reply.code(404).send({ ok: false, error: "Not found" });

            const head = await s3.send(new HeadObjectCommand({ Bucket: doc.bucket, Key: doc.key }));
            await doc.update({
                size: Number(head.ContentLength ?? doc.size ?? 0),
                contentType: String(head.ContentType ?? doc.contentType ?? ""),
            });
            return reply.send({ ok: true, document: doc });
        } catch {
            return reply.code(400).send({ ok: false, error: "Object not found in bucket yet" });
        }
    });

    // List (basic pagination)
    fastify.get("/documents", async (req, reply) => {
        const { page = 1, pageSize = 20, userId } = (req.query as any);
        const where: any = {};
        if (userId) where.userId = userId;

        const pageNum = Number(page) || 1;
        const pageSz = Math.min(100, Number(pageSize) || 20);

        const { rows, count } = await Document.findAndCountAll({
            where,
            order: [["createdAt", "DESC"]],
            offset: (pageNum - 1) * pageSz,
            limit: pageSz,
        });
        return reply.send({ ok: true, count, page: pageNum, pageSize: pageSz, items: rows });
    });

    // Download (presigned GET). If bucket is PUBLIC, you can return doc.url directly.
    fastify.get("/documents/:id/download", async (req, reply) => {
        const { id } = req.params as any;
        const doc = await Document.findByPk(id);
        if (!doc) return reply.code(404).send({ ok: false, error: "Not found" });

        const cmd = new GetObjectCommand({ Bucket: doc.bucket, Key: doc.key });
        const downloadUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 * 5 });
        return reply.send({ ok: true, downloadUrl, key: doc.key });
    });

    // Delete (S3 + DB)
    fastify.delete("/documents/:id", async (req, reply) => {
        const { id } = req.params as any;
        const doc = await Document.findByPk(id);
        if (!doc) return reply.code(404).send({ ok: false, error: "Not found" });

        await s3.send(new DeleteObjectCommand({ Bucket: doc.bucket, Key: doc.key }));
        await doc.destroy();
        return reply.send({ ok: true });
    });
}
