import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import { serviceDetailsData } from './serviceDetails';
import { serviceGoalsMap } from './serviceGoals';
import GoalCard from '../../components/ui/GoalCard';
import TimelineSelector from '../../components/ui/TimelineSelector';
import * as Icons from 'lucide-react';

// Service goal selection interface
interface ServiceGoalSelection {
  service: string;
  goal: string;
}

// Interface for the augmented service detail
interface ServiceWithGoals {
  id: string;
  name: string;
  goals: any[];
  // Add any other properties from serviceDetail
}

const Step2Wizard: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, currentStep } = useOnboarding();
  
  // Local state for wizard navigation
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [serviceGoalSelections, setServiceGoalSelections] = useState<ServiceGoalSelection[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState('1month');
  const [isComplete, setIsComplete] = useState(false);
  
  // Get selected services from previous step
  const selectedServices = useMemo(() => {
    return data.services || [];
  }, [data]);
  
  // Get service details for selected services
  const selectedServiceDetails = useMemo<ServiceWithGoals[]>(() => {
    return selectedServices.map(serviceId => {
      // Find service details
      const serviceDetail = serviceDetailsData.find(s => s.id === serviceId);
      
      // Get goals for this service
      const goals = serviceGoalsMap[serviceId] || [];
      
      return {
        ...(serviceDetail || { name: 'Unknown Service' }),
        goals,
        id: serviceId // Explicitly add id to fix TypeScript errors
      };
    });
  }, [selectedServices]);
  
  // Initialize from existing data
  useEffect(() => {
    if (data.serviceGoals) {
      setServiceGoalSelections(data.serviceGoals);
    }
    
    if (data.timeline) {
      setSelectedTimeline(data.timeline);
    }
  }, [data]);
  
  // Calculate if this is the last service
  const isLastService = currentServiceIndex === selectedServiceDetails.length - 1;
  
  // Current service being shown in the wizard
  const currentService = selectedServiceDetails[currentServiceIndex];
  
  // Helper to check if a goal is selected
  const isGoalSelected = (serviceId: string, goalId: string) => {
    return serviceGoalSelections.some(item => 
      item.service === serviceId && item.goal === goalId
    );
  };
  
  // Select a goal for a service
  const selectGoal = (serviceId: string, goalId: string) => {
    setServiceGoalSelections(prev => {
      // Remove any existing selection for this service
      const filtered = prev.filter(item => item.service !== serviceId);
      
      // Add the new selection
      return [...filtered, { service: serviceId, goal: goalId }];
    });
  };
  
  // Check if current service has a goal selected
  const currentServiceHasGoal = useMemo(() => {
    if (!currentService) return false;
    return serviceGoalSelections.some(item => item.service === currentService?.id);
  }, [currentService, serviceGoalSelections]);
  
  // Check if all services have a goal selected - used for validation
  const allServicesHaveGoals = useMemo(() => {
    if (selectedServices.length === 0) return false;
    
    // Check that every selected service has a goal selection
    return selectedServices.every(serviceId => 
      serviceGoalSelections.some(item => item.service === serviceId)
    );
  }, [selectedServices, serviceGoalSelections]);
  
  // Navigate to next service or finish
  const handleNext = () => {
    if (isLastService) {
      // Go to completion screen
      setIsComplete(true);
    } else {
      // Go to next service
      setCurrentServiceIndex(prev => prev + 1);
    }
  };
  
  // Navigate to previous service or step
  const handleBack = () => {
    if (currentServiceIndex > 0) {
      // Go to previous service
      setCurrentServiceIndex(prev => prev - 1);
    } else {
      // Go back to step 1
      navigate('/onboarding/step1');
    }
  };
  
  // Save data and continue to next step
  const handleComplete = () => {
    // Save selections to onboarding context
    updateData({
      serviceGoals: serviceGoalSelections,
      timeline: selectedTimeline,
    });
    
    // Navigate to next step
    navigate(`/onboarding/step${currentStep + 1}`);
  };
  
  // If no services were selected, show an empty state
  if (selectedServiceDetails.length === 0) {
    return (
      <OnboardingLayout 
        currentStep={2} 
        title="Refine Your Services" 
        subtitle="Select a goal for each service"
      >
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <Icons.AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No services selected</h3>
            <p className="mt-1 text-sm text-gray-500">Please go back and select at least one service.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/onboarding/step1')}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Icons.ArrowLeft className="mr-1 h-4 w-4" />
                Back to service selection
              </button>
            </div>
          </div>
        </div>
      </OnboardingLayout>
    );
  }
  
  // Show completion screen with timeline selection
  if (isComplete) {
    return (
      <OnboardingLayout 
        currentStep={2} 
        title="Almost Done" 
        subtitle="When would you like to start your project?"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6">
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-1">Project Timeline</h3>
              <p className="text-sm text-gray-500 mb-4">Select your preferred timeline to start the project</p>
              
              <TimelineSelector 
                selectedTimeline={selectedTimeline}
                onChange={setSelectedTimeline}
              />
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-6">
              <h3 className="text-base font-medium text-gray-900 mb-2">Selected Goals</h3>
              <div className="space-y-2">
                {serviceGoalSelections.map(selection => {
                  const service = selectedServiceDetails.find(s => s?.id === selection.service);
                  const goal = service?.goals?.find(g => g?.id === selection.goal);
                  
                  if (!service || !goal) return null;
                  
                  return (
                    <div key={selection.service} className="flex items-center bg-gray-50 p-2 rounded-md">
                      <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full p-1 mr-2">
                        <Icons.CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{service.name}</p>
                        <p className="text-xs text-gray-500">{goal.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setIsComplete(false)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Icons.ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </button>
            
            <button
              onClick={handleComplete}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
              <Icons.ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </OnboardingLayout>
    );
  }
  
  // Main wizard interface showing one service at a time
  return (
    <OnboardingLayout 
      currentStep={2} 
      title="Refine Your Services" 
      subtitle="Select a goal for each service"
    >
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Service {currentServiceIndex + 1} of {selectedServiceDetails?.length || 0}</span>
            <span>{serviceGoalSelections?.length || 0}/{selectedServiceDetails?.length || 0} goals selected</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${selectedServiceDetails.length > 0 ? (serviceGoalSelections.length / selectedServiceDetails.length) * 100 : 0}%` }}
            />
          </div>
        </div>
        
        {/* Service goal selection card */}
        <div className="bg-white shadow sm:rounded-lg overflow-hidden mb-6">
          {/* Service header */}
          <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-2 mr-3">
                {/* Use first letter as icon fallback */}
                <span className="font-bold text-lg">{currentService?.name ? currentService.name.charAt(0) : '?'}</span>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">{currentService?.name || 'Service'}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select one goal that best describes what you want to achieve
                </p>
              </div>
            </div>
          </div>
          
          {/* Goals list */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-3">
              {currentService?.goals?.map(goal => goal && (
                <GoalCard
                  key={goal.id || 'unknown'}
                  goal={goal}
                  isSelected={isGoalSelected(currentService?.id || '', goal.id || '')}
                  onClick={() => selectGoal(currentService?.id || '', goal.id || '')}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Icons.ArrowLeft className="mr-1 h-4 w-4" />
            {currentServiceIndex === 0 ? 'Back to Services' : 'Previous'}
          </button>
          
          <button
            onClick={handleNext}
            disabled={!currentServiceHasGoal}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
              ${currentServiceHasGoal
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                : 'bg-indigo-300 cursor-not-allowed'
              }`}
          >
            {isLastService ? 'Next: Timeline' : 'Next Service'}
            <Icons.ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Step2Wizard;
