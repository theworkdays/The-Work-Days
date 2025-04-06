"use client"

import { AlertCircle, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter,useSearchParams } from "next/navigation"
import { useState } from "react"

import { useToast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Auth } from "@/services/Auth.service"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(false)

  const secret = searchParams.get("secret")
  const userId = searchParams.get("userId")
  const toast = useToast();

  const handleVerification = async () => {
    setIsVerifying(true)
    try {
      // Simulate API call
      const {error}=  await Auth.createSession(userId!, secret!)

      if (error){
        toast.error({
            title: "Verification Failed",
            description: "An error occurred while verifying your account. Please try again."
        })
        return;
      }

      toast.success({
        title: "Account Verified",
        description: "Your account has been successfully verified. You can now access your dashboard"
      })
      router.push("/dashboard")
    } catch  {
      toast.error({
        title: "Verification Failed",
        description: "An error occurred while verifying your account. Please try again."
      })
    } finally {
      setIsVerifying(false)
    }
  }

  if (!secret || !userId) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-red-500">
              <AlertCircle className="h-5 w-5 mr-2" />
              Invalid Verification Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">
              The verification link appears to be invalid or has expired. Please request a new verification link.
            </p>
            <div className="flex justify-between">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-300"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Go to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center text-green-500">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Continue to Your Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400">
            Click the button below to login.
          </p>
          <div className="flex justify-between">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-gray-300"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to login
              </Button>
            </Link>
            <Button
              onClick={handleVerification}
              disabled={isVerifying}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  loading
                </>
              ) : (
                "Proceed to Dashbaord"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}