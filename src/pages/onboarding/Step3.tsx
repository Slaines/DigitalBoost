import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapIcon, GlobeIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import { serviceCategories } from './constants';
import EnhancedLocationSearch from '../../components/EnhancedLocationSearch';

const OnboardingStep3: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [locationInput, setLocationInput] = useState<string>(data.location || '');
  const [error, setError] = useState<string>('');
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.services || data.services.length === 0) {
      // If missing required data in context, redirect back to appropriate step
      setCurrentStep(1);
      navigate("/onboarding/Step1");
    } else if (!data.skills || data.skills.length === 0) {
      setCurrentStep(2);
      navigate("/onboarding/Step2");
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step two
    setCurrentStep(2);
    navigate("/onboarding/Step2");
  };
  
  const handleNext = () => {
    if (locationInput.trim()) {
      setError('');
      // Save to context
      updateData({ location: locationInput.trim() });
      setCurrentStep(4);
      navigate("/onboarding/Step4");
    } else {
      setError('Please enter your location');
    }
  };
  
  // Handle location selection
  const handleLocationSelect = (location: string) => {
    setLocationInput(location);
    setError('');
  };

  // Helper function to get service name from ID
  const getServiceName = (serviceId: string): string => {
    for (const category of serviceCategories) {
      const option = category.options.find(opt => opt.id === serviceId);
      if (option) return option.name;
    }
    return serviceId; // Fallback to ID if name not found
  };

  return (
    <OnboardingLayout
      currentStep={3}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!locationInput.trim()}
      nextLabel="Continue"
    >
      <div className="space-y-4">
        {/* Location Input - Larger and more beautiful */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-5 text-center">
            <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full w-14 h-14 mb-4">
              <GlobeIcon size={28} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Where are you located?</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              We'll connect you with the right professionals and services in your area.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
            <div className="mb-4">
              <label htmlFor="location-search" className="block text-sm font-medium text-gray-700 mb-2">
                Search for your city or region
              </label>
              <EnhancedLocationSearch
                value={locationInput}
                onChange={handleLocationSelect}
                placeholder="Type your city or region name..."
                className="text-base"
              />
            </div>
            
            {locationInput && (
              <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center">
                <MapIcon size={20} className="text-indigo-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Selected location:</div>
                  <div className="font-medium text-indigo-900">{locationInput}</div>
                </div>
              </div>
            )}
            
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-start text-xs text-gray-500">
                <div className="flex-shrink-0 mr-2 mt-0.5">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>
                  Your location helps us provide more relevant service recommendations. You can enter any city or region name.
                </p>
              </div>
            </div>
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

export default OnboardingStep3;
