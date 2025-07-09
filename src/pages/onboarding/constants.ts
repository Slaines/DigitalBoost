/**
 * Onboarding structure and constants
 * 
 * This file defines the structure, sequences, and validation rules for the onboarding process
 */

// Using inline type definitions instead of importing from types.ts
// to avoid circular dependencies

// Interface for mapping services to their relevant skills
export interface SkillMap {
  [serviceId: string]: string[];
}

export type OnboardingStep = {
  id: number;
  key: string;
  title: string;
  path: string;
  required: (keyof OnboardingData)[];
  nextStep: number;
  prevStep: number | null;
};

export interface OnboardingData {
  // Step 1: Service Selection
  services?: string[]; // Array of selected service IDs
  
  // Step 2: Service Goals & Timeline
  serviceGoals?: Array<{ service: string; goal: string }>; // Array of service-goal pairs
  timeline?: string; // Selected timeline option
  
  // Step 3: Location
  location?: string;
  
  // Step 4: Company Information
  companyName?: string;
  
  // Step 5: Company Size
  companySize?: string;
  
  // Step 6: Industry
  industry?: string;
  
  // Step 7: Budget
  budget?: {
    type: string; // 'one-time' or 'monthly'
    range: string; // format: 'minBudget-maxBudget'
  };
  
  // Step 8: Project Details
  projectContext?: string;
  
  // Account Creation
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

/**
 * Service options for Step 1
 */
export type ServiceOption = {
  id: string;
  name: string;
};

export type ServiceCategory = {
  name: string;
  options: ServiceOption[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Advertising & Marketing",
    options: [
      { id: "social-media-marketing", name: "Social Media Marketing" },
      { id: "email-marketing", name: "Email Marketing" },
      { id: "seo-optimization", name: "SEO Optimization" },
      { id: "content-marketing", name: "Content Marketing" },
    ],
  },
  {
    name: "Creative & Visual",
    options: [
      { id: "content-creation", name: "Content Creation" },
      { id: "graphic-design", name: "Graphic Design" },
      { id: "video-production", name: "Video Production" },
    ],
  },
  {
    name: "Development & Product",
    options: [
      { id: "website-development", name: "Website Development" },
      { id: "app-development", name: "App Development" },
      { id: "e-commerce", name: "E-commerce Solutions" },
      { id: "ui-ux-design", name: "UI/UX Design" },
    ],
  },
];

/**
 * Industry options for Step 6
 */
export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education", 
  "Retail",
  "E-commerce",
  "Manufacturing", 
  "Real Estate",
  "Travel & Hospitality",
  "Food & Beverage", 
  "Media & Entertainment",
  "Non-profit",
  "Professional Services",
  "Construction",
  "Agriculture",
  "Energy & Utilities",
  "Transportation & Logistics",
  "Automotive",
  "Government",
  "Telecommunications"
];

/**
 * Company size options for Step 5
 */
export const companySizeOptions = [
  { id: "1-10", label: "1-10 employees" },
  { id: "11-50", label: "11-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201-500", label: "201-500 employees" },
  { id: "501-1000", label: "501-1000 employees" },
  { id: "1001+", label: "1001+ employees" }
];

/**
 * Budget options for Step 7
 */
export const budgetRanges = {
  'one-time': [
    { value: '$1,000-$5,000', label: '$1,000-$5,000' },
    { value: '$5,000-$10,000', label: '$5,000-$10,000' },
    { value: '$10,000-$25,000', label: '$10,000-$25,000' },
    { value: '$25,000-$50,000', label: '$25,000-$50,000' },
    { value: '$50,000+', label: '$50,000+' },
  ],
  'monthly': [
    { value: '$500-$1,000/month', label: '$500-$1,000/month' },
    { value: '$1,000-$2,500/month', label: '$1,000-$2,500/month' },
    { value: '$2,500-$5,000/month', label: '$2,500-$5,000/month' },
    { value: '$5,000-$10,000/month', label: '$5,000-$10,000/month' },
    { value: '$10,000+/month', label: '$10,000+/month' },
  ]
};

/**
 * Onboarding step sequence and configuration
 */
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    key: 'service',
    title: 'Select a Service',
    path: '/onboarding/Step1',
    required: [],
    nextStep: 2,
    prevStep: null,
  },
  {
    id: 2,
    key: 'serviceGoals',
    title: 'Service Goals & Timeline',
    path: '/onboarding/Step2',
    required: ['services'],
    nextStep: 3,
    prevStep: 1,
  },
  {
    id: 3,
    key: 'location',
    title: 'Your Location',
    path: '/onboarding/Step3',
    required: ['services', 'serviceGoals', 'timeline'],
    nextStep: 4,
    prevStep: 2,
  },
  {
    id: 4,
    key: 'companyName',
    title: 'Company Name',
    path: '/onboarding/Step4',
    required: ['services', 'serviceGoals', 'timeline', 'location'],
    nextStep: 5,
    prevStep: 3,
  },
  {
    id: 5,
    key: 'companySize',
    title: 'Company Size',
    path: '/onboarding/Step5',
    required: ['services', 'serviceGoals', 'timeline', 'location', 'companyName'],
    nextStep: 6,
    prevStep: 4,
  },
  {
    id: 6,
    key: 'industry',
    title: 'Industry',
    path: '/onboarding/Step6',
    required: ['services', 'serviceGoals', 'timeline', 'location', 'companyName', 'companySize'],
    nextStep: 7,
    prevStep: 5,
  },
  {
    id: 7,
    key: 'budget',
    title: 'Budget',
    path: '/onboarding/Step7',
    required: ['services', 'serviceGoals', 'timeline', 'location', 'companyName', 'companySize', 'industry'],
    nextStep: 8,
    prevStep: 6,
  },
  {
    id: 8,
    key: 'projectContext',
    title: 'Project Context',
    path: '/onboarding/Step8',
    required: ['services', 'serviceGoals', 'timeline', 'location', 'companyName', 'companySize', 'industry', 'budget'],
    nextStep: 9,
    prevStep: 7,
  },
  {
    id: 9, 
    key: 'review',
    title: 'Review Information',
    path: '/onboarding/review',
    required: ['services', 'serviceGoals', 'timeline', 'location', 'companyName', 'companySize', 'industry', 'budget', 'projectContext'],
    nextStep: 10,
    prevStep: 8,
  },
  {
    id: 10,
    key: 'account',
    title: 'Create Account',
    path: '/onboarding/account-creation',
    required: ['services', 'serviceGoals', 'timeline', 'location', 'companyName', 'companySize', 'industry', 'budget', 'projectContext'],
    nextStep: 11,
    prevStep: 9,
  }
];
