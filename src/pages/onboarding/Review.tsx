import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  EditIcon, 
  BriefcaseIcon, 
  BuildingIcon, 
  MapPinIcon, 
  UsersIcon, 
  DollarSignIcon, 
  FileTextIcon 
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import OnboardingIllustration from '../../components/illustrations/OnboardingIllustration';
import AnimatedTransition from '../../components/ui/AnimatedTransition';
import OnboardingCard from '../../components/ui/OnboardingCard';
import OnboardingButton from '../../components/ui/OnboardingButton';

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, setCurrentStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate that we have the necessary data in context
  useEffect(() => {
    // Check if essential data is missing and redirect accordingly
    if (!data.services || data.services.length === 0 || !data.skills || !data.location || !data.companyName || 
        !data.companySize || !data.industry || !data.budget || !data.projectContext) {
      // Some required data is missing, redirect to first step
      setCurrentStep(1);
      navigate("/onboarding/Step1");
    }
  }, [data, navigate, setCurrentStep]);
  
  const handleBack = () => {
    // Navigate back to step eight
    setCurrentStep(8);
    navigate("/onboarding/Step8");
  };
  
  const handleSubmit = () => {
    // Simulate form submission
    setIsSubmitting(true);
    
    // After a delay, move to account creation or confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(9);
      navigate("/onboarding/account-creation");
    }, 1500);
  };

  // Navigate to edit a specific step
  const navigateToStep = (step: number) => {
    setCurrentStep(step);
    navigate(`/onboarding/Step${step}`);
  };

  // Check if all required data is available
  const isDataComplete = 
    data.services && 
    data.services.length > 0 && 
    data.skills && 
    data.skills.length > 0 && 
    data.location && 
    data.companyName && 
    data.companySize && 
    data.industry && 
    data.budget && 
    data.projectContext;

  return (
    <OnboardingLayout
      currentStep={9}
      onBack={handleBack}
      onNext={handleSubmit}
      nextDisabled={!isDataComplete || isSubmitting}
      nextLabel={isSubmitting ? "Processing..." : "Create Account"}
      illustration={<OnboardingIllustration variant="success" />}
    >
      <div className="space-y-6">
        <AnimatedTransition isVisible={true} direction="up" delay={100}>
          <OnboardingCard>
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h3 className="text-lg font-medium text-gray-800">Service & Skills</h3>
              <OnboardingButton 
                variant="text" 
                size="sm"
                onClick={() => navigateToStep(1)}
                icon={<EditIcon size={14} />}
              >
                Edit
              </OnboardingButton>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-start">
                <BriefcaseIcon size={18} className="text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Services</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.services?.map(service => (
                      <span key={service} className="inline-flex items-center px-2 py-0.5 bg-brand-100 text-brand-800 rounded text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircleIcon size={18} className="text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Skills</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.skills?.map(skill => (
                      <span key={skill} className="inline-flex items-center px-2 py-0.5 bg-brand-100 text-brand-800 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </OnboardingCard>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={200}>
          <OnboardingCard>
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h3 className="text-lg font-medium text-gray-800">Company Information</h3>
              <div className="flex space-x-2">
                <OnboardingButton 
                  variant="text" 
                  size="sm"
                  onClick={() => navigateToStep(3)} // Location step
                  icon={<EditIcon size={14} />}
                >
                  Edit Location
                </OnboardingButton>
                <OnboardingButton 
                  variant="text" 
                  size="sm"
                  onClick={() => navigateToStep(4)} // Company info step
                  icon={<EditIcon size={14} />}
                >
                  Edit Company
                </OnboardingButton>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-start">
                <BuildingIcon size={18} className="text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Company Name</div>
                  <div className="text-gray-800">{data.companyName}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPinIcon size={18} className="text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Location</div>
                  <div className="text-gray-800">{data.location}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <UsersIcon size={18} className="text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Company Size</div>
                  <div className="text-gray-800">{data.companySize}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <BriefcaseIcon size={18} className="text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Industry</div>
                  <div className="text-gray-800">{data.industry}</div>
                </div>
              </div>
            </div>
          </OnboardingCard>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={300}>
          <OnboardingCard>
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <h3 className="text-lg font-medium text-gray-800">Project Details</h3>
              <div className="flex space-x-2">
                <OnboardingButton 
                  variant="text" 
                  size="sm"
                  onClick={() => navigateToStep(7)} // Budget step
                  icon={<EditIcon size={14} />}
                >
                  Edit Budget
                </OnboardingButton>
                <OnboardingButton 
                  variant="text" 
                  size="sm"
                  onClick={() => navigateToStep(8)} // Project details step
                  icon={<EditIcon size={14} />}
                >
                  Edit Details
                </OnboardingButton>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-start">
                <DollarSignIcon size={18} className="text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Budget</div>
                  <div className="text-gray-800">
                    {data.budget?.type === 'one-time' ? 'One-time Project: ' : 'Monthly Retainer: '}
                    {data.budget?.range}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <FileTextIcon size={18} className="text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 font-medium">Project Context</div>
                  <div className="text-gray-800 whitespace-pre-wrap mt-1">
                    {data.projectContext}
                  </div>
                </div>
              </div>
            </div>
          </OnboardingCard>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={400}>
          <div className="bg-brand-50 p-4 rounded-lg border border-brand-100">
            <div className="flex items-start">
              <CheckCircleIcon size={20} className="text-brand-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-brand-700">Next Steps</h4>
                <p className="text-sm text-brand-600">
                  After confirming your information, you'll create your account to access your personalized dashboard.
                </p>
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </div>
    </OnboardingLayout>
  );
};

export default ReviewPage;
