import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/client';
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";
// Import onboarding components
import Onboarding from "./pages/Onboarding";
import OnboardingIndex from "./pages/onboarding/index";
import Step1 from "./pages/onboarding/Step1";
import Step2 from "./pages/onboarding/Step2";
import Step3 from "./pages/onboarding/Step3";
import Step4 from "./pages/onboarding/Step4";
import Step5 from "./pages/onboarding/Step5";
import Step6 from "./pages/onboarding/Step6";
import Step7 from "./pages/onboarding/Step7";
import Step8 from "./pages/onboarding/Step8";
import ReviewPage from "./pages/onboarding/Review";
import AccountCreationPage from "./pages/onboarding/AccountCreation";
import { ProcessingPage, PhoneVerificationPage, ConfirmationPage } from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AlertTriangle } from 'lucide-react';

function App() {
  // Update document title
  React.useEffect(() => {
    document.title = "DigitalBoost - Elevate Your Digital Presence";
  }, []);

  // Function to log errors to a monitoring service (can be expanded later)
  const logError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Application error:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // Here you could send the error to a monitoring service like Sentry
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    // }
  };

  // Global fallback UI for critical app errors
  const globalFallback = (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-red-100">
        <div className="flex items-center mb-4">
          <AlertTriangle className="text-red-500 mr-3" size={28} />
          <h2 className="text-xl font-bold text-gray-800">Something went wrong</h2>
        </div>
        <p className="text-gray-600 mb-6">
          We've encountered an unexpected error. Our team has been notified and is working to fix the issue.
        </p>
        <div className="flex justify-between">
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={globalFallback} onError={logError}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <OnboardingProvider>
              <Routes>
                <Route path="/" element={
                  <ErrorBoundary onError={logError}>
                    <Home />
                  </ErrorBoundary>
                } />
                
                {/* Service detail page */}
                <Route path="/service/:slug" element={
                  <ErrorBoundary onError={logError}>
                    <ServiceDetail />
                  </ErrorBoundary>
                } />
                
                {/* Onboarding routes with error boundaries */}
                <Route path="/onboarding" element={
                  <ErrorBoundary onError={logError}>
                    <OnboardingIndex />
                  </ErrorBoundary>
                } />
                {/* New URL format */}
                <Route path="/onboarding/Step1" element={
                  <ErrorBoundary onError={logError}>
                    <Step1 />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/Step2" element={
                  <ErrorBoundary onError={logError}>
                    <Step2 />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/Step3" element={
                  <ErrorBoundary onError={logError}>
                    <Step3 />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/Step4" element={
                  <ErrorBoundary onError={logError}>
                    <Step4 />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/Step5" element={
                  <ErrorBoundary onError={logError}>
                    <Step5 />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/Step6" element={
                  <ErrorBoundary onError={logError}>
                    <Step6 />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/Step7" element={
                  <ErrorBoundary onError={logError}>
                    <Step7 />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/Step8" element={
                  <ErrorBoundary onError={logError}>
                    <Step8 />
                  </ErrorBoundary>
                } />
                {/* Keep the old routes for backward compatibility */}
                <Route path="/onboarding/step-two" element={<Navigate to="/onboarding/Step2" replace />} />
                <Route path="/onboarding/step-three" element={<Navigate to="/onboarding/Step3" replace />} />
                <Route path="/onboarding/step-four" element={<Navigate to="/onboarding/Step4" replace />} />
                <Route path="/onboarding/step-five" element={<Navigate to="/onboarding/Step5" replace />} />
                <Route path="/onboarding/step-six" element={<Navigate to="/onboarding/Step6" replace />} />
                <Route path="/onboarding/step-seven" element={<Navigate to="/onboarding/Step7" replace />} />
                <Route path="/onboarding/step-eight" element={<Navigate to="/onboarding/Step8" replace />} />
                <Route path="/onboarding/processing" element={
                  <ErrorBoundary onError={logError}>
                    <ProcessingPage />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/account-creation" element={
                  <ErrorBoundary onError={logError}>
                    <AccountCreationPage />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/phone-verification" element={
                  <ErrorBoundary onError={logError}>
                    <PhoneVerificationPage />
                  </ErrorBoundary>
                } />
                <Route path="/onboarding/review" element={
                  <ErrorBoundary onError={logError}>
                    <ReviewPage />
                  </ErrorBoundary>
                } />
                <Route path="/confirmation" element={
                  <ErrorBoundary onError={logError}>
                    <ConfirmationPage />
                  </ErrorBoundary>
                } />
                <Route path="/login" element={
                  <ErrorBoundary onError={logError}>
                    <Login />
                  </ErrorBoundary>
                } />
                
                {/* Dashboard routes with error boundaries */}
                <Route path="/dashboard" element={
                  <ErrorBoundary onError={logError}>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </ErrorBoundary>
                } />
                <Route path="/deliverables" element={
                  <ErrorBoundary onError={logError}>
                    <ProtectedRoute>
                      <Dashboard initialSection="Deliverables" />
                    </ProtectedRoute>
                  </ErrorBoundary>
                } />
                <Route path="/project-tracking" element={
                  <ErrorBoundary onError={logError}>
                    <ProtectedRoute>
                      <Dashboard initialSection="Project Tracking" />
                    </ProtectedRoute>
                  </ErrorBoundary>
                } />
                <Route path="/my-data" element={
                  <ErrorBoundary onError={logError}>
                    <ProtectedRoute>
                      <Dashboard initialSection="My Data" />
                    </ProtectedRoute>
                  </ErrorBoundary>
                } />
                <Route path="/billing" element={
                  <ErrorBoundary onError={logError}>
                    <ProtectedRoute>
                      <Dashboard initialSection="Billing & Payments" />
                    </ProtectedRoute>
                  </ErrorBoundary>
                } />
                <Route path="/help" element={
                  <ErrorBoundary onError={logError}>
                    <ProtectedRoute>
                      <Dashboard initialSection="Help" />
                    </ProtectedRoute>
                  </ErrorBoundary>
                } />
                
                {/* Redirect from misspelled route to correct dashboard route */}
                <Route path="/dasheboard" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </OnboardingProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;