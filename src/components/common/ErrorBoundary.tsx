import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors in child components,
 * log the errors, and display a fallback UI instead of crashing the app.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    this.setState({
      errorInfo
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" size={24} />
            <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
          </div>
          
          <div className="mb-4">
            <p className="text-red-600">
              {this.state.error?.toString() || 'An unexpected error occurred'}
            </p>
          </div>
          
          {/* Show component stack in development only */}
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <details className="mt-4 p-3 bg-white border border-red-100 rounded">
              <summary className="text-sm text-red-600 font-medium cursor-pointer">
                Component Stack Details
              </summary>
              <pre className="mt-2 text-xs overflow-auto p-2 bg-gray-50 text-gray-800 max-h-64">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
