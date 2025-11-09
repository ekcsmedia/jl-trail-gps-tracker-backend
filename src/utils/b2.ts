// utils/b2.ts
import { S3Client } from "@aws-sdk/client-s3";

function must(name: string) {
    const v = process.env[name];
    if (!v) throw new Error(`${name} is missing`);
    return v.trim();
}

const endpoint = must("B2_ENDPOINT"); // e.g. https://s3.eu-central-003.backblazeb2.com
try { new URL(endpoint); } catch { throw new Error(`B2_ENDPOINT invalid: ${endpoint}`); }

export const s3 = new S3Client({
    region: must("B2_REGION"),            // e.g. eu-central-003
    endpoint,                             // full URL, no bucket, no trailing slash
    credentials: {
        accessKeyId: must("B2_KEY_ID"),
        secretAccessKey: must("B2_APPLICATION_KEY"),
    },
    forcePathStyle: true,                 // path-style works great with B2
});

// ⛔️ Turn off flexible checksums so presigned URLs don't include x-amz-sdk-checksum-*
// (avoids needing to compute/send CRC32 from your clients)
(s3.middlewareStack as any).remove?.("flexibleChecksumsMiddleware");
