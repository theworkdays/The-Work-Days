"use client"

import { CreditCard, DollarSign, Download, Search } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useToast } from "@/components/toast/toast-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDebounce } from "@/hooks/use-debounce"
import { Assignment } from "@/services/assignment.service"
import { payment } from "@/services/payment.service"
import { Referal } from "@/services/Referal.service"

type doc = {
  $collectionId: string
  $createdAt: string
  $databaseId: string
  $id: string
  $permissions: string[]
  $updatedAt: string
  Price: number | null
  attachments: string[] | null
  deadline: string
  description: string
  downloadlink: string | null
  ispaid: boolean
  projectId: string
  projectTitle: string
  status: "under review" | "reviewed" | "cancelled" | "in progress" | "completed"
  subject: string
  user: string
}
type referal = {
  $collectionId: string
  $createdAt: string
  $databaseId: string
  $id: string
  $permissions: string[]
  $updatedAt: string
  Referbalance: number
  ReferalId: string
  peoplerefered: number
  user: string
  verified: boolean
}

export default function BillingPage() {
  const params = useParams()
  const [documents, setDocuments] = useState<doc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebounce(searchTerm, 500)

  // Payment dialog states
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<doc | null>(null)
  const [useReferralBalance, setUseReferralBalance] = useState(false)
  const [referralBalance, setReferralBalance] = useState(0)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const toast = useToast()
  const router = useRouter()

  // Handle PayPal redirect and capture payment
  const handleCapturePayment = async (orderID: string, projectId: string) => {
    try {
      const captureResponse = await payment.capturePaypalorder(orderID, projectId)
      if (captureResponse.error) {
        toast.warning({
          title: "Payment failed",
          description: captureResponse.error,
        })
        return false
      }

      if (captureResponse.status !== "COMPLETED") {
        toast.warning({
          title: "Payment failed",
          description: "Payment was not completed. Please try again.",
        })
        return false
      }

      // Update the document status if we have a selected project
      if (selectedProject) {
        const updatedDocuments = documents.map((doc) =>
          doc.$id === selectedProject.$id ? { ...doc, ispaid: true } : doc,
        )
        setDocuments(updatedDocuments)
      }

      toast.success({
        title: "Payment successful",
        description: "Your payment has been processed successfully.",
      })

      return true
    } catch (err) {
      console.error("Payment capture error:", err)
      toast.warning({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
      })
      return false
    }
  }

  useEffect(() => {
    const handlePayPalRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search)

      const orderID = urlParams.get("token")
      const projectId = params.projectId as string
      if (orderID && projectId) {
        const success = await handleCapturePayment(orderID, projectId)

        // Clean up URL parameters after processing
        if (window.history && window.history.replaceState) {
          const newUrl = window.location.pathname
          window.history.replaceState({}, document.title, newUrl)
        }

        // Refresh assignments after successful payment
        if (success) {
          fetchAssignments()
        }
      }
    }

    handlePayPalRedirect()
  },)

  const fetchAssignments = async () => {
    try {
      setLoading(true)
      const response = await Assignment.getassigenment(params.projectId as string)

      if (response.error) {
        setError(response.error)
        return
      }

      const filteredDocs = response.data!.filter((doc: doc) => doc.status !== "under review")
      setDocuments(filteredDocs)
    } catch (err) {
      setError("Failed to fetch assignments. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssignments()
  }, [])

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.projectTitle.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      doc.$id.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  const getStatusColor = (isPaid: boolean) => {
    return isPaid ? "text-green-500" : "text-yellow-500"
  }

  const totalAmount = documents.reduce((sum, doc) => sum + (doc.Price || 0), 0)
  const paidAmount = documents.filter((doc) => doc.ispaid).reduce((sum, doc) => sum + (doc.Price || 0), 0)
  const pendingAmount = documents.filter((doc) => !doc.ispaid).reduce((sum, doc) => sum + (doc.Price || 0), 0)

  const handleOpenPaymentDialog = async (doc: doc) => {
    try {
      const { data, error } = await Referal.getreferalid()

      if (error) {
        toast.warning({
          title: "Error fetching referral data",
          description: error,
        })
        return
      }

      const referal = data as referal
      console.log("Referal Data:", referal)
      setReferralBalance(referal?.Referbalance || 0)
      setSelectedProject(doc)
      setIsPaymentDialogOpen(true)
    } catch (err) {
      console.error("Error opening payment dialog:", err)
      toast.warning({
        title: "Error",
        description: "Failed to load payment information. Please try again.",
      })
    }
  }

  const handlePayment = async () => {
    if (!selectedProject) return

    setIsProcessingPayment(true)

    try {
      const response = await payment.createpaypalorder(calculateFinalAmount().toString())

      if (response.error) {
        toast.warning({
          title: "Payment failed",
          description: response.error,
        })
        setIsProcessingPayment(false)
        return
      }

      console.log("PayPal Order Response:", response.id)

      const approvalLink = response.links[1]?.href

      console.log("Approval Link:", approvalLink)
      if (!approvalLink) {
        toast.warning({
          title: "Payment failed",
          description: "Failed to retrieve payment approval link.",
        })
        setIsProcessingPayment(false)
        return
      }

      router.push(approvalLink) // Redirect to PayPal for payment approval
    } catch (err) {
      console.error("Payment creation error:", err)
      toast.warning({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
      })
      setIsProcessingPayment(false)
    }
  }

  const calculateFinalAmount = () => {
    if (!selectedProject) return 0

    let finalAmount = selectedProject.Price || 0

    if (useReferralBalance && referralBalance > 0) {
      // Calculate the maximum deductible amount (minimum between referral balance and $20)
      const maxDeductible = Math.min(referralBalance, 20)
      finalAmount = Math.max(0, finalAmount - maxDeductible)
    }

    return finalAmount
  }

  const getDeductibleAmount = () => {
    if (!selectedProject || !useReferralBalance) return 0

    const price = selectedProject.Price || 0
    // Calculate the maximum deductible amount (minimum between referral balance and $20)
    const maxDeductible = Math.min(referralBalance, 20)
    // Don't deduct more than the project price
    return Math.min(maxDeductible, price)
  }

  if (loading) {
    return <div className="p-6 text-gray-100">Loading...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">Billing & Invoices</h1>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search assignments..."
            className="pl-8 bg-gray-800 border-gray-700 text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-400">Total Amount</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-100">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-400">Paid Amount</p>
              <p className="text-xl sm:text-2xl font-bold text-green-500">${paidAmount.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-gray-400">Pending Amount</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-500">${pendingAmount.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <Card key={doc.$id} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left section: ID and Title */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-100 text-sm sm:text-base lg:text-lg break-all">
                      {doc.projectTitle}
                       
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 break-words max-w-xs">
                    id: {doc.$id}
                    </p>
                  </div>

                  {/* Right section: Price, Status, Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    <div className="text-right sm:text-left">
                      <p className="font-medium text-gray-100 text-sm sm:text-base lg:text-lg">
                        ${(doc.Price || 0).toFixed(2)}
                      </p>
                      <p className={`text-xs sm:text-sm ${getStatusColor(doc.ispaid)}`}>
                        {doc.ispaid ? "Paid" : "Pending"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end sm:justify-start">
                      {doc.downloadlink && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-700"
                          onClick={() => window.open(doc.downloadlink || "", "_blank")}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {!doc.ispaid && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                          onClick={() => handleOpenPaymentDialog(doc)}
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">No assignments found or reviewed yet.</div>
        )}
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-gray-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedProject && `Payment for: ${selectedProject.projectTitle}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <span className="font-bold">${selectedProject?.Price?.toFixed(2) || "0.00"}</span>
            </div>

            {referralBalance > 0 && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="useReferralBalance"
                  checked={useReferralBalance}
                  onCheckedChange={(checked) => setUseReferralBalance(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="useReferralBalance" className="text-sm font-medium leading-none">
                    Use referral balance (${Math.min(referralBalance, 20).toFixed(2)} available)
                  </Label>
                  <p className="text-sm text-gray-400">Maximum $20 can be deducted from your referral balance</p>
                </div>
              </div>
            )}

            {useReferralBalance && (
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Referral balance deduction:</span>
                <span className="text-yellow-500">-${getDeductibleAmount().toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-800">
              <span className="font-medium">Final Amount:</span>
              <span className="font-bold text-xl text-green-500">${calculateFinalAmount().toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)} className="border-gray-700">
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={isProcessingPayment} className="bg-green-600 hover:bg-green-700">
              {isProcessingPayment ? "Processing..." : "Complete Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

