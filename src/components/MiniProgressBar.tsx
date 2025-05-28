import React from 'react';
import { useLocation } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';

// Define step labels for the progress indicator
const STEP_LABELS = [
  { number: 1, label: 'Service' },
  { number: 2, label: 'Skills' },
  { number: 3, label: 'Location' },
  { number: 4, label: 'Company Name' },
  { number: 5, label: 'Company Size' },
  { number: 6, label: 'Industry' },
  { number: 7, label: 'Budget' },
  { number: 8, label: 'Project Context' },
];

const MiniProgressBar: React.FC = () => {
  const location = useLocation();
  const { currentStep } = useOnboarding();
  const path = location.pathname;
  
  // Get the step number from context if available, otherwise fall back to URL-based detection
  const getStepNumber = (): number => {
    // If we have a currentStep in context, use that
    if (currentStep > 0) {
      return currentStep;
    }
    
    // Fallback to URL-based detection for backward compatibility
    if (path === '/onboarding') return 1;
    if (path.includes('step-two')) return 2;
    if (path.includes('step-three')) return 3;
    if (path.includes('step-four')) return 4;
    if (path.includes('step-five')) return 5;
    if (path.includes('step-six')) return 6;
    if (path.includes('step-seven')) return 7;
    if (path.includes('step-eight')) return 8;
    
    // Default to 0 (no progress) for non-onboarding pages
    return 0;
  };
  
  // Calculate the progress percentage
  const stepNumber = getStepNumber();
  
  // Map the current step to a progress percentage
  const getProgressPercentage = (): number => {
    // For steps 1-8, calculate a linear progression (12.5% per step)
    if (stepNumber >= 1 && stepNumber <= 8) {
      return (stepNumber / 8) * 100;
    }
    
    // For steps 9+ (processing, account creation, phone verification, review)
    // show 100% progress
    if (stepNumber > 8) {
      return 100;
    }
    
    return 0;
  };
  
  const progressPercentage = getProgressPercentage();
  
  // Only show progress bar for steps 1-8 (up to "What are the context and goals of your project?")
  // Don't show for non-onboarding pages or account creation
  if (stepNumber === 0 || stepNumber > 8 || path === '/onboarding/account-creation') return null;
  
  // Don't show for processing, phone verification, or review pages
  if (path.includes('/processing') || path.includes('/phone-verification') || path.includes('/review')) return null;
  
  return (
    <div className="py-2 border-b border-gray-100">
      {/* Main progress bar container */}
      <div className="relative w-full mx-auto px-4 max-w-5xl">
        {/* Step 1 of 8 indicator */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs font-medium text-gray-700">
            Step {stepNumber} of 8
          </div>
          <div className="text-xs text-gray-500">
            {progressPercentage.toFixed(0)}% Complete
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 w-full rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between mt-1 relative">
          {STEP_LABELS.map((step) => {
            const isCompleted = stepNumber > step.number;
            const isCurrent = stepNumber === step.number;
            
            return (
              <div 
                key={step.number} 
                className="flex flex-col items-center relative"
                style={{ width: '12.5%' }}
              >
                {/* Step circle */}
                <div 
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium 
                    ${isCompleted ? 'bg-indigo-600 text-white' : ''}
                    ${isCurrent ? 'bg-white border-2 border-indigo-600 text-indigo-600' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-gray-100 text-gray-400' : ''}
                    transition-all duration-300
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                
                {/* Step label */}
                <span 
                  className={`
                    text-xs mt-1 whitespace-nowrap 
                    ${isCompleted ? 'text-indigo-600 font-medium' : ''}
                    ${isCurrent ? 'text-indigo-600 font-medium' : ''}
                    ${!isCompleted && !isCurrent ? 'text-gray-400' : ''}
                  `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MiniProgressBar;
