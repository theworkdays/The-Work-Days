"use server";

import { AppwriteException, ID } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { DoubtsCollection } from "@/models/collections/doubts.collection";
import { handleError } from "@/utils/errorHandler";

export const askdoubtdef = async (
  title: string,
  description: string,
    projectid: string
) => {
  try {
    const session = await createSession();
    const { data, error } = session;
    console.log(title,description,projectid);
    if (error) {
      throw new AppwriteException(error);
    }

    const { database } = data!;

    // 2. Create the doubt document
    const newDoc = await database.createDocument(
      "main",
      DoubtsCollection,
      ID.unique(),
      {
        title,
        description,
        projectId: projectid,
      }
    );

    return {
      success: true,
      message: "Doubt posted successfully",
      document: newDoc,
    };
  } catch (e: unknown) {
    return handleError(e, "Failed to post doubt");
  }
};
