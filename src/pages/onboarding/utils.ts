/**
 * Onboarding Utilities
 * 
 * Common functions and utilities for the onboarding process
 */

import { OnboardingData } from './constants';

/**
 * Validate that a specific field from onboarding data is complete
 * 
 * @param data Onboarding data
 * @param field Field to validate
 * @returns boolean indicating if the field is valid
 */
export function validateField(data: OnboardingData, field: keyof OnboardingData): boolean {
  const value = data[field];
  
  // Handle array fields (like skills)
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  // Handle object fields (like budget)
  if (typeof value === 'object' && value !== null) {
    return Object.values(value).every(v => v !== undefined && v !== '');
  }
  
  // Handle string fields
  return value !== undefined && value !== '';
}

/**
 * Generate a progress percentage based on completed steps
 * 
 * @param data Onboarding data
 * @param totalSteps Total number of steps in the onboarding process
 * @returns Progress percentage between 0-100
 */
export function calculateProgress(data: OnboardingData, totalSteps: number): number {
  // Fields to check for progress calculation
  const fields: (keyof OnboardingData)[] = [
    'service',
    'skills',
    'location',
    'companyName',
    'companySize',
    'industry',
    'budget',
    'projectContext'
  ];
  
  // Count completed fields
  const completedFields = fields.filter(field => validateField(data, field)).length;
  
  // Calculate percentage
  return Math.round((completedFields / totalSteps) * 100);
}

/**
 * Get a human-readable title for a step
 * 
 * @param stepNumber The step number
 * @returns A human-readable title for the step
 */
export function getStepTitle(stepNumber: number): string {
  const titles: Record<number, string> = {
    1: 'Service Selection',
    2: 'Skills Selection',
    3: 'Location',
    4: 'Company Information',
    5: 'Company Size',
    6: 'Industry Selection',
    7: 'Budget Planning',
    8: 'Project Details',
    9: 'Review Information',
    10: 'Account Creation',
  };
  
  return titles[stepNumber] || `Step ${stepNumber}`;
}

/**
 * Format data for display in the review page
 * 
 * @param data Onboarding data
 * @returns Formatted data for display
 */
export function formatDataForDisplay(data: OnboardingData): Record<string, string> {
  const display: Record<string, string> = {};
  
  // Service
  if (data.service) {
    display.service = data.service;
  }
  
  // Skills
  if (data.skills && data.skills.length > 0) {
    display.skills = data.skills.join(', ');
  }
  
  // Location
  if (data.location) {
    display.location = data.location;
  }
  
  // Company name
  if (data.companyName) {
    display.companyName = data.companyName;
  }
  
  // Company size
  if (data.companySize) {
    display.companySize = data.companySize;
  }
  
  // Industry
  if (data.industry) {
    display.industry = data.industry;
  }
  
  // Budget
  if (data.budget) {
    display.budget = `${data.budget.type === 'one-time' ? 'One-time: ' : 'Monthly: '}${data.budget.range}`;
  }
  
  // Project context
  if (data.projectContext) {
    // Truncate if too long
    display.projectContext = data.projectContext.length > 100 
      ? `${data.projectContext.substring(0, 100)}...` 
      : data.projectContext;
  }
  
  return display;
}

/**
 * Helper to determine if a step should be enabled based on previous steps completion
 * 
 * @param data Onboarding data
 * @param stepNumber Step number to check
 * @returns Boolean indicating if the step should be enabled
 */
export function isStepEnabled(data: OnboardingData, stepNumber: number): boolean {
  // If step 1, always enabled
  if (stepNumber === 1) return true;
  
  // Required fields for each step
  const requiredFields: Record<number, (keyof OnboardingData)[]> = {
    2: ['service'],
    3: ['service', 'skills'],
    4: ['service', 'skills', 'location'],
    5: ['service', 'skills', 'location', 'companyName'],
    6: ['service', 'skills', 'location', 'companyName', 'companySize'],
    7: ['service', 'skills', 'location', 'companyName', 'companySize', 'industry'],
    8: ['service', 'skills', 'location', 'companyName', 'companySize', 'industry', 'budget'],
    9: ['service', 'skills', 'location', 'companyName', 'companySize', 'industry', 'budget', 'projectContext'],
    10: ['service', 'skills', 'location', 'companyName', 'companySize', 'industry', 'budget', 'projectContext'],
  };
  
  // Get required fields for this step
  const required = requiredFields[stepNumber];
  if (!required) return false;
  
  // Check if all required fields are valid
  return required.every(field => validateField(data, field));
}
