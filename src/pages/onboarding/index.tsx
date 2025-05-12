import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOnboarding } from '../../context/OnboardingContext';
import { ONBOARDING_STEPS } from './constants';

/**
 * Root component for the onboarding flow
 * 
 * This component serves as the entry point for the onboarding process.
 * It checks the current step in the onboarding context and redirects
 * the user to the appropriate step page.
 */
const OnboardingRoot: React.FC = () => {
  const { getCurrentStepConfig } = useOnboarding();

  // Get the current step configuration
  const stepConfig = getCurrentStepConfig();

  // If there's no valid step config, default to step 1
  const path = stepConfig?.path || ONBOARDING_STEPS[0].path;

  // Redirect to the appropriate step path
  return <Navigate to={path} replace />;
};

export default OnboardingRoot;
