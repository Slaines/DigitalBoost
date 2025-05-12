/**
 * Service-specific skills for the onboarding process
 * This maps each service ID to its relevant skills
 */

import { SkillsByService } from './types';

// Map of service IDs to relevant skills
export const serviceSkillsMap: SkillsByService = {
  // Advertising & Marketing services
  "social-media-marketing": [
    "Social Media Strategy", "Content Creation", "Community Management", 
    "Paid Social Campaigns", "Social Analytics", "Influencer Marketing",
    "Instagram Marketing", "TikTok Strategy", "Facebook Ads", "LinkedIn Marketing",
    "Social Media Auditing", "Social Content Calendar", "Hashtag Strategy",
    "Social Media Crisis Management", "Social Media Copywriting"
  ],
  "email-marketing": [
    "Email Campaign Design", "Email Automation", "CRM Integration", 
    "Subscriber Management", "A/B Testing", "Email Analytics",
    "Email Copywriting", "Email Deliverability", "Email List Segmentation",
    "Email Nurture Sequences", "Newsletter Management", "Email Design",
    "Marketing Automation", "Drip Campaigns", "Email Personalization"
  ],
  "seo-optimization": [
    "Keyword Research", "On-page SEO", "Technical SEO", "Link Building", 
    "Local SEO", "SEO Analytics", "Content Optimization",
    "SEO Auditing", "Competitive Analysis", "Mobile SEO", "International SEO",
    "Schema Markup", "Voice Search Optimization", "E-commerce SEO",
    "SEO Content Strategy", "Search Console Management"
  ],
  "content-marketing": [
    "Content Strategy", "Blogging", "Copywriting", "Content Calendar", 
    "Content Distribution", "Content Analytics", "Content Repurposing",
    "Lead Magnet Creation", "Content Auditing", "Thought Leadership Content",
    "Content Personalization", "Long-Form Content", "Video Content Strategy",
    "Podcast Production", "Webinar Development", "Case Study Writing"
  ],
  "ppc-advertising": [
    "Google Ads Management", "Facebook Ads", "Instagram Ads", "LinkedIn Ads",
    "Display Advertising", "Remarketing Campaigns", "Ad Copywriting",
    "PPC Analytics", "Conversion Tracking", "Landing Page Optimization",
    "Bid Management", "Ad A/B Testing", "Campaign Structure", "Budget Management"
  ],
  
  // Creative & Visual services
  "content-creation": [
    "Blog Writing", "Copywriting", "Storytelling", "Scriptwriting", 
    "Content Editing", "Content Planning", "Article Writing",
    "Technical Writing", "Creative Writing", "SEO Writing",
    "Newsletter Content", "Sales Copy", "Website Copy", "Product Descriptions"
  ],
  "graphic-design": [
    "Logo Design", "Brand Identity", "Print Design", "Digital Design", 
    "Illustration", "Typography", "Layout Design", "Packaging Design",
    "Social Media Graphics", "Infographic Design", "Icon Design",
    "Banner Design", "Business Card Design", "Brochure Design",
    "Web Graphics", "UI Design Elements", "Digital Illustration"
  ],
  "video-production": [
    "Video Filming", "Video Editing", "Animation", "Motion Graphics", 
    "Video Scripting", "Video Post-production", "Video Strategy",
    "Product Videos", "Explainer Videos", "Testimonial Videos",
    "Promo Videos", "Social Media Videos", "Video Ads", "2D Animation",
    "3D Animation", "Drone Videography", "Video Storyboarding"
  ],
  "photography": [
    "Product Photography", "Brand Photography", "Portrait Photography",
    "Event Photography", "Photo Editing", "Photo Retouching",
    "Lifestyle Photography", "Social Media Photography", "Stock Photography"
  ],
  
  // Development & Product services
  "website-development": [
    "Frontend Development", "Backend Development", "Responsive Design", 
    "CMS Development", "E-commerce Development", "Web Performance Optimization",
    "WordPress Development", "Shopify Development", "JavaScript Development",
    "PHP Development", "Database Design", "API Integration",
    "Website Migration", "Custom Website Features", "Web Accessibility",
    "SEO Implementation", "Website Security", "Progressive Web Apps"
  ],
  "app-development": [
    "iOS Development", "Android Development", "Cross-platform Development", 
    "App Design", "Mobile Testing", "App Store Optimization",
    "React Native Development", "Flutter Development", "Native App Development",
    "App Prototyping", "App UX/UI Design", "App Backend Integration",
    "Mobile App Strategy", "Push Notification Systems", "App Analytics Integration"
  ],
  "e-commerce": [
    "E-commerce Platform Setup", "Product Catalog Management", "Payment Gateway Integration", 
    "Shopping Cart Development", "E-commerce SEO", "Conversion Rate Optimization",
    "Shopify Store Setup", "WooCommerce Development", "Inventory Management",
    "Order Fulfillment Systems", "Customer Account Management", "Product Import/Export",
    "Checkout Optimization", "E-commerce Analytics", "Abandoned Cart Recovery"
  ],
  "ui-ux-design": [
    "User Research", "Wireframing", "Prototyping", "Usability Testing", 
    "User Interface Design", "Interaction Design", "Design Systems",
    "User Journey Mapping", "Persona Development", "Information Architecture",
    "Responsive Design", "Mobile UX Design", "Web UX Design",
    "Accessibility Design", "UX Writing", "UX Auditing"
  ],
  "software-development": [
    "Full-Stack Development", "API Development", "Custom Software Solutions",
    "Web Application Development", "Database Design", "Cloud Integration",
    "Software Architecture", "DevOps Implementation", "Agile Development",
    "Software Testing", "Code Refactoring", "Legacy System Modernization"
  ]
};
