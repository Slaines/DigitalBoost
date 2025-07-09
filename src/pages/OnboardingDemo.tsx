import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import OnboardingLayout from '../components/layout/OnboardingLayout';
import OnboardingCard from '../components/ui/OnboardingCard';
import AnimatedTransition from '../components/ui/AnimatedTransition';

/**
 * Demo page to showcase the improved onboarding form elements
 */
const OnboardingDemo: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleNext = () => {
    if (selectedOption) {
      navigate('/onboarding/Step1');
    }
  };

  return (
    <OnboardingLayout
      title={<span>Choose an <span className="text-indigo-600">option</span> to continue</span>}
      subtitle="Select one of the options below to see the improved onboarding flow"
      currentStep={1}
      totalSteps={8}
      onNext={handleNext}
      nextDisabled={!selectedOption}
      nextLabel="Continue"
    >
      <div className="space-y-6 pb-4">
        <AnimatedTransition isVisible={true} direction="up" delay={100}>
          <p className="text-sm text-gray-600 mb-4">
            This demo showcases the following improvements:
          </p>
          
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 mb-6">
            <li>Sticky footer with prominent "Next" button</li>
            <li>Enhanced button styling with primary brand color</li>
            <li>Tooltip for disabled state</li>
            <li>Arrow icon to reinforce forward motion</li>
          </ul>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Option A', 'Option B', 'Option C', 'Option D'].map((option) => (
              <OnboardingCard 
                key={option}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedOption === option 
                    ? 'border-2 border-indigo-500 shadow-md' 
                    : 'hover:border-indigo-200 hover:shadow-sm'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className="p-4 flex items-center">
                  <div 
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                      ${selectedOption === option 
                        ? 'border-indigo-500 bg-indigo-500' 
                        : 'border-gray-300'
                      }
                    `}
                  >
                    {selectedOption === option && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-gray-800 font-medium">{option}</span>
                </div>
              </OnboardingCard>
            ))}
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={300}>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
            <h3 className="text-blue-800 font-medium mb-2 flex items-center">
              <ArrowRightIcon size={16} className="mr-2" />
              How to test
            </h3>
            <p className="text-sm text-blue-700">
              Select any option above to enable the "Continue" button. Notice how the button becomes 
              prominent and the tooltip disappears. When no option is selected, hover over the disabled 
              button to see the tooltip.
            </p>
          </div>
        </AnimatedTransition>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingDemo;
