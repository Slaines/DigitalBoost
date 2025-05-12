import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';

// Company size options with ranges
interface CompanySizeOption {
  id: string;
  label: string;
  description: string;
  value: number; // Relative size value for the slider
}

const companySizeOptions: CompanySizeOption[] = [
  { id: "1", label: "1 person", description: "Just you", value: 1 },
  { id: "2-10", label: "2-10 people", description: "Small business or startup", value: 2 },
  { id: "11-50", label: "11-50 people", description: "Growing company", value: 3 },
  { id: "51-200", label: "51-200 people", description: "Medium business", value: 4 },
  { id: "201-500", label: "201-500 people", description: "Large business", value: 5 },
  { id: "501-1000", label: "501-1000 people", description: "Enterprise", value: 6 },
  { id: "1000+", label: "1000+ people", description: "Large enterprise", value: 7 },
];

const OnboardingStep5: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [selectedSize, setSelectedSize] = useState<string>(data.companySize || '');
  
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
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step four
    setCurrentStep(4);
    navigate("/onboarding/Step4");
  };
  
  const handleNext = () => {
    if (selectedSize) {
      // Save to context
      updateData({ companySize: selectedSize });
      
      // Navigate to the next step (Industry)
      setCurrentStep(6);
      navigate("/onboarding/Step6");
    }
  };



  return (
    <OnboardingLayout
      currentStep={5}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!selectedSize}
      nextLabel="Continue"
    >
      <div className="space-y-4">
        {/* Company Size Selection - Larger and more beautiful */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-5 text-center">
            <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full w-14 h-14 mb-4">
              <UsersIcon size={28} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">How large is your company?</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              This helps us tailor our recommendations to your organization's size and needs.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select the option that best describes your company
              </label>
              
              {/* Visual company size selector */}
              <div className="mb-8">
                <div className="relative pt-1">
                  {/* Selected size indicator - shows company name, size and description */}
                  <div className="text-center mb-6">
                    {selectedSize && (
                      <div className="mb-2">
                        <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full px-4 py-2">
                          <UsersIcon className="text-indigo-600 mr-2" size={18} />
                          <span className="font-medium text-indigo-900">
                            {companySizeOptions.find(opt => opt.id === selectedSize)?.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {companySizeOptions.find(opt => opt.id === selectedSize)?.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Custom range slider with circular handles */}
                  <input 
                    type="range" 
                    min="1" 
                    max="7" 
                    step="1"
                    value={companySizeOptions.find(opt => opt.id === selectedSize)?.value || 1}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      const option = companySizeOptions.find(opt => opt.value === value);
                      if (option) setSelectedSize(option.id);
                    }}
                    className="
                      appearance-none w-full h-2 rounded-lg bg-indigo-100 outline-none
                      cursor-pointer custom-range-slider focus:outline-none focus:ring-2 focus:ring-indigo-500
                    "
                    style={{
                      WebkitAppearance: 'none',
                    }}
                  />
                  
                  {/* Style for the custom range slider */}
                  <style jsx>{`
                    .custom-range-slider::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 28px;
                      height: 28px;
                      border-radius: 50%;
                      background: #fff;
                      border: 2px solid #6366f1;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                      cursor: pointer;
                    }
                    .custom-range-slider::-moz-range-thumb {
                      width: 28px;
                      height: 28px;
                      border-radius: 50%;
                      background: #fff;
                      border: 2px solid #6366f1;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                      cursor: pointer;
                    }
                  `}</style>
                  
                  {/* Size labels beneath the slider */}
                  <div className="flex justify-between mt-3 px-1 text-xs text-gray-600">
                    {companySizeOptions.map((option) => (
                      <div 
                        key={option.id} 
                        className={`cursor-pointer transition-all duration-200 ${selectedSize === option.id ? 'text-indigo-600 font-medium' : ''}`}
                        onClick={() => setSelectedSize(option.id)}
                      >
                        {option.id}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Visual size representation */}
                <div className="mt-8 flex justify-center">
                  <div className="flex items-end space-x-1 h-20">
                    {companySizeOptions.map((option) => {
                      const isSelected = selectedSize === option.id;
                      const heightClass = `h-${option.value * 10}`;
                      const widthClass = `w-${option.value + 4}`;
                        
                      return (
                        <div 
                          key={option.id}
                          onClick={() => setSelectedSize(option.id)}
                          className={`
                            ${heightClass} ${widthClass} 
                            transition-all duration-300 cursor-pointer rounded-t-md
                            ${isSelected ? 'bg-indigo-500' : 'bg-gray-300 hover:bg-gray-400'}
                          `}
                          style={{
                            height: `${option.value * 8}px`, 
                            width: `${30 + (option.value * 4)}px`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep5;
