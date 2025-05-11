import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

// Define the structure of our onboarding data
export interface OnboardingData {
  // Step 1: Service Selection
  service?: string;
  
  // Step 2: Skills Selection
  skills?: string[];
  
  // Step 3: Location
  location?: string;
  
  // Step 4: Company Information
  companyName?: string;
  
  // Step 5: Company Size
  companySize?: string;
  
  // Step 6: Industry
  industry?: string;
  
  // Step 7: Budget
  budget?: {
    type: string; // 'one-time' or 'monthly'
    range: string; // format: 'minBudget-maxBudget'
  };
  
  // Step 8: Project Details
  projectContext?: string;
  
  // Step 10: Account Creation
  // These fields are handled by AuthContext, but we include them here for completeness
  firstName?: string;
  lastName?: string;
  email?: string;
  
  // Step 11: Phone Verification
  phoneNumber?: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  resetData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isDataComplete: (requiredFields: (keyof OnboardingData)[]) => boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Local storage key for saving onboarding data
const STORAGE_KEY = 'digitalboost_onboarding_data';
const STEP_KEY = 'digitalboost_onboarding_step';

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  
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
  
  const value = {
    data,
    updateData,
    resetData,
    currentStep,
    setCurrentStep,
    isDataComplete
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
