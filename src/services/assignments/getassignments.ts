"use server";
import { AppwriteException, Models, Query } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { UploadCollection } from "@/models/collections/upload.collection";
import { User } from "@/services/User.service";
import { handleError } from "@/utils/errorHandler";

export interface Assignments extends Models.Document {
    Price: number | null
    attachments: string[] | null // Assuming attachments is an array of strings (e.g., file URLs)
    deadline: string // ISO 8601 date string
    description: string
    downloadlink: string | null
    ispaid: boolean
    projectId: string
    projectTitle: string
    status: "under review" | "reviewed" | "cancelled" | "in progress" | "completed"
    subject: string
    user: string // User ID
}

export const getassignmentsdef = async () => {
    try {
        const session = await createSession();
        const { data, error } = session;

        if (error) {
            throw new AppwriteException(error);
        }

        const { database } = data!;

        // Get current user
        const { data: user, error: userError } = await User.me();
        if (userError) {
            throw new AppwriteException(userError);
        }

        const userId = user?.$id as string;

        // Fetch all documents from UploadCollection
        const documents = await database.listDocuments<Assignments>("main", UploadCollection,[
            Query.equal("user", userId),
        ]);
        console.log("Documents:", documents);
        // Filter by user ID

        return {
            data: documents.documents as Assignments[],
            error: undefined,
        };
    } catch (e: unknown) {
        return handleError(e, "Unable to fetch documents");
    }
};
