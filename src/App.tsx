import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          </Routes>
        </OnboardingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;