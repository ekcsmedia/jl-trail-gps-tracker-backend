// services/fileStorage.service.ts
import path from "node:path";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { lookup as mimeLookup } from "mime-types";
import { s3, B2_BUCKET } from "../utils/b2";

export interface FileStorageService {
    uploadFile(destinationPath: string, fileBuffer: Buffer): Promise<{
        fileId: number;
        name: string;
        size: number;
        contentType?: string;
        downloadUrl: string;
        key: string; // add key so callers can store it if needed
    }>;
    getDownloadStreamUrlById(fileId: number): Promise<string>;
}

class BackblazeB2FileStorageService implements FileStorageService {
    private s3: S3Client;
    private bucket: string;

    constructor(client: S3Client, bucket: string) {
        this.s3 = client;
        this.bucket = bucket;
    }

    async uploadFile(destinationPath: string, fileBuffer: Buffer) {
        const key = destinationPath.replace(/\\/g, "/");
        const filename = path.posix.basename(key);
        const contentType = (mimeLookup(filename) || "application/octet-stream").toString();

        await this.s3.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
            ContentLength: fileBuffer.length,
        }));

        let size = fileBuffer.length;
        try {
            const head = await this.s3.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
            if (typeof head.ContentLength === "number") size = head.ContentLength;
        } catch { /* ignore */ }

        const downloadUrl = `/api/files/download?key=${encodeURIComponent(key)}`;

        return {
            fileId: 0,
            name: filename,
            size,
            contentType,
            downloadUrl,
            key,
        };
    }

    async getDownloadStreamUrlById(_fileId: number) {
        return "";
    }
}

export const fileStorageService = new BackblazeB2FileStorageService(s3, B2_BUCKET);
