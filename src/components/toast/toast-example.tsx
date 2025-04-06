"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import { useToast } from "./toast-context"

export function ToastExample() {
  const { success, error, info, warning, loading, dismiss, promise } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSuccess = () => {
    success({
      title: "Success!",
      description: "Your action was completed successfully.",
    })
  }

  const handleError = () => {
    error({
      title: "Error!",
      description: "There was a problem with your request.",
    })
  }

  const handleInfo = () => {
    info({
      title: "Information",
      description: "This is some useful information for you.",
    })
  }

  const handleWarning = () => {
    warning({
      title: "Warning",
      description: "This action might have consequences.",
    })
  }

  const handleLoading = () => {
    const id = loading({
      title: "Loading...",
      description: "Please wait while we process your request.",
    })

    // Simulate a long operation
    setTimeout(() => {
      dismiss(id)
      success({
        title: "Completed!",
        description: "Your request has been processed.",
      })
    }, 3000)
  }

  const handlePromise = async () => {
    setIsLoading(true)

    try {
      await promise(
        // This simulates an API call that might succeed or fail
        new Promise((resolve, reject) => {
          setTimeout(() => {
            // Randomly succeed or fail
            if (Math.random() > 0.5) {
              resolve("Success data")
            } else {
              reject(new Error("Something went wrong with the API call"))
            }
          }, 2000)
        }),
        {
          loading: {
            title: "Processing",
            description: "Your request is being processed...",
          },
          success: {
            title: "Success",
            description: "Your request was processed successfully!",
          },
          error: {
            title: "Error",
            description: "There was a problem processing your request.",
          },
        },
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={handleSuccess} variant="default">
        Show Success Toast
      </Button>
      <Button onClick={handleError} variant="destructive">
        Show Error Toast
      </Button>
      <Button onClick={handleInfo} variant="outline">
        Show Info Toast
      </Button>
      <Button onClick={handleWarning} variant="secondary">
        Show Warning Toast
      </Button>
      <Button onClick={handleLoading} variant="outline">
        Show Loading Toast
      </Button>
      <Button onClick={handlePromise} disabled={isLoading}>
        {isLoading ? "Processing..." : "Test Promise Toast"}
      </Button>
    </div>
  )
}

