import React, { useState } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import ServiceCard from '../../components/ui/ServiceCard';
import { serviceDetailsData } from './serviceDetails';
import * as Icons from 'lucide-react';
import './step1.css'; // We'll create this CSS file for the scrollbar hiding

/**
 * Step 1: Service Selection
 * Interactive card grid with visual service descriptions and tooltips
 */
const Step1: React.FC = () => {
  const { data, updateData, goToNextStep, getCurrentStepConfig } = useOnboarding();
  
  const [selectedServices, setSelectedServices] = useState<string[]>(data.services || []);
  
  // Get current step configuration
  const stepConfig = getCurrentStepConfig();
  
  // Function to get the icon component based on the icon name
  const getIconComponent = (iconName: string | undefined) => {
    if (!iconName) return null;
    
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  // Track the currently selected category tab
  const [activeCategory, setActiveCategory] = useState<string>(serviceDetailsData[0].name);

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  const handleNext = () => {
    if (selectedServices.length === 0) return;
    
    // Save the selected services to the context
    updateData({
      services: selectedServices
    });

    // Move to the next step
    goToNextStep();
  };

  // Get services for the active category only
  const activeCategoryData = serviceDetailsData.find(category => category.name === activeCategory);
  
  // Helper function to check if a category has any selected services
  const categoryHasSelections = (categoryName: string) => {
    const category = serviceDetailsData.find(c => c.name === categoryName);
    if (!category) return false;
    
    return category.services.some(service => selectedServices.includes(service.id));
  };

  return (
    <OnboardingLayout
      currentStep={stepConfig?.id || 1}
      onNext={handleNext}
      nextDisabled={selectedServices.length === 0}
      nextLabel="Next"
      title={<span>What <span className="text-indigo-600">service</span> are you looking for?</span>}
      subtitle="Select one or more services that match your needs"
    >
      {/* Category Tabs */}
      <div className="flex w-full mb-5 overflow-x-auto scrollbar-hide">
        {serviceDetailsData.map((category) => {
          // Find an icon from this category to represent it (using the first service's icon)
          const categoryIcon = category.services[0]?.icon ? 
            getIconComponent(category.services[0].icon) : null;
          
          return (
            <button
              key={category.name}
              className={`category-tab flex items-center gap-2 whitespace-nowrap ${activeCategory === category.name 
                ? 'category-tab-active' 
                : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveCategory(category.name)}
              type="button"
            >
              {/* Category icon */}
              {categoryIcon && (
                <span className="opacity-80">{categoryIcon}</span>
              )}
              
              <span>{category.name}</span>
              
              {/* Indicator for categories with selections */}
              {categoryHasSelections(category.name) && (
                <span className="selection-indicator"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Services for active category */}
      <div className="w-full">
        {activeCategoryData && (
          <div key={activeCategory} className="service-grid fade-in">
            {activeCategoryData.services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.name}
                description={service.description}
                details={service.details}
                icon={service.icon ? getIconComponent(service.icon) : undefined}
                isSelected={selectedServices.includes(service.id)}
                onToggle={toggleService}
              />
            ))}
          </div>
        )}
      </div>

      {/* Services count summary */}
      <div className={`service-count text-sm ${selectedServices.length > 0 ? 'service-count-active' : ''}`}>
        {selectedServices.length > 0 ? (
          <p className="font-medium">
            <span className="text-indigo-600">{selectedServices.length}</span> service{selectedServices.length !== 1 ? 's' : ''} selected
            {selectedServices.length >= 2 && 
              <span className="ml-1 text-green-600 text-xs">(Great choice!)</span>
            }
          </p>
        ) : (
          <p>Select at least one service to continue</p>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default Step1;
