"use server";


import { createAdminClient } from "@/config/appwrite.config";
import { setCookie } from "@/utils/cookies";
import { handleError } from "@/utils/errorHandler";

import { AuthSession, cookieOptions } from "../AuthSession.service";

export const createOauthSessionDef = async (userId:string,secret:string) => {
    try{
        const {data,error}=  await createAdminClient()

        if (error){
            throw new Error(error)
        }
 
        const sessionInfo = await data!.account.createSession(userId,secret);

        console.log(sessionInfo)

        // save the session info in the cookie
        const {error:cookieSetError} = await setCookie("auth",sessionInfo.secret,cookieOptions);

        if (cookieSetError){
            throw new Error(error)
        }



        console.log(await AuthSession.getSessionToken())

        // revalidatePath("/auth")
 
        //console.log(TokenInfo)
 
        return {
            data:sessionInfo,
            error:undefined
        }
    }catch(e){
        return handleError(e, "Unable to create oauth session");
    }
}