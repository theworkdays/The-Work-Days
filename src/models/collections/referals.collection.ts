import { IndexType, Permission } from "node-appwrite";

import { createAdminClient } from "@/config/appwrite.config";

import { dbName } from "../dbSetup";

const collectionId = "ReferalsCollection";
const collectionName = collectionId;

export const ReferalsCollection = collectionName;

export async function createReferalsCollection() {
  try {
    const {data,error} = await createAdminClient();

    if (error) {
      console.error("Error creating admin client:",error);
      return;
    }

    const database= data?.database;

    // Create the UploadCollection
    await database?.createCollection(
      dbName,
      collectionId,
      collectionName,
      [
        Permission.read("any"),
        Permission.write("users"),
        Permission.update("users"),
        Permission.delete("users"),
      ],
      undefined,
      true
    );

    // Add fields to the collection
    await database?.createStringAttribute(dbName, collectionId, "ReferalId", 255, true);
    await database?.createBooleanAttribute(dbName, collectionId, "verified", false,false);
    await database?.createIntegerAttribute(dbName, collectionId, "peoplerefered", false,0);
    await database?.createStringAttribute(dbName, collectionId, "user", 255, true); // You can store the Appwrite file ID here
    await database?.createIntegerAttribute(dbName, collectionId, "Referbalance",false,0);
    await database?.createIndex(
        dbName,
        collectionId,
        "user",   // name of the index
        IndexType.Key,  // type of index
        ["user"],
      );

    console.log("UploadCollection and attributes created successfully!");
  } catch (err) {
    console.error("Error creating UploadCollection:", err);
  }
}
