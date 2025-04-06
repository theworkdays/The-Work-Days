interface StatCardProps {
    value: string
    label: string
  }
  
  const StatCard = ({ value, label }: StatCardProps) => {
    return (
      <div className="flex flex-col justify-center items-center text-center transform transition-all duration-300 hover:scale-105 bg-zinc-800 rounded-md shadow-2xl h-32 ">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="text-gray-400">{label}</div>
      </div>
    )
  }
  
  export default function StatsSection() {
    return (
      <section className="py-16 bg-[#1d1d1d]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="2,500+" label="Projects Completed" />
            <StatCard value="98%" label="Success Rate" />
            <StatCard value="4.9/5" label="Average Rating" />
            <StatCard value="100%" label="Satisfaction Guarantee" />
          </div>
        </div>
      </section>
    )
  }
  
  