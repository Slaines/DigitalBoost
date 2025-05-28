import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { OnboardingData, ONBOARDING_STEPS } from '../pages/onboarding/constants';
// Removed Firestore imports to prevent channel errors

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  resetData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isDataComplete: (requiredFields: (keyof OnboardingData)[]) => boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  validateCurrentStep: () => boolean;
  getCurrentStepConfig: () => typeof ONBOARDING_STEPS[0] | undefined;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Local storage key for saving onboarding data
const STORAGE_KEY = 'digitalboost_onboarding_data';
const STEP_KEY = 'digitalboost_onboarding_step';

// Using local storage only to prevent Firestore channel errors
console.log('Using local storage only for onboarding data (no Firestore)');

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Initialize state from localStorage if available
  const [data, setData] = useState<OnboardingData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {};
  });
  
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = localStorage.getItem(STEP_KEY);
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  
  // Load data from localStorage when component mounts
  useEffect(() => {
    const loadUserData = () => {
      if (currentUser?.uid) {
        try {
          // Using localStorage instead of Firestore to prevent channel errors
          const userDataKey = `${STORAGE_KEY}_${currentUser.uid}`;
          const savedData = localStorage.getItem(userDataKey);
          
          if (savedData) {
            const userData = JSON.parse(savedData) as OnboardingData;
            setData(userData);
          }
        } catch (error) {
          console.error('Error loading user data from localStorage:', error);
        }
      }
    };
    
    loadUserData();
  }, [currentUser]);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    // Save to localStorage for all users
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Save to user-specific localStorage key if authenticated
    if (currentUser?.uid && Object.keys(data).length > 0) {
      try {
        const userDataKey = `${STORAGE_KEY}_${currentUser.uid}`;
        localStorage.setItem(userDataKey, JSON.stringify(data));
        console.log('Saved user data to localStorage');
      } catch (error) {
        console.error('Error saving user data to localStorage:', error);
      }
    }
  }, [data, currentUser]);
  
  // Save current step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STEP_KEY, currentStep.toString());
  }, [currentStep]);
  
  // Update data with new values
  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prevData => ({
      ...prevData,
      ...newData
    }));
  };
  
  // Reset all data (used after submission or if user wants to start over)
  const resetData = () => {
    setData({});
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
    
    // Also clear user-specific data from localStorage if user is authenticated
    if (currentUser?.uid) {
      try {
        const userDataKey = `${STORAGE_KEY}_${currentUser.uid}`;
        localStorage.removeItem(userDataKey);
        console.log('Reset user data in localStorage');
      } catch (error) {
        console.error('Error resetting user data in localStorage:', error);
      }
    }
  };
  
  // Check if all required fields for a step are filled
  const isDataComplete = (requiredFields: (keyof OnboardingData)[]) => {
    return requiredFields.every(field => {
      const value = data[field];
      
      // Handle array fields (like skills)
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      
      // Handle object fields (like budget)
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).every(v => v !== undefined && v !== '');
      }
      
      // Handle string fields
      return value !== undefined && value !== '';
    });
  };

  // Get the current step configuration
  const getCurrentStepConfig = () => {
    return ONBOARDING_STEPS.find(step => step.id === currentStep);
  };
  
  // Validate if the current step is complete
  const validateCurrentStep = () => {
    const stepConfig = getCurrentStepConfig();
    if (!stepConfig) return false;
    
    return isDataComplete(stepConfig.required);
  };
  
  // Navigate to the next step
  const goToNextStep = () => {
    const stepConfig = getCurrentStepConfig();
    if (!stepConfig) return;
    
    const nextStepConfig = ONBOARDING_STEPS.find(step => step.id === stepConfig.nextStep);
    if (nextStepConfig) {
      setCurrentStep(nextStepConfig.id);
      navigate(nextStepConfig.path);
    }
  };
  
  // Navigate to the previous step
  const goToPrevStep = () => {
    const stepConfig = getCurrentStepConfig();
    if (!stepConfig || stepConfig.prevStep === null) return;
    
    const prevStepConfig = ONBOARDING_STEPS.find(step => step.id === stepConfig.prevStep);
    if (prevStepConfig) {
      setCurrentStep(prevStepConfig.id);
      navigate(prevStepConfig.path);
    }
  };
  
  const value = {
    data,
    updateData,
    resetData,
    currentStep,
    setCurrentStep,
    isDataComplete,
    goToNextStep,
    goToPrevStep,
    validateCurrentStep,
    getCurrentStepConfig
  };
  
  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook for using the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;
