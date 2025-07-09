import React from 'react';
import * as Icons from 'lucide-react';
import { ServiceGoal } from '../../pages/onboarding/serviceGoals';

interface GoalCardProps {
  goal: ServiceGoal;
  isSelected: boolean;
  onClick: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, isSelected, onClick }) => {
  // Get the icon component from lucide-react
  const IconComponent = (Icons as any)[goal.icon];
  
  return (
    <button 
      className={`
        group w-full px-3 py-2.5 rounded-md border text-left
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300
        ${isSelected 
          ? 'bg-indigo-600 border-indigo-700 text-white shadow-md' 
          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}
      `}
      onClick={onClick}
      type="button"
      aria-pressed={isSelected}
    >
      <div className="flex items-center">
        {/* Icon */}
        <div className={`
          p-1.5 rounded-full mr-2 flex-shrink-0
          ${isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}
        `}>
          {IconComponent && <IconComponent size={16} strokeWidth={2} />}
        </div>
        
        <div>
          {/* Title */}
          <div className="flex items-center">
            <span className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-800'}`}>
              {goal.title}
            </span>
            
            {/* Selection indicator */}
            {isSelected && (
              <div className="ml-1.5 bg-white text-indigo-600 rounded-full p-0.5">
                <Icons.Check size={12} strokeWidth={3} />
              </div>
            )}
          </div>
          
          {/* Description */}
          <p className={`text-xs line-clamp-1 mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-gray-500'}`}>
            {goal.description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default GoalCard;
