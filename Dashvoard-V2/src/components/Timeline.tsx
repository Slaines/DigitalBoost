import React from 'react';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  items: {
    date: string;
    title: string;
    description?: string;
    status: 'completed' | 'in-progress' | 'upcoming';
  }[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-medium text-gray-900 mb-4">Upcoming Milestones</h3>
      <div className="mt-2">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            date={item.date}
            title={item.title}
            description={item.description}
            status={item.status}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;