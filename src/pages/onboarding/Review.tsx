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
    if (!data.services || data.services.length === 0 || !data.serviceGoals || data.serviceGoals.length === 0 || !data.location || !data.companyName || 
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
    data.serviceGoals && 
    data.serviceGoals.length > 0 && 
    data.location && 
    data.companyName && 
    data.companySize && 
    data.industry && 
    data.budget && 
    data.projectContext;

  return (
    <OnboardingLayout
      currentStep={9}
      className="max-w-2xl mx-auto"
      onBack={handleBack}
      onNext={handleSubmit}
      nextDisabled={!isDataComplete || isSubmitting}
      nextLabel={isSubmitting ? "Processing..." : "Create Account"}
    >
      {/* Add the illustration separately */}
      <div className="mb-4">
        <OnboardingIllustration variant="success" />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Review Your Information</h2>
        <p className="text-sm text-gray-600 mt-1">Please review all the information you've provided before creating your account.</p>
      </div>
      <div className="space-y-4">
        <AnimatedTransition isVisible={true} direction="up" delay={100}>
          <OnboardingCard>
            <div className="flex items-center justify-between border-b border-gray-100 p-3">
              <h3 className="text-base font-medium text-gray-800">Service & Skills</h3>
              <OnboardingButton 
                variant="text" 
                size="sm"
                onClick={() => navigateToStep(1)}
                icon={<EditIcon size={12} />}
                className="text-xs"
              >
                Edit
              </OnboardingButton>
            </div>
            
            <div className="p-3 space-y-3">
              <div className="flex items-start">
                <BriefcaseIcon size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 text-sm font-medium">Services</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.services?.map(service => {
                      // Find service goals related to this service
                      const relatedGoals = data.serviceGoals?.filter(sg => sg.service === service) || [];
                      
                      return (
                        <div key={service} className="w-full mb-2 border-l-2 border-brand-500 pl-2">
                          <span className="inline-flex items-center px-2 py-0.5 bg-brand-600 text-white rounded-sm text-xs font-medium">
                            {service}
                          </span>
                          
                          {/* Show goals for this service */}
                          {relatedGoals.length > 0 && (
                            <div className="ml-3 mt-1">
                              <div className="flex flex-wrap gap-1">
                                {relatedGoals.map((goal, idx) => (
                                  <span key={idx} className="inline-flex items-center px-2 py-0.5 bg-brand-100 text-brand-800 rounded text-xs">
                                    {goal.goal}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Timeline info if available */}
              {data.timeline && (
                <div className="flex items-start">
                  <CheckCircleIcon size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="text-gray-700 text-sm font-medium">Timeline Preference</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 bg-brand-50 text-brand-800 rounded-sm text-xs">
                        {data.timeline.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </OnboardingCard>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={200}>
          <OnboardingCard>
            <div className="flex items-center justify-between border-b border-gray-100 p-3">
              <h3 className="text-base font-medium text-gray-800">Company Information</h3>
              <div className="flex space-x-2">
                <OnboardingButton 
                  variant="text" 
                  size="sm"
                  onClick={() => navigateToStep(3)} // Location step
                  icon={<EditIcon size={12} />}
                  className="text-xs"
                >
                  Edit Location
                </OnboardingButton>
                <OnboardingButton 
                  variant="text" 
                  size="sm"
                  onClick={() => navigateToStep(4)} // Company info step
                  icon={<EditIcon size={12} />}
                  className="text-xs"
                >
                  Edit Company
                </OnboardingButton>
              </div>
            </div>
            
            <div className="p-3 space-y-3">
              <div className="flex items-start">
                <BuildingIcon size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 text-sm font-medium">Company Name</div>
                  <div className="text-gray-800 text-xs">{data.companyName}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPinIcon size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 text-sm font-medium">Location</div>
                  <div className="text-gray-800 text-xs">{data.location}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <UsersIcon size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 text-sm font-medium">Company Size</div>
                  <div className="text-gray-800 text-xs">{data.companySize}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <BriefcaseIcon size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 text-sm font-medium">Industry</div>
                  <div className="text-gray-800 text-xs">{data.industry}</div>
                </div>
              </div>
            </div>
          </OnboardingCard>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={300}>
          <OnboardingCard>
            <div className="flex items-center justify-between border-b border-gray-100 p-3">
              <h3 className="text-base font-medium text-gray-800">Project Details</h3>
              <div className="flex space-x-2">
                <OnboardingButton 
                  variant="text" 
                  size="sm"
                  onClick={() => navigateToStep(7)} // Budget step
                  icon={<EditIcon size={12} />}
                  className="text-xs"
                >
                  Edit Budget
                </OnboardingButton>
                <OnboardingButton 
                  variant="text" 
                  size="sm"
                  onClick={() => navigateToStep(8)} // Project details step
                  icon={<EditIcon size={12} />}
                  className="text-xs"
                >
                  Edit Details
                </OnboardingButton>
              </div>
            </div>
            
            <div className="p-3 space-y-3">
              <div className="flex items-start">
                <DollarSignIcon size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 text-sm font-medium">Budget</div>
                  <div className="text-gray-800 text-xs">
                    <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 rounded-sm">
                      {data.budget?.type === 'one-time' ? 'One-time Project: ' : 'Monthly Retainer: '}
                      {data.budget?.range}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <FileTextIcon size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <div className="text-gray-700 text-sm font-medium">Project Context</div>
                  <div className="text-gray-800 text-xs whitespace-pre-wrap mt-1 bg-gray-50 p-2 rounded-sm border border-gray-100">
                    {data.projectContext}
                  </div>
                </div>
              </div>
            </div>
          </OnboardingCard>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={400}>
          <div className="bg-brand-50 p-3 rounded-lg border border-brand-100">
            <div className="flex items-start">
              <CheckCircleIcon size={16} className="text-brand-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-medium text-brand-700">Next Steps</h4>
                <p className="text-xs text-brand-600">
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
