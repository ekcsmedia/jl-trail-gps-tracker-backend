// routes/files.routes.ts
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import {B2_BUCKET, s3} from "../../utils/b2";

const KEY_PREFIX = process.env.B2_KEY_PREFIX || ""; // optional safety

export const filesRoutes: FastifyPluginAsync = fp(async (app) => {
    app.get("/files/download", async (req, reply) => {
        const { key: rawKey, dl } = req.query as { key?: string; dl?: string };
        if (!rawKey) return reply.code(400).send({ error: "Missing ?key=" });

        let key: string;
        try {
            key = decodeURIComponent(rawKey);
        } catch {
            return reply.code(400).send({ error: "Invalid key encoding" });
        }

        if (KEY_PREFIX && !key.startsWith(KEY_PREFIX)) {
            return reply.code(403).send({ error: "Forbidden key" });
        }

        const range = req.headers.range as string | undefined;
        const cmd = new GetObjectCommand({
            Bucket: B2_BUCKET,
            Key: key,
            ...(range ? { Range: range } : {}),
        });

        try {
            const out = await s3.send(cmd);
            if (!out.Body) return reply.code(404).send({ error: "Not found" });

            const ct = out.ContentType || "application/octet-stream";
            reply.header("Content-Type", ct);

            if (out.ContentLength != null) reply.header("Content-Length", String(out.ContentLength));
            if (out.ContentRange) {
                reply.header("Content-Range", out.ContentRange);
                reply.code(206);
            }

            if (out.ETag) reply.header("ETag", out.ETag);
            if (out.LastModified) reply.header("Last-Modified", out.LastModified.toUTCString());
            if (out.CacheControl) reply.header("Cache-Control", out.CacheControl);
            else reply.header("Cache-Control", "private, max-age=0, must-revalidate");

            const fileName = key.split("/").pop() || "download";
            const isDownload = dl === "1";
            const isInline =
                !isDownload &&
                (ct.startsWith("image/") || ct === "application/pdf" || ct.startsWith("text/"));

            const dispositionType = isInline ? "inline" : "attachment";
            reply.header(
                "Content-Disposition",
                `${dispositionType}; filename="${encodeURIComponent(fileName)}"; filename*=UTF-8''${encodeURIComponent(fileName)}`
            );

            // @ts-ignore Node stream
            return reply.send(out.Body as any);
        } catch (err: any) {
            app.log.error({ err }, "B2 download failed");
            const code = (err?.$metadata?.httpStatusCode as number) || 500;
            if (code === 404) return reply.code(404).send({ error: "Not found" });
            if (code === 403) return reply.code(403).send({ error: "Forbidden" });
            return reply.code(500).send({ error: "Download error" });
        }
    });
});
