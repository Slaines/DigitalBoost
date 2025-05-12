import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import { CheckIcon } from 'lucide-react';

interface StepProgressBarProps {
  className?: string;
  totalSteps?: number;
  currentStep?: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({
  className = '',
  totalSteps = 10,
  currentStep: propCurrentStep
}) => {
  const navigate = useNavigate();
  // Use currentStep from props if provided, otherwise use from context
  const { currentStep: contextCurrentStep, setCurrentStep } = useOnboarding();
  const currentStep = propCurrentStep ?? contextCurrentStep;
  
  // Generate steps array
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  // Handle step click for navigation
  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      navigate(`/onboarding/Step${step}`);
    }
  };
  
  return (
    <div className={`w-full mb-6 ${className}`}>
      {/* Step text indicator */}
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300 ease-in-out rounded-full" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          aria-hidden="true"
        ></div>
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-4 px-2">
        {steps.map((step) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          
          return (
            <button
              key={step}
              onClick={() => handleStepClick(step)}
              disabled={step > currentStep}
              className={`
                flex flex-col items-center focus:outline-none
                ${step <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
              `}
              aria-label={`Step ${step}${isCurrent ? ' (current)' : ''}`}
            >
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center mb-1
                ${isCompleted ? 'bg-indigo-600 text-white' : ''}
                ${isCurrent ? 'bg-indigo-600 text-white ring-2 ring-indigo-100' : ''}
                ${!isCompleted && !isCurrent ? 'bg-gray-200 text-gray-500' : ''}
              `}>
                {isCompleted ? (
                  <CheckIcon size={14} />
                ) : (
                  <span className="text-xs">{step}</span>
                )}
              </div>
              <span className={`text-xs ${isCurrent ? 'font-medium' : 'text-gray-500'}`}>
                {step === 1 ? 'Service' : 
                 step === 2 ? 'Skills' : 
                 step === 3 ? 'Location' : 
                 step === 4 ? 'Company Name' : 
                 step === 5 ? 'Company Size' : 
                 step === 6 ? 'Industry' : 
                 step === 7 ? 'Budget' : 
                 step === 8 ? 'Project Context' : 
                 step === 9 ? 'Review' : 
                 step === 10 ? 'Account' : `Step ${step}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgressBar;
