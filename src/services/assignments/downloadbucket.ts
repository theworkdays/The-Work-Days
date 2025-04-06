"use server";

import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { downloadbucketId } from "@/models/buckets/projectdownload";
import { handleError } from "@/utils/errorHandler";

export const downloadassdef = async (projectid: string) => {
    try {
        const session = await createSession();
        const { data, error } = session;
    
        if (error) {
            throw new AppwriteException(error);
        }
    
        const { storage } = data!;
        
        // Get direct download link
        const downloadLink = await storage.getFileDownload(downloadbucketId, projectid);
    
        return { error: undefined, data: downloadLink };
    } catch (err) {
        return handleError(err, "Failed to fetch download link");
    }
};
