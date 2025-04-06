"use server";
import { AppwriteException, ID } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { ReferalsCollection } from "@/models/collections/referals.collection";
import { User } from "@/services/User.service";
import { handleError } from "@/utils/errorHandler";

export const createreferaliddef = async () => {
  try {
    const session = await createSession();
    const { data, error } = session;

    if (error) {
      throw new AppwriteException(error);
    }

    const { database } = data!;
    const { data: user, error: userError } = await User.me();
    console.log(user);
    if (userError) {
      throw new AppwriteException(userError);
    }

    const newDoc = await database.createDocument(
      "main",
      ReferalsCollection,
      ID.unique(),
      {
        // userId: user!.$id as string,
        ReferalId: ID.unique().slice(0, 6),
        verified: false,
        peoplerefered: 0,
        user: user?.$id as string,
        Referbalance: 0,
      }
    );

    return {
      data: newDoc,
      error: undefined,
    };
  } catch (e) {
    return handleError(e, "Unable to create referal id");
  }
};
