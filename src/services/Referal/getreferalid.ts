"use server";

import { AppwriteException, Query } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { ReferalsCollection } from "@/models/collections/referals.collection";
import { User } from "@/services/User.service";
import { handleError } from "@/utils/errorHandler";

export const getreferaliddef = async () => {
  try {
    const session = await createSession();
    const { data, error } = session;

    if (error) throw new AppwriteException(error);

    const { database } = data!;
    const { data: user, error: usererror } = await User.me();

    if (usererror) throw new AppwriteException(usererror);

    // Use correct attribute name for user in the collection
    const result = await database.listDocuments(
      "main",
      ReferalsCollection,
      [Query.equal("user", user!.$id as string)]
    );

    if (result.total === 0) {
      throw new AppwriteException("No referral ID found");
    }

    return {
      error: undefined,
      data: result.documents[0],
    };
  } catch (e: unknown) {
    return handleError(e, "Unable to get referral ID");
  }
};