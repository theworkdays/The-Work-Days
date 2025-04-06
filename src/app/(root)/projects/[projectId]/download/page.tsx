"use client"
import { Download, ExternalLink, FileText, Search } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { useToast } from "@/components/toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import { Assignment } from "@/services/assignment.service"

type ProjectData = {
  projectId: string
  projectTitle: string
  description: string
  subject: string
  deadline: string
  attachments: string
  user: string
  status: string
  "project-status": number
  projectprogress: number
  downloadlink: string[]
  Price: number
  ispaid: boolean
  $id: string
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
  $databaseId: string
  $collectionId: string
}



export default function DownloadsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const  toast  = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const [initialLoad, setInitialLoad] = useState(true)
  const debouncedSearch = useDebounce(searchTerm, 500)
  const [awId, setAwId] = useState<string>("")

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setInitialLoad(true)
        const result = await Assignment.download(projectId)

        if (result.error) {
          throw new Error(result.error)
        }

        if (result.data) {
          console.log("Downloads data:", result.data)
          setAwId(result.data.awId)
          setProjectData(result.data!.downloadLink as unknown as ProjectData)
        }
      } catch (error) {
        console.error("Failed to fetch downloads:", error)
        toast.error({
          title: "Error",
          description: "Failed to fetch downloads. Please try again later.",
         
        })
      } finally {
        setInitialLoad(false)
      }
    }

    if (projectId) {
      fetchDownloads()
    }
  }, [projectId, toast])

  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      setLoading((prev) => ({ ...prev, [fileId]: true }))
      console.log("Downloading file:", fileId)
      console.log("File name:", fileName)

      if (!awId) {
        throw new Error("Project ID not available")
      }

      // Create Appwrite download URL
      const downloadUrl = `https://cloud.appwrite.io/v1/storage/buckets/projectDownloads/files/${fileId}/download?project=${awId}`

      // Open the download URL in a new tab
      window.open(downloadUrl, "_blank")

      toast.info({
        title: "Download started",
        description: "The file is being downloaded.",
      })
    } catch (error) {
      console.error("Download failed:", error)
      toast.error({
        title: "Download failed",
        description: "Unable to download the file. Please try again.",
  
      })
    } finally {
      setLoading((prev) => ({ ...prev, [fileId]: false }))
    }
  }

  const handleView = async (fileId: string) => {
    try {
      if (!awId) {
        throw new Error("Project ID not available")
      }

      // Create Appwrite view URL
      const viewUrl = `https://cloud.appwrite.io/v1/storage/buckets/projectDownloads/files/${fileId}/view?project=${awId}`

      // Open the view URL in a new tab
      window.open(viewUrl, "_blank")

      toast.info({
        title: "Preview started",
        description: "The file is being previewed.",
      })
    } catch (error) {
      console.error("Preview failed:", error)
      toast.error({
        title: "Preview failed",
        description: "Unable to preview the file. Please try again.",
      })
    }
  }

  // Filter download links based on search term (if needed)
  const filteredDownloadLinks =
    projectData?.downloadlink?.filter((link) => link.toLowerCase().includes(debouncedSearch.toLowerCase())) || []

  if (initialLoad) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Project Downloads</h1>
        {(projectData?.downloadlink?.length || 0) > 1 && (
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files..."
              className="pl-8 bg-gray-800 border-gray-700 text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      {!projectData || !projectData.downloadlink || projectData.downloadlink.length === 0 ? (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center text-gray-400">No downloads available for this project</CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Downloads for {projectData.projectTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-gray-100">{projectData.projectTitle}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{projectData.subject}</span>
                      <span>•</span>
                      <span>Price: ${projectData.Price}</span>
                      <span>•</span>
                      <span>Deadline: {new Date(projectData.deadline).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Status: {projectData.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display all download links */}
              <div className="pl-12 space-y-2">
                {debouncedSearch && filteredDownloadLinks.length === 0 ? (
                  <div className="text-gray-400 text-sm">No files match your search</div>
                ) : (
                  (debouncedSearch ? filteredDownloadLinks : projectData.downloadlink).map((link, index) => (
                    <div
                      key={`download-${index}`}
                      className="flex items-center justify-between bg-gray-700 p-2 rounded"
                    >
                      <span className="text-gray-300 text-sm">Attachment {index + 1}</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 h-8"
                          onClick={() => handleDownload(link, `${projectData.projectTitle}-file${index + 1}`)}
                          disabled={loading[link]}
                        >
                          {loading[link] ? (
                            <span className="h-3 w-3 mr-1 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></span>
                          ) : (
                            <Download className="h-3 w-3 mr-1" />
                          )}
                          <span>Download</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 h-8"
                          onClick={() => handleView(link)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          <span>View</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

