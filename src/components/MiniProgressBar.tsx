import React from 'react';
import { useLocation } from 'react-router-dom';
import { useOnboarding } from '../context/OnboardingContext';

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
  
  // Return a very small, minimal progress bar
  return (
    <div className="h-0.5 bg-gray-100 w-full">
      <div 
        className="h-full bg-indigo-600 transition-all duration-300" 
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default MiniProgressBar;
