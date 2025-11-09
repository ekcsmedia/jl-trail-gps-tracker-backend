import { FastifyInstance } from "fastify";
import { PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { Document } from "../../infrastructure/models/Document";
import {s3} from "../../utils/b2";

const BUCKET = process.env.B2_BUCKET_NAME!;
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL!;

export async function documentRoutes(fastify: FastifyInstance) {


    // Create presigned PUT for one or many files
    fastify.post("/documents/presign", async (req, reply) => {
        /*
          body: { files: [{ fileName: string, contentType?: string, size?: number }], userId?: string }
        */
        const body = req.body as any;
        const { files = [], userId } = body;

        const results = await Promise.all(files.map(async (f: any) => {
            const id = uuidv4();
            const ext = (f.fileName?.split(".").pop() || "bin").toLowerCase();
            const key = `uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1)
                .toString().padStart(2,"0")}/${new Date().getDate().toString().padStart(2,"0")}/${id}_${f.fileName}`;

            const cmd = new PutObjectCommand({
                Bucket: BUCKET,
                Key: key,
                ContentType: f.contentType || "application/octet-stream",
            });

            const url = await getSignedUrl(s3, cmd, { expiresIn: 60 * 10 }); // 10 min
            const publicUrl = `${PUBLIC_BASE_URL}/${key}`;

            // Pre-create DB record (status "pending") OR create after client confirms
            const doc = await Document.create({
                userId: userId ?? null,
                bucket: BUCKET,
                key,
                contentType: f.contentType ?? null,
                size: f.size ?? null,
                url: publicUrl,
                metadata: { originalName: f.fileName },
            });

            return { id: doc.id, key, putUrl: url, publicUrl };
        }));

        return reply.send({ ok: true, results: results });
    });

    // Confirm upload (optional): validate object exists & update size/contentType
    fastify.post("/documents/:id/confirm", async (req, reply) => {
        const { id } = req.params as any;
        const doc = await Document.findByPk(id);
        if (!doc) return reply.code(404).send({ ok: false, error: "Not found" });

        try {
            const head = await s3.send(new HeadObjectCommand({ Bucket: doc.bucket, Key: doc.key }));
            await doc.update({
                size: Number(head.ContentLength ?? doc.size ?? 0),
                contentType: String(head.ContentType ?? doc.contentType ?? ""),
            });
            return reply.send({ ok: true, document: doc });
        } catch (e: any) {
            return reply.code(400).send({ ok: false, error: "Object not found in bucket yet" });
        }
    });

    // List (basic pagination)
    fastify.get("/documents", async (req, reply) => {
        const { page = 1, pageSize = 20, userId } = (req.query as any);
        const where: any = {};
        if (userId) where.userId = userId;

        const { rows, count } = await Document.findAndCountAll({
            where, order: [["createdAt", "DESC"]],
            offset: (Number(page)-1)*Number(pageSize),
            limit: Number(pageSize),
        });
        return reply.send({ ok: true, count, page: Number(page), pageSize: Number(pageSize), items: rows });
    });

    // Get presigned download for a key (private bucket) — or just return publicUrl for public bucket
    fastify.get("/documents/:id/download", async (req, reply) => {
        const { id } = req.params as any;
        const doc = await Document.findByPk(id);
        if (!doc) return reply.code(404).send({ ok: false, error: "Not found" });

        // If your bucket is public, you can return doc.url directly.
        // Below shows generating a presigned GET (works for private buckets):
        const { GetObjectCommand } = await import("@aws-sdk/client-s3");
        const cmd = new GetObjectCommand({ Bucket: doc.bucket, Key: doc.key });
        const signed = await getSignedUrl(s3, cmd, { expiresIn: 60 * 5 }); // 5 min
        return reply.send({ ok: true, downloadUrl: signed, key: doc.key });
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
