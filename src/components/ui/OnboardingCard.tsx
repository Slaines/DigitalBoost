import React, { ReactNode } from 'react';

interface OnboardingCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  compact?: boolean; // New prop for compact mode
  noPadding?: boolean; // New prop for removing padding
  border?: boolean; // Option to use border instead of shadow
  onClick?: () => void; // Make card clickable
  selected?: boolean; // For selection state
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({
  children,
  className = '',
  animate = true,
  compact = false,
  noPadding = false,
  border = false,
  onClick,
  selected = false
}) => {
  // Build classNames conditionally
  const cardClasses = [
    'bg-white',
    'rounded-lg', // Less rounded for modern feel
    'transition-all duration-200',
    animate ? 'animate-fadeIn' : '',
    noPadding ? '' : compact ? 'p-3 sm:p-4' : 'p-4 sm:p-6',
    border ? 'border border-gray-200' : 'shadow-sm',
    onClick ? 'cursor-pointer hover:shadow-md' : '',
    selected ? 'ring-2 ring-brand-500 ring-offset-1' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
};

export default OnboardingCard;
