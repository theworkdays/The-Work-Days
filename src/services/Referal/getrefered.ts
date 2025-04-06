"use server";
import { AppwriteException, Query } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { ReferalsCollection } from "@/models/collections/referals.collection";
import { handleError } from "@/utils/errorHandler";

import { User } from "../User.service";

export const getrefereddef = async (referalId: string) => {
    try {
        const session = await createSession();
        const { data, error } = session;
       const user = await User.me()
        if (user.error) {
            throw new AppwriteException(user.error);
        }
        if (error) {
            throw new AppwriteException(error);
        }

        const { database } = data!;
        // Step 1: Find the referred user by userid
        const referredUsers = await database.listDocuments(
            "main",
            ReferalsCollection,
            [Query.equal("user", user.data!.$id)]
        );

        if (referredUsers.documents.length === 0) {
            return { data: null, error: "No referred users found" };
        }

        const referredUser = referredUsers.documents[0]; // Assuming one user per referalId
        const referredUserBalance = referredUser.Referbalance || 0;
        const newReferredUserBalance = referredUserBalance + 500;

        // Step 2: Update the referred user's balance
        await database.updateDocument(
            "main",
            ReferalsCollection,
            user.data!.$id,
            { Referbalance: newReferredUserBalance }
        );

        // Step 3: Find the referrer (the person who referred this user)
        if (!referredUser.userId) {
            return { data: { referredUser, updatedBalance: newReferredUserBalance }, error: "Referrer not found" };
        }

        const referrerUsers = await database.listDocuments(
            "main",
            ReferalsCollection,
            [Query.equal("ReferalId", referalId)]
        );

        if (referrerUsers.documents.length === 0) {
            return { data: { referredUser, updatedBalance: newReferredUserBalance }, error: "Referrer not found" };
        }

        const referrer = referrerUsers.documents[0];
        const referrerId = referrer.$id;
        const referrerBalance = referrer.Referbalance || 0;
        const newReferrerBalance = referrerBalance + 100;

        // Step 4: Update the referrer's balance
        await database.updateDocument(
            "main",
            ReferalsCollection,
            referrerId,
            { Referbalance: newReferrerBalance }
        );

        return {
            data: {
                referredUser,
                updatedReferredUserBalance: newReferredUserBalance,
                referrer,
                updatedReferrerBalance: newReferrerBalance
            },
            error: undefined,
        };
    } catch (error) {
        return handleError(error, "Unable to get referred users and update balances");
    }
};
