import { redirect } from 'next/navigation'
import React from 'react'

import { User } from '@/services/User.service'
import { Url } from '@/utils/url'

async function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    const user = await User.me()


    if (user.error) {
        return <>
        {children}
    </>
       
    }

    if (user.data! && !user.data!.emailVerification) {
        return <>
        {children}
    </>
        // return redirect(Url.extendURL('/auth/verify-email'))
    }



     return redirect(await Url.extendURL('/dashboard'))
   
}

export default AuthLayout