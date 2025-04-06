"use server";

import { redirect, RedirectType } from "next/navigation";
import { OAuthProvider } from "node-appwrite";

import { createAdminClient } from "@/config/appwrite.config";
import { handleError } from "@/utils/errorHandler";
import { Url } from "@/utils/url";

export const googleLoginDef = async ()=>{
        let url = "/";
        try{
            url = await Url.extendURL("auth","google","failure")
            const {data,error}=  await createAdminClient()

            if (error){
                throw new Error(error)
            }
            const success =await Url.extendURL("auth","google","success");
            const failure =await Url.extendURL("auth","google","failure");
            url = await data!.account.createOAuth2Token(OAuthProvider.Google,success, failure);

        }catch(e:unknown){
            console.log(e);
            return handleError(e,"Unable to login")
        }

        return redirect(url,RedirectType.replace)
    }