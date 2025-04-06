"use server";
import { AppwriteException } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { UploadCollection } from "@/models/collections/upload.collection";

export async function capturePayPalOrderdef(orderID: string, assignmentid: string) {
  try {
    const auth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`
    ).toString("base64");
    
    const session = await createSession();
    const { data, error } = session;
    
    if (error) {
      throw new AppwriteException(error);
    }
    
    const { database } = data!;
    
    const paypalResponse = await fetch(`${process.env.PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    });

    const paypalData = await paypalResponse.json();
    
    if (paypalData?.status === "COMPLETED") {
      // Order was successfully captured
      console.log("Order captured successfully:", paypalData);
      
      try {
        const response = await database.updateDocument(
          "main",
          UploadCollection,
          assignmentid,
          {
            ispaid:true,  // Fixed typo (was "COMPLETED")
            status:"in progress",
            paymentId: orderID,
          }
        );
        console.log("Document updated successfully:", response);
        
        return {
          error: undefined,
          data: paypalData,
        };
      } catch (dbError) {
        console.error("Error updating document:", dbError);
        throw dbError;
      }
    }
    
    return paypalData;
  } catch (error) {
    console.error("Error in capturePayPalOrderdef:", error);
    throw error;
  }
}