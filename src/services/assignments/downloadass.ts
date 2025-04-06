"use server";

import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { downloadbucketId } from "@/models/buckets/projectdownload";
import { handleError } from "@/utils/errorHandler";

export const previewassdef = async (projectid: string) => {
    try {
        const session = await createSession();
        const { data, error } = session;
    
        if (error) {
        throw new AppwriteException(error);
        }
    
        const { storage } = data!;
    
        // Check if document with download link exists for this project ID
        const downloadLink = await storage.getFilePreview(downloadbucketId, projectid, 3600);
    
        return { error: undefined, data: downloadLink };
    } catch (err) {
        return handleError(err, "Failed to fetch download link");
    }

}