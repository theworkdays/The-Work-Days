import { BadgeIndianRupee, Code, Download, type LucideIcon,Upload } from "lucide-react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  isOrange?: boolean;
  icon: LucideIcon;
}

const StepCard = ({ number, title, description, isOrange = false, icon: Icon }: StepCardProps) => {
  return (
    <div className="bg-[#171717] p-8 rounded-lg text-center relative transition-all duration-300 hover:shadow-md hover:shadow-blue-900/20 transform hover:-translate-y-2 group">
      <div
        className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all ${
          isOrange ? "bg-orange-500 group-hover:bg-orange-400" : "bg-blue-600 group-hover:bg-blue-300"
        }`}
      >
        {number}
      </div>
      <h3 className="text-xl font-semibold mt-4 mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
      <Icon className="mx-auto text-blue-400 w-[20%] h-[20%] mt-4" />
    </div>
  );
};

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-[#262626]" id="how">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">How It Works</h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Our simple process ensures you get the help you need quickly and efficiently.
        </p>

        <div className="relative">
          {/* Line connecting steps */}
          <div className="absolute top-[2.25rem] md:top-1/2 left-0 w-full h-1 bg-gray-700 hidden md:block" />

          <div className="grid md:grid-cols-4 gap-8 relative">
            <StepCard
              number={1}
              title="Submit Your Requirements"
              description="Fill out our simple form with your assignment details and upload any relevant files."
              icon={Upload}
            />
            <StepCard
              number={2}
              title="Get a Free Quote"
              description="Our experts will review your requirements and provide you with a competitive price quote."
              isOrange
              icon={BadgeIndianRupee}
            />
            <StepCard
              number={3}
              title="Your Work Begins"
              description="Once payment is confirmed, our expert developers will start developing your solution."
              icon={Code}
            />
            <StepCard
              number={4}
              title="Receive Your Solution"
              description="Your solution will be available for download."
              isOrange
              icon={Download}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
