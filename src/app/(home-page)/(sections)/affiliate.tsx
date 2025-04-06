import { BarChart3, Copy, CreditCard, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AffiliateProgram() {
  return (
    <div className="min-h-screen bg-[#262626] text-white" id="affiliate">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Affiliate Program</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Earn rewards by referring your friends and classmates to The Workdays. It's a win-win!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-xl overflow-hidden">
          {/* Left Side - Referral Card */}
          <div className="p-8 relative bg-[url('/placeholder.svg?height=500&width=600')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 flex flex-col h-full justify-center">
              {/* Referral Bonus Card */}
              <div className="border border-dashed border-blue-500 rounded-lg p-6 bg-zinc-900/90 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Referral Bonus</h3>
                    <p className="text-sm text-gray-400">Share and earn rewards</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">25%</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">Your Referral Code:</p>
                  <div className="font-mono text-lg font-bold">STUDENT25</div>
                </div>

                <div className="flex items-center bg-zinc-800 rounded p-2">
                  <input
                    type="text"
                    value="https://theworkdays.com/ref"
                    readOnly
                    className="bg-transparent flex-1 text-sm outline-none"
                  />
                  <button className="p-1 text-blue-400 hover:text-blue-300">
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-zinc-900/90 rounded-lg p-4">
                <h3 className="text-center mb-4 font-medium">Your Affiliate Stats</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-zinc-800 p-3 rounded">
                    <div className="text-xl font-bold text-blue-400">0</div>
                    <div className="text-xs text-gray-400">Referrals</div>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded">
                    <div className="text-xl font-bold text-blue-400">$0</div>
                    <div className="text-xs text-gray-400">Earnings</div>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded">
                    <div className="text-xl font-bold text-blue-400">$0</div>
                    <div className="text-xs text-gray-400">Paid</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - How it Works */}
          <div className="p-8 bg-zinc-900">
            <h2 className="text-2xl font-bold mb-8">How Our Affiliate Program Works</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Sign Up</h3>
                  <p className="text-gray-400 text-sm">
                    Register for our affiliate program to get your unique referral code. It's free and takes less than a
                    minute.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Share Your Code</h3>
                  <p className="text-gray-400 text-sm">
                    Share your referral link or code with friends, classmates, or on social media. Anyone who could
                    benefit from our services.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Earn Rewards</h3>
                  <p className="text-gray-400 text-sm">
                    Earn 25% commission when someone uses your code on their first order. Your friend also gets 15% off
                    their first order!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Paid</h3>
                  <p className="text-gray-400 text-sm">
                    Receive your earnings through PayPal, bank transfer, or apply them as credits toward your own
                    orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md">
                Join Affiliate Program
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-10">Benefits of Joining</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#171717] p-6 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-900/20">
              <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-green-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Generous Commission</h3>
              <p className="text-gray-400 text-sm">
                Earn 25% commission on each successful referral's first order, with potential for recurring commissions
              </p>
            </div>

            <div className="bg-[#171717] p-6 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="w-12 h-12 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-blue-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Easy Payments</h3>
              <p className="text-gray-400 text-sm">
                Get paid via PayPal, direct bank transfers, or use your earnings as credits for your own assignments
              </p>
            </div>

            <div className="bg-[#171717] p-6 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-900/20">
              <div className="w-12 h-12 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-purple-500" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3">Real-Time Tracking</h3>
              <p className="text-gray-400 text-sm">
                Monitor your referrals, conversions, and earnings in real-time through your personalized dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

