/**
 * Get appropriate styling for invoice status badges
 */
export const getStatusBadgeStyle = (status: string): { bgColor: string; textColor: string } => {
  switch (status) {
    case 'paid':
      return { bgColor: 'bg-green-100', textColor: 'text-green-800' };
    case 'pending':
      return { bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
    case 'overdue':
      return { bgColor: 'bg-red-100', textColor: 'text-red-800' };
    default:
      return { bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
  }
};

/**
 * Format a date difference into a human-readable string
 */
export const formatDueDays = (days: number): string => {
  if (days < 0) {
    return `${Math.abs(days)} days overdue`;
  } else if (days === 0) {
    return 'Due today';
  } else if (days === 1) {
    return 'Due tomorrow';
  } else {
    return `Due in ${days} days`;
  }
};

/**
 * Format a file size in bytes to a human-readable string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
