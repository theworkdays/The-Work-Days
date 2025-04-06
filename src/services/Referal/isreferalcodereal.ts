"use server";
import { AppwriteException , Query } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

export const iscoderealdef = async (referalId: string) => {
    try {
        const session = await createSession();
        const { data, error } = session;
        if (error) {
            throw new AppwriteException(error);
        }

        const { database } = data!;
        // Check if referral ID exists in the database
        const referredUsers = await database.listDocuments(
            "main",
            "ReferalsCollection", // Make sure this is your correct collection name
            [Query.equal("referralId", referalId)] // Assuming 'referralId' is the field name
        );

        if (referredUsers.documents.length === 0) {
            return { data: null, error: "Referral code not found" };
        }

        return { data: referredUsers.documents[0], error: null };
    } catch (error) {
        return handleError(error,"Error something went wrong");
    }
};