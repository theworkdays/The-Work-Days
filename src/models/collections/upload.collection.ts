import { IndexType, Permission } from "node-appwrite";

import { createAdminClient } from "@/config/appwrite.config";

import { dbName } from "../dbSetup";

const collectionId = "UploadCollection";
const collectionName = collectionId;

export const UploadCollection = collectionName;

export async function createUploadCollection() {
  try {
    const {data,error} = await createAdminClient();

    if (error) {
      console.error("Error creating admin client:",error);
      return;
    }

    const database= data!.database;

    // Create the UploadCollection
    await database.createCollection(
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
    await database?.createStringAttribute(dbName, collectionId, "projectId", 255, true);
    await database?.createStringAttribute(dbName, collectionId, "projectTitle", 255, true);
    await database?.createStringAttribute(dbName, collectionId, "description",2055, true);
    await database?.createStringAttribute(dbName, collectionId, "subject", 255, true);
    await database?.createDatetimeAttribute(dbName, collectionId, "deadline", true);
    await database?.createStringAttribute(dbName, collectionId, "attachments", 255, false); // You can store the Appwrite file ID here
    await database?.createStringAttribute(dbName, collectionId, "user", 255, true); // You can store the user ID here
    await database.createIntegerAttribute(dbName, collectionId, "project-status", false,undefined,undefined,0); // You can store the user ID here
    await database?.createEnumAttribute(  
        dbName,
        collectionId,
        "status",
        ["under review", "reviewed", "cancelled", "in progress", "completed"], // allowed values
        false, // required
        "under review" // default value
      );
    await database?.createIntegerAttribute(dbName, collectionId, "projectprogress", false,0,100,0); // You can store the user ID here
    await database?.createStringAttribute(dbName, collectionId, "downloadlink",255, false,undefined,true);
    await database?.createIntegerAttribute(dbName, collectionId, "Price", false);
    await database?.createBooleanAttribute(dbName, collectionId, "ispaid", false,false);
    await database?.createIndex(
        dbName,
        collectionId,
        "user_index",   // name of the index
        IndexType.Key,  // type of index
        ["user"],       // type of index
      );
    await database?.createIndex(
        dbName,
        collectionId,
        "projectId_index",   // name of the index
        IndexType.Unique,  // type of index
        ["projectId"],       // type of index
      );
    console.log("UploadCollection and attributes created successfully!");
  } catch (err) {
    console.error("Error creating UploadCollection:", err);
  }
}
