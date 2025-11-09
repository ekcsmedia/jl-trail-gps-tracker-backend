// src/lib/b2.ts
import { S3Client } from "@aws-sdk/client-s3";
import { flexibleChecksumsMiddlewareOptions } from "@aws-sdk/middleware-flexible-checksums";

export const s3 = new S3Client({
    region: process.env.B2_REGION!,
    endpoint: process.env.B2_ENDPOINT!,
    forcePathStyle: false,
    credentials: {
        accessKeyId: process.env.B2_KEY_ID!,
        secretAccessKey: process.env.B2_APP_KEY!,
    },
});

export const B2_BUCKET = process.env.B2_BUCKET_NAME!;

s3.middlewareStack.remove(flexibleChecksumsMiddlewareOptions.name);
