import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  MailIcon, 
  LockIcon, 
  EyeIcon, 
  EyeOffIcon, 
  CheckIcon, 
  XIcon,
  ArrowRightIcon 
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useAuth } from '../../context/AuthContext';
import OnboardingLayout from '../../components/layout/OnboardingLayout';
import OnboardingIllustration from '../../components/illustrations/OnboardingIllustration';
import AnimatedTransition from '../../components/ui/AnimatedTransition';
import OnboardingCard from '../../components/ui/OnboardingCard';
import OnboardingButton from '../../components/ui/OnboardingButton';

const AccountCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const { signUp, signInWithGoogle } = useAuth();
  
  // Form state
  const [firstName, setFirstName] = useState(data.firstName || '');
  const [lastName, setLastName] = useState(data.lastName || '');
  const [email, setEmail] = useState(data.email || '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Password validation
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  
  // Validate password as user types
  useEffect(() => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    });
  }, [password]);
  
  const handleBack = () => {
    // Navigate back to review
    setCurrentStep(9);
    navigate("/onboarding/review");
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!(passwordValidation.uppercase && 
                passwordValidation.lowercase && 
                passwordValidation.number)) {
      newErrors.password = "Password doesn't meet all requirements";
    }
    
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "Passwords don't match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Save form data to context
      updateData({
        firstName,
        lastName,
        email
      });
      
      // Create account (this would use your auth system)
      await signUp(email, password, firstName, lastName);
      
      // Navigate to success/dashboard
      setCurrentStep(10);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating account:", error);
      setErrors({
        form: "Failed to create your account. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErrors({
        form: "Failed to sign in with Google. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <OnboardingLayout
      title="Create Your Account"
      subtitle="Set up your DigitalBoost account to access your dashboard"
      currentStep={10}
      onBack={handleBack}
      illustration={<OnboardingIllustration variant="success" />}
    >
      <div className="space-y-6">
        <AnimatedTransition isVisible={true} direction="up" delay={100}>
          {/* Social Sign-in Options */}
          <div className="space-y-4">
            <OnboardingButton
              variant="secondary"
              isFullWidth
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="flex items-center justify-center"
            >
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                className="w-5 h-5 mr-2"
              />
              Sign Up with Google
            </OnboardingButton>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">or sign up with email</span>
              </div>
            </div>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition isVisible={true} direction="up" delay={200}>
          <OnboardingCard>
            <div className="p-4 space-y-4">
              {/* Form Error Message */}
              {errors.form && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-4">
                  {errors.form}
                </div>
              )}
              
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon size={16} className="text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      className={`pl-10 w-full h-11 rounded-lg border ${errors.firstName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-500'} focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon size={16} className="text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      className={`pl-10 w-full h-11 rounded-lg border ${errors.lastName ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-500'} focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`pl-10 w-full h-11 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-500'} focus:outline-none focus:ring-2 focus:border-transparent`}
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`pl-10 pr-10 w-full h-11 rounded-lg border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-500'} focus:outline-none focus:ring-2 focus:border-transparent`}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={16} className="text-gray-400" />
                    ) : (
                      <EyeIcon size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              {/* Password Requirements */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center">
                  {passwordValidation.length ? (
                    <CheckIcon size={14} className="text-green-500 mr-1" />
                  ) : (
                    <XIcon size={14} className="text-gray-400 mr-1" />
                  )}
                  <span className={`text-xs ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordValidation.uppercase ? (
                    <CheckIcon size={14} className="text-green-500 mr-1" />
                  ) : (
                    <XIcon size={14} className="text-gray-400 mr-1" />
                  )}
                  <span className={`text-xs ${passwordValidation.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                    Upper case letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordValidation.lowercase ? (
                    <CheckIcon size={14} className="text-green-500 mr-1" />
                  ) : (
                    <XIcon size={14} className="text-gray-400 mr-1" />
                  )}
                  <span className={`text-xs ${passwordValidation.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                    Lower case letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordValidation.number ? (
                    <CheckIcon size={14} className="text-green-500 mr-1" />
                  ) : (
                    <XIcon size={14} className="text-gray-400 mr-1" />
                  )}
                  <span className={`text-xs ${passwordValidation.number ? 'text-green-600' : 'text-gray-500'}`}>
                    At least one number
                  </span>
                </div>
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon size={16} className="text-gray-400" />
                  </div>
                  <input
                    id="passwordConfirm"
                    type={showPassword ? "text" : "password"}
                    className={`pl-10 w-full h-11 rounded-lg border ${errors.passwordConfirm ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-500'} focus:outline-none focus:ring-2 focus:border-transparent`}
                    placeholder="Confirm your password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.passwordConfirm && (
                  <p className="mt-1 text-sm text-red-600">{errors.passwordConfirm}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="mt-6">
                <OnboardingButton
                  variant="primary"
                  isFullWidth
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  icon={isSubmitting ? undefined : <ArrowRightIcon size={16} />}
                  iconPosition="right"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account & Continue"}
                </OnboardingButton>
              </div>
              
              <p className="text-sm text-gray-500 text-center mt-4">
                By creating an account, you agree to our <a href="#" className="text-brand-600 hover:underline">Terms of Service</a> and <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </OnboardingCard>
        </AnimatedTransition>
      </div>
    </OnboardingLayout>
  );
};

export default AccountCreationPage;
