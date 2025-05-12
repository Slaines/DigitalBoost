import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileTextIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import AnimatedTransition from '../../components/ui/AnimatedTransition';

const OnboardingStep8: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [projectContext, setProjectContext] = useState<string>(data.projectContext || '');
  const [charCount, setCharCount] = useState<number>(data.projectContext?.length || 0);
  
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
    } else if (!data.companyName) {
      setCurrentStep(4);
      navigate("/onboarding/Step4");
    } else if (!data.companySize) {
      setCurrentStep(5);
      navigate("/onboarding/Step5");
    } else if (!data.industry) {
      setCurrentStep(6);
      navigate("/onboarding/Step6");
    } else if (!data.budget) {
      setCurrentStep(7);
      navigate("/onboarding/Step7");
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step seven
    setCurrentStep(7);
    navigate("/onboarding/Step7");
  };
  
  const handleNext = () => {
    // Save project context to the context
    updateData({
      projectContext: projectContext.trim()
    });
    
    // Proceed to account creation or review
    setCurrentStep(9);
    navigate("/onboarding/review");
  };

  // Update character count
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setProjectContext(value);
    setCharCount(value.length);
  };

  return (
    <OnboardingLayout
      currentStep={8}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={projectContext.trim().length < 10}
      nextLabel="Review & Submit"
    >
      <div className="space-y-4">
        {/* Project Details - Larger and more beautiful */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-5 text-center">
            <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full w-14 h-14 mb-4">
              <FileTextIcon size={28} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Tell us about your project</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              Share any specific goals, challenges, or requirements for your project.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
            <div className="mb-4">
              <label htmlFor="projectContext" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your project in detail
              </label>
              <div className="relative">
                <textarea
                  id="projectContext"
                  rows={7}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                  placeholder="e.g., We're looking to redesign our e-commerce website to improve user experience and increase conversions. We need help with UI/UX design, implementing a new checkout process, and integrating with our existing inventory system..."
                  value={projectContext}
                  onChange={handleTextChange}
                ></textarea>
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {charCount} / 2000 characters
                </div>
              </div>
            </div>
            
            {/* No confirmation section needed as input is already visible */}
            
            <p className="text-sm text-gray-500 mt-4">
              The more details you provide, the better we can match you with the right professionals and solutions.
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep8;
