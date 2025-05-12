import React, { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XIcon, ChevronRightIcon, ChevronLeftIcon, RotateCcwIcon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import StepProgressBar from '../ui/StepProgressBar';
import OnboardingButton from '../ui/OnboardingButton';
import AnimatedTransition from '../ui/AnimatedTransition';

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
      resetData();
      navigate('/onboarding/Step1');
      setShowResetConfirm(false);
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

        {/* Navigation buttons - fixed at bottom */}
        <div className="border-t border-gray-100 p-3 sm:p-4 flex justify-between items-center bg-white">
          <AnimatedTransition isVisible={true} direction="up" delay={50}>
            {onBack ? (
              <OnboardingButton 
                variant="secondary" 
                onClick={onBack}
                size="sm"
                icon={<ChevronLeftIcon size={16} />}
                iconPosition="left"
              >
                {backLabel}
              </OnboardingButton>
            ) : (
              <div className="text-sm text-gray-400">Start</div>
            )}
          </AnimatedTransition>

          <AnimatedTransition isVisible={true} direction="up" delay={50}>
            {onNext && (
              <OnboardingButton 
                onClick={onNext}
                disabled={nextDisabled}
                size="sm"
                icon={<ChevronRightIcon size={16} />}
                iconPosition="right"
              >
                {nextLabel}
              </OnboardingButton>
            )}
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
