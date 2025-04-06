"use client"

import { Eye, EyeOff, Lock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { useToast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Auth } from "@/services/Auth.service"

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const toast = useToast();
  
  const userId = searchParams.get("userId")?.toString() || "" 
  const secret = searchParams.get("secret")?.toString() || ""

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    if (!userId || !secret) {
      toast.error({
        title: "Invalid Reset Link",
        description: "The password reset link is invalid or has expired."
      })
      setIsLoading(false)
      return
    }
    
    const formData = new FormData(event.currentTarget)
    const password = formData.get("password")
    const confirmPassword = formData.get("confirmPassword")

    if (password !== confirmPassword) {
      toast.error({
        title: "Passwords do not match",
        description: "Please make sure your passwords match"
      })
      setIsLoading(false)
      return
    }

    try {
      // Add your password reset logic here using code and secret

      const {error} = await Auth.updateRecoveryPassword(userId,secret, password as string)

      if (error){
        toast.error({
          title:"Error",
          description:error
        })
        return;
      }

      toast.success({
        title: "Password Updated",
        description: "You have successfully updated your password"
      })
      // Redirect to login page after successful reset
    } catch  {
      toast.error({
        title: "Invalid Password",
        description: "The password you entered is invalid. Please try again."
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!userId || !secret) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-100">Invalid Reset Link</CardTitle>
            <CardDescription className="text-gray-400">
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/auth/forgot-password">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Request New Reset Link
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
          <h2 className="mt-6 text-3xl font-bold text-gray-100">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-400">Enter your new password</p>
        </div>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-100">Create New Password</CardTitle>
            <CardDescription className="text-gray-400">
              Make sure your new password is secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  New Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    placeholder="••••••••"
                    minLength={8}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-300 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10 bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    placeholder="••••••••"
                    minLength={8}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-300 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}