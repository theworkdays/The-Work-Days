"use client"

import { AlertCircle } from "lucide-react"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="mt-6 text-4xl font-bold text-gray-100">Something went wrong!</h1>
        <p className="mt-3 text-gray-400">
          An error occurred while processing your request.
        </p>
        <div className="mt-6 space-x-4">
          <Button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/dashboard'}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}