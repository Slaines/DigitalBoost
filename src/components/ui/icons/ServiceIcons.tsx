import React from 'react';
import { Megaphone, Paintbrush, Code2, BarChart3 } from 'lucide-react';

// A component to display the appropriate icon for each service category
interface ServiceIconProps {
  category: string;
  size?: number;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ 
  category, 
  size = 24, 
  className = '' 
}) => {
  // Map category names to their respective icons
  switch(category) {
    case 'Advertising & Marketing':
      return <Megaphone size={size} className={className} />;
    case 'Creative & Visual':
      return <Paintbrush size={size} className={className} />;
    case 'Development & Product':
      return <Code2 size={size} className={className} />;
    default:
      return <BarChart3 size={size} className={className} />;
  }
};

export default ServiceIcon;
