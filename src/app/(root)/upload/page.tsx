"use client"
import { ArrowRight, FileText, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { useToast } from "@/components/toast/toast-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Assignment } from "@/services/assignment.service"

interface FormData {
  title: string
  subject: string
  deadline: string
  description: string
  phone: string
}

interface UploadResponse {
  error?: string
  data?:
    | {
        estimatedPrice: number
        id: string
      }
    | string
}

function isPriceEstimated(data: UploadResponse["data"]): data is { estimatedPrice: number; id: string } {
  return data !== undefined && typeof data !== "string" && "estimatedPrice" in data
}

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { success, error } = useToast()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-400" />
      case "doc":
      case "docx":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "zip":
      case "rar":
        return <FileText className="h-4 w-4 text-yellow-400" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i])
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = (await Assignment.upload(
        files[0],
        data.title,
        data.description,
        data.subject,
        new Date(data.deadline),
        data.phone,
      )) as UploadResponse

      if (response.error) {
        error({
          title: "Error submitting assignment",
          description: response.error || "There was a problem submitting your assignment. Please try again.",
        })
        return
      }

      if (!response.data) {
        error({
          title: "Error submitting assignment",
          description: "No data received from server",
        })
        return
      }

      if (isPriceEstimated(response.data)) {
        success({
          title: "Assignment submitted successfully!",
          description: `We've estimated your price at $${response.data.estimatedPrice}`,
        })
        console.log("Redirecting to:", `/project/${response.data.id}/billing`)
        // use window to redirect to the billing page
        if (typeof window !== "undefined") {
          window.location.href = `/projects/${response.data.id}/billing`
        } else {
          router.push(`/projects/${response.data.id}/billing`)
        }
      } else {
        success({
          title: "Assignment submitted successfully!",
          description: response.data || "We'll review your details and get back to you with a quote soon.",
        })
      }

      reset()
      setFiles([])
    } catch (err) {
      error({
        title: "Error submitting assignment",
        description: "There was a problem submitting your assignment. Please try again.",
      })
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="overflow-y-auto bg-gray-950 text-gray-100">
      <div className="container py-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
                Upload Your Assignment
              </span>
            </h1>
            <p className="text-gray-400">Get started with your project by uploading your assignment details</p>
          </div>

          <Card className="border-gray-800 bg-gray-900 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-100">Project Details</CardTitle>
              <CardDescription className="text-gray-400">Provide information about your assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="upload-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-title" className="text-gray-300">
                    Project Title
                  </Label>
                  <Input
                    id="project-title"
                    placeholder="e.g., Java Programming Assignment"
                    className="bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    {...register("title", { required: "Project title is required" })}
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2 md:col-span-3">
                    <Label htmlFor="subject" className="text-gray-300">
                      Subject
                    </Label>
                    <Controller
                      name="subject"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Subject is required" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100 w-full">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                            <SelectItem value="programming">Programming</SelectItem>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="data-analysis">Data Analysis</SelectItem>
                            <SelectItem value="database">Database Design</SelectItem>
                            <SelectItem value="mobile">Mobile Development</SelectItem>
                            <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="deadline" className="text-gray-300">
                      Deadline
                    </Label>
                    <Input
                      id="deadline"
                      type="date"
                      className="bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 w-full"
                      {...register("deadline", { required: "Deadline is required" })}
                    />
                    {errors.deadline && <p className="text-sm text-red-500 mt-1">{errors.deadline.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Contact Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g., +1 (555) 123-4567"
                    className="bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    {...register("phone", {
                      pattern: {
                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description" className="text-gray-300">
                    Project Description
                  </Label>
                  <Textarea
                    id="project-description"
                    placeholder="Describe your assignment requirements in detail..."
                    className="min-h-[120px] bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500"
                    {...register("description", {
                      required: "Project description is required",
                      minLength: { value: 20, message: "Description should be at least 20 characters" },
                    })}
                  />
                  {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="text-gray-300">
                    Upload Files
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-800 border-gray-700 transition-colors duration-200"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-blue-500" />
                        <p className="mb-2 text-sm text-gray-300">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">PDF, DOCX, ZIP, RAR (MAX. 50MB)</p>
                      </div>
                      <Input id="file-upload" type="file" className="hidden" multiple onChange={handleFileChange} />
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <Label className="text-gray-300">Uploaded Files</Label>
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-md bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              {getFileIcon(file.name)}
                              <div className="overflow-hidden">
                                <p className="text-sm truncate max-w-[200px] text-gray-300">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-gray-700"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="submit"
                form="upload-form"
                className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    Get Quote <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
