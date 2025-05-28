import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon, Building2Icon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';

const OnboardingStep4: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [companyName, setCompanyName] = useState<string>(data.companyName || '');
  const [error, setError] = useState<string>('');

  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.services || data.services.length === 0) {
      // If missing required data, redirect back to appropriate step
      setCurrentStep(1);
      navigate("/onboarding/Step1");
    } else if (!data.skills || data.skills.length === 0) {
      setCurrentStep(2);
      navigate("/onboarding/Step2");
    } else if (!data.location) {
      setCurrentStep(3);
      navigate("/onboarding/Step3");
    }
    // Removed the automatic error setting that was causing the validation error to appear immediately
  }, [data, navigate, setCurrentStep]);

  const handleBack = () => {
    // Navigate back to step three
    setCurrentStep(3);
    navigate("/onboarding/Step3");
  };

  const handleNext = () => {
    if (companyName.trim()) {
      setError('');
      // Save to context
      updateData({ companyName: companyName.trim() });
      setCurrentStep(5);
      navigate("/onboarding/Step5");
    } else {
      setError('Please enter your company name');
    }
  };



  return (
    <OnboardingLayout
      currentStep={4}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!companyName.trim()}
      nextLabel="Continue"
    >
      <div className="space-y-4">
        {/* Company Name Input - Larger and more beautiful */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-5 text-center">
            <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full w-14 h-14 mb-4">
              <Building2Icon size={28} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">What's your company name?</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              This helps us personalize your experience and our recommendations.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
            <div className="mb-4">
              <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your company or business name
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BuildingIcon size={18} className="text-gray-400" />
                </div>
                
                <input
                  id="company-name"
                  type="text"
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="e.g. Acme Corporation"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            
            {/* No confirmation section needed as input is already visible */}
          </div>
          
          {error && (
            <div className="mt-3 px-4 py-3 bg-red-50 border border-red-200 text-sm text-red-700 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Please fix this issue:</h3>
                  <div className="mt-1">{error}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep4;
