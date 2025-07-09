import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, InfoIcon } from 'lucide-react';
import { SubService } from '../../pages/onboarding/subServiceDetails';
import Tooltip from './Tooltip';

interface SubServicePanelProps {
  serviceName: string;
  serviceIcon?: React.ReactNode;
  subServices: SubService[];
  selectedSubServices: string[];
  onToggleSubService: (subServiceId: string) => void;
}

const SubServicePanel: React.FC<SubServicePanelProps> = ({
  serviceName,
  serviceIcon,
  subServices,
  selectedSubServices,
  onToggleSubService
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <div className="w-full mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Panel Header */}
      <div 
        className={`
          flex items-center justify-between p-3 cursor-pointer 
          ${isExpanded ? 'border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white' : ''}
        `}
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-3">
          {serviceIcon && (
            <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-md flex items-center justify-center">
              {serviceIcon}
            </div>
          )}
          <div>
            <h3 className="font-medium text-sm">
              {serviceName}
              <span className="ml-2 text-xs text-gray-500">
                ({selectedSubServices.filter(id => 
                  subServices.some(ss => ss.id === id)).length} of {subServices.length} selected)
              </span>
            </h3>
          </div>
        </div>
        {isExpanded ? 
          <ChevronUpIcon size={18} className="text-gray-500" /> : 
          <ChevronDownIcon size={18} className="text-gray-500" />
        }
      </div>

      {/* Panel Content */}
      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subServices.map((subService) => (
              <div 
                key={subService.id} 
                className={`
                  flex items-start p-3 rounded-md cursor-pointer transition-all
                  ${selectedSubServices.includes(subService.id) 
                    ? 'bg-indigo-50 border border-indigo-100' 
                    : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'}
                `}
                onClick={() => onToggleSubService(subService.id)}
              >
                {/* Checkbox */}
                <div className="mr-3 mt-0.5">
                  <div 
                    className={`
                      w-4 h-4 rounded border transition-colors
                      ${selectedSubServices.includes(subService.id) 
                        ? 'bg-indigo-500 border-indigo-500' 
                        : 'border-gray-400'}
                    `}
                  >
                    {selectedSubServices.includes(subService.id) && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 m-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Label and description */}
                <div className="flex-1">
                  <div className="font-medium text-sm">{subService.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{subService.description}</div>
                </div>
                
                {/* Info button */}
                <div className="relative ml-1">
                  <button
                    type="button"
                    className="p-1 rounded-full hover:bg-gray-200 text-gray-400"
                    onMouseEnter={() => setShowTooltip(subService.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(prev => prev === subService.id ? null : subService.id);
                    }}
                  >
                    <InfoIcon size={14} />
                  </button>
                  
                  {/* Tooltip */}
                  {showTooltip === subService.id && (
                    <Tooltip
                      content={
                        <div className="p-2">
                          <p className="text-xs">{subService.description}</p>
                        </div>
                      }
                      position="top"
                      visible={true}
                    >
                      <span></span>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubServicePanel;
