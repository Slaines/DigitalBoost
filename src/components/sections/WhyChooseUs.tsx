import React from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { stats } from "../../data";

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-blue-50">
      <Container>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-teal-400 opacity-30 blur"></div>
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Team collaboration"
                className="relative rounded-lg shadow-lg object-cover h-[400px] w-full"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <SectionHeading
              title="Why Choose Us"
              subtitle="We combine industry expertise with innovative strategies to deliver exceptional results for our clients."
              className="lg:text-left"
            />
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Data-Driven Approach
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We make decisions based on real-time data, analytics, and market research to ensure measurable results.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-teal-500"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tailored Solutions
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Each strategy is customized to your specific needs, goals, and industry to maximize effectiveness.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Transparent Communication
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Regular updates, detailed reporting, and open channels of communication ensure you're always informed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white rounded-lg shadow-sm p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;