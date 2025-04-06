"use client"

import type React from "react"
import { createContext, useCallback, useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { Toast, ToastType } from "./toast"


export type ToastOptions = {
  title: string
  description?: string
  duration?: number
}

type ToastData = {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  toasts: ToastData[]
  success: (options: ToastOptions) => string
  error: (options: ToastOptions) => string
  info: (options: ToastOptions) => string
  warning: (options: ToastOptions) => string
  loading: (options: ToastOptions) => string
  dismiss: (id: string) => void
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: ToastOptions
      success: ToastOptions
      error: ToastOptions
    },
  ) => Promise<T>
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const createToast = useCallback((type: ToastType, options: ToastOptions) => {
    const id = uuidv4()
    const toast = {
      id,
      type,
      title: options.title,
      description: options.description,
      duration: options.duration,
    }

    setToasts((prev) => [...prev, toast])
    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const success = useCallback((options: ToastOptions) => createToast("success", options), [createToast])

  const error = useCallback((options: ToastOptions) => createToast("error", options), [createToast])

  const info = useCallback((options: ToastOptions) => createToast("info", options), [createToast])

  const warning = useCallback((options: ToastOptions) => createToast("warning", options), [createToast])

  const loading = useCallback((options: ToastOptions) => createToast("loading", options), [createToast])

  const promise = useCallback(
    async <T,>(
      promise: Promise<T>,
      options: {
        loading: ToastOptions
        success: ToastOptions
        error: ToastOptions
      },
    ): Promise<T> => {
      const toastId = loading(options.loading)

      try {
        const result = await promise
        dismiss(toastId)
        success(options.success)
        return result
      } catch (err) {
        dismiss(toastId)
        error({
          ...options.error,
          description: options.error.description || (err instanceof Error ? err.message : String(err)),
        })
        throw err
      }
    },
    [loading, success, error, dismiss],
  )

  return (
    <ToastContext.Provider
      value={{
        toasts,
        success,
        error,
        info,
        warning,
        loading,
        dismiss,
        promise,
      }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

function ToastContainer() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          onClose={dismiss}
        />
      ))}
    </div>
  )
}

