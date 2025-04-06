import { AppwriteException } from "node-appwrite";

import { createAdminClient } from "@/config/appwrite.config";

import { createBucketStorage, projectbucketId } from "./buckets/projectdetails";
import { createBucketdownload, downloadbucketId } from "./buckets/projectdownload";
import { createDoubtsCollection } from "./collections/doubts.collection";
import { createReferalsCollection, ReferalsCollection } from "./collections/referals.collection";
import { createUploadCollection, UploadCollection } from "./collections/upload.collection";

export const dbName = "main";

export default async function CreateOrSetupDB() {
  try {
    const { data, error } = await createAdminClient();

    if (error) {
      console.error("Error creating admin client:", error);
      return;
    }

    const database = data!.database;
    const storage = data!.storage;

    // Create DB if not exists
    await database.get(dbName).catch(async (e: AppwriteException) => {
      if (e.code === 404 && e.type === "database_not_found") {
        console.log("Creating DB");
        await database.create(dbName, dbName, true);
      }
    });

    console.log("✅ DB exists");

    await Promise.all([
      // Check/create collection
      (async () => {
        await database.getCollection(dbName, UploadCollection).catch(async (e: AppwriteException) => {
          if (e.code === 404 && e.type === "collection_not_found") {
            console.log("Creating UploadCollection");
            await createUploadCollection();
          }
        });
        console.log("✅ UploadCollection exists");
      })(),
      (async () => {
        await database.getCollection(dbName, ReferalsCollection).catch(async (e: AppwriteException) => {
          if (e.code === 404 && e.type === "collection_not_found") {
            console.log("Creating Referals Collection");
            await createReferalsCollection();
          }
        });
        console.log("✅ Referals Collection exists");
      })(),
      (async () => {
        await database.getCollection(dbName, "DoubtsCollection").catch(async (e: AppwriteException) => {
          if (e.code === 404 && e.type === "collection_not_found") {
            console.log("Creating Doubts Collection");
            await createDoubtsCollection();
          }
        }
        );
        console.log("✅ Doubts Collection exists");
      })(),
      // Check/create bucket
      (async () => {
     await storage.getBucket(projectbucketId).catch(async (e: AppwriteException) => {
          if (e.code === 404 && e.type === "storage_bucket_not_found") {
            console.log("Creating bucket:", projectbucketId);
            await createBucketStorage();
          }
        });
        console.log("✅ Project bucket exists");
      })(),
      (async () => {
        await storage.getBucket(downloadbucketId).catch(async (e: AppwriteException) => {
          if (e.code === 404 && e.type === "storage_bucket_not_found") {
            console.log("Creating bucket: projectDownloads");
            await createBucketdownload();
          }
        });
        console.log("✅ Project download bucket exists");
      }

      )()
    ]);
  } catch (e) {
    console.error("❌ Unable to create DB, collection, or bucket:", e);
  }
}
