import React, { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XIcon, ChevronRightIcon, ChevronLeftIcon, RotateCcwIcon, ArrowRightIcon, InfoIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import StepProgressBar from '../ui/StepProgressBar';
import OnboardingButton from '../ui/OnboardingButton';
import AnimatedTransition from '../ui/AnimatedTransition';
import Tooltip from '../ui/Tooltip';

interface OnboardingLayoutProps {
  children: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  currentStep: number; // Used by StepProgressBar internally
  totalSteps?: number;
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  title,
  subtitle,
  currentStep,
  totalSteps = 8,
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = 'Next',
  backLabel = 'Back'
}) => {
  const navigate = useNavigate();
  const { resetData } = useOnboarding();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Handle reset request
  const handleReset = () => {
    if (showResetConfirm) {
      // First reset the data in context
      resetData();
      // Then clear the confirmation state
      setShowResetConfirm(false);
      // Finally navigate to Step1 with a slight delay to ensure context is updated
      setTimeout(() => {
        navigate('/onboarding/Step1', { replace: true });
      }, 100);
    } else {
      setShowResetConfirm(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Header with logo and close button */}
      <header className="py-2 px-3 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold text-indigo-600 flex items-center">
            <span className="bg-indigo-600 text-white p-1 rounded mr-2">DB</span>
            <span className="hidden sm:inline">DigitalBoost</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Reset button */}
          <button 
            onClick={handleReset}
            className={`px-2 py-1 rounded text-sm transition-colors flex items-center ${showResetConfirm ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-600'}`}
            aria-label="Reset"
            title="Reset onboarding progress"
          >
            <RotateCcwIcon size={14} className="mr-1" />
            {showResetConfirm ? 'Confirm Reset' : 'Reset'}
          </button>
          
          {/* Close button */}
          <button 
            onClick={() => navigate("/")}
            className="px-2 py-1 rounded text-sm hover:bg-gray-100 transition-colors flex items-center text-gray-600"
            aria-label="Close"
            title="Exit onboarding"
          >
            <XIcon size={14} className="mr-1" />
            Exit
          </button>
        </div>
      </header>

      {/* Progress bar section */}
      <div className="px-3 sm:px-4 pt-2">
        <StepProgressBar 
          totalSteps={totalSteps}
          currentStep={currentStep}
        />
      </div>

      {/* Main content area - redesigned for minimal space usage and no illustrations */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Compact header section - only show if title or subtitle exists */}
        {(title || subtitle) && (
          <div className="p-3 sm:p-4 border-b border-gray-100">
            <AnimatedTransition isVisible={true} direction="up" delay={100}>
              {title && (
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {title}
                </h1>
              )}
              
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{subtitle}</p>
              )}
            </AnimatedTransition>
          </div>
        )}

        {/* Main content - scrollable if needed but contained */}
        <div className="flex-grow overflow-auto p-3 sm:p-4">
          <AnimatedTransition isVisible={true} direction="up" delay={100}>
            {children}
          </AnimatedTransition>
        </div>

        {/* Sticky Navigation Footer - fixed at bottom of viewport */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 py-4 px-6 flex justify-between items-center bg-white shadow-lg z-10">
          <AnimatedTransition isVisible={true} direction="up" delay={50}>
            {onBack ? (
              <OnboardingButton 
                variant="secondary" 
                onClick={onBack}
                size="md"
                icon={<ChevronLeftIcon size={18} />}
                iconPosition="left"
                className="min-w-[100px]"
              >
                {backLabel}
              </OnboardingButton>
            ) : (
              <div className="text-sm text-gray-400">Start</div>
            )}
          </AnimatedTransition>

          <AnimatedTransition isVisible={true} direction="up" delay={50}>
            {onNext && (
              <div className="relative">
                <Tooltip 
                  content="Please select a service to continue" 
                  position="top"
                  visible={nextDisabled}
                >
                  <OnboardingButton 
                    onClick={onNext}
                    disabled={nextDisabled}
                    size="lg"
                    icon={<ArrowRightIcon size={18} />}
                    iconPosition="right"
                    className={`min-w-[140px] ${!nextDisabled ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                  >
                    {nextLabel}
                  </OnboardingButton>
                </Tooltip>
              </div>
            )}
          </AnimatedTransition>
        </div>
        
        {/* Add padding at the bottom to prevent content from being hidden behind the sticky footer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
