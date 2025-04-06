"use client"

import { BarChart3, Clock, Download, FileCheck, FileClock, FileQuestion, MessageSquare, Wallet } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { useToast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Assignment } from "@/services/assignment.service"
import type { Assignments } from "@/services/assignments/getassignments"

export default function DashboardPage() {
  const [assignments, setAssignments] = useState<Assignments[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("in progress")
  const toast = useToast()

  // Fetch assignments data
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await Assignment.getassignments()

        if (response.error) {
          toast.error({
            title: "Error",
            description: response.error,
          })
          return
        }

        setAssignments(response.data!)
      } catch (err) {
        setError("Failed to fetch assignments. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssignments()
  }, [toast])

  // Get status icon based on assignment status
  const getStatusIcon = (status: Assignments["status"]) => {
    switch (status) {
      case "under review":
        return <FileQuestion className="h-5 w-5 text-purple-500" />
      case "reviewed":
        return <FileCheck className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <FileClock className="h-5 w-5 text-red-500" />
      case "in progress":
        return <FileClock className="h-5 w-5 text-blue-500" />
      case "completed":
        return <FileCheck className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  // Filter assignments based on current tab
  const filteredAssignments = assignments.filter((assignment) => activeTab === "all" || assignment.status === activeTab)

  // Calculate summary statistics
  const totalProjects = assignments.length
  const inProgressProjects = assignments.filter((a) => a.status === "in progress").length
  const underReviewProjects = assignments.filter((a) => a.status === "under review").length
  const reviewedProjects = assignments.filter((a) => a.status === "reviewed").length
  const cancelledProjects = assignments.filter((a) => a.status === "cancelled").length
  const completedProjects = assignments.filter((a) => a.status === "completed").length

  // Show loading state while data is being fetched
  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">Loading...</div>
  }

  // Show error state if data fetching fails
  if (error) {
    return <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">{error}</div>
  }

  const statusTabs = ["all", "under review", "reviewed", "in progress", "completed", "cancelled"]

  // Get shortened tab labels for mobile view

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Project Dashboard</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">New Project</Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total</CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Progress</CardTitle>
              <FileClock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressProjects}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Review</CardTitle>
              <FileQuestion className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{underReviewProjects}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Reviewed</CardTitle>
              <FileCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewedProjects}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Complete</CardTitle>
              <FileCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedProjects}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Cancel</CardTitle>
              <FileClock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cancelledProjects}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="overflow-x-auto pb-1">
              <TabsList className="bg-gray-800 border-gray-700 w-full min-w-max">
                {statusTabs.map((tab) => {
                  const label =
                    tab === "under review"
                      ? "Under Rev."
                      : tab === "in progress"
                        ? "Progress"
                        : tab.charAt(0).toUpperCase() + tab.slice(1)

                  return (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="data-[state=active]:bg-gray-700 capitalize text-xs sm:text-sm whitespace-nowrap px-3 py-1.5"
                    >
                      {label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </div>

            {statusTabs.map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="grid gap-4">
                  {filteredAssignments.length > 0 ? (
                    filteredAssignments.map((assignment) => (
                      <Card key={assignment.$id} className="bg-gray-900 border-gray-800">
                        <CardContent className="pt-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <div className="max-w-full overflow-hidden">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(assignment.status)}
                                <h3 className="text-lg font-semibold truncate">{assignment.projectTitle}</h3>
                              </div>
                              <p className="text-sm text-gray-400 mt-1 line-clamp-2 overflow-ellipsis">
                                {assignment.description}
                              </p>
                            </div>
                            <div className="flex space-x-2 mt-2 sm:mt-0 shrink-0">
                              <Link href={`/projects/${assignment.$id}/discussion`}>
                                <Button variant="outline" size="icon" className="border-gray-700">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/projects/${assignment.$id}/billing`}>
                                <Button variant="outline" size="icon" className="border-gray-700">
                                  <Wallet className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/projects/${assignment.$id}/download`}>
                                <Button variant="outline" size="icon" className="border-gray-700">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{assignment.projectprogress || 0}%</span>
                            </div>
                            <Progress value={assignment.projectprogress || 0} className="h-2" />
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
                              <span>{assignment.ispaid ? "Paid" : "Unpaid"}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      {tab === "all" ? "No projects found" : `No ${tab} projects found`}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

