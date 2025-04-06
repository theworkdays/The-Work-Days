import { redirect } from 'next/navigation'
import React from 'react'

import { User } from '@/services/User.service'
import { Url } from '@/utils/url'


async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const user = await User.me()

    if (user.error) {
        return redirect("/auth")
    }

    if (!user.data!.emailVerification) {
       
        // await sendVerifyOTPDef(user.data!.email);

        return (
            <div>
                {children}
            </div>
        )
        
    }


    
    return redirect(await Url.extendURL("/dashboard"))
}

export default Layout