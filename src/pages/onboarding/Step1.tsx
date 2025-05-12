import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import { serviceCategories } from './constants';

/**
 * Step 1: Service Selection
 * A clean, minimal implementation that supports multiple service selections
 */
const Step1: React.FC = () => {
  const { data, updateData, goToNextStep, getCurrentStepConfig } = useOnboarding();
  const [selectedServices, setSelectedServices] = useState<string[]>(data.services || []);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // Get current step configuration
  const stepConfig = getCurrentStepConfig();

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

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  // Get service names for display
  const getServiceNames = () => {
    const names: string[] = [];
    for (const serviceId of selectedServices) {
      for (const category of serviceCategories) {
        const option = category.options.find(opt => opt.id === serviceId);
        if (option) names.push(option.name);
      }
    }
    return names;
  };
  
  // Auto-expand a category if it contains selected services
  useEffect(() => {
    if (selectedServices.length > 0 && !expandedCategory) {
      // Find the first category that contains a selected service
      for (const category of serviceCategories) {
        if (category.options.some(opt => selectedServices.includes(opt.id))) {
          setExpandedCategory(category.name);
          break;
        }
      }
    }
  }, [selectedServices, expandedCategory]);

  return (
    <OnboardingLayout
      currentStep={stepConfig?.id || 1}
      onNext={handleNext}
      nextDisabled={selectedServices.length === 0}
    >
      <div className="space-y-4">
        {/* Service Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {serviceCategories.map((category) => (
            <div 
              key={category.name}
              className={`
                border rounded-md shadow-sm p-2 cursor-pointer
                ${expandedCategory === category.name ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}
              `}
              onClick={() => toggleCategory(category.name)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{category.name}</h3>
                <ChevronRightIcon
                  size={18}
                  className={`text-gray-500 transition-transform ${expandedCategory === category.name ? 'transform rotate-90' : ''}`}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Service Options - Only shown when a category is expanded */}
        {expandedCategory && (
          <div className="mt-3 pt-2 border-t border-gray-200">
            <h4 className="text-xs font-medium text-gray-700 mb-2">
              Select one or more services (click to toggle):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {serviceCategories
                .find(cat => cat.name === expandedCategory)
                ?.options.map((serviceOption) => {
                  const isSelected = selectedServices.includes(serviceOption.id);
                  return (
                    <div 
                      key={serviceOption.id}
                      className={`
                        border rounded-md p-2 flex items-center justify-between cursor-pointer text-sm
                        ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}
                      `}
                      onClick={() => toggleService(serviceOption.id)}
                    >
                      <span>{serviceOption.name}</span>
                      <div className={`
                        w-5 h-5 rounded-full flex items-center justify-center
                        ${isSelected ? 'bg-indigo-500 text-white' : 'border border-gray-300'}
                      `}>
                        {isSelected && <CheckIcon size={12} />}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {/* Selection Summary */}
        {selectedServices.length > 0 && (
          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center mb-2">
              <CheckIcon size={16} className="text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">
                {selectedServices.length} service(s) selected:
              </span>
            </div>
            <ul className="pl-6 space-y-1">
              {getServiceNames().map((name, index) => (
                <li key={index} className="text-sm text-green-700 flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default Step1;
