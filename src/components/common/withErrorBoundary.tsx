import { ComponentType, ErrorInfo, ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface WithErrorBoundaryOptions {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Higher-order component that wraps a component with an ErrorBoundary
 * 
 * @param Component - The component to wrap
 * @param options - Options for the ErrorBoundary
 * @returns A wrapped component with error boundary protection
 */
function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): ComponentType<P> {
  const { fallback, onError } = options;
  
  const WithErrorBoundary = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  // Set display name for better debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;
  
  return WithErrorBoundary;
}

export default withErrorBoundary;
