"use server";

import { AppwriteException, Query } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { UploadCollection } from "@/models/collections/upload.collection";
import { handleError } from "@/utils/errorHandler";

export const downloaddef = async (projectid: string) => {
  try {
    console.log("Project ID:", projectid);
    const session = await createSession();
    const { data, error } = session;
    
    if (error) {
      throw new AppwriteException(error);
    }
    
    const { database } = data!;
    
    // Check if document with download link exists for this project ID
    const existingDoc = await database.listDocuments(
        "main",
        UploadCollection,
        [Query.equal("$id", projectid)],
      );
      console.log("Existing document:", existingDoc);
    if (existingDoc.documents.length > 0) {
        // console.log("Document found:", existingDoc.documents);
      // Return the first found download link
      const downloadLink = existingDoc.documents[0];

      return { error: undefined, data: {
        downloadLink,
        awId: process.env.APPWRITE_PROJECT_ID
      } };
    } else {
      return handleError(Error("No download link found for this project"), "No download link found for this project");
    }
  } catch (err) {
    return handleError(err, "Failed to fetch download link");
  }
};