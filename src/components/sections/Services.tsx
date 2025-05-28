import React from "react";
import { 
  Globe, 
  Search, 
  Megaphone, 
  FileText, 
  Share2, 
  BarChart
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { services } from "../../data";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={40} />,
  Search: <Search size={40} />,
  Megaphone: <Megaphone size={40} />,
  FileText: <FileText size={40} />,
  ShareNodes: <Share2 size={40} />,
  BarChart: <BarChart size={40} />
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive digital solutions to help your business thrive online."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
              <Link 
                to={`/service/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn more
                <svg 
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;