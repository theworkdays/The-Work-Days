"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useToast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Auth } from "@/services/Auth.service"
import { Referal } from "@/services/Referal.service"
import { User } from "@/services/User.service"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [canResend, setCanResend] = useState(false)
  const toast = useToast();
  const router = useRouter()
  const params = useParams();
  const userId = params.userId?.toString() as string

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else {
      setCanResend(true)
    }
    return () => clearInterval(timer)
  }, [countdown, canResend])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const form = new FormData(event.currentTarget)

    const otp = form.get("otp") as string

    //console.log(otp)

    try {
      // Add your OTP verification logic here

      const {data,error} = await Auth.verifyOTP(userId,otp)

      if (error){
        toast.error({
          title: "Error",
          description: error
        })
        return;
      }


      console.log(data)


      toast.success({
        title: "OTP Verified",
        description: "You have successfully verified your email address.",
      })

      router.push("/dashboard")

      const {error:referalError} = await Referal.getOrCreateReferalId()
      const referalId = localStorage.getItem("referalId")
      if (referalId){
        const {error} = await Referal.getrefered(referalId)
        if (error){
          toast.error({
            title: "Error",
            description: error
          })
          return;
        }
        if (error){
          toast.error({
            title: "Error",
            description: error
          })
          return;
        }
      }
      if (referalError){
        toast.error({
          title: "Error",
          description: error
        })
        return;
      }


      // Redirect after successful verification
    } catch {
      toast.error({
        title: "Invalid OTP",
        description: "The OTP you entered is invalid. Please try again.",
      })
    } finally {



      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    try {
      // Add your resend OTP logic here
      setCountdown(30)
      setCanResend(false)

      const {error} = await Auth.resendOTP()

      if (error){
        toast.error({
          title: "Error",
          description: error
        })
        return;
        
      }

      toast.success({
        title: "OTP Resent",
        description: "We've resent the OTP to your email address.",
      })
    }
    finally {
      setIsLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold">
              <span className="text-blue-500">The</span>
              <span className="text-orange-500">Workdays</span>
            </span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-100">Verify OTP</h2>
          <p className="mt-2 text-sm text-gray-400">Enter the OTP sent to your email</p>
        </div>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-100">Enter Verification Code</CardTitle>
            <CardDescription className="text-gray-400">
              We've sent a 6-digit code to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  name="otp"
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                >


                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}


                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    <InputOTPSlot
                      index={1}


                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    <InputOTPSlot
                      index={2}


                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    <InputOTPSlot
                      index={3}


                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    <InputOTPSlot
                      index={4}


                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                    <InputOTPSlot
                      index={5}


                      className="bg-gray-800 border-gray-700 text-gray-100"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-400">
                    Didn't receive the code?{" "}
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        className="text-blue-500 hover:text-blue-400 font-medium"
                        disabled={isLoading}
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <span className="text-gray-500">
                        Resend in {countdown}s
                      </span>
                    )}
                  </p>
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-blue-500 hover:text-blue-400 block"
                  >
                    <Button onClick={async ()=>{
                      await User.logout()
                    }}>
                    Back to Login
                    </Button>
       
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}