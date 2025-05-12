import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseIcon, CheckIcon, BuildingIcon, SearchIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import AnimatedTransition from '../../components/ui/AnimatedTransition';

// Industry categories and options
interface IndustryCategory {
  name: string;
  industries: string[];
}

const industryCategories: IndustryCategory[] = [
  {
    name: "Technology",
    industries: ["Software Development", "Information Technology", "E-commerce", "Telecommunications"]
  },
  {
    name: "Professional Services",
    industries: ["Consulting", "Accounting", "Legal", "Marketing & Advertising"]
  },
  {
    name: "Healthcare & Sciences",
    industries: ["Healthcare", "Biotechnology", "Pharmaceuticals"]
  },
  {
    name: "Finance",
    industries: ["Banking & Financial Services", "Insurance"]
  },
  {
    name: "Creative",
    industries: ["Arts & Design", "Entertainment", "Media", "Fashion"]
  },
  {
    name: "Infrastructure",
    industries: ["Architecture & Planning", "Construction", "Real Estate", "Energy & Utilities"]
  },
  {
    name: "Retail & Consumer",
    industries: ["Retail", "Consumer Goods", "Hospitality", "Travel & Tourism"]
  },
  {
    name: "Other Industries",
    industries: ["Manufacturing", "Education", "Government", "Non-Profit", "Sports", "Transportation", "Other"]
  }
];

// Flatten all industries for searching
const allIndustries = industryCategories.flatMap(category => category.industries);

const OnboardingStep6: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [selectedIndustry, setSelectedIndustry] = useState<string>(data.industry || '');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
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
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step five
    setCurrentStep(5);
    navigate("/onboarding/Step5");
  };
  
  const handleNext = () => {
    if (selectedIndustry) {
      // Save to context
      updateData({ industry: selectedIndustry });
      
      // Navigate to the next step (Budget)
      setCurrentStep(7);
      navigate("/onboarding/Step7");
    }
  };

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
  };

  // Filter industries based on search term
  const filteredIndustries = searchTerm.trim() 
    ? allIndustries.filter(industry => 
        industry.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // Determine which industries to display based on active category and search term
  const getIndustriesToDisplay = () => {
    if (searchTerm.trim()) {
      return filteredIndustries;
    }
    if (activeCategory === 'all') {
      return allIndustries;
    }
    const category = industryCategories.find(cat => cat.name === activeCategory);
    return category ? category.industries : [];
  };

  const industriesToDisplay = getIndustriesToDisplay();

  return (
    <OnboardingLayout
      currentStep={6}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!selectedIndustry}
      nextLabel="Continue"

    >
      <div className="space-y-4">
        {/* Industry Selection - Larger and more beautiful */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-5 text-center">
            <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full w-14 h-14 mb-4">
              <BuildingIcon size={28} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">What industry are you in?</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto">
              This helps us tailor our solutions to your specific industry needs.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden p-6">
            <div className="mb-6">
              {/* Search bar */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for your industry..."
                  className="pl-10 w-full h-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Using a more compatible approach with direct CSS classes */}
              
              {/* Category tabs - only show when not searching */}
              {!searchTerm.trim() && (
                <div className="mb-6">
                  <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                    <button 
                      className={`flex-shrink-0 px-4 py-2 mr-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setActiveCategory('all')}
                    >
                      All Industries
                    </button>
                    {industryCategories.map(category => (
                      <button 
                        key={category.name}
                        className={`flex-shrink-0 px-4 py-2 mr-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.name ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={() => setActiveCategory(category.name)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Display matching industries */}
              {searchTerm.trim() && filteredIndustries.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No matching industries found. Try a different search term.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {industriesToDisplay.map((industry, index) => {
                    const isSelected = selectedIndustry === industry;
                    
                    return (
                      <AnimatedTransition 
                        key={industry} 
                        isVisible={true} 
                        direction="up" 
                        delay={100 + index * 10}
                      >
                        <div 
                          onClick={() => handleIndustrySelect(industry)}
                          className={`
                            flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200
                            ${isSelected 
                              ? 'bg-indigo-50 border border-indigo-200' 
                              : 'bg-white border border-gray-200 hover:border-gray-300'}
                          `}
                        >
                          <div className={`
                            flex items-center justify-center w-8 h-8 rounded-full mr-3
                            ${isSelected ? 'bg-indigo-100' : 'bg-gray-100'}
                          `}>
                            <BriefcaseIcon size={16} className={isSelected ? 'text-indigo-600' : 'text-gray-500'} />
                          </div>
                          <div className="truncate">
                            <h4 className="font-medium text-gray-800 truncate">{industry}</h4>
                          </div>
                          
                          {isSelected && (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 text-white ml-auto">
                              <CheckIcon size={14} />
                            </div>
                          )}
                        </div>
                      </AnimatedTransition>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* No confirmation section needed as selection is already visible */}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep6;
