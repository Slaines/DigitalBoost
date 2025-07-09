import React, { useState, useEffect } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import ServiceCard from '../../components/ui/ServiceCard';
import { serviceDetailsData } from './serviceDetails';
import * as Icons from 'lucide-react';

/**
 * Enhanced Step 1: Interactive Service Selection with Card Grid
 * Provides a visually engaging interface with clear service descriptions and details
 */
const EnhancedStep1: React.FC = () => {
  const { data, updateData, goToNextStep, getCurrentStepConfig } = useOnboarding();
  const [selectedServices, setSelectedServices] = useState<string[]>(data.services || []);
  
  // Get current step configuration
  const stepConfig = getCurrentStepConfig();
  
  // Function to get the icon component based on the icon name
  const getIconComponent = (iconName: string | undefined) => {
    if (!iconName) return null;
    
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  // Toggle a service selection (add or remove from array)
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      // If already selected, remove it
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      // Otherwise add it
      return [...prev, serviceId];
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

  // All services flattened for easier display in grid
  const allServices = serviceDetailsData.flatMap(category => 
    category.services.map(service => ({
      ...service,
      category: category.name
    }))
  );

  return (
    <OnboardingLayout
      currentStep={stepConfig?.id || 1}
      onNext={handleNext}
      nextDisabled={selectedServices.length === 0}
      nextLabel="Next"
      title={<span>What <span className="text-indigo-600">service</span> are you looking for?</span>}
      subtitle="Select one or more services that match your needs"
    >
      <div className="space-y-5 mb-6">
        {/* Service Categories */}
        {serviceDetailsData.map((category) => (
          <div key={category.name} className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">{category.name}</h3>
            
            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.name}
                  description={service.description}
                  details={service.details}
                  icon={getIconComponent(service.icon)}
                  isSelected={selectedServices.includes(service.id)}
                  onToggle={toggleService}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </OnboardingLayout>
  );
};

export default EnhancedStep1;
