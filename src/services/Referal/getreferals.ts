"use server";
import { AppwriteException, Models,Query } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { ReferalsCollection } from "@/models/collections/referals.collection";
import { User } from "@/services/User.service";
import { handleError } from "@/utils/errorHandler";

export interface ReferralInter extends Models.Document {


    referralBalance: number // Total earnings from referrals
    peoplerefered: number // List of people referred
    verified: boolean // Whether the referral is verified
    ReferalId: string // Unique referral ID
    Referbalance: number // Earnings from a single referral
    user: string // User ID
}

export const getreferalsdef = async () => {
  try {
    const session = await createSession();
    const { data, error } = session;

    if (error) {
      throw new AppwriteException(error);
    }

    const { database } = data!;
    const { data: user, error: userError } = await User.me();

    if (userError) {
      throw new AppwriteException(userError);
    }

    const userId = user!.$id as string;

    // Proper Appwrite query using Query.equal
    const res = await database.listDocuments<ReferralInter>("main", ReferalsCollection, [
      Query.equal("user", userId),
    ]);

    if (res.total === 0) {
      throw new AppwriteException("No referral data found");
    }

    const referralDoc = res.documents[0];   

    return {
      error: undefined,

      data: referralDoc,
    };
  } catch (e) {
    return handleError(e, "Unable to get referals");
  }
};
// Compare this snippet from src/services/Referal/getreferals.ts:
