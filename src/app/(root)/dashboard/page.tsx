"use client"

import { BarChart, DollarSign, FileText, Users } from "lucide-react"
import { useEffect, useState } from "react"

import { useToast } from "@/components/toast/toast-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Assignment } from "@/services/assignment.service"
import type { Assignments } from "@/services/assignments/getassignments"
import { Referal } from "@/services/Referal.service" // Corrected import name

export default function DashboardPage() {
  const { success, error } = useToast()
  const [assignments, setAssignments] = useState<Assignments[]>([])
  const [referrals, setReferrals] = useState<string>("")
  const [_referralsverify, setReferralsverify] = useState<boolean>(false)
  const [totalEarnings, setTotalEarnings] = useState<number>(0)
  const [totalReferrals, setTotalReferrals] = useState<number>(0)
  console.log("Referrals:", _referralsverify)
  useEffect(() => {
    // Show welcome toast when dashboard loads
    success({
      title: "Welcome back!",
      description: "We're glad to see you again",
    })

    // Fetch assignments and referrals
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      // Fetch assignments
      const assignmentsData = await Assignment.getassignments()

      if (assignmentsData.error) {
        setAssignments([])
      } else {
        setAssignments(assignmentsData.data!) // Ensure this matches the API response structure
      }

      // Fetch referrals
      const { data, error } = await Referal.getOrCreateReferalId()
      if (error) {
        console.error(error)
      }
      if (data) {
        console.log(data)
        setReferrals(data.ReferalId || "Not available")
        setReferralsverify(data.verified || false)
        setTotalEarnings(data.Referbalance || 0)
        setTotalReferrals(data.peopleRefered || 0)
      }
    } catch (err) {
      console.error("Failed to fetch data:", err)
      error({
        title: "Failed to fetch data",
        description: "There was an issue loading your dashboard data. Please try again later.",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      case "pending review":
        return "bg-blue-500"
      case "pending payment":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="p-6 w-full h-h-full">
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
  <Card className="bg-gray-900 border-gray-800 h-full">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-200">Total Projects</CardTitle>
      <FileText className="h-4 w-4 text-blue-500" />
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-2xl font-bold text-white">{assignments.length}</div>
    </CardContent>
  </Card>
  <Card className="bg-gray-900 border-gray-800 h-full">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-200">Active Projects</CardTitle>
      <BarChart className="h-4 w-4 text-orange-500" />
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-2xl font-bold text-white">
        {assignments.filter((a) => a.status.toLowerCase() === "in progress").length}
      </div>
    </CardContent>
  </Card>
  <Card className="bg-gray-900 border-gray-800 h-full">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-200">Total Referral Balance</CardTitle>
      <DollarSign className="h-4 w-4 text-green-500" />
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</div>
    </CardContent>
  </Card>
  <Card className="bg-gray-900 border-gray-800 h-full">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-200">Total Referrals</CardTitle>
      <Users className="h-4 w-4 text-blue-500" />
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-2xl font-bold text-white">{totalReferrals}</div>
    </CardContent>
  </Card>
  <Card className="bg-gray-900 border-gray-800 h-full">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-200">Referral ID</CardTitle>
      <FileText className="h-4 w-4 text-purple-500" />
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-xl font-bold text-white truncate">{referrals || "Not available"}</div>
      <p className="text-xs text-gray-400 mt-1">Share this with friends</p>
    </CardContent>
  </Card>
</div>

      <Card className="bg-gray-900 border-gray-800 mt-4">
  <CardHeader>
    <CardTitle className="text-gray-100">Recent Projects</CardTitle>
    <CardDescription className="text-gray-400">Your assignments</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      {assignments.length > 0 ? (
        assignments.map((assignment, index) => (
          <div
    key={index}
    className="flex items-center border border-gray-800 rounded-lg p-3 hover:bg-gray-800/50 transition-colors"
  >
    {/* Colored status dot */}
    <div
      className={`h-3 w-3 rounded-full flex-shrink-0 ${getStatusColor(assignment.status)} mr-3`}
    ></div>

    {/* Left: title + description */}
    <div className="flex flex-col gap-1 flex-1 min-w-0 max-w-xs">
      <span
        className="font-medium text-gray-200 break-words line-clamp-2"
        title={assignment.title}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
        }}
      >
        {assignment.title}
      </span>
      <span
        className="text-gray-400 hidden md:inline break-words line-clamp-1"
        title={assignment.description || "No description"}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
        }}
      >
        {assignment.description || "No description"}
      </span>
    </div>

    {/* Middle: Due date */}
    <div className="text-center mx-6 text-sm text-gray-400 whitespace-nowrap">
      Due {new Date(assignment.deadline).toLocaleDateString()}{" "}
      {new Date(assignment.deadline).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </div>

    {/* Right: Status */}
    <div className="ml-auto pl-4 text-gray-300 whitespace-nowrap">
      {assignment.status}
    </div>
  </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-400">No projects found</div>
      )}
    </div>
  </CardContent>
</Card>
    </div>
  )
}

