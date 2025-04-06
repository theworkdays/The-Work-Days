import { IndexType, Permission } from "node-appwrite";

import { createAdminClient } from "@/config/appwrite.config";

import { dbName } from "../dbSetup";

const collectionId = "DoubtsCollection";
const collectionName = collectionId;

export const DoubtsCollection = collectionName;

export async function createDoubtsCollection() {
    try{
        const {data,error} = await createAdminClient();

        if (error) {
          console.error("Error creating admin client:",error);
          return;
        }
    
        const database= data?.database;

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
            await database?.createStringAttribute(dbName, collectionId, "title", 255, true);
            await database?.createStringAttribute(dbName, collectionId, "description",2055, true);
            await database?.createStringAttribute(dbName, collectionId, "answer", 255, false,undefined,true);
            await database?.createStringAttribute(dbName, collectionId, "projectId", 255, true);
                await database?.createIndex(
                    dbName,
                    collectionId,
                    "projectId",   // name of the index
                    IndexType.Key,  // type of index
                    ["projectId"],
                  );
            console.log("DoubtCollection and attributes created successfully!");
        } catch (err) {
          console.error("Error creating DoubtCollection:", err);
        }
      }