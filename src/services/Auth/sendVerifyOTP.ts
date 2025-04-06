"use server"

import { ID } from "node-appwrite";

import { createSession } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

export const sendVerifyOTPDef = async (email:string)=>{

   try{

       const {data,error}=  await createSession()

       if (error){
           throw new Error(error)
       }

       const TokenInfo = await data!.account.createEmailToken(ID.unique(),email,false);

       //console.log(TokenInfo)

       return {
           data:TokenInfo,
           error:undefined
       }




   }catch(e:unknown){
       return handleError(e,"Unable to send OTP at this moment")
   }
}