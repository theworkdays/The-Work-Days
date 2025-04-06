import { 
  BarChart3, 
  Brain, 
  CheckCircle, 
  Code, 
  Database, 
  MonitorSmartphone} from "lucide-react";
import type React from "react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}

const ServiceCard = ({ icon, title, description, points }: ServiceCardProps) => {
  return (
    <div className="bg-[#262626] p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-blue-900/20 transform hover:-translate-y-1 hover:bg-[#333]">
      <div className="mb-4 flex justify-center">
        <div className="bg-gray-700 p-4 rounded-full transition-all duration-300 group-hover:bg-blue-100">
          <span className="text-white transition-colors duration-300 group-hover:text-gray-300">
            {icon}
          </span>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white text-center mb-2">{title}</h3>
      <p className="text-gray-400 text-center mb-4">{description}</p>
      <ul className="text-gray-300 text-sm space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500 transition-colors duration-300 group-hover:text-green-400" />
            <span className="transition-colors duration-300 group-hover:text-gray-200">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#171717]" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Our Technical Services
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          We offer professional assistance in various technical domains to help students excel in their academic journey.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Code className="h-12 w-12 text-blue-500" />}
            title="Programming Assignments"
            description="Expert help with assignments in Python, Java, C++, JavaScript, and other popular programming languages."
            points={[
              "Algorithm Implementation",
              "Data Structures",
              "Software Engineering Projects",
            ]}
          />
          <ServiceCard
            icon={<MonitorSmartphone className="h-12 w-12 text-orange-500" />}
            title="Web Development"
            description="Professional assistance with HTML, CSS, JavaScript, React, Node.js, and full-stack projects."
            points={[
              "Responsive Designs",
              "Interactive Web Applications",
              "Frontend & Backend Integration",
            ]}
          />
          <ServiceCard
            icon={<BarChart3 className="h-12 w-12 text-blue-500" />}
            title="Data Analysis"
            description="Expert assistance with statistical analysis, data visualization, and machine learning projects."
            points={[
              "Statistical Computing (R, Python)",
              "Machine Learning Models",
              "Data Visualization",
            ]}
          />
          <ServiceCard
            icon={<Database className="h-12 w-12 text-orange-500" />}
            title="Database Management"
            description="Professional assistance with SQL, NoSQL, database design, and query optimization."
            points={[
              "SQL Database Design",
              "Complex Query Writing",
              "NoSQL Database Implementation",
            ]}
          />
          <ServiceCard
            icon={<Brain className="h-12 w-12 text-blue-500" />}
            title="AI & Machine Learning"
            description="Expert help with artificial intelligence, machine learning algorithms, and deep learning projects."
            points={[
              "Neural Networks",
              "Natural Language Processing",
              "Computer Vision",
            ]}
          />
          <ServiceCard
            icon={<MonitorSmartphone className="h-12 w-12 text-orange-500" />}
            title="Mobile App Development"
            description="Professional assistance with Android, iOS, React Native, and Flutter application development."
            points={[
              "Cross-platform Apps",
              "UI/UX Implementation",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
