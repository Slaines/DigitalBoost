import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding, { OnboardingStepTwo, OnboardingStepThree, OnboardingStepFour, OnboardingStepFive, OnboardingStepSix, OnboardingStepSeven, OnboardingStepEight, ProcessingPage, AccountCreationPage, PhoneVerificationPage, ReviewPage, ConfirmationPage } from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";

function App() {
  // Update document title
  React.useEffect(() => {
    document.title = "DigitalBoost - Elevate Your Digital Presence";
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <OnboardingProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/onboarding/step-two" element={<OnboardingStepTwo />} />
            <Route path="/onboarding/step-three" element={<OnboardingStepThree />} />
            <Route path="/onboarding/step-four" element={<OnboardingStepFour />} />
            <Route path="/onboarding/step-five" element={<OnboardingStepFive />} />
            <Route path="/onboarding/step-six" element={<OnboardingStepSix />} />
            <Route path="/onboarding/step-seven" element={<OnboardingStepSeven />} />
            <Route path="/onboarding/step-eight" element={<OnboardingStepEight />} />
            <Route path="/onboarding/processing" element={<ProcessingPage />} />
            <Route path="/onboarding/account-creation" element={<AccountCreationPage />} />
            <Route path="/onboarding/phone-verification" element={<PhoneVerificationPage />} />
            <Route path="/onboarding/review" element={<ReviewPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/deliverables" element={
              <ProtectedRoute>
                <Dashboard initialSection="Deliverables" />
              </ProtectedRoute>
            } />
            <Route path="/project-tracking" element={
              <ProtectedRoute>
                <Dashboard initialSection="Project Tracking" />
              </ProtectedRoute>
            } />
            <Route path="/my-data" element={
              <ProtectedRoute>
                <Dashboard initialSection="My Data" />
              </ProtectedRoute>
            } />
            <Route path="/billing" element={
              <ProtectedRoute>
                <Dashboard initialSection="Billing & Payments" />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Dashboard initialSection="Help" />
              </ProtectedRoute>
            } />
            {/* Redirect from misspelled route to correct dashboard route */}
            <Route path="/dasheboard" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </OnboardingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;