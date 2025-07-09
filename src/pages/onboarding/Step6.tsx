import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import { useClickOutside } from '../../utils/useClickOutside';

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
    name: "Healthcare",
    industries: ["Healthcare", "Biotechnology", "Pharmaceuticals", "Medical Devices"]
  },
  {
    name: "Finance",
    industries: ["Banking", "Financial Services", "Insurance", "Investment"]
  },
  {
    name: "Creative",
    industries: ["Arts & Design", "Entertainment", "Media", "Fashion"]
  },
  {
    name: "Other",
    industries: ["Manufacturing", "Education", "Government", "Non-Profit", "Transportation", "Other"]
  }
];

// Popular industries for the grid display - reduced to 6 for no scrollbars
const popularIndustries = [
  { id: "software", name: "Software Development", icon: Icons.Code },
  { id: "marketing", name: "Marketing & Advertising", icon: Icons.BarChart },
  { id: "healthcare", name: "Healthcare", icon: Icons.HeartPulse },
  { id: "finance", name: "Financial Services", icon: Icons.Landmark },
  { id: "consulting", name: "Consulting", icon: Icons.Briefcase },
  { id: "creative", name: "Arts & Design", icon: Icons.Palette }
];

// Flatten all industries for searching
const allIndustries = industryCategories.flatMap(category => category.industries);

const OnboardingStep6: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  
  // State for industry selection
  const [selectedIndustry, setSelectedIndustry] = useState<string>(data.industry || '');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isComboboxOpen, setIsComboboxOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [otherIndustry, setOtherIndustry] = useState<string>('');
  
  // Refs for UI elements
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle clicks outside combobox to close it
  useClickOutside(comboboxRef, () => setIsComboboxOpen(false));
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.services || data.services.length === 0) {
      // If missing required data, redirect back to appropriate step
      setCurrentStep(1);
      navigate("/onboarding/Step1");
    } else if (!data.serviceGoals || data.serviceGoals.length === 0) {
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

  // Effect to handle "Other" category selection
  useEffect(() => {
    setShowOtherInput(activeCategory === 'Other');
    if (activeCategory !== 'Other') {
      setOtherIndustry('');
    }
  }, [activeCategory]);

  // Effect to update selected industry when otherIndustry changes
  useEffect(() => {
    if (showOtherInput && otherIndustry.trim()) {
      setSelectedIndustry(''); // Clear any previous industry selection
    }
  }, [showOtherInput, otherIndustry]);
  
  // Navigation handlers
  const handleBack = () => {
    setCurrentStep(5);
    navigate("/onboarding/Step5");
  };
  
  const saveOtherIndustry = () => {
    if (otherIndustry.trim()) {
      try {
        // Save other industry without navigation
        console.log('Saving other industry:', otherIndustry.trim());
        setSelectedIndustry(otherIndustry.trim());
        updateData({ industry: otherIndustry.trim() });
        // Clear the input and reset the category
        setOtherIndustry('');
        setShowOtherInput(false);
        setActiveCategory('All');
      } catch (error) {
        console.error('Error saving industry:', error);
      }
    }
  };

  const handleNext = () => {
    if (selectedIndustry) {
      try {
        // Save the industry selection to context (if not already saved)
        updateData({ industry: selectedIndustry });
        
        // Navigate to the next step (Budget)
        setCurrentStep(7);
        window.location.href = "/onboarding/Step7";
      } catch (error) {
        console.error('Error navigating to next step:', error);
      }
    }
  };

  // Handle industry selection from dropdown or grid
  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    setSearchTerm(industry); // Update search term to match selection
    setIsComboboxOpen(false); // Close the dropdown
    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from input
    }
  };
  
  // Handle keyboard navigation in combobox
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isComboboxOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsComboboxOpen(true);
        return;
      }
    }
    
    const filteredOptions = getFilteredIndustries();
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleIndustrySelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsComboboxOpen(false);
        break;
      default:
        break;
    }
  };

  // Filter industries based on search term and active category
  const getFilteredIndustries = () => {
    let industries = allIndustries;
    
    // Filter by category if not 'all'
    if (activeCategory !== 'all') {
      const category = industryCategories.find(cat => cat.name === activeCategory);
      industries = category ? category.industries : [];
    }
    
    // Filter by search term if provided
    if (searchTerm.trim()) {
      industries = industries.filter(industry => 
        industry.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    return industries;
  };
  
  const filteredIndustries = getFilteredIndustries();

  return (
    <OnboardingLayout
      currentStep={6}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!selectedIndustry}
      nextLabel="Continue"
      title="Industry"
      subtitle="Select your primary industry"
    >
      <div className="w-full md:w-[90%] mx-auto px-3 pb-12">
        {/* Searchable Combobox */}
        <div className="relative mb-4" ref={comboboxRef}>
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <Icons.Search size={14} className="text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search industry..."
            className="pl-8 w-full h-9 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsComboboxOpen(true);
              setHighlightedIndex(-1);
            }}
            onFocus={() => setIsComboboxOpen(true)}
            onKeyDown={handleKeyDown}
            aria-expanded={isComboboxOpen}
            aria-autocomplete="list"
            aria-controls="industry-listbox"
          />
          
          {/* Combobox Dropdown */}
          {isComboboxOpen && filteredIndustries.length > 0 && (
            <ul 
              id="industry-listbox"
              role="listbox"
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {filteredIndustries.map((industry, index) => (
                <li
                  key={industry}
                  role="option"
                  aria-selected={selectedIndustry === industry}
                  className={`
                    px-3 py-2 text-sm cursor-pointer
                    ${highlightedIndex === index ? 'bg-indigo-50' : ''}
                    ${selectedIndustry === industry ? 'bg-indigo-100 font-medium' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => handleIndustrySelect(industry)}
                >
                  {industry}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Category Pills */}
        <div className="mb-4">
          <div className="flex flex-wrap pb-1">
            <button 
              className={`px-2 py-0.5 mr-1 mb-1 rounded-full text-xs font-medium transition-colors ${activeCategory === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {industryCategories.map(category => (
              <button 
                key={category.name}
                className={`px-2 py-0.5 mr-1 mb-1 rounded-full text-xs font-medium transition-colors ${activeCategory === category.name ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* "Other" text input or Popular Industries Grid */}
        {showOtherInput ? (
          <div className="mb-4">
            <label htmlFor="other-industry" className="block text-sm font-medium text-gray-700 mb-1">
              Please specify your industry
            </label>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (otherIndustry.trim()) {
                saveOtherIndustry();
              }
            }}>
              <div className="flex items-center">
                <input
                  id="other-industry"
                  type="text"
                  className="w-full h-9 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 px-3"
                  value={otherIndustry}
                  onChange={(e) => setOtherIndustry(e.target.value)}
                  placeholder="Enter your industry"
                  autoFocus
                />
                <button 
                  type="submit"
                  className={`ml-2 h-9 px-3 rounded-md text-xs bg-indigo-600 text-white flex items-center ${!otherIndustry.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                  disabled={!otherIndustry.trim()}
                >
                  <Icons.Check size={12} className="mr-1" />
                  Save
                </button>
              </div>
            </form>
            {/* No additional content needed here */}
          </div>
        ) : (
          <>
            {/* Popular Industries Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-3">
              {popularIndustries.map((industry) => {
                const isSelected = selectedIndustry === industry.name;
                return (
                  <div 
                    key={industry.id}
                    onClick={() => handleIndustrySelect(industry.name)}
                    className={`
                      flex items-center p-2 rounded-md cursor-pointer transition-all
                      ${isSelected 
                        ? 'bg-indigo-50 border border-indigo-200' 
                        : 'bg-white border border-gray-100 hover:border-gray-200'}
                      h-10
                    `}
                  >
                    <div className={`
                      flex items-center justify-center w-6 h-6 rounded-full mr-2 flex-shrink-0
                      ${isSelected ? 'bg-indigo-100' : 'bg-gray-50'}
                    `}>
                      <industry.icon size={12} className={isSelected ? 'text-indigo-600' : 'text-gray-500'} />
                    </div>
                    <div className="truncate flex-grow">
                      <span className="font-medium text-gray-800 text-xs truncate">{industry.name}</span>
                    </div>
                    
                    {isSelected && (
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-white ml-auto flex-shrink-0">
                        <Icons.Check size={10} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* "More Industries" link */}
            <button 
              onClick={() => setIsComboboxOpen(true)}
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <Icons.Plus size={14} className="mr-1" />
              More industries...
            </button>
          </>
        )}
      </div>

      {/* Selected Industry Display (outside the other conditions) */}
      {selectedIndustry && !showOtherInput && (
        <div className="mb-4 mt-2">
          <p className="text-sm font-medium text-gray-700">Your selected industry:</p>
          <div className="mt-1 flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              <Icons.Briefcase size={14} className="mr-1" />
              {selectedIndustry}
            </span>
            <button 
              onClick={() => {
                setSelectedIndustry('');
                setActiveCategory('All');
                updateData({ industry: '' });
              }}
              className="ml-2 text-xs text-gray-500 hover:text-red-500"
              aria-label="Change industry"
            >
              <Icons.X size={14} />
            </button>
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
};

export default OnboardingStep6;
