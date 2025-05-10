import React from "react";
import { UserPlus, Lightbulb as LightbulbDollar, Rocket, BarChart2 } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { steps } from "../../data";

const iconMap: Record<string, React.ReactNode> = {
  UserPlus: <UserPlus size={24} />,
  LightbulbDollar: <LightbulbDollar size={24} />,
  Rocket: <Rocket size={24} />,
  LineChart: <BarChart2 size={24} />
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="Our streamlined process makes it easy to get started and achieve your digital goals."
          centered
        />
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-[calc(50%-1px)] h-[calc(100%-120px)] w-0.5 bg-gray-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`relative ${
                  index % 2 === 0 
                    ? "md:text-right" 
                    : "md:text-left md:translate-y-24"
                }`}
              >
                <div 
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-md mb-4 relative z-10 ${
                    index % 2 === 0 ? "md:ml-auto" : ""
                  }`}
                >
                  {iconMap[step.icon]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 max-w-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;