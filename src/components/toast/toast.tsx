"use client"

import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "info" | "warning" | "loading"

interface ToastProps {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, title, description, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (type === "loading") return // Don't auto-dismiss loading toasts

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // Allow time for exit animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, id, onClose, type])

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    loading: <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />,
  }

  const bgColors = {
    success: "bg-emerald-500/10 border-emerald-500/20",
    error: "bg-red-500/10 border-red-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
    warning: "bg-amber-500/10 border-amber-500/20",
    loading: "bg-blue-500/10 border-blue-500/20",
  }

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full max-w-md items-center justify-between overflow-hidden rounded-lg border p-4 shadow-lg transition-all",
        bgColors[type],
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">{icons[type]}</div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-100">{title}</h3>
          {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onClose(id), 300)
        }}
        className="ml-4 shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-gray-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

