import { Permission, Role } from "node-appwrite";

import { createAdminClient } from "@/config/appwrite.config"; // your custom client setup

export const downloadbucketId = "projectDownloads";

export async function createBucketdownload() {
  const { data,error } = await createAdminClient();
    if(error){
        console.error("Error creating admin client:",error);
        return;
    }
    const storage = data!.storage;
  try {
    await storage?.createBucket(downloadbucketId, downloadbucketId, [
      Permission.read(Role.any()),        // public read
      Permission.create(Role.users()),    // only logged-in users can upload
      Permission.update(Role.users()),
      Permission.delete(Role.users())
    ], true); // `fileSecurity` = true
    console.log("✅ Bucket created:", downloadbucketId);
  } catch (err) {
    console.error("❌ Failed to create bucket:", err);
  }
}
