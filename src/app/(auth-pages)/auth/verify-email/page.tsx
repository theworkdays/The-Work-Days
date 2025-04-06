import { redirect } from 'next/navigation'

import { User } from '@/services/User.service'
import { Url } from '@/utils/url'

async function Page() {
   const user = await User.me()
  
      if (user.error) {
          return redirect("/auth")
      }

        if (!user.data!.emailVerification) {
            return redirect(await Url.extendURL('/auth/verify-email',user.data!.$id))
        }
  
     
  
  
      
      return redirect(await Url.extendURL("/dashboard"))
}

export default Page