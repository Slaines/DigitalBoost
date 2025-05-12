/**
 * File interface to match what's used in DeliverablesSection
 */
export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: Date;
  uploadedBy?: string;
  status: 'uploading' | 'complete' | 'error';
}

/**
 * Get file type based on extension
 */
export const getFileTypeFromName = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  // Map common extensions to file types
  const extensionMap: Record<string, string> = {
    // Images
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'webp': 'image',
    
    // Documents
    'pdf': 'document',
    'doc': 'document',
    'docx': 'document',
    'txt': 'document',
    
    // Spreadsheets
    'xls': 'spreadsheet',
    'xlsx': 'spreadsheet',
    'csv': 'spreadsheet',
    
    // Presentations
    'ppt': 'presentation',
    'pptx': 'presentation',
    
    // Archives
    'zip': 'archive',
    'rar': 'archive',
    '7z': 'archive',
    
    // Videos
    'mp4': 'video',
    'mov': 'video',
    'avi': 'video',
    'webm': 'video',
    
    // Audio
    'mp3': 'audio',
    'wav': 'audio',
    'ogg': 'audio'
  };
  
  return extensionMap[extension] || 'other';
};

/**
 * Format file size in bytes to human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format a date to a readable string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Group files by type for organization
 */
export const groupFilesByType = (files: File[]): Record<string, File[]> => {
  return files.reduce((groups, file) => {
    const type = file.type || 'other';
    
    if (!groups[type]) {
      groups[type] = [];
    }
    
    groups[type].push(file);
    
    return groups;
  }, {} as Record<string, File[]>);
};

/**
 * Filter files by search query
 */
export const filterFilesByQuery = (files: File[], query: string): File[] => {
  const lowerQuery = query.toLowerCase();
  
  return files.filter(file => 
    file.name.toLowerCase().includes(lowerQuery) || 
    (file.uploadedBy && file.uploadedBy.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Calculate total size of files
 */
export const calculateTotalSize = (files: File[]): number => {
  return files.reduce((total, file) => total + file.size, 0);
};

/**
 * Get icon name for file type
 * This can be used to map file types to appropriate icons
 */
export const getIconForFileType = (fileType: string): string => {
  const iconMap: Record<string, string> = {
    'image': 'Image',
    'document': 'FileText',
    'spreadsheet': 'FileSpreadsheet',
    'presentation': 'FilePresentation',
    'archive': 'FileArchive',
    'video': 'Video',
    'audio': 'Music',
    'other': 'File'
  };
  
  return iconMap[fileType] || 'File';
};
