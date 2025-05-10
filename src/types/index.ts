export interface ServiceType {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialType {
  id: number;
  name: string;
  company: string;
  comment: string;
  image: string;
}

export interface PricingPlanType {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface StatType {
  id: number;
  value: string;
  label: string;
}

export interface StepType {
  id: number;
  title: string;
  description: string;
  icon: string;
}