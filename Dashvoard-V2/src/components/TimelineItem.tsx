import React from 'react';

interface TimelineItemProps {
  date: string;
  title: string;
  description?: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  isLast?: boolean;
}

const TimelineItem = ({
  date,
  title,
  description,
  status,
  isLast = false,
}: TimelineItemProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div className={`rounded-full h-4 w-4 ${getStatusColor()}`}></div>
        {!isLast && (
          <div className={`w-px flex-1 ${status === 'completed' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
        )}
      </div>
      <div className="ml-4 pb-8">
        <div className="text-xs text-gray-500">{date}</div>
        <div className="font-medium">{title}</div>
        {description && <div className="text-sm text-gray-600">{description}</div>}
        
        {status === 'in-progress' && (
          <div className="mt-2">
            <div className="h-1.5 w-full rounded-full bg-gray-200">
              <div className="h-1.5 rounded-full bg-blue-500" style={{ width: '45%' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;