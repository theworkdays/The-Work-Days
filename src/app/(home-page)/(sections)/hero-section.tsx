import { CheckCircle, ShieldCheck, Star } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import CodeSnippet from "../(code-snippet)/code-snippet"

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-[#4A6FDC]">Your Trusted Partner</span> for
              <br />
              <span className="text-gray-100">Technical Assignments</span>
            </h1>
            <p className="text-gray-400 text-lg">
              We help students excel in their technical courses with professional assistance in programming, data
              analysis, and web development assignments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
              </Link>
              <Link href="#how">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                How It Works
              </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-2">
              <FeatureItem text="100% Plagiarism Free" icon={<ShieldCheck className="h-5 w-5 text-green-500" />} />
              <FeatureItem text="On-time Delivery" icon={<CheckCircle className="h-5 w-5 text-blue-500" />} />
              <FeatureItem text="24/7 Support" icon={<Star className="h-5 w-5 text-yellow-500" />} />
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#262626] border border-gray-800 rounded-lg p-6 shadow-xl transform transition-all duration-500 hover:shadow-blue-900/20 hover:shadow-lg rotate-2">
              <div className="flex items-center gap-2 mb-4">
              </div>
              <div className="absolute -left-4 -top-8 w-60 h-60 bg-blue-500/30 rounded-full blur-xl blink -z-10"></div>
              <CodeSnippet />
              <div className="absolute right-0 w-45 h-45 bottom-0 bg-orange-500/30 rounded-full blur-xl blink-2 -z-10"></div>
              <div className="mt-4 bg-gray-800 p-3 rounded-md z-10">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-300">
                    "Got an A+ on my Python project. Couldn't be happier!"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FeatureItemProps {
  text: string
  icon: React.ReactNode
}

function FeatureItem({ text, icon }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-gray-300">{text}</span>
    </div>
  )
}
