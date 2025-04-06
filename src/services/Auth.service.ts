// Source: src/services/Auth.service.ts
import { handleError } from "@/utils/errorHandler"

import { createOauthSessionDef } from "./Auth/createOauthSession";
import { emailPasswordLoginDef } from "./Auth/emailPassLogin"
import { googleLoginDef } from './Auth/googleauth';
import { Registeruserdef } from "./Auth/registeruser"
import { requestRecoveryPasswordDef } from "./Auth/request-pass-recovery"
import { sendVerifyOTPDef } from "./Auth/sendVerifyOTP"
import { updateRecoveryPasswordDef } from "./Auth/updatePasswordRecovery"
import { verifyOTPDef } from "./Auth/verifyOTP"
import { User } from "./User.service"


export class Auth{
    static emailPasswordLogin = emailPasswordLoginDef
    static sendVerifyOTP = sendVerifyOTPDef
    static verifyOTP = verifyOTPDef

    static resendOTP = async (email?:string)=>{        // reuse sendVerifyOTP
        try{


            let user = undefined
            if (!email){
                 user =await User.me();

                if (user.error){
                    throw new Error(user.error)}

            }

          console.log(email ?? user!.data!.email)
            

            return this.sendVerifyOTP(email ?? user!.data!.email)

        }catch(e:unknown){
            return handleError(e,"Unable to request a new OTP")
        }
    }

    static requestRecoveryPassword = requestRecoveryPasswordDef

    static updateRecoveryPassword = updateRecoveryPasswordDef
    static registerUser = Registeruserdef
    static googleLogin= googleLoginDef
    static createSession = createOauthSessionDef
}


