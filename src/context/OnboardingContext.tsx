import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, connectFirestoreEmulator, doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import app from '../firebase/config';
import { OnboardingData, ONBOARDING_STEPS } from '../pages/onboarding/constants';

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

// Initialize Firestore outside of component to avoid re-initialization on every render
const db = getFirestore(app);

// In Vite, environment variables are exposed via import.meta.env, not process.env
// Only connect to emulator if explicitly enabled
const isEmulatorEnabled = import.meta.env.VITE_USE_FIRESTORE_EMULATOR === 'true';
if (isEmulatorEnabled) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('Connected to Firestore emulator');
  } catch (error) {
    console.warn('Failed to connect to Firestore emulator:', error);
  }
}

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
  
  // Load data from Firestore when user is authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser?.uid) {
        try {
          const userDocRef = doc(db, 'userData', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as OnboardingData;
            setData(userData);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
    };
    
    loadUserData();
  }, [currentUser]);
  
  // Save data to localStorage and Firestore whenever it changes
  useEffect(() => {
    // Save to localStorage for non-authenticated users
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Save to Firestore for authenticated users
    const saveToFirestore = async () => {
      if (currentUser?.uid && Object.keys(data).length > 0) {
        try {
          const userDocRef = doc(db, 'userData', currentUser.uid);
          await setDoc(userDocRef, data, { merge: true });
        } catch (error) {
          console.error('Error saving user data to Firestore:', error);
        }
      }
    };
    
    saveToFirestore();
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
    
    // Also clear from Firestore if user is authenticated
    if (currentUser?.uid) {
      try {
        const userDocRef = doc(db, 'userData', currentUser.uid);
        setDoc(userDocRef, {}, { merge: false });
      } catch (error) {
        console.error('Error resetting user data in Firestore:', error);
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
