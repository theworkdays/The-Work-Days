import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

function Loading() {
  return (
<div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <LoaderCircle className="mx-auto h-24 w-24 text-gray-400 animate-spin " />
        <h1 className="mt-6 text-4xl font-bold text-gray-100">
          Loading 

        </h1>
        <p className="mt-3 text-gray-400">
          We are getting your request page and will be ready in a moment.
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

export default Loading