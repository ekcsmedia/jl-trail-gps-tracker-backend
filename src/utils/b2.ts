// src/utils/b2.ts
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { flexibleChecksumsMiddlewareOptions } from "@aws-sdk/middleware-flexible-checksums";

function must(name: string) {
    const v = (process.env[name] || "").trim();
    if (!v) throw new Error(`${name} is missing`);
    return v;
}

export const B2_BUCKET = must("B2_BUCKET_NAME");

export const s3 = new S3Client({
    region: must("B2_REGION"),
    endpoint: must("B2_ENDPOINT"),              // e.g. https://s3.eu-central-003.backblazeb2.com
    credentials: {
        accessKeyId: must("B2_KEY_ID"),
        secretAccessKey: must("B2_APP_KEY"),
    },
    forcePathStyle: true,                       // B2-friendly
});

// remove checksum middleware so presigned URLs / uploads stay simple
s3.middlewareStack.remove(flexibleChecksumsMiddlewareOptions.name);

export async function deleteObject(key: string) {
    await s3.send(new DeleteObjectCommand({ Bucket: B2_BUCKET, Key: key }));
}
