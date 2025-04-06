interface TestimonialCardProps {
  content: string
  name: string
  role: string
  initial: string
  isOrange?: boolean
}

const TestimonialCard = ({ content, name, role, initial, isOrange = false }: TestimonialCardProps) => {
  return (
    <div className="relative bg-[#262626] border border-gray-800 p-8 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-blue-900/20 transform hover:-translate-y-1">
      {/* Quote Icon in Circular Background */}
      <div className="absolute -top-5 -left-5 w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full text-white text-4xl">
        ❝
      </div>

      {/* Italicized Testimonial Text */}
      <p className="text-gray-300 mb-6 italic mt-6">{content}</p>

      <div className="flex items-center">
        {/* User Initials in Circular Background */}
        <div
          className={`w-10 h-10 rounded-full ${isOrange ? "bg-orange-500" : "bg-blue-500"} flex items-center justify-center text-white font-bold`}
        >
          {initial}
        </div>
        <div className="ml-3">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex mb-4 mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#171717]" id="testimonials">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">What Our Students Say</h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Don't just take our word for it - hear from some of our satisfied students
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            content="The Workdays helped me with a complex Python project that I was struggling with. Their solution was not only correct but also well-documented, which helped me understand the concepts better. I got an A+ and learned a lot!"
            name="Alex Reynolds"
            role="Computer Science Student"
            initial="AR"
          />
          <TestimonialCard
            content="I had a tight deadline for my web development project, and TheWorkdays delivered a perfect solution ahead of schedule. The code was clean, well-documented, and exactly what I needed."
            name="Michael Brown"
            role="Web Development Student"
            initial="M"
            isOrange
          />
          <TestimonialCard
            content="The data analysis project I received was exceptional. The expert not only completed the assignment but also provided detailed explanations that helped me understand the concepts better."
            name="Sarah Johnson"
            role="Data Science Student"
            initial="S"
          />
        </div>
      </div>
    </section>
  )
}
