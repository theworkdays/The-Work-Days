import { Calendar, Code, Eye, Shield, User, Zap } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="bg-[#262626] text-white py-16 px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16" id="about">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About The Workdays</h2>
        <p className="text-zinc-300">
          We're on a mission to help students excel in their technical coursework by providing high-quality assignment
          assistance.
        </p>
      </div>

      {/* Mission, Vision, Values Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Our Mission */}
        <div className="bg-[#171717] rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-900/20">
          <div className="bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Our Mission</h3>
          <p className="text-zinc-300">
            To empower students to succeed in their technical education by providing high-quality assignment assistance
            that enhances understanding and builds confidence.
          </p>
        </div>

        {/* Our Vision */}
        <div className="bg-[#171717] rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-900/20">
          <div className="bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Eye className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Our Vision</h3>
          <p className="text-zinc-300">
            To be the leading global platform for technical education support, recognized for quality, integrity, and
            innovative approaches that transform how students learn and overcome academic challenges.
          </p>
        </div>

        {/* Our Values */}
        <div className="bg-[#171717] rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-900/20">
          <div className="bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Our Values</h3>
          <ul className="text-zinc-300 space-y-2">
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span> Quality-focused excellence
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span> Integrity and transparency
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span> Student-centered approach
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span> Innovation and continuous improvement
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span> Confidentiality and respect
            </li>
          </ul>
        </div>
      </div>

      {/* What Makes Us Different Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">What Makes Us Different</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Expert Team */}
          <div className="bg-[#171717] rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-900/20">
            <div className="bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Expert Team</h3>
            <p className="text-zinc-300">
              Our team consists of verified professionals with advanced degrees and practical experience in their
              respective technical fields.
            </p>
          </div>

          {/* Timely Delivery */}
          <div className="bg-[#171717] rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-900/20">
            <div className="bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Timely Delivery</h3>
            <p className="text-zinc-300">
              We understand that deadlines are crucial. Our streamlined process ensures that you receive your solution
              with time to review and ask questions.
            </p>
          </div>

          {/* Quality Guarantee */}
          <div className="bg-[#171717] rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-900/20">
            <div className="bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Quality Guarantee</h3>
            <p className="text-zinc-300">
              Every solution undergoes a rigorous quality check to ensure it meets academic standards and your specific
              requirements.
            </p>
          </div>

          {/* Personalized Service */}
          <div className="bg-[#171717] rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-amber-900/20">
            <div className="bg-amber-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Personalized Service</h3>
            <p className="text-zinc-300">
              We don't use a one-size-fits-all approach. Each assignment is handled according to your specific
              instructions and academic level.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

