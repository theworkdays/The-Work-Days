"use server";
import { AppwriteException, Models, Query } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { UploadCollection } from "@/models/collections/upload.collection";
import { User } from "@/services/User.service";
import { handleError } from "@/utils/errorHandler";

export interface Assignments extends Models.Document {
    Price: number | null
    attachments: string[] | null
    deadline: string
    description: string
    downloadlink: string | null
    ispaid: boolean
    projectId: string
    projectTitle: string
    status: "under review" | "reviewed" | "cancelled" | "in progress" | "completed"
    subject: string
    user: string
}

// Modified function to accept optional assignmentId parameter
export const getassignmentdef = async (assignmentId?: string) => {
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

        if (assignmentId) {
            // If assignmentId is provided, fetch the specific document
            const document = await database.getDocument<Assignments>("main", UploadCollection, assignmentId);
            
            // Verify the document belongs to the current user
            if (document.user !== userId) {
                throw new AppwriteException("Unauthorized access to document");
            }

            return {
                data: [document], // Return as array for consistency
                error: undefined,
            };
        } else {
            // If no assignmentId, fetch all documents for the user
            const documents = await database.listDocuments<Assignments>("main", UploadCollection,
                [
                    Query.equal("user", userId),
                ]
            );
            const userDocuments = documents.documents!

            return {
                data: userDocuments,
                error: undefined,
            };
        }
    } catch (e: unknown) {
        return handleError(e, "Unable to fetch documents");
    }
};