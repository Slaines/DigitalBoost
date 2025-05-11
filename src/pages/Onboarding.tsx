import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon, XIcon, ArrowRightIcon, PlusIcon, XCircleIcon } from "lucide-react";
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';
import CityAutocomplete from "../components/CityAutocomplete";
import { useOnboarding } from '../context/OnboardingContext';
import MiniProgressBar from "../components/MiniProgressBar";

// Define service categories and their options
type ServiceOption = {
  id: string;
  name: string;
};

type ServiceCategory = {
  name: string;
  options: ServiceOption[];
};

const serviceCategories: ServiceCategory[] = [
  {
    name: "Advertising & Marketing",
    options: [
      { id: "social-media-marketing", name: "Social Media Marketing" },
      { id: "email-marketing", name: "Email Marketing" },
      { id: "ppc-advertising", name: "PPC Advertising" },
      { id: "seo-optimization", name: "SEO Optimization" },
      { id: "content-marketing", name: "Content Marketing" },
    ],
  },
  {
    name: "Creative & Visual",
    options: [
      { id: "brand-strategy", name: "Brand Strategy" },
      { id: "content-creation", name: "Content Creation" },
      { id: "graphic-design", name: "Graphic Design" },
      { id: "video-production", name: "Video Production" },
    ],
  },
  {
    name: "Development & Product",
    options: [
      { id: "website-development", name: "Website Development" },
      { id: "app-development", name: "App Development" },
      { id: "e-commerce", name: "E-commerce Solutions" },
      { id: "ui-ux-design", name: "UI/UX Design" },
    ],
  },
  {
    name: "IT Services",
    options: [
      { id: "analytics-reporting", name: "Analytics & Reporting" },
      { id: "cloud-services", name: "Cloud Services" },
      { id: "cybersecurity", name: "Cybersecurity" },
      { id: "tech-support", name: "Technical Support" },
    ],
  },
];

// List of all development-related skills
const allSkills = [
  "IoT Development", "CI Integration", "Bot Development",
  "Progressive Web App", "Programming", 
  "Symfony Development", "Testing Services",
  "Prototype Development", "DevOps Implementation",
  "DevOps Automation", "Drupal Development",
  "Wordpress Development", "Full Stack Development",
  "DevOps", "Ecommerce Hosting",
  "WEM Modeler Development", "Internet of Things",
  "Computer Simulation", "Open Source Development",
  "Spring Development", "Quantitative Analysis",
  "OutSystems Development", "Xano Development"
];

// Create a second page component that shows skills as pill buttons
export const OnboardingStepTwo: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  // We don't need to modify selectedService, so we don't need the setter
  const selectedService = data.service || "";
  const [selectedSkills, setSelectedSkills] = useState<string[]>(data.skills || []);
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.service) {
      // If no service in context, redirect back to first step
      setCurrentStep(1);
      navigate("/onboarding");
    }
  }, [data.service, navigate, setCurrentStep]);
  
  const handleBack = () => {
    setCurrentStep(1);
    navigate("/onboarding");
  };
  
  const handleNext = () => {
    // Save selected skills to context
    updateData({
      skills: selectedSkills
    });
    
    // Set current step and navigate to next step
    setCurrentStep(3);
    navigate('/onboarding/step-three');
  };
  
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo and close button */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Mini progress bar */}
      <MiniProgressBar />

      {/* Main content with skills */}
      <div className="flex-grow flex flex-col justify-start pt-16">
        <div className="max-w-xl w-full mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 whitespace-nowrap">
              What <span className="text-indigo-600 font-bold">skills</span> do you need?
            </h1>
          </div>
          
          {/* Selected service and skills in a box */}
          <div className="mb-8 border border-gray-200 rounded-md p-4">
            <div className="mb-2 text-sm font-medium text-gray-500">Web Application</div>
            <div className="flex flex-wrap">
              <div className="inline-flex items-center bg-gray-100 rounded-md py-1.5 pl-3 pr-1 mr-2 mb-2">
                <span className="text-gray-800 mr-1">{selectedService}</span>
                <button 
                  onClick={() => navigate("/onboarding")} 
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <XCircleIcon size={16} className="text-gray-500" />
                </button>
              </div>
              
              {selectedSkills.map(skill => (
                <div key={skill} className="inline-flex items-center bg-gray-100 rounded-md py-1.5 pl-3 pr-1 mr-2 mb-2">
                  <span className="text-gray-800 mr-1">{skill}</span>
                  <button 
                    onClick={() => toggleSkill(skill)} 
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <XCircleIcon size={16} className="text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* All skills as pill buttons with plus icons */}
          <div className="mb-10">
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="inline-flex items-center border border-gray-200 rounded-md py-1.5 px-3 mr-2 mb-2 hover:border-gray-300 transition-colors"
              >
                <span className="text-gray-800 mr-1">{skill}</span>
                <PlusIcon size={16} className="text-gray-500" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Back and Next buttons */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Next
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [selectedService, setSelectedService] = useState<string>(data.service || "");
  
  // Set current step when component mounts
  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);
  
  const handleNext = () => {
    if (selectedService) {
      // Save selected service to context
      updateData({ service: selectedService });
      
      // Set current step and navigate to next step
      setCurrentStep(2);
      navigate("/onboarding/step-two");
    }
  };

  // Close button handler
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo and close button - clearly separated */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={handleClose}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Mini progress bar */}
      <MiniProgressBar />

      {/* Main content - moved higher on page */}
      <div className="flex-grow flex flex-col justify-start pt-20">
        <div className="max-w-md w-full mx-auto px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 whitespace-nowrap">
              What <span className="text-indigo-600 font-bold">service</span> do you need?
            </h1>
          </div>

          {/* Service selection dropdown */}
          <div className="relative w-full mb-16 max-w-lg mx-auto">
            <Listbox value={selectedService} onChange={setSelectedService}>
              <div className="relative">
                <Listbox.Button className="relative w-full py-3 pl-5 pr-10 text-left bg-white border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                  <span className={`block truncate text-lg ${!selectedService ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                    {selectedService || "Select a service"}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {serviceCategories.map((category) => (
                      <div key={category.name}>
                        {/* Non-clickable category header */}
                        <div className="py-2 px-4 text-base font-medium text-gray-500 bg-gray-50">
                          {category.name}
                        </div>
                        
                        {/* Clickable service options */}
                        {category.options.map((option) => (
                          <Listbox.Option
                            key={option.id}
                            className={({ active }) =>
                              `${active ? 'bg-indigo-50 text-indigo-900' : 'text-gray-900'}
                                cursor-pointer select-none relative py-3 pl-10 pr-4`
                            }
                            value={option.name}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate text-lg`}>
                                  {option.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </div>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>

      {/* Footer with Next button - clearly separated */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-end max-w-7xl mx-auto">
          <button
            onClick={handleNext}
            disabled={!selectedService}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center ${!selectedService ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            Next
            {selectedService && (
              <ArrowRightIcon size={16} className="ml-2" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};



// Create a third page component for location selection
export const OnboardingStepThree: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  
  const [locationInput, setLocationInput] = useState<string>(data.location || "");
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.service || !data.skills) {
      // If missing required data in context, redirect back to appropriate step
      if (!data.service) {
        setCurrentStep(1);
        navigate("/onboarding");
      } else if (!data.skills) {
        setCurrentStep(2);
        navigate("/onboarding/step-two");
      }
    }
  }, [data, navigate, setCurrentStep]);
  
  // Update local state when context data changes
  useEffect(() => {
    if (data.location) {
      setLocationInput(data.location);
    }
  }, [data.location]);
  
  const handleBack = () => {
    // Navigate back to step two
    setCurrentStep(2);
    navigate("/onboarding/step-two");
  };
  
  const handleNext = () => {
    if (locationInput) {
      // Save to context instead of URL
      updateData({ location: locationInput });
      setCurrentStep(4);
      navigate("/onboarding/step-four");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo and close button */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Mini progress bar */}
      <MiniProgressBar />

      {/* Main content with location input */}
      <div className="flex-grow flex flex-col justify-start pt-16">
        <div className="max-w-xl w-full mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 whitespace-nowrap">
              <span className="text-indigo-600 font-bold">Where</span> are you located?
            </h1>
          </div>
          
          {/* Location input field with autocomplete */}
          <div className="mb-10">
            <CityAutocomplete
              value={locationInput}
              onChange={setLocationInput}
              placeholder="Add a location (city, region or country)"
            />
          </div>
        </div>
      </div>

      {/* Footer with Back and Next buttons */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center ${locationInput ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!locationInput}
          >
            Next
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// Create a fourth page component for company name input
export const OnboardingStepFour: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [companyName, setCompanyName] = useState<string>(data.companyName || "");
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.service || !data.skills || !data.location) {
      // If missing required data in context, redirect back to appropriate step
      if (!data.service) {
        setCurrentStep(1);
        navigate("/onboarding");
      } else if (!data.skills) {
        setCurrentStep(2);
        navigate("/onboarding/step-two");
      } else if (!data.location) {
        setCurrentStep(3);
        navigate("/onboarding/step-three");
      }
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step three
    setCurrentStep(3);
    navigate("/onboarding/step-three");
  };
  
  const handleNext = () => {
    if (companyName) {
      // Save company name to context
      updateData({ companyName });
      
      // Set current step and navigate to next step
      setCurrentStep(5);
      navigate("/onboarding/step-five");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo and close button */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Mini progress bar */}
      <MiniProgressBar />

      {/* Main content with company name input */}
      <div className="flex-grow flex flex-col justify-start pt-16">
        <div className="max-w-xl w-full mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 whitespace-nowrap">
              What is your <span className="text-indigo-600 font-bold">company</span> name?
            </h1>
          </div>
          
          {/* Company name input field */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          {/* Confidentiality notice */}
          <div className="mb-10">
            <div className="bg-gray-100 rounded-md p-3 flex items-center">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-gray-600">Confidential: nothing is shared without your consent.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Back and Next buttons */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center ${companyName ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!companyName}
          >
            Next
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// Company size options
type CompanySizeOption = {
  id: string;
  label: string;
};

const companySizeOptions: CompanySizeOption[] = [
  { id: "1", label: "1 person" },
  { id: "2-10", label: "2-10 people" },
  { id: "11-50", label: "11-50 people" },
  { id: "51-100", label: "51-100 people" },
  { id: "101-500", label: "101-500 people" },
  { id: "501-1000", label: "501-1000 people" },
  { id: "1001-5000", label: "1001-5000 people" },
  { id: "5000+", label: "5000-100000 people" },
];

// Create a fifth page component for company size selection
export const OnboardingStepFive: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [companySize, setCompanySize] = useState<string>(data.companySize || "");
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.service || !data.skills || !data.location || !data.companyName) {
      // If missing required data in context, redirect back to appropriate step
      if (!data.service) {
        setCurrentStep(1);
        navigate("/onboarding");
      } else if (!data.skills) {
        setCurrentStep(2);
        navigate("/onboarding/step-two");
      } else if (!data.location) {
        setCurrentStep(3);
        navigate("/onboarding/step-three");
      } else if (!data.companyName) {
        setCurrentStep(4);
        navigate("/onboarding/step-four");
      }
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step four
    setCurrentStep(4);
    navigate("/onboarding/step-four");
  };
  
  const handleNext = () => {
    if (companySize) {
      // Save company size to context
      updateData({ companySize });
      
      // Set current step and navigate to next step
      setCurrentStep(6);
      navigate("/onboarding/step-six");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo and close button */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Mini progress bar */}
      <MiniProgressBar />

      {/* Main content with company size selection */}
      <div className="flex-grow flex flex-col justify-start pt-16">
        <div className="max-w-xl w-full mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 whitespace-nowrap">
              What is your company <span className="text-indigo-600 font-bold">size</span>?
            </h1>
          </div>
          
          {/* Company size radio buttons */}
          <div className="mb-10 space-y-3">
            {companySizeOptions.map((option) => (
              <label 
                key={option.id} 
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="companySize"
                  value={option.id}
                  checked={companySize === option.id}
                  onChange={() => setCompanySize(option.id)}
                  className="form-radio h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Back and Next buttons */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center ${companySize ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!companySize}
          >
            Next
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// Industry options
const industryOptions: string[] = [
  "Accounting",
  "Architecture & Planning",
  "Art & Handcraft",
  "Automotive",
  "Aviation & Aerospace",
  "Banking & Financials",
  "Beauty",
  "Beverage",
  "Clothing & Accessories",
  "Construction",
  "Consumer Electronics",
  "E-commerce",
  "Education",
  "Energy & Oil",
  "Entertainment & Events",
  "Farming",
  "Food",
  "Government & Administration",
  "Home Services",
  "Hospitals & Healthcare",
  "Household Products",
  "Human Resources",
  "Industrial Goods & Services",
  "Insurance",
  "Internet",
  "Legal Services",
  "Logistics & Supply Chain",
  "Luxury Goods & Jewelry",
  "Management Consulting",
  "Marketing & Advertising",
  "Media",
  "Military",
  "Music",
  "Non-profit",
  "Office/Room/Space Renting",
  "Others",
  "Pets",
  "Pharmaceuticals & Biotech",
  "Political Organization",
  "Publishing",
  "Real Estate",
  "Restaurants",
  "Retail",
  "Software & Computer Services",
  "Sports",
  "Storage",
  "Technology Hardware & Equipment",
  "Telecommunications",
  "Tobacco",
  "Toys",
  "Transportation",
  "Travel & Leisure",
  "Utilities",
  "Video games",
  "Wine & Spirits"
];

// Create a sixth page component for industry selection
export const OnboardingStepSix: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [industry, setIndustry] = useState<string>(data.industry || "");
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.service || !data.skills || !data.location || !data.companyName || !data.companySize) {
      // If missing required data in context, redirect back to appropriate step
      if (!data.service) {
        setCurrentStep(1);
        navigate("/onboarding");
      } else if (!data.skills) {
        setCurrentStep(2);
        navigate("/onboarding/step-two");
      } else if (!data.location) {
        setCurrentStep(3);
        navigate("/onboarding/step-three");
      } else if (!data.companyName) {
        setCurrentStep(4);
        navigate("/onboarding/step-four");
      } else if (!data.companySize) {
        setCurrentStep(5);
        navigate("/onboarding/step-five");
      }
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step five
    setCurrentStep(5);
    navigate("/onboarding/step-five");
  };
  
  const handleNext = () => {
    if (industry) {
      // Save industry to context
      updateData({ industry });
      
      // Set current step and navigate to next step
      setCurrentStep(7);
      navigate("/onboarding/step-seven");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo and close button */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Mini progress bar */}
      <MiniProgressBar />

      {/* Main content with industry selection */}
      <div className="flex-grow flex flex-col justify-start pt-16">
        <div className="max-w-xl w-full mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 whitespace-nowrap">
              In which <span className="text-indigo-600 font-bold">industry</span> do you work?
            </h1>
          </div>
          
          {/* Industry radio buttons */}
          <div className="mb-10 space-y-3 max-h-96 overflow-y-auto pr-4">
            {industryOptions.map((option) => (
              <label 
                key={option} 
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="industry"
                  value={option}
                  checked={industry === option}
                  onChange={() => setIndustry(option)}
                  className="form-radio h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Back and Next buttons */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center ${industry ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!industry}
          >
            Next
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// Create a seventh page component for budget selection
export const OnboardingStepSeven: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  
  // Initialize state from context if available
  const [budgetType, setBudgetType] = useState<string>(data.budget?.type || "one-time");
  const [minBudget, setMinBudget] = useState<number>(10000);
  const [maxBudget, setMaxBudget] = useState<number>(50000);
  const [noBudgetYet, setNoBudgetYet] = useState<boolean>(false);
  
  // Initialize budget range from context if available
  useEffect(() => {
    if (data.budget?.range) {
      const [min, max] = data.budget.range.split('-').map(Number);
      if (!isNaN(min)) setMinBudget(min);
      if (!isNaN(max)) setMaxBudget(max);
    }
  }, [data.budget]);
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.service || !data.skills || !data.location || !data.companyName || !data.companySize || !data.industry) {
      // If missing required data in context, redirect back to appropriate step
      if (!data.service) {
        setCurrentStep(1);
        navigate("/onboarding");
      } else if (!data.skills) {
        setCurrentStep(2);
        navigate("/onboarding/step-two");
      } else if (!data.location) {
        setCurrentStep(3);
        navigate("/onboarding/step-three");
      } else if (!data.companyName) {
        setCurrentStep(4);
        navigate("/onboarding/step-four");
      } else if (!data.companySize) {
        setCurrentStep(5);
        navigate("/onboarding/step-five");
      } else if (!data.industry) {
        setCurrentStep(6);
        navigate("/onboarding/step-six");
      }
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step six
    setCurrentStep(6);
    navigate("/onboarding/step-six");
  };
  
  const handleNext = () => {
    // Save budget information to context
    if (!noBudgetYet) {
      updateData({
        budget: {
          type: budgetType,
          range: `${minBudget}-${maxBudget}`
        }
      });
    } else {
      // If no budget yet, still save the budget type but with empty range
      updateData({
        budget: {
          type: budgetType,
          range: ''
        }
      });
    }
    
    // Set current step and navigate to next step
    setCurrentStep(8);
    navigate("/onboarding/step-eight");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo and close button */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Mini progress bar */}
      <MiniProgressBar />

      {/* Main content with project context textarea */}
      <div className="flex-grow flex flex-col justify-start pt-16">
        <div className="max-w-xl w-full mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              What <span className="text-indigo-600 font-bold">budget</span> range would be
              <div>comfortable for you?</div>
            </h1>
          </div>
          
          {/* Budget type selection */}
          <div className="mb-6 flex rounded-md overflow-hidden">
            <button
              onClick={() => setBudgetType("one-time")}
              className={`flex-1 py-3 text-center ${budgetType === "one-time" ? 'bg-white' : 'bg-gray-100 text-gray-600'}`}
            >
              One-time fee
            </button>
            <button
              onClick={() => setBudgetType("monthly")}
              className={`flex-1 py-3 text-center ${budgetType === "monthly" ? 'bg-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Monthly fee
            </button>
          </div>
          
          {/* Budget description */}
          <div className="mb-6 text-gray-700">
            For {data.service || "this service"}, the most common price range is €10,000 - €50,000.
          </div>
          
          {/* Budget slider */}
          <div className="mb-8">
            <div className="relative mb-2">
              <div className="h-1 bg-gray-200 w-full rounded-full">
                <div 
                  className="h-1 bg-indigo-600 rounded-full absolute top-0 left-0" 
                  style={{ width: `${((maxBudget - 0) / (5000000 - 0)) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-4">
                <div>€0</div>
                <div>€5M</div>
              </div>
              <div className="flex justify-between absolute w-full" style={{ top: '-10px' }}>
                <div 
                  className="h-5 w-5 bg-indigo-600 rounded-full border-2 border-white cursor-pointer flex items-center justify-center text-xs text-white"
                  style={{ left: `${((minBudget - 0) / (5000000 - 0)) * 100}%`, position: 'absolute' }}
                  onClick={() => {
                    // Open a dialog to set min budget
                    const newValue = prompt("Enter minimum budget in thousands (e.g., 10 for 10k):", String(minBudget / 1000));
                    if (newValue && !isNaN(Number(newValue))) {
                      const newBudget = Number(newValue) * 1000;
                      if (newBudget < maxBudget) {
                        setMinBudget(newBudget);
                      } else {
                        alert("Minimum budget must be less than maximum budget");
                      }
                    }
                  }}
                >
                  €{(minBudget / 1000)}k
                </div>
                <div 
                  className="h-5 w-5 bg-indigo-600 rounded-full border-2 border-white cursor-pointer flex items-center justify-center text-xs text-white"
                  style={{ left: `${((maxBudget - 0) / (5000000 - 0)) * 100}%`, position: 'absolute' }}
                  onClick={() => {
                    // Open a dialog to set max budget
                    const newValue = prompt("Enter maximum budget in thousands (e.g., 50 for 50k):", String(maxBudget / 1000));
                    if (newValue && !isNaN(Number(newValue))) {
                      const newBudget = Number(newValue) * 1000;
                      if (newBudget > minBudget) {
                        setMaxBudget(newBudget);
                      } else {
                        alert("Maximum budget must be greater than minimum budget");
                      }
                    }
                  }}
                >
                  €{(maxBudget / 1000)}k
                </div>
              </div>
            </div>
          </div>
          
          {/* No budget checkbox */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={noBudgetYet}
                onChange={(e) => setNoBudgetYet(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700">We have not set the budget yet</span>
            </label>
          </div>
        </div>
      </div>

      {/* Footer with Back and Next buttons */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center bg-indigo-600 text-white hover:bg-indigo-700"
            disabled={false}
          >
            Next
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// Create an eighth page component for project context and goals
export const OnboardingStepEight: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [projectContext, setProjectContext] = useState<string>(data.projectContext || "");
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    if (!data.service || !data.skills || !data.location || !data.companyName || 
        !data.companySize || !data.industry || !data.budget) {
      // If missing required data in context, redirect back to appropriate step
      if (!data.service) {
        setCurrentStep(1);
        navigate("/onboarding");
      } else if (!data.skills) {
        setCurrentStep(2);
        navigate("/onboarding/step-two");
      } else if (!data.location) {
        setCurrentStep(3);
        navigate("/onboarding/step-three");
      } else if (!data.companyName) {
        setCurrentStep(4);
        navigate("/onboarding/step-four");
      } else if (!data.companySize) {
        setCurrentStep(5);
        navigate("/onboarding/step-five");
      } else if (!data.industry) {
        setCurrentStep(6);
        navigate("/onboarding/step-six");
      } else if (!data.budget) {
        setCurrentStep(7);
        navigate("/onboarding/step-seven");
      }
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step seven
    setCurrentStep(7);
    navigate("/onboarding/step-seven");
  };
  
  const handleNext = () => {
    // Save project context to context
    updateData({ projectContext });
    
    // Set current step and navigate to processing page
    setCurrentStep(9);
    navigate("/onboarding/processing");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo and close button */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Mini progress bar */}
      <MiniProgressBar />

      {/* Main content with project context textarea */}
      <div className="flex-grow flex flex-col justify-start pt-16">
        <div className="max-w-xl w-full mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              What are the <span className="text-indigo-600 font-bold">context and goals</span> of
              <div>your project?</div>
            </h1>
          </div>
          
          {/* Project context textarea */}
          <div className="mb-10">
            <textarea
              value={projectContext}
              onChange={(e) => setProjectContext(e.target.value)}
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="Write a description of your project"
            />
          </div>
        </div>
      </div>

      {/* Footer with Back and Next buttons */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center ${projectContext.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!projectContext.trim()}
          >
            Next
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};

// Create a processing page component with animation and success stories
export const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, setCurrentStep } = useOnboarding();
  const [processingComplete, setProcessingComplete] = useState<boolean>(false);
  const [animationState, setAnimationState] = useState<'spinning' | 'transitioning' | 'complete'>('spinning');
  
  // Validate that we have the necessary data in context
  useEffect(() => {
    // Check if we have all required data in the context
    if (!data.service || !data.skills || !data.location || !data.companyName || 
        !data.companySize || !data.industry || !data.budget || !data.projectContext) {
      // If missing required data in context, redirect back to appropriate step
      if (!data.service) {
        setCurrentStep(1);
        navigate("/onboarding");
      } else if (!data.skills) {
        setCurrentStep(2);
        navigate("/onboarding/step-two");
      } else if (!data.location) {
        setCurrentStep(3);
        navigate("/onboarding/step-three");
      } else if (!data.companyName) {
        setCurrentStep(4);
        navigate("/onboarding/step-four");
      } else if (!data.companySize) {
        setCurrentStep(5);
        navigate("/onboarding/step-five");
      } else if (!data.industry) {
        setCurrentStep(6);
        navigate("/onboarding/step-six");
      } else if (!data.budget) {
        setCurrentStep(7);
        navigate("/onboarding/step-seven");
      } else if (!data.projectContext) {
        setCurrentStep(8);
        navigate("/onboarding/step-eight");
      }
      return;
    }
    
    // Set current step
    setCurrentStep(9);
    
    // Simulate processing for 2.5 seconds
    const timer1 = setTimeout(() => {
      setAnimationState('transitioning');
      
      // After a short transition period, show the checkmark
      const timer2 = setTimeout(() => {
        setAnimationState('complete');
        setProcessingComplete(true);
      }, 500);
      
      return () => clearTimeout(timer2);
    }, 2500);
    
    return () => clearTimeout(timer1);
  }, [data, navigate, setCurrentStep]);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        {/* Processing animation with transition to checkmark */}
        <div className="flex justify-center items-center mb-8">
          <div className="relative h-16 w-16">
            {/* All animation states are absolutely positioned in the same container */}
            {animationState === 'spinning' && (
              <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-b-2 border-indigo-600"></div>
            )}
            
            {animationState === 'transitioning' && (
              <div className="absolute inset-0 rounded-full border-2 border-green-500 transition-all duration-500 scale-110 opacity-70"></div>
            )}
            
            {animationState === 'complete' && (
              <div className="absolute inset-0 rounded-full bg-green-500 flex items-center justify-center transition-all duration-500 animate-scaleIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 text-center text-lg transition-all duration-300">
          {animationState !== 'complete' 
            ? `Processing your answers...` 
            : `Your answers have been processed!`}
        </p>
        
        {/* Redirect after processing */}
        {processingComplete && (
          <div className="mt-8 animate-fadeIn">
            <button
              onClick={() => {
                // Set current step and navigate to review page instead of account creation
                setCurrentStep(9);
                navigate('/onboarding/review');
              }}
              className="px-8 py-3 rounded-md text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Create an account creation page component
export const AccountCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, signInWithApple, error, clearError } = useAuth();
  const { data, updateData, setCurrentStep } = useOnboarding();
  
  const [firstName, setFirstName] = useState<string>(data.firstName || "");
  const [lastName, setLastName] = useState<string>(data.lastName || "");
  const [email, setEmail] = useState<string>(data.email || "");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Clear any Firebase auth errors when component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);
  
  // Set form error when Firebase auth error changes
  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);
  
  // Validate form
  useEffect(() => {
    // Simplified validation - password can be anything but must match confirmation
    setIsFormValid(
      firstName.trim() !== "" && 
      lastName.trim() !== "" && 
      email.trim() !== "" && 
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 
      password.length > 0 &&
      password === confirmPassword &&
      termsAccepted
    );
  }, [firstName, lastName, email, password, confirmPassword, termsAccepted]);
  
  // Handle email/password sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    try {
      setIsLoading(true);
      setFormError(null);
      
      // Save user data to context before sign up
      updateData({
        firstName,
        lastName,
        email
      });
      
      await signUp(email, password, firstName, lastName);
      
      // Set current step and navigate to phone verification
      setCurrentStep(11);
      navigate('/onboarding/phone-verification');
    } catch (err) {
      console.error('Sign up error:', err);
      // Error is handled by the auth context and displayed via the formError state
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setFormError(null);
      const userData = await signInWithGoogle();
      
      // Save user data from Google to context
      if (userData) {
        updateData({
          firstName: userData.displayName?.split(' ')[0] || '',
          lastName: userData.displayName?.split(' ').slice(1).join(' ') || '',
          email: userData.email || ''
        });
      }
      
      // Set current step and navigate to phone verification
      setCurrentStep(11);
      navigate('/onboarding/phone-verification');
    } catch (err) {
      console.error('Google sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle Apple sign in
  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      setFormError(null);
      const userData = await signInWithApple();
      
      // Save user data from Apple to context
      if (userData) {
        updateData({
          firstName: userData.displayName?.split(' ')[0] || '',
          lastName: userData.displayName?.split(' ').slice(1).join(' ') || '',
          email: userData.email || ''
        });
      }
      
      // Set current step and navigate to phone verification
      setCurrentStep(11);
      navigate('/onboarding/phone-verification');
    } catch (err) {
      console.error('Apple sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>
      
      {/* Mini progress bar */}
      <MiniProgressBar />
      
      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-start pt-12 px-4">
        {/* Success indicator */}
        <div className="mb-6 bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center">
          <div className="mr-2 rounded-full bg-green-500 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          Create your account to complete registration
        </div>
        
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-semibold text-center mb-8">Create your account</h1>
          
          {/* Error message */}
          {formError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{formError}</span>
            </div>
          )}
          
          {/* OAuth Buttons */}
          <div className="flex flex-col space-y-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                </g>
              </svg>
              Continue with Google
            </button>
            
            <button
              type="button"
              onClick={handleAppleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              Continue with Apple
            </button>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
            </div>
          </div>
          
          <form id="signup-form" onSubmit={handleSignUp} className="space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="eg. Jane"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="eg. Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Professional email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eg. jane.doe@acme.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            {/* Password fields */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Enter your password</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            {/* Terms checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree with the <a href="#" className="text-indigo-600 hover:text-indigo-500">terms of use</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">privacy policy</a>
                </label>
              </div>
            </div>
            
            {/* Confidentiality notice */}
            <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 flex items-start">
              <div className="mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                Contact details remain confidential until interested providers formally apply for your project
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Add padding at the bottom of the main content */}
      <div className="pb-16"></div>

      {/* Footer with Sign Up button */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-end max-w-7xl mx-auto">
          <button
            type="submit"
            form="signup-form"
            disabled={!isFormValid || isLoading}
            className={`px-8 py-3 rounded-md text-sm font-medium transition-colors ${isFormValid && !isLoading ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Create Account'}
          </button>
        </div>
      </footer>
    </div>
  );
};

// Create a review page component to display all collected information
export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, setCurrentStep } = useOnboarding();
  
  // Additional fields with default values that aren't in the context
  const additionalData = {
    providerLanguages: "Proficient in English",
    providerSize: "All (I don't care)",
    jobPosition: "Marketing Director / CMO",
    deliverables: "Not specified",
    targetAudience: "Not specified",
    geographicalScope: "Not specified",
    projectMaturity: "Not specified",
    startDate: "Not specified",
    completionDate: "Not specified",
    mediaCostPercentage: "Not specified",
    annualRevenue: "Not specified",
    subsidies: "Not specified",
    businessType: "Not specified",
    publicTender: "Not specified",
    finalSelection: "Not specified",
    workingWithProvider: "Not specified"
  };
  
  // Format budget for display
  const formatBudget = () => {
    if (!data.budget || !data.budget.range) {
      return "Not specified yet";
    }
    
    if (data.budget.range) {
      const [min, max] = data.budget.range.split('-').map(Number);
      return `${data.budget.type === 'one-time' ? 'One-time' : 'Monthly'} €${min.toLocaleString()} - €${max.toLocaleString()}`;
    }
    
    return "Not specified";
  };
  
  // Function to handle field edit by navigating to the appropriate step
  const handleEdit = (_section: string, step: number) => {
    setCurrentStep(step);
    
    // Navigate to the appropriate step
    switch (step) {
      case 1:
        navigate('/onboarding');
        break;
      case 2:
        navigate('/onboarding/step-two');
        break;
      case 3:
        navigate('/onboarding/step-three');
        break;
      case 4:
        navigate('/onboarding/step-four');
        break;
      case 5:
        navigate('/onboarding/step-five');
        break;
      case 6:
        navigate('/onboarding/step-six');
        break;
      case 7:
        navigate('/onboarding/step-seven');
        break;
      case 8:
        navigate('/onboarding/step-eight');
        break;
      default:
        navigate('/onboarding');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Blue banner */}
      <div className="bg-indigo-600 w-full h-2"></div>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-start pt-8 px-4">
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl font-semibold text-center mb-2">Review and finalize your brief</h1>
          <p className="text-gray-600 text-center mb-8">
            Your brief is almost complete! 📝 Double-check the details or add missing info to attract the best-fit providers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Project details */}
            <div className="md:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="font-medium">Project brief</span>
                </div>
                <button className="text-indigo-600 font-medium text-sm hover:text-indigo-700">
                  Edit
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Context and goals */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Context and goals
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-700">{data.projectContext || "Not specified"}</p>
                  </div>
                  <button 
                    onClick={() => handleEdit('context', 8)} 
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* Scope of work */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Scope of work
                  </h3>
                  <div className="space-y-4">
                    <div className="relative group bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-700 mb-2 font-medium">Service needed</p>
                      <div className="inline-block bg-indigo-100 px-3 py-1 rounded-full text-sm text-indigo-700 font-medium">
                        {data.service || "Not specified"}
                      </div>
                      <button 
                        onClick={() => handleEdit('service', 1)} 
                        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="relative group bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-700 mb-2 font-medium">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {data.skills && data.skills.length > 0 ? data.skills.map((skill: string, index: number) => (
                          <div key={index} className="bg-indigo-100 px-3 py-1 rounded-full text-sm text-indigo-700 font-medium">
                            {skill}
                          </div>
                        )) : <div className="text-gray-500">No skills specified</div>}
                      </div>
                      <button 
                        onClick={() => handleEdit('skills', 2)} 
                        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="relative group bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-700 mb-2 font-medium">We are looking for a company with experience with the following tools and technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {data.skills && data.skills.length > 0 ? data.skills.map((skill: string, index: number) => (
                          <div key={`tech-${index}`} className="bg-indigo-100 px-3 py-1 rounded-full text-sm text-indigo-700 font-medium">
                            {skill}
                          </div>
                        )) : <div className="text-gray-500">No technologies specified</div>}
                      </div>
                      <button 
                        onClick={() => handleEdit('technologies', 2)} 
                        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Budget & pricing */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Budget & pricing
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium">Our budget is <span className="text-green-600 font-semibold">{formatBudget()}</span></p>
                  </div>
                  <button 
                    onClick={() => handleEdit('budget', 7)} 
                    className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* Hiring conditions */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Hiring conditions
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md space-y-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Provider should be active in: <span className="font-medium">{data.location || "Not specified"}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Provider languages: <span className="font-medium">{additionalData.providerLanguages}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Provider size: <span className="font-medium">{additionalData.providerSize}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEdit('hiring', 3)} 
                    className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* About your company */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    About your company
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md space-y-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Company name: <span className="font-medium">{data.companyName || "Not specified"}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Industry: <span className="font-medium">{data.industry || "Not specified"}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Company size: <span className="font-medium">{data.companySize || "Not specified"}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Job position: <span className="font-medium">{additionalData.jobPosition}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEdit('company', 4)} 
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* Key deliverables */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Key deliverables
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md flex items-center">
                    <div className="bg-indigo-100 p-1 rounded-full mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Deliverables: <span className="font-medium">{additionalData.deliverables}</span></p>
                  </div>
                  <button 
                    onClick={() => handleEdit('deliverables', 8)} 
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* Target audience */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Target audience
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md space-y-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">Target audience: <span className="font-medium">{additionalData.targetAudience}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Geographical scope: <span className="font-medium">{additionalData.geographicalScope}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEdit('audience', 8)} 
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* Timeline */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Timeline
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md space-y-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Project maturity: <span className="font-medium">{additionalData.projectMaturity}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Start date: <span className="font-medium">{additionalData.startDate}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Completion date: <span className="font-medium">{additionalData.completionDate}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEdit('timeline', 8)} 
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* Client financial metrics */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Client financial metrics
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md space-y-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Media cost percentage: <span className="font-medium">{additionalData.mediaCostPercentage}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Annual revenue: <span className="font-medium">{additionalData.annualRevenue}</span></p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Subsidies: <span className="font-medium">{additionalData.subsidies}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEdit('financial', 8)} 
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* Practical details */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Practical details
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md space-y-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      </div>
                      <p className="text-gray-700">Business type: <span className="font-medium">{additionalData.businessType}</span></p>
                    </div>
                     <div className="flex items-center">
                       <div className="bg-indigo-100 p-1 rounded-full mr-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                       </div>
                       <p className="text-gray-700">Public tender: <span className="font-medium">{additionalData.publicTender}</span></p>
                     </div>
                     <div className="flex items-center">
                       <div className="bg-indigo-100 p-1 rounded-full mr-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                         </svg>
                       </div>
                       <p className="text-gray-700">Final selection: <span className="font-medium">{additionalData.finalSelection}</span></p>
                     </div>
                     <div className="flex items-center">
                       <div className="bg-indigo-100 p-1 rounded-full mr-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                       </div>
                       <p className="text-gray-700">Working with provider: <span className="font-medium">{additionalData.workingWithProvider}</span></p>
                     </div>
                   </div>
                   <button 
                     onClick={() => handleEdit('practical', 8)} 
                     className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                   >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                
                {/* Documents */}
                <div className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-indigo-700 mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Documents
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-700 mb-2">Drag and drop files here, or</p>
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                        Browse files
                      </button>
                      <p className="text-gray-500 text-sm mt-2">Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (max 10MB)</p>
                      <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" />
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEdit('documents', 8)} 
                    className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow-sm hover:shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="pb-24"></div> {/* Added bottom padding */}
            </div>
            
            {/* Right column - Quotation and send button */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-4 mx-auto max-w-[200px]">
                  <div className="text-xs uppercase text-gray-500 mb-2">QUOTATION</div>
                  <div className="border-b border-gray-200 pb-2 mb-2"></div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-indigo-600 mx-auto"></div>
                    ))}
                  </div>
                  <div className="text-lg font-semibold">{formatBudget()}</div>
                </div>
                
                <h3 className="font-medium text-lg mb-2 flex items-center justify-center">
                  Ready for your the best?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  We've matched your project with our professional that fit best. Send your brief to meet our team, and get tailored quotes.
                </p>
                
                <button 
                  onClick={() => {
                    setCurrentStep(11);
                    navigate('/onboarding/account-creation');
                  }}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-medium text-lg shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all"
                >
                  Create your account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create a confirmation page component
export const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-indigo-600 mb-2">DigitalBoost</h2>
            <h3 className="text-2xl font-medium text-gray-900">Create your account</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
                <path d="M6.52 7.013l-2.307-1.76L6.52 3.2v3.813z" fill="#34A853"/>
                <path d="M6.52 3.2v3.813L10.4 7.013l-3.88-3.813z" fill="#FBBC05"/>
                <path d="M17.24 7.013c-.213-.64-.64-1.147-1.147-1.507L10.4 7.013l5.693-1.507z" fill="#EA4335"/>
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133l-6.053-7.413z" fill="#1877F2"/>
              </svg>
              Continue with Google
            </button>
            
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12C0 5.373 5.373 0 12 0c4.873 0 9.067 2.904 10.947 7.077l-15.87 6.899c1.31 3.02 4.33 5.124 7.83 5.124 1.648 0 3.195-.47 4.5-1.281l1.232 1.232C19.005 21.249 16.338 22 13.477 22 6.85 22 0 16.15 0 12z" fill="#00A4EF"/>
                <path d="M12 0c3.863 0 7.336 1.564 9.865 4.093l-2.853 2.853A9.954 9.954 0 0 0 12 4c-2.761 0-5.261 1.123-7.071 2.929L2.076 4.076A11.946 11.946 0 0 1 12 0z" fill="#7FBA00"/>
                <path d="M12 24c-6.627 0-12-5.373-12-12 0-3.183 1.264-6.235 3.515-8.485L6.343 6.343A9.954 9.954 0 0 0 2 12c0 5.523 4.477 10 10 10a9.955 9.955 0 0 5.657-1.757l2.828 2.828A11.946 11.946 0 0 1 12 24z" fill="#F25022"/>
                <path d="M24 12c0 6.627-5.373 12-12 12-3.183 0-6.235-1.264-8.485-3.515l2.828-2.828A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10 0-2.761-1.123-5.261-2.929-7.071l2.828-2.828A11.946 11.946 0 0 1 24 12z" fill="#FFB900"/>
              </svg>
              Continue with Microsoft Account
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">OR</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  placeholder="Email" 
                  value={email}
                  readOnly
                />
                <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  Edit
                </button>
              </div>
              
              <div className="relative">
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  placeholder="Password*"
                />
                <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              
              <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-medium text-lg shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all">
                Continue
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              Already have an account? <a href="#" className="text-indigo-600 hover:text-indigo-500">Log in</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Branding */}
      <div className="hidden md:block md:w-1/2 bg-indigo-900 p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto text-white">
          <h2 className="text-4xl font-bold mb-6">We help you hire the right company with confidence</h2>
          <p className="text-lg mb-8">We are trusted by +300k businesses worldwide.</p>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Company logos in white */}
            <div className="bg-indigo-800/30 h-12 rounded-md flex items-center justify-center">
              <div className="text-white font-semibold">Adobe</div>
            </div>
            <div className="bg-indigo-800/30 h-12 rounded-md flex items-center justify-center">
              <div className="text-white font-semibold">Yale</div>
            </div>
            <div className="bg-indigo-800/30 h-12 rounded-md flex items-center justify-center">
              <div className="text-white font-semibold">LinkedIn</div>
            </div>
            <div className="bg-indigo-800/30 h-12 rounded-md flex items-center justify-center">
              <div className="text-white font-semibold">Audi</div>
            </div>
            <div className="bg-indigo-800/30 h-12 rounded-md flex items-center justify-center">
              <div className="text-white font-semibold">Unicef</div>
            </div>
            <div className="bg-indigo-800/30 h-12 rounded-md flex items-center justify-center">
              <div className="text-white font-semibold">BBC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PhoneVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [phone, setPhone] = useState<string>(data.phoneNumber || "");
  
  // Check if form is valid - at least 6 digits after the country code
  const isFormValid = phone.replace(/[^0-9]/g, '').length >= 6;
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with logo */}
      <header className="py-5 px-8 flex justify-between items-center border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          DigitalBoost
        </Link>
        <button 
          onClick={() => navigate("/")}
          className="rounded-full p-1.5 border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <XIcon size={18} className="text-gray-500" />
        </button>
      </header>

      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-start pt-12 px-4">
        <div className="max-w-md w-full text-center">
          {/* Phone icon */}
          <div className="mb-6 flex justify-center">
            <div className="bg-indigo-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-semibold mb-3">
            Hey <span className="text-indigo-600 font-bold">{data.firstName || 'there'}</span>, let's make sure it's you.
          </h1>
          
          <p className="text-gray-600 mb-8">
            In order to secure your account, we quickly need to verify your phone number.
          </p>
          <div className="space-y-6">
            {/* Phone number input with country code selector */}
            <div className="mb-2">
              <div className="flex">
                {/* Using react-international-phone library */}
                <PhoneInput
                  defaultCountry="fr"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  inputClassName="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                  className="w-full"
                  style={{ border: 'none', outline: 'none' }}
                  countrySelectorStyleProps={{
                    buttonClassName: "px-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none",
                    dropdownStyleProps: {
                      listItemClassName: "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Confidentiality notice */}
            <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Confidential: not shared without your consent.
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Previous and Next buttons */}
      <footer className="py-5 px-8 border-t border-gray-200 bg-white">
        <div className="flex justify-between max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Previous
          </button>
          
          <button
            onClick={() => {
              if (isFormValid) {
                // Save phone number to context
                updateData({ phoneNumber: phone });
                
                // Set current step and navigate to confirmation page
                setCurrentStep(12);
                navigate('/confirmation');
              }
            }}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center ${isFormValid ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Next
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
