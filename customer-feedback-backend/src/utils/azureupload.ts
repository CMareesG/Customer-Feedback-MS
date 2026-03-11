import { BlobServiceClient } from "@azure/storage-blob";

import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Azure Storage connection string is not defined in environment variables');
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const containerClient = blobServiceClient.getContainerClient("productimage");

export async function uploadImage(file: Express.Multer.File): Promise<string> {
    const blobName = Date.now() + "-" + file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer);
    return blockBlobClient.url;
}

export async function deleteImage(imageUrl: string): Promise<void> {
    try {
        const urlParts = imageUrl.split('/');
        const blobName = urlParts[urlParts.length - 1];
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.deleteIfExists();
    } catch (error) {
        console.log('Error deleting image from Azure:', error);
    }
}
 