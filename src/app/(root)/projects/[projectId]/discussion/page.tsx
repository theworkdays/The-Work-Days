"use client"

import { Search, Send } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useDebounce } from "@/hooks/use-debounce"
import { Assignment } from "@/services/assignment.service"
import { Discussion } from "@/services/assignments/getdoubts"


export default function DiscussionsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  console.log("Project ID:", projectId)
  const [searchTerm, setSearchTerm] = useState("")
  const [newQuestionTitle, setNewQuestionTitle] = useState("")
  const [newQuestionContent, setNewQuestionContent] = useState("")
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const debouncedSearch = useDebounce(searchTerm, 500)

  // Fetch doubts using server action
  const fetchDoubts = async () => {
    try {
      setLoading(true)
      const response = await Assignment.getdoubts(projectId)

      if (response.error) {
        setError(response.error)
        return
      }

      // Log the response to debug
      console.log("API Response:", response)


      setDiscussions(response.data!)
    } catch (err) {
      setError("Failed to fetch doubts. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch doubts on component mount
  useEffect(() => {
    if (projectId) {
      fetchDoubts()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle asking a new doubt
  const handleAskQuestion = async () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) {
      alert("Please enter both a title and description for your question.")
      return
    }

    try {
      const response = await Assignment.askdoubts(newQuestionTitle, newQuestionContent, projectId)

      if (response) {
        console.log("Question posted successfully:", response)
        // Refresh the doubts list
        await fetchDoubts()
        // Clear the input fields
        setNewQuestionTitle("")
        setNewQuestionContent("")
      } else {
        setError("Failed to post the question. Please try again.")
      }
    } catch (err) {
      setError("Failed to post the question. Please try again.")
      console.error(err)
    }
  }

  // Filter discussions based on search term
  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      discussion.description.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  // Show loading state while data is being fetched
  if (loading) {
    return <div className="p-6 text-gray-100">Loading...</div>
  }

  // Show error state if data fetching fails
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Project Discussions</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search discussions..."
            className="pl-8 bg-gray-800 border-gray-700 text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Question title"
              className="bg-gray-800 border-gray-700 text-gray-100"
              value={newQuestionTitle}
              onChange={(e) => setNewQuestionTitle(e.target.value)}
            />
            <Textarea
              placeholder="Describe your question in detail..."
              className="bg-gray-800 border-gray-700 text-gray-100"
              value={newQuestionContent}
              onChange={(e) => setNewQuestionContent(e.target.value)}
            />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAskQuestion}>
              <Send className="h-4 w-4 mr-2" />
              Post Question
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map((discussion,index) => (
            <Card key={index+1} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-100">{discussion.title}</h3>
                    <p className="mt-1 text-sm text-gray-400">{discussion.description}</p>
                    {discussion.answer && discussion.answer.length > 0 && (
                      <div className="mt-3 p-3 bg-gray-800 rounded-md">
                        <h4 className="text-sm font-medium text-gray-300 mb-1">Answers:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {discussion.answer.map((ans, index) => (
                            <li key={index} className="text-sm text-gray-400">
                              {ans}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">No discussions found for the selected filter.</div>
        )}
      </div>
    </div>
  )
}

