import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSignIcon, CreditCardIcon, CalendarIcon, CheckIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import AnimatedTransition from '../../components/ui/AnimatedTransition';

// Budget ranges for one-time projects
const oneTimeBudgetRanges = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+"
];

// Budget ranges for monthly retainers
const monthlyBudgetRanges = [
  "Under $500/month",
  "$500 - $1,000/month",
  "$1,000 - $2,500/month",
  "$2,500 - $5,000/month",
  "$5,000 - $10,000/month",
  "$10,000+/month"
];

const OnboardingStep7: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [budgetType, setBudgetType] = useState<string>((data.budget?.type) || 'one-time');
  const [budgetRange, setBudgetRange] = useState<string>((data.budget?.range) || '');
  
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
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step six
    setCurrentStep(6);
    navigate("/onboarding/Step6");
  };
  
  const handleNext = () => {
    // Only proceed if a budget range has been selected
    if (budgetRange) {
      // Save budget info to context
      updateData({
        budget: {
          type: budgetType,
          range: budgetRange
        }
      });
      
      // Set current step and navigate to next step
      setCurrentStep(8);
      navigate("/onboarding/Step8");
    }
  };

  // Get the appropriate budget ranges based on selected type
  const budgetRanges = budgetType === 'one-time' ? oneTimeBudgetRanges : monthlyBudgetRanges;

  return (
    <OnboardingLayout
      currentStep={7}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!budgetRange}
      nextLabel="Continue"
    >
      <div className="space-y-4">
        {/* Budget Selection - Larger and more beautiful */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-5 text-center">
            <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full w-14 h-14 mb-4">
              <DollarSignIcon size={28} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">What's your budget?</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              This helps us recommend solutions that fit your financial parameters.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select your budget type
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  className={`
                    p-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center
                    ${budgetType === 'one-time' 
                      ? 'bg-brand-50 border-2 border-brand-500 shadow-sm' 
                      : 'bg-white border border-gray-200 hover:border-brand-200 hover:bg-brand-50'
                    }
                  `}
                  onClick={() => setBudgetType('one-time')}
                >
                  <div 
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                      ${budgetType === 'one-time' 
                        ? 'border-brand-500 bg-brand-500' 
                        : 'border-gray-300'
                      }
                    `}
                  >
                    {budgetType === 'one-time' && (
                      <CheckIcon size={12} className="text-white" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <CreditCardIcon size={18} className="text-gray-500 mr-2" />
                    <span className="font-medium">One-time Project</span>
                  </div>
                </div>
                
                <div 
                  className={`
                    p-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center
                    ${budgetType === 'monthly' 
                      ? 'bg-brand-50 border-2 border-brand-500 shadow-sm' 
                      : 'bg-white border border-gray-200 hover:border-brand-200 hover:bg-brand-50'
                    }
                  `}
                  onClick={() => setBudgetType('monthly')}
                >
                  <div 
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                      ${budgetType === 'monthly' 
                        ? 'border-brand-500 bg-brand-500' 
                        : 'border-gray-300'
                      }
                    `}
                  >
                    {budgetType === 'monthly' && (
                      <CheckIcon size={12} className="text-white" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon size={18} className="text-gray-500 mr-2" />
                    <span className="font-medium">Monthly Retainer</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select your budget range
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {budgetRanges.map((range, index) => (
                  <AnimatedTransition 
                    key={range} 
                    isVisible={true} 
                    direction="up" 
                    delay={300 + index * 50}
                  >
                    <div 
                      className={`
                        p-4 rounded-lg cursor-pointer transition-all duration-200 text-center
                        ${budgetRange === range
                          ? 'bg-brand-50 border-2 border-brand-500 shadow-sm'
                          : 'bg-white border border-gray-200 hover:border-brand-200 hover:bg-brand-50'
                        }
                      `}
                      onClick={() => setBudgetRange(range)}
                    >
                      <DollarSignIcon 
                        size={18} 
                        className={`mx-auto mb-2 ${budgetRange === range ? 'text-brand-600' : 'text-gray-500'}`} 
                      />
                      <span className={`${budgetRange === range ? 'font-medium text-brand-700' : 'text-gray-800'}`}>
                        {range}
                      </span>
                    </div>
                  </AnimatedTransition>
                ))}
              </div>
            </div>
            
            {/* No confirmation section needed as selection is already visible */}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep7;
