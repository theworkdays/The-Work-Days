"use client"

import { 
  AlertCircle,
  Calendar,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Wallet} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data - replace with actual data fetching
const projectData = {
  id: "1",
  title: "E-commerce Platform Development",
  subject: "Web Development",
  complexity: "Advanced",
  deadline: "2024-04-15",
  time: "23:59",
  description: "Develop a full-stack e-commerce platform using React and Node.js. The platform should include user authentication, product management, shopping cart functionality, and payment integration.",
  status: "In Progress",
  progress: 65,
  files: [
    { name: "Project Requirements.pdf", size: "2.5 MB", type: "PDF" },
    { name: "Design Mockups.zip", size: "15 MB", type: "ZIP" },
  ],
  createdAt: "2024-03-01T10:00:00Z",
  lastUpdated: "2024-03-15T15:30:00Z",
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-yellow-500/10 text-yellow-500"
      case "Completed": return "bg-green-500/10 text-green-500"
      case "Pending Review": return "bg-blue-500/10 text-blue-500"
      default: return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-300"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-100">{projectData.title}</h1>
            <p className="text-gray-400">Project Details</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-100">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getStatusColor(projectData.status)}>
                  {projectData.status}
                </Badge>
                <div className="text-sm text-gray-400">
                  Created on {new Date(projectData.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Subject</div>
                    <div className="text-gray-100">{projectData.subject}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-400">Complexity</div>
                    <div className="text-gray-100">{projectData.complexity}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="text-gray-100">{projectData.deadline}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div className="text-gray-100">{projectData.time}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Description</div>
                  <p className="text-gray-100">{projectData.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Attached Files</div>
                  <div className="space-y-2">
                    {projectData.files.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <div className="text-sm text-gray-100">{file.name}</div>
                            <div className="text-xs text-gray-400">{file.size}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Completion</span>
                    <span className="text-gray-100">{projectData.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${projectData.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-100">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/projects/${params.id}/discussions`}>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 justify-start"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discussions
                  </Button>
                </Link>
                <Link href={`/projects/${params.id}/billing`}>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 justify-start"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Billing
                  </Button>
                </Link>
                <Link href={`/projects/${params.id}/downloads`}>
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 text-gray-300 justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Downloads
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <h4 className="font-medium text-yellow-500">Deadline Approaching</h4>
                    <p className="text-sm text-yellow-500/80 mt-1">
                      This project is due in 3 days. Make sure to submit on time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}