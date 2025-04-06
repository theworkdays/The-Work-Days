"use client";

import { Eye, EyeOff, Gift,Loader,Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/toast"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Auth } from "@/services/Auth.service";
import { Referal } from "@/services/Referal.service";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const [googleClicked, setGoogleClicked] = useState(false)
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const referralCode = formData.get("referral") as string;
    const termsAccepted = formData.get("terms") === "on";
  
    if (!termsAccepted) {
      toast.error({
        title: "Error",
        description: "You must agree to the Terms of Service and Privacy Policy.",
      });
      setIsLoading(false);
      return;
    }
  
    try {
      const user = await Auth.registerUser(email, password, firstName, lastName);
      if (user.error) {
        toast.error({
          title: "Error",
          description: user.error || "Something went wrong. Please try again.",
        });
        return;
      }
      
      // Check and save referral code if it exists
      if (referralCode) {
        const { error } = await Referal.iscodereal(referralCode);
        if (error) {
          toast.error({
            title: "Invalid Referral Code",
            description: error,
          });
        } else {
          localStorage.setItem('referralCode', referralCode);
          toast.success({
            title: "Referral Applied",
            description: "Referral code has been successfully applied!",
          });
        }
      }
  
      toast.success({
        title: "Success",
        description: "Account created successfully! Redirecting to login...",
      });
  
      // Redirect to login page
      router.push("/auth/login");
      
    } catch (error) {
      toast.error({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Logo placed outside the centered container */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="inline-block">
          <span className="text-3xl font-bold">
            <span className="text-blue-500">The</span>
            <span className="text-orange-500">Workdays</span>
          </span>
        </Link>
      </div>

      {/* Centered content */}
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-100">Create an account</h2>
          <p className="mt-2 text-sm text-gray-400">Join us to get help with your technical assignments</p>
        </div>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-gray-100">Sign Up</CardTitle>
            <CardDescription className="text-gray-400">Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-gray-300">
                    First Name
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="first-name"
                      name="first-name"
                      type="text"
                      required
                      className="pl-10 bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    className="bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="pl-10 pr-10 bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-300 focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Password must be at least 8 characters long with a number and a special character
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referral" className="text-gray-300">
                  Referral Code (Optional)
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Gift className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="referral"
                    name="referral"
                    type="text"
                    className="pl-10 bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    placeholder="Enter referral code if you have one"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="terms"
                  name="terms"
                  className="border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-500 hover:text-blue-400">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-500 hover:text-blue-400">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-orange-500 hover:text-orange-400">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center space-x-4 mt-6">
        <Button
            variant="outline"
            className="border-gray-800 text-gray-400 hover:bg-gray-900 hover:text-gray-300"
            onClick={async () => {
              setGoogleClicked(true)
              const { error } = await Auth.googleLogin();
              if (error) {
                toast.error({
                  title: "Error",
                  description: error
                })
                setGoogleClicked(false)
              }

            }}
            disabled={googleClicked}
          >
            {
              googleClicked ? (<>
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Signing in with Google

              </>) : (<>
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </>)
            }

          </Button>
        </div>
      </div>
    </div>
  );
}