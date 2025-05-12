import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import { serviceCategories } from './constants';
import { serviceSkillsMap } from './serviceSkills';

interface ServiceSkillGroup {
  serviceName: string;
  serviceId: string;
  category: string;
  skills: string[];
}

const OnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(data.skills || []);
  const [activeServiceId, setActiveServiceId] = useState<string>('');

  // Generate a map of service categories to their skills
  const serviceSkillsGroups = useMemo(() => {
    if (!data.services || data.services.length === 0) return {};

    // Create a map of service ID to service name and category
    const serviceDetails: Record<string, { name: string, category: string }> = {};

    // Find service names and categories from serviceCategories
    for (const category of serviceCategories) {
      for (const option of category.options) {
        serviceDetails[option.id] = {
          name: option.name,
          category: category.name
        };
      }
    }

    // Group skills by service
    const skillsByService: Record<string, ServiceSkillGroup> = {};

    // Add skills from each selected service
    data.services.forEach(serviceId => {
      // If this service has defined skills in our map
      if (serviceSkillsMap[serviceId] && serviceDetails[serviceId]) {
        skillsByService[serviceId] = {
          serviceName: serviceDetails[serviceId].name,
          serviceId: serviceId,
          category: serviceDetails[serviceId].category,
          skills: [...serviceSkillsMap[serviceId]].sort()
        };
      }
    });

    return skillsByService;
  }, [data.services]);

  // Set the first service as active by default when the component mounts
  useEffect(() => {
    const serviceIds = Object.keys(serviceSkillsGroups);
    if (serviceIds.length > 0 && !activeServiceId) {
      setActiveServiceId(serviceIds[0]);
    }
  }, [serviceSkillsGroups, activeServiceId]);

  // Validate that we have the necessary data in context
  useEffect(() => {
    // Only redirect if this is the initial load (not after completing the step)
    const isInitialLoad = !localStorage.getItem('step2_visited');

    if (isInitialLoad && (!data.services || data.services.length === 0)) {
      // If no services in context, redirect back to first step
      setCurrentStep(1);
      navigate("/onboarding/Step1");
    } else {
      // Mark that we've visited this step
      localStorage.setItem('step2_visited', 'true');
    }
  }, [data.services, navigate, setCurrentStep]);

  const handleBack = () => {
    setCurrentStep(1);
    navigate("/onboarding/Step1");
  };

  const handleNext = () => {
    // Save selected skills to context
    updateData({
      skills: selectedSkills
    });
    setCurrentStep(3);
    navigate("/onboarding/Step3");
  };

  // Toggle a skill's selection status
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Calculate the number of selected skills for each service
  const selectedSkillCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    Object.entries(serviceSkillsGroups).forEach(([serviceId, group]) => {
      counts[serviceId] = group.skills.filter(skill => selectedSkills.includes(skill)).length;
    });

    return counts;
  }, [serviceSkillsGroups, selectedSkills]);

  // Get skills for the active service
  const serviceSkills = useMemo(() => {
    if (!activeServiceId || !serviceSkillsGroups[activeServiceId]) return [];
    
    return serviceSkillsGroups[activeServiceId].skills;
  }, [serviceSkillsGroups, activeServiceId]);

  // Get the active service name
  const activeServiceName = activeServiceId && serviceSkillsGroups[activeServiceId] 
    ? serviceSkillsGroups[activeServiceId].serviceName 
    : '';

  return (
    <OnboardingLayout
      currentStep={2}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={selectedSkills.length === 0}
      nextLabel="Continue"
    >
      <div className="space-y-3">

        {/* Service Tabs */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-medium text-gray-700">Select Skills by Service</h3>
            <div className="text-sm text-indigo-600 font-medium">
              {selectedSkills.length} skills selected
            </div>
          </div>
          <div className="flex overflow-x-auto">
            {Object.entries(serviceSkillsGroups).map(([serviceId, group]) => (
              <button
                key={serviceId}
                className={`
                  py-2 px-3 font-medium text-xs mr-1.5 whitespace-nowrap rounded-md
                  ${activeServiceId === serviceId
                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}
                `}
                onClick={() => setActiveServiceId(serviceId)}
              >
                {group.serviceName}
                {selectedSkillCounts[serviceId] > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-500 text-white">
                    {selectedSkillCounts[serviceId]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>



        {/* Skills for Active Service */}
        <div className="border rounded-md overflow-hidden">
          <div className="p-2 bg-indigo-50 flex justify-between items-center">
            <h4 className="font-medium text-indigo-800">{activeServiceName} Skills</h4>
            <span className="text-xs text-gray-600">{serviceSkills.length} available</span>
          </div>
          
          <div className="p-2 bg-white max-h-[350px] overflow-y-auto">
            {serviceSkills.length === 0 && (
              <p className="text-gray-500 italic text-center py-4">
                No skills available for this service
              </p>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {serviceSkills.map((skill: string) => (
                <button
                  key={`${activeServiceId}-${skill}`}
                  onClick={() => toggleSkill(skill)}
                  className={`
                    flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-left
                    ${selectedSkills.includes(skill)
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                      : 'bg-gray-50 text-gray-800 hover:bg-indigo-50 hover:border-indigo-200 border border-gray-200'}
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded-full border flex items-center justify-center mr-2 flex-shrink-0
                    ${selectedSkills.includes(skill) 
                      ? 'border-indigo-500 bg-indigo-500' 
                      : 'border-gray-300'}
                  `}>
                    {selectedSkills.includes(skill) && (
                      <CheckIcon size={12} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm">{skill}</span>
                </button>
              ))}
            </div>
          </div>
        </div>


      </div>
    </OnboardingLayout>
  );
};

export default OnboardingStep2;
