import React from 'react';

interface OnboardingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-offset-1 transform hover:scale-[1.01] active:scale-[0.99]';
  
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 focus:ring-gray-300',
    outline: 'bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
    text: 'bg-transparent text-indigo-600 hover:bg-indigo-50 hover:underline focus:ring-indigo-500',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const widthClass = isFullWidth ? 'w-full' : '';
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClasses} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default OnboardingButton;
