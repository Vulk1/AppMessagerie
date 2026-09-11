import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "../lib/r2.js";


export async function createPresignedUploadUrl({
    key,
    contentType,
}: {
    key: string;
    contentType: string;
}): Promise<string> {

    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(r2, command, {
        expiresIn: 600,
    });

    return uploadUrl;
}