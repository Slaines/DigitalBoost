import React from 'react';
import { timelineOptions } from '../../pages/onboarding/serviceGoals';
import * as Icons from 'lucide-react';

interface TimelineSelectorProps {
  selectedTimeline: string;
  onChange: (timelineId: string) => void;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ selectedTimeline, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {timelineOptions.map((option) => {
        const isSelected = option.id === selectedTimeline;
        
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all
              ${isSelected 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-white border border-gray-300 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50'}
            `}
          >
            {isSelected ? (
              <Icons.CheckCircle className="text-white" size={14} />
            ) : (
              <Icons.Clock className="text-indigo-400" size={14} />
            )}
            <span className="text-sm">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TimelineSelector;
