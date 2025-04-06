"use client"

import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import type React from "react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createAdminClient } from "@/config/appwrite.config"
import { AuthSession } from "@/services/AuthSession.service"
import { Referal } from "@/services/Referal.service"

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [askForReferral, setAskForReferral] = useState(false)
  const [referralId, setReferralId] = useState("")
  const [session, setSession] = useState<{ secret: string } | null>(null)

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const googlesecret = searchParams.get("secret")
      const userid = searchParams.get("userid")
      if (!googlesecret || !userid) {
        router.replace("/auth")
        return
      }

      try {
        const { data, error } = await createAdminClient()

        if (error) {
          router.replace("/auth")
          return
        }

        const sessionData = await data!.account.createSession(userid, googlesecret)
        const result2 = await Referal.getOrCreateReferalId()
        console.log(result2)

        // Store session but don't redirect yet
        setSession(sessionData)
        setIsLoading(false)
        setAskForReferral(true)
      } catch (error) {
        console.error("Login error:", error)
        router.replace("/auth")
      }
    }

    handleOAuthLogin()
  }, [searchParams, router])

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (referralId.trim()) {
        // Call getrefered with the provided referral ID
        const result = await Referal.getrefered(referralId)
        console.log("Referral result:", result)
      }

      // Complete the login process
      if (session?.secret) {
        await AuthSession.setSessionToken(session.secret)
        router.replace("/dashboard")
      }
    } catch (error) {
      console.error("Referral error:", error)
      // Still proceed to dashboard even if referral has an error
      if (session?.secret) {
        await AuthSession.setSessionToken(session.secret)
        router.replace("/dashboard")
      }
    }
  }

  const skipReferral = async () => {
    setIsLoading(true)
    if (session?.secret) {
      await AuthSession.setSessionToken(session.secret)
      router.replace("/dashboard")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-lg">Logging you in...</p>
      </div>
    )
  }

  if (askForReferral) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-4">
        <h2 className="text-2xl font-bold">One Last Step</h2>
        <p className="text-center max-w-md">Do you have a referral code? Enter it below to get started.</p>

        <form onSubmit={handleReferralSubmit} className="w-full max-w-md space-y-4">
          <Input
            type="text"
            placeholder="Enter referral code"
            value={referralId}
            onChange={(e) => setReferralId(e.target.value)}
            className="bg-gray-900 border-gray-700 text-white"
          />

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button type="submit" className="flex-1">
              Submit Referral
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={skipReferral}
              className="flex-1 border-gray-700 hover:bg-gray-800"
            >
              Skip
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return null
}

