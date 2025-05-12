import React, { ReactNode } from 'react';

interface AnimatedTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  direction?: 'left' | 'right' | 'up' | 'down' | 'fade';
  duration?: number;
  delay?: number;
  className?: string;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  isVisible,
  direction = 'fade',
  duration = 300,
  delay = 0,
  className = '',
}) => {
  // Set the base styles for the animation
  const baseStyle = 'transition-all overflow-hidden';
  
  // Set the direction-specific transforms
  const getTransforms = () => {
    switch (direction) {
      case 'left':
        return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0';
      case 'right':
        return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0';
      case 'up':
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0';
      case 'down':
        return isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0';
      case 'fade':
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  // Compute the transition duration
  const transitionDuration = `duration-${duration}`;
  const transitionDelay = delay > 0 ? `delay-${delay}` : '';

  return (
    <div
      className={`${baseStyle} ${getTransforms()} ${transitionDuration} ${transitionDelay} ${className}`}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
