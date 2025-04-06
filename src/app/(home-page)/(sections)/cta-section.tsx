import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#1e293b] to-[#7b3f00] rounded-xl px-6 py-8 md:px-12 md:py-10 shadow-md">
          <div className="text-white">
            <h2 className="text-xl md:text-2xl font-semibold mb-1">Ready to Get Started?</h2>
            <p className="text-sm text-white/80">Upload your assignment and get a free quote within hours.</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
            Upload Assignment
          </Button>
        </div>
      </div>
    </section>
  )
}
