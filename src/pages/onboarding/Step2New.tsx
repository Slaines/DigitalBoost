import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import { serviceDetailsData } from './serviceDetails';
import { serviceGoalsMap, timelineOptions } from './serviceGoals';
import GoalCard from '../../components/ui/GoalCard';
import TimelineSelector from '../../components/ui/TimelineSelector';

interface ServiceSelection {
  service: string;
  goal: string;
}

const OnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  
  // Get selected services from Step 1
  const selectedServices = data.services || [];
  
  // Initialize serviceGoals state from context or empty array
  const [serviceGoalSelections, setServiceGoalSelections] = useState<ServiceSelection[]>(
    data.serviceGoals || []
  );
  
  // Initialize timeline from context or default to 1_month
  const [selectedTimeline, setSelectedTimeline] = useState<string>(
    data.timeline || '1_month'
  );
  
  // Get service details for selected services
  const selectedServiceDetails = useMemo(() => {
    if (!selectedServices || selectedServices.length === 0) return [];
    
    const details = [];
    
    // Find matching services from all categories
    for (const category of serviceDetailsData) {
      for (const service of category.services) {
        if (selectedServices.includes(service.id)) {
          const goals = serviceGoalsMap[service.id] || [];
          
          details.push({
            id: service.id,
            name: service.name,
            icon: service.icon,
            category: category.name,
            goals: goals
          });
        }
      }
    }
    
    return details.sort((a, b) => a.category.localeCompare(b.category));
  }, [selectedServices]);
  
  // Redirect if no services selected
  useEffect(() => {
    if (!selectedServices || selectedServices.length === 0) {
      setCurrentStep(1);
      navigate("/onboarding/Step1");
    }
  }, [selectedServices, navigate, setCurrentStep]);
  
  // Handle goal selection
  const selectGoal = (serviceId: string, goalId: string) => {
    setServiceGoalSelections(prev => {
      // Remove any existing selection for this service
      const filtered = prev.filter(item => item.service !== serviceId);
      // Add the new selection
      return [...filtered, { service: serviceId, goal: goalId }];
    });
  };
  
  // Check if a goal is selected for a service
  const isGoalSelected = (serviceId: string, goalId: string) => {
    return serviceGoalSelections.some(
      selection => selection.service === serviceId && selection.goal === goalId
    );
  };
  
  // Get the selected goal for a service (or null)
  const getSelectedGoalForService = (serviceId: string) => {
    const selection = serviceGoalSelections.find(item => item.service === serviceId);
    return selection ? selection.goal : null;
  };
  
  // Check if all selected services have a goal selected
  const allServicesHaveGoal = useMemo(() => {
    if (selectedServices.length === 0) return false;
    
    // Check if every selected service has a corresponding goal selection
    return selectedServices.every(serviceId => 
      serviceGoalSelections.some(selection => selection.service === serviceId)
    );
  }, [selectedServices, serviceGoalSelections]);
  
  // Handle back button
  const handleBack = () => {
    setCurrentStep(1);
    navigate("/onboarding/Step1");
  };
  
  // Handle next button
  const handleNext = () => {
    // Save selected goals and timeline to context
    updateData({
      serviceGoals: serviceGoalSelections,
      timeline: selectedTimeline
    });
    setCurrentStep(3);
    navigate("/onboarding/Step3");
  };
  
  return (
    <OnboardingLayout
      currentStep={2}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!allServicesHaveGoal}
      nextLabel="Continue"
      title="Refine Your Services"
      subtitle="Select your primary goal for each service"
    >
      <div className="space-y-8 max-w-3xl">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg mb-6 border border-indigo-100">
          <h3 className="font-medium text-indigo-800 mb-1">What do you want to achieve?</h3>
          <p className="text-sm text-gray-700">
            For each service you selected, choose a business goal that best matches what you want to accomplish.
          </p>
        </div>
      
        {/* Empty state */}
        {selectedServiceDetails.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No services selected. Please go back and select at least one service.</p>
            <button 
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
            >
              Back to Service Selection
            </button>
          </div>
        )}
        
        {/* Per-Service Goal Selection */}
        {selectedServiceDetails.map(service => (
          <div key={service.id} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h4 className="text-gray-800 font-medium mb-3">{service.name}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {service.goals.map(goal => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  isSelected={isGoalSelected(service.id, goal.id)}
                  onClick={() => selectGoal(service.id, goal.id)}
                />
              ))}
            </div>
          </div>
        ))}
        
        {/* Timeline Selector */}
        {selectedServiceDetails.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <h4 className="text-gray-800 font-medium mb-4">When do you want to start?</h4>
            <TimelineSelector 
              selectedTimeline={selectedTimeline}
              onChange={setSelectedTimeline}
            />
          </div>
        )}
        
        {/* Selection summary */}
        {selectedServiceDetails.length > 0 && (
          <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg mt-6 border border-gray-200">
            <div>
              <span className="font-medium text-sm">Selected goals:</span>
              <span className="ml-2 text-sm">
                {serviceGoalSelections.length} of {selectedServices.length} services
              </span>
            </div>
            {!allServicesHaveGoal && (
              <span className="text-xs text-orange-600">Please select a goal for each service to continue</span>
            )}
          </div>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;
