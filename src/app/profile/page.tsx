import { ArrowLeft,BadgeCheck, Calendar, CircleUserRound, Clock, Mail } from "lucide-react"
import Link from "next/link"
import type React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User } from "@/services/User.service"

export default async function ProfilePage() {
  const userData = await User.me()

  return (
    <div className="container mx-auto py-12 px-4 max-w-3xl">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </div>
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800" />
        <CardHeader className="relative pb-0">
          <div className="absolute -top-16 left-6 rounded-full border-4 border-white bg-white shadow-md">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-blue-600 text-white text-2xl">
                {userData.data?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="pt-16">
          {userData.error ? (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="text-red-700">
                  <p className="text-sm font-medium">Error loading profile</p>
                  <p className="text-sm">{userData.error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{userData.data?.name || "User Profile"}</h1>
                <div className="flex items-center mt-1 text-gray-500">
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="text-sm">{userData.data?.email || "user@example.com"}</span>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileInfoCard
                  icon={<CircleUserRound className="h-5 w-5 text-blue-600" />}
                  label="User ID"
                  value={userData.data?.$id || "N/A"}
                />

                <ProfileInfoCard
                  icon={<Calendar className="h-5 w-5 text-blue-600" />}
                  label="Registration Date"
                  value={formatDate(userData.data?.$createdAt) || "N/A"}
                />

                <ProfileInfoCard
                  icon={<Clock className="h-5 w-5 text-blue-600" />}
                  label="Last Updated"
                  value={formatDate(userData.data?.$updatedAt) || "N/A"}
                />

                <ProfileInfoCard
                  icon={<BadgeCheck className="h-5 w-5 text-blue-600" />}
                  label="Email Verification"
                  value={userData.data?.emailVerification ? "Verified" : "Not Verified"}
                  isHighlighted={userData.data?.emailVerification}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileInfoCard({
  icon,
  label,
  value,
  isHighlighted = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  isHighlighted?: boolean
}) {
  return (
    <div className="flex items-start p-4 rounded-lg bg-gray-50">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`font-medium ${isHighlighted ? "text-green-600" : "text-gray-900"}`}>{value}</p>
      </div>
    </div>
  )
}

function formatDate(dateString?: string) {
  if (!dateString) return null

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch (e) {
    console.error("Invalid date format:", dateString, e)
    return null
  }
}

