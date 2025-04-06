"use server";

import { AppwriteException, Models,Query } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { DoubtsCollection } from "@/models/collections/doubts.collection";
import { handleError } from "@/utils/errorHandler";


export interface Discussion  extends Models.Document {
  id: string
  title: string
  description: string
  answer: string[]
}

export const getdoubtDef = async (projectId: string) => {
  try {
    const session = await createSession();
    const { data, error } = session;

    if (error) {
      throw new AppwriteException(error);
    }

    const { database } = data!;

    // Fetch doubts filtered by projectId
    const result = await database.listDocuments<Discussion>(
      "main",
      DoubtsCollection,
      [Query.equal("projectId", projectId)]
    );

    return {
      error: undefined,
      data: result.documents,
    };
  } catch (e: unknown) {
    return handleError(e, "Failed to fetch doubts");
  }
};
