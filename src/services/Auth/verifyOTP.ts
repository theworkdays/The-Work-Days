"use server";

import { createAdminClient } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";

export const verifyOTPDef = async (userId:string,otp:string)=>{
         "use server"
        try{

            const {data,error}=  await createAdminClient()

            if (error){
                throw new Error(error)
            }

            const session = await data!.account.createSession(userId,otp);

            //console.log(session)

            return {
                data:session,
                error:undefined
            }


        }catch(e:unknown){
            return handleError(e,"Unable to verify OTP")
        }
    }