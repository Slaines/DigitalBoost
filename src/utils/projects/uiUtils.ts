import { ProjectStatus } from './projectUtils';

/**
 * Get status badge styling based on project status
 */
export const getStatusBadgeStyle = (status: ProjectStatus): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Planning':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

/**
 * Format a date string to a human-readable format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get a human-readable representation of days remaining
 */
export const formatDaysRemaining = (days: number): string => {
  if (days < 0) {
    return `${Math.abs(days)} days overdue`;
  } else if (days === 0) {
    return 'Due today';
  } else if (days === 1) {
    return 'Due tomorrow';
  } else {
    return `${days} days remaining`;
  }
};
