import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { useOnboarding } from '../context/OnboardingContext';
import OnboardingLayout from '../components/layout/OnboardingLayout';
import OnboardingIllustration from '../components/illustrations/OnboardingIllustration';
import OnboardingCard from '../components/ui/OnboardingCard';
import AnimatedTransition from '../components/ui/AnimatedTransition';

// Define service categories and their options
type ServiceOption = {
  id: string;
  name: string;
};

type ServiceCategory = {
  name: string;
  options: ServiceOption[];
};

const serviceCategories: ServiceCategory[] = [
  {
    name: "Advertising & Marketing",
    options: [
      { id: "social-media-marketing", name: "Social Media Marketing" },
      { id: "email-marketing", name: "Email Marketing" },
      { id: "ppc-advertising", name: "PPC Advertising" },
      { id: "seo-optimization", name: "SEO Optimization" },
      { id: "content-marketing", name: "Content Marketing" },
    ],
  },
  {
    name: "Creative & Visual",
    options: [
      { id: "brand-strategy", name: "Brand Strategy" },
      { id: "content-creation", name: "Content Creation" },
      { id: "graphic-design", name: "Graphic Design" },
      { id: "video-production", name: "Video Production" },
    ],
  },
  {
    name: "Development & Product",
    options: [
      { id: "website-development", name: "Website Development" },
      { id: "app-development", name: "App Development" },
      { id: "e-commerce", name: "E-commerce Solutions" },
      { id: "ui-ux-design", name: "UI/UX Design" },
    ],
  },
  {
    name: "IT Services",
    options: [
      { id: "analytics-reporting", name: "Analytics & Reporting" },
      { id: "cloud-services", name: "Cloud Services" },
      { id: "cybersecurity", name: "Cybersecurity" },
      { id: "tech-support", name: "Technical Support" },
    ],
  },
];

const OnboardingStep1: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [selectedService, setSelectedService] = useState<string>(data.service || '');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleServiceSelect = (_serviceId: string, serviceName: string) => {
    // The underscore prefix indicates we're acknowledging but not using this parameter
    setSelectedService(serviceName);
  };

  const handleNext = () => {
    if (selectedService) {
      // Save to context
      updateData({
        service: selectedService
      });
      
      // Set current step and navigate to next step
      setCurrentStep(2);
      navigate('/onboarding/Step2');
    }
  };

  const toggleCategory = (categoryName: string) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  return (
    <OnboardingLayout
      title={
        <span>
          What <span className="text-brand-600">service</span> are you looking for?
        </span>
      }
      subtitle="Select a service to help us understand your needs"
      currentStep={1}
      onNext={handleNext}
      nextDisabled={!selectedService}
      nextLabel="Continue"
      illustration={<OnboardingIllustration variant="services" />}
    >
      <div className="space-y-6">
        {serviceCategories.map((category, categoryIndex) => (
          <AnimatedTransition 
            key={category.name} 
            isVisible={true} 
            direction="up" 
            delay={100 + categoryIndex * 100}
          >
            <OnboardingCard 
              className="overflow-hidden transition-all duration-300"
            >
              <div 
                className="cursor-pointer" 
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex justify-between items-center p-2">
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  <ChevronRightIcon 
                    size={20} 
                    className={`text-gray-500 transition-transform duration-300 ${
                      expandedCategory === category.name ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
              </div>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedCategory === category.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 pt-0 space-y-3">
                  {category.options.map((option, optionIndex) => (
                    <AnimatedTransition 
                      key={option.id} 
                      isVisible={expandedCategory === category.name} 
                      direction="up" 
                      delay={optionIndex * 75}
                    >
                      <div 
                        className={`
                          p-3 rounded-lg cursor-pointer transition-all duration-200
                          ${selectedService === option.name 
                            ? 'bg-brand-50 border-2 border-brand-500 shadow-sm' 
                            : 'bg-gray-50 border border-gray-200 hover:border-brand-200 hover:bg-brand-50'
                          }
                        `}
                        onClick={() => handleServiceSelect(option.id, option.name)}
                      >
                        <div className="flex items-center">
                          <div 
                            className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
                              ${selectedService === option.name 
                                ? 'border-brand-500 bg-brand-500' 
                                : 'border-gray-300'
                              }
                            `}
                          >
                            {selectedService === option.name && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-gray-800 font-medium">{option.name}</span>
                        </div>
                      </div>
                    </AnimatedTransition>
                  ))}
                </div>
              </div>
            </OnboardingCard>
          </AnimatedTransition>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep1;
