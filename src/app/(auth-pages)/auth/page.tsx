import { redirect } from 'next/navigation'


async function Page() {
  return redirect("/auth/login")
}

export default Page