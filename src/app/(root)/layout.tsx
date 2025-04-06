import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { ToastProvider } from '@/components/toast/toast-context'
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Auth } from '@/services/Auth.service'
import { User } from '@/services/User.service'

import DashboardLayout from './sidebar'


const Layout = async ({
  children,
}: {
  children: ReactNode
})=>{

  const {data,error} =await User.me()

  //console.log(data,error)

  if (error){
    redirect("/auth")
    return;
  }

  const email = data!.emailVerification || false

  if (!email){
    await Auth.sendVerifyOTP(data!.email)
    redirect("/auth/verify-email")
    return
  }



  
 
  


 

  return (
    <ToastProvider>
      <SidebarProvider>
          <DashboardLayout>

            {children}
          </DashboardLayout>
          
      </SidebarProvider>
    </ToastProvider>
  )
}


export default Layout