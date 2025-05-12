/**
 * Types for the onboarding process
 */

export interface ServiceOption {
  id: string;
  name: string;
}

export interface ServiceCategory {
  name: string;
  options: ServiceOption[];
}

export interface SkillsByService {
  [serviceId: string]: string[];
}
