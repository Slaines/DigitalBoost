import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import { serviceDetailsData } from './serviceDetails';
import { serviceGoalsMap, timelineOptions } from './serviceGoals';
import * as Icons from 'lucide-react';
import { ServiceGoal } from './serviceGoals';

// Interface for the state shape
interface Step2State {
  selections: { [serviceId: string]: string[] }; // array of goal IDs per service
  timelines: { [serviceId: string]: string }; // timeline selection per service
}

// Interface for the augmented service detail
interface ServiceWithGoals {
  id: string;
  name: string;
  icon?: string;
  goals: ServiceGoal[];
  // Add any other properties from serviceDetail
}

const Step2Accordion: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, currentStep } = useOnboarding();
  
  // Local state for accordion
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [state, setState] = useState<Step2State>({
    selections: {},
    timelines: {}
  });
  
  // Get selected services from previous step
  const selectedServices = useMemo(() => {
    return data.services || [];
  }, [data]);
  
  // Get service details for selected services
  const selectedServiceDetails = useMemo<ServiceWithGoals[]>(() => {
    return selectedServices.map(serviceId => {
      // Find service details by searching through all categories
      let serviceDetail = null;
      for (const category of serviceDetailsData) {
        const found = category.services.find(s => s.id === serviceId);
        if (found) {
          serviceDetail = found;
          break;
        }
      }
      
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
    // Convert previous data format if it exists
    if (data.serviceGoals) {
      const selections: { [serviceId: string]: string[] } = {};
      
      data.serviceGoals.forEach(item => {
        if (!selections[item.service]) {
          selections[item.service] = [];
        }
        selections[item.service].push(item.goal);
      });
      
      setState(prev => ({
        ...prev,
        selections
      }));
    }
    
    // Initialize timelines for each service with default '1_month' value
    if (selectedServiceDetails.length > 0) {
      const initialTimelines: { [serviceId: string]: string } = {};
      
      // Set default timeline for each service
      selectedServiceDetails.forEach(service => {
        initialTimelines[service.id] = data.timeline || '1_month';
      });
      
      setState(prev => ({
        ...prev,
        timelines: { ...initialTimelines }
      }));
    }
    
    // Expand the first service by default if none is expanded
    if (selectedServiceDetails.length > 0 && !expandedService) {
      setExpandedService(selectedServiceDetails[0].id);
    }
  }, [data, selectedServiceDetails, expandedService]);
  
  // Helper to check if a goal is selected for a service
  const getSelectedGoalsForService = (serviceId: string): string[] => {
    return state.selections[serviceId] || [];
  };
  
  // Check if a specific goal is selected
  const isGoalSelected = (serviceId: string, goalId: string): boolean => {
    return getSelectedGoalsForService(serviceId).includes(goalId);
  };
  
  // Toggle selection of a goal
  const toggleGoalSelection = (serviceId: string, goalId: string): void => {
    const currentSelections = getSelectedGoalsForService(serviceId);
    
    if (isGoalSelected(serviceId, goalId)) {
      // If already selected, remove it
      const updatedSelections = currentSelections.filter(id => id !== goalId);
      
      setState(prev => ({
        ...prev,
        selections: {
          ...prev.selections,
          [serviceId]: updatedSelections
        }
      }));
    } else {
      // If not selected yet, check if we're at the maximum (3)
      if (currentSelections.length < 3) {
        // Add the new selection
        const updatedSelections = [...currentSelections, goalId];
        
        setState(prev => ({
          ...prev,
          selections: {
            ...prev.selections,
            [serviceId]: updatedSelections
          }
        }));
      }
    }
  };
  
  // Update the timeline for a specific service
  const updateTimeline = (serviceId: string, timeline: string): void => {
    setState(prev => ({
      ...prev,
      timelines: {
        ...prev.timelines,
        [serviceId]: timeline
      }
    }));
  };
  
  // Check if all services have at least one goal selected
  const allServicesHaveGoals = useMemo(() => {
    if (selectedServices.length === 0) return false;
    
    // Check that every selected service has at least one goal selection
    return selectedServices.every(serviceId => {
      const selections = getSelectedGoalsForService(serviceId);
      return selections.length > 0;
    });
  }, [selectedServices, state.selections]);
  
  // Toggle the expanded state of a service accordion
  const toggleAccordion = (serviceId: string) => {
    setExpandedService(prevExpanded => {
      // If this service is currently expanded, close it (set to null)
      // Otherwise, expand this service (and close any other)
      return prevExpanded === serviceId ? null : serviceId;
    });
  };
  
  // Note: Navigation and data saving is handled in the Continue button click handler
  
  // If no services were selected, show an empty state
  if (selectedServiceDetails.length === 0) {
    return (
      <OnboardingLayout 
        currentStep={2} 
        title="Refine Your Services" 
        subtitle="Select goals for each service"
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
  
  return (
    <OnboardingLayout 
      currentStep={2} 
      title="Refine Your Services" 
      subtitle="Select 1-3 goals for each service"
    >
      {/* Main content container - using 90% width on desktop, 100% on mobile */}
      <div className="w-full md:w-[90%] mx-auto px-2 sm:px-4 md:px-6 pb-16">
        {/* Service accordions */}
        <div className="space-y-4">
          {selectedServiceDetails.map(service => {
            const isExpanded = expandedService === service.id;
            const selectedGoals = getSelectedGoalsForService(service.id);
            const hasMinimumSelection = selectedGoals.length > 0;
            
            return (
              <div key={service.id} className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
                {/* Accordion header */}
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <div className="flex items-center">
                    <div className={`
                      p-1.5 rounded-full mr-2 flex-shrink-0
                      ${hasMinimumSelection 
                        ? 'bg-indigo-100 text-indigo-600' 
                        : 'bg-gray-100 text-gray-400'}
                    `}>
                      {hasMinimumSelection ? (
                        <Icons.CheckCircle size={14} />
                      ) : (
                        service.icon ? 
                          <span className="text-sm"><Icons.Info size={14} /></span> :
                          <span className="font-medium text-sm">{service?.name ? service.name.charAt(0).toUpperCase() : '?'}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-xs text-gray-500">
                        {hasMinimumSelection ? (
                          `${selectedGoals.length} of 3 goals selected`
                        ) : (
                          'Select at least one goal'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Icons.ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                    />
                  </div>
                </button>
                
                {/* Accordion content */}
                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-gray-200">
                    <p className="mb-2 text-xs text-gray-500">Select 1-3 goals that best describe what you want to achieve</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {/* Show 4-6 checkbox options as required */}
                      {service.goals.slice(0, 6).map(goal => {
                        const isSelected = isGoalSelected(service.id, goal.id);
                        const IconComponent = goal.icon && (Icons as any)[goal.icon];
                        const selectedCount = getSelectedGoalsForService(service.id).length;
                        const maxSelected = selectedCount >= 3 && !isSelected;
                        
                        return (
                          <label
                            key={goal.id}
                            className={`
                              flex items-start p-2 rounded-lg border cursor-pointer transition-all
                              ${isSelected 
                                ? 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-300' 
                                : maxSelected
                                  ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                            `}
                          >
                            <div className={`
                              p-1.5 rounded-full mr-3 flex-shrink-0 mt-0.5
                              ${isSelected ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}
                            `}>
                              {IconComponent ? <IconComponent size={14} /> : <Icons.CheckSquare size={14} />}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className={`font-medium text-sm ${isSelected ? 'text-indigo-700' : 'text-gray-800'}`}>
                                  {goal.title}
                                </h4>
                                
                                <input 
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    if (!maxSelected || isSelected) {
                                      toggleGoalSelection(service.id, goal.id);
                                    }
                                  }}
                                  disabled={maxSelected && !isSelected}
                                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                              </div>
                              
                              <p className={`text-xs mt-1 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`}>
                                {goal.description}
                              </p>
                              
                              {/* Show selection limit notice */}
                              {maxSelected && (
                                <p className="text-xs mt-1 text-amber-600">Max 3 goals per service</p>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    
                    {/* Timeline selector for this specific service */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h4 className="text-xs font-medium text-gray-800 mb-1">When do you want to start?</h4>
                      <div className="flex flex-wrap gap-2">
                        {timelineOptions.map((option) => {
                          const isSelected = option.id === (state.timelines[service.id] || '1_month');
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => updateTimeline(service.id, option.id)}
                              className={`
                                flex items-center gap-1 px-2 py-1 rounded-full transition-all text-xs
                                ${isSelected 
                                  ? 'bg-indigo-600 text-white shadow-sm' 
                                  : 'bg-white border border-gray-300 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50'}
                              `}
                            >
                              {isSelected ? (
                                <Icons.CheckCircle className="text-white" size={12} />
                              ) : (
                                <Icons.Clock className="text-gray-400" size={12} />
                              )}
                              <span className="text-xs">{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Timeline selectors moved into each accordion panel */}
      </div>
      
      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/onboarding/step1')}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Icons.ArrowLeft className="mr-1 h-3 w-3" />
          Back
        </button>
        
        <div className="text-sm text-gray-500">
          {allServicesHaveGoals 
            ? `${Object.values(state.selections).flat().length} goals selected` 
            : 'Select at least one goal for each service'
          }
        </div>
        
        {/* Using an anchor link for maximum reliability */}
        <a
          href="/onboarding/Step3"
          onClick={(e) => {
            // Only handle click if we have selections for all services
            if (!allServicesHaveGoals) {
              e.preventDefault();
              return;
            }
            
            e.preventDefault();
            console.log('Continue link clicked');
            
            // Save data before navigation
            const serviceGoals = Object.entries(state.selections).flatMap(([serviceId, goalIds]) => {
              return goalIds.map(goalId => ({
                service: serviceId,
                goal: goalId
              }));
            });
            
            const firstServiceId = Object.keys(state.timelines)[0];
            const primaryTimeline = firstServiceId ? state.timelines[firstServiceId] : '1_month';
            const skills = serviceGoals.map(sg => ({ id: sg.goal, name: sg.goal }));
            
            // Update data with both new and legacy formats
            updateData({
              serviceGoals,
              skills,
              timeline: primaryTimeline,
              serviceTimelines: state.timelines,
              currentStep: 3
            });
            
            // Direct navigation after saving data
            window.location.href = '/onboarding/Step3';
          }}
          className={`
            inline-flex items-center px-3 py-1.5 border border-transparent 
            text-sm font-medium rounded-md shadow-sm text-white no-underline
            ${allServicesHaveGoals 
              ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              : 'bg-indigo-300 opacity-60 pointer-events-none'}
          `}
        >
          Continue
          <Icons.ArrowRight className="ml-1 h-3 w-3" />
        </a>
      </div>
    </OnboardingLayout>
  );
};

export default Step2Accordion;
