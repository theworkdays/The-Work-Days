"use client"

import { Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { useToast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Auth } from "@/services/Auth.service"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")?.toString()

    if (!email){
      toast.warning({
        title:"Invalid Email",
        description:"Please enter a valid email address"
      })
      return;
    }

    //console.log(email)
    
    try {
      const {error} = await Auth.requestRecoveryPassword(email)

      if (error){
        toast.error({
          title:"Error",
          description:error
        })
        return;
      }
      // Add your password reset logic here
      toast.success({
        title: "Reset Instructions Sent",
        description: "We've sent you an email with instructions to reset your password"
      })
    }  finally {
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
          <h2 className="mt-6 text-3xl font-bold text-gray-100">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-400">Enter your email to reset your password</p>
        </div>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-100">Reset Password</CardTitle>
            <CardDescription className="text-gray-400">
              We'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </Button>
                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-blue-500 hover:text-blue-400"
                  >
                    Back to Login
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