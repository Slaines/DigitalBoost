// Simple toast utility
// This is a placeholder implementation - in a real app, you would use a library like react-hot-toast

export const toast = {
  success: (message: string) => {
    console.log(`%c✓ Success: ${message}`, 'color: green; font-weight: bold');
    // In a real implementation, this would show a toast notification
  },
  
  error: (message: string) => {
    console.error(`%c✗ Error: ${message}`, 'color: red; font-weight: bold');
    // In a real implementation, this would show a toast notification
  },
  
  info: (message: string) => {
    console.info(`%cℹ Info: ${message}`, 'color: blue; font-weight: bold');
    // In a real implementation, this would show a toast notification
  }
};

export default toast;
