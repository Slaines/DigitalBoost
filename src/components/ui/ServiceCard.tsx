import React, { useState } from 'react';
import { CheckIcon, HelpCircleIcon } from 'lucide-react';
import Tooltip from './Tooltip';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon?: React.ReactNode;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  details,
  icon,
  isSelected,
  onToggle
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className={`
        relative rounded-lg border cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-white shadow-md' 
          : 'border-gray-200 hover:border-indigo-300 hover:shadow hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'}
      `}
      onClick={() => onToggle(id)}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
          <CheckIcon size={12} className="text-white" />
        </div>
      )}

      {/* Service content */}
      <div className="flex flex-col h-full p-4">
        {/* Icon/Illustration and Title */}
        <div className="flex items-start gap-3 mb-2">
          {/* Icon/Illustration */}
          {icon && (
            <div className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center ${isSelected ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'} transition-colors`}>
              {icon}
            </div>
          )}

          {/* Title and Description */}
          <div>
            <h3 className="font-medium text-sm text-gray-900 mb-0.5">{title}</h3>
            <p className="text-xs text-gray-500 leading-snug">{description}</p>
          </div>
        </div>

        {/* Service features summary */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {details.slice(0, 2).map((detail, index) => (
            <span 
              key={index} 
              className="inline-flex text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
            >
              {detail.split(' ')[0]}
            </span>
          ))}
          
          {details.length > 2 && (
            <span className="inline-flex text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">+{details.length - 2}</span>
          )}
        </div>
        
        {/* Info tooltip trigger */}
        <div className="mt-2 flex justify-end">
          <div 
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              type="button"
              className="p-1 rounded-full hover:bg-indigo-50 text-indigo-400 hover:text-indigo-600 transition-colors flex items-center gap-1"
              aria-label="More information"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(prev => !prev);
              }}
            >
              <HelpCircleIcon size={14} />
              <span className="text-xs">Details</span>
            </button>

            {/* Tooltip content */}
            <Tooltip 
              content={
                <div className="py-1 px-1.5">
                  <p className="font-medium text-xs mb-0.5">What's included:</p>
                  <ul className="list-disc pl-3 space-y-0.5">
                    {details.map((detail, index) => (
                      <li key={index} className="text-xs">{detail}</li>
                    ))}
                  </ul>
                </div>
              } 
              position="top"
              visible={showTooltip}
            >
              <span></span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
