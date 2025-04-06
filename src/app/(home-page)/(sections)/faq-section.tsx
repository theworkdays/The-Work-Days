interface FAQCardProps {
    question: string
    answer: string
  }
  
  const FAQCard = ({ question, answer }: FAQCardProps) => {
    return (
      <div className="bg-[#262626] p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-blue-900/20 hover:transform hover:-translate-y-2">
        <h3 className="text-xl font-semibold mb-3">{question}</h3>
        <p className="text-gray-400">{answer}</p>
      </div>
    )
  }
  
  export default function FAQSection() {
    return (
      <section className="py-16 md:py-24 bg-[#171717]" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
            Find answers to common questions about our services
          </p>
  
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FAQCard
              question="How do you ensure plagiarism-free work?"
              answer="All our solutions are written from scratch by our experts. We also use plagiarism detection tools to ensure originality before delivery."
            />
            <FAQCard
              question="What if I'm not satisfied with the solution?"
              answer="We offer unlimited revisions until you're completely satisfied with the solution. Your satisfaction is our top priority."
            />
            <FAQCard
              question="How do you handle tight deadlines?"
              answer="Our experts are trained to work efficiently under pressure. We can deliver high-quality solutions even with tight deadlines, sometimes as short as 4-6 hours."
            />
            <FAQCard
              question="Is my personal information secure?"
              answer="Absolutely. We have strict confidentiality policies in place. Your personal information is never shared with third parties."
            />
          </div>
        </div>
      </section>
    )
  }
  
  