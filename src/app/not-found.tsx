"use client"

import { FileQuestion } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <FileQuestion className="mx-auto h-24 w-24 text-gray-400" />
        <h1 className="mt-6 text-4xl font-bold text-gray-100">Page Not Found</h1>
        <p className="mt-3 text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}