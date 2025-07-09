/**
 * Sub-service options for each main service
 */

export interface SubService {
  id: string;
  name: string; // Display name
  description: string; // Brief description of what this includes
  serviceId: string; // Parent service ID
}

// Map of main service IDs to their sub-services
export const subServicesData: Record<string, SubService[]> = {
  // Advertising & Marketing
  "social-media-marketing": [
    {
      id: "social-content-calendar",
      name: "Content Calendar & Scheduling",
      description: "Strategic planning and automated posting of content",
      serviceId: "social-media-marketing"
    },
    {
      id: "community-management",
      name: "Community Management",
      description: "Engaging with followers and managing comments/messages",
      serviceId: "social-media-marketing"
    },
    {
      id: "paid-social-ads",
      name: "Paid Social Ads",
      description: "Creation and optimization of targeted ad campaigns",
      serviceId: "social-media-marketing"
    },
    {
      id: "influencer-outreach",
      name: "Influencer Outreach",
      description: "Finding and partnering with relevant social influencers",
      serviceId: "social-media-marketing"
    },
    {
      id: "performance-reporting",
      name: "Performance Reporting",
      description: "Regular analytics reports and improvement recommendations",
      serviceId: "social-media-marketing"
    }
  ],
  "content-marketing": [
    {
      id: "blog-posts",
      name: "Blog Posts",
      description: "SEO-optimized articles tailored to your audience",
      serviceId: "content-marketing"
    },
    {
      id: "lead-magnets",
      name: "Lead-Magnet Production",
      description: "Valuable downloadable content to capture leads",
      serviceId: "content-marketing"
    },
    {
      id: "case-studies",
      name: "Case Studies",
      description: "In-depth success stories showcasing your results",
      serviceId: "content-marketing"
    },
    {
      id: "content-audit",
      name: "Content Audit",
      description: "Comprehensive review of existing content with recommendations",
      serviceId: "content-marketing"
    },
    {
      id: "distribution-plan",
      name: "Distribution Plan",
      description: "Strategy for sharing content across optimal channels",
      serviceId: "content-marketing"
    }
  ],
  "email-marketing": [
    {
      id: "campaign-strategy",
      name: "Campaign Strategy",
      description: "Planning effective email campaigns aligned with goals",
      serviceId: "email-marketing"
    },
    {
      id: "html-template",
      name: "HTML Template & Copy",
      description: "Custom designed templates with persuasive messaging",
      serviceId: "email-marketing"
    },
    {
      id: "drip-sequences",
      name: "Drip Sequences",
      description: "Automated email series to nurture prospects",
      serviceId: "email-marketing"
    },
    {
      id: "list-segmentation",
      name: "List Segmentation",
      description: "Strategic grouping of subscribers for targeted messaging",
      serviceId: "email-marketing"
    },
    {
      id: "analytics-report",
      name: "Analytics Report",
      description: "Detailed performance metrics and optimization advice",
      serviceId: "email-marketing"
    }
  ],
  "seo-optimization": [
    {
      id: "technical-audit",
      name: "Technical Audit",
      description: "Identifying and fixing website SEO issues",
      serviceId: "seo-optimization"
    },
    {
      id: "on-page-optimization",
      name: "On-Page Optimization",
      description: "Improving individual page elements for better ranking",
      serviceId: "seo-optimization"
    },
    {
      id: "keyword-research",
      name: "Keyword Research",
      description: "Discovering valuable search terms for your business",
      serviceId: "seo-optimization"
    },
    {
      id: "link-building",
      name: "Link Building",
      description: "Acquiring quality backlinks to boost authority",
      serviceId: "seo-optimization"
    },
    {
      id: "local-seo",
      name: "Local SEO Setup",
      description: "Optimizing for location-based searches",
      serviceId: "seo-optimization"
    }
  ],
  
  // Creative & Visual
  "content-creation": [
    {
      id: "social-graphics",
      name: "Social Graphics & Reels",
      description: "Eye-catching visuals and short-form video content",
      serviceId: "content-creation"
    },
    {
      id: "video-script",
      name: "Video Script & Storyboard",
      description: "Professional planning for video production",
      serviceId: "content-creation"
    },
    {
      id: "infographics",
      name: "Infographics",
      description: "Visual representations of data and information",
      serviceId: "content-creation"
    },
    {
      id: "template-packs",
      name: "Template Packs",
      description: "Consistent, branded templates for regular content",
      serviceId: "content-creation"
    }
  ],
  "graphic-design": [
    {
      id: "logo-brand-identity",
      name: "Logo & Brand Identity",
      description: "Visual elements representing your brand's personality",
      serviceId: "graphic-design"
    },
    {
      id: "social-templates",
      name: "Social Media Templates",
      description: "Cohesive designs for various social platforms",
      serviceId: "graphic-design"
    },
    {
      id: "marketing-collateral",
      name: "Marketing Collateral",
      description: "Brochures, flyers, and other promotional materials",
      serviceId: "graphic-design"
    },
    {
      id: "email-banner",
      name: "Email & Banner Visuals",
      description: "Graphics for digital marketing campaigns",
      serviceId: "graphic-design"
    }
  ],
  
  // Development & Product
  "website-development": [
    {
      id: "cms-setup",
      name: "WordPress/Shopify Setup",
      description: "Installation and configuration of your website platform",
      serviceId: "website-development"
    },
    {
      id: "custom-feature",
      name: "Custom Feature/API",
      description: "Development of specific functionality for your site",
      serviceId: "website-development"
    },
    {
      id: "responsive-qa",
      name: "Responsive QA",
      description: "Testing and fixing issues across all device types",
      serviceId: "website-development"
    },
    {
      id: "cms-training",
      name: "CMS Training",
      description: "Teaching your team how to manage your website",
      serviceId: "website-development"
    },
    {
      id: "hosting-ssl",
      name: "Hosting & SSL",
      description: "Secure hosting setup with SSL certificate",
      serviceId: "website-development"
    }
  ],
  "e-commerce": [
    {
      id: "store-setup",
      name: "Store Setup",
      description: "Complete online store configuration",
      serviceId: "e-commerce"
    },
    {
      id: "product-import",
      name: "Product Import",
      description: "Adding and optimizing your product catalog",
      serviceId: "e-commerce"
    },
    {
      id: "payment-shipping",
      name: "Payment & Shipping",
      description: "Setting up transaction and delivery options",
      serviceId: "e-commerce"
    },
    {
      id: "cart-recovery",
      name: "Cart Recovery Flow",
      description: "Automated reminders for abandoned carts",
      serviceId: "e-commerce"
    },
    {
      id: "inventory-setup",
      name: "Inventory Setup",
      description: "Stock tracking and management system",
      serviceId: "e-commerce"
    }
  ],
  "ui-ux-design": [
    {
      id: "wireframes",
      name: "Wireframes & Flows",
      description: "Planning the structure and user journeys",
      serviceId: "ui-ux-design"
    },
    {
      id: "interactive-prototype",
      name: "Interactive Prototype",
      description: "Clickable mockup to visualize the final product",
      serviceId: "ui-ux-design"
    },
    {
      id: "usability-testing",
      name: "Usability Testing",
      description: "Research with real users to improve the experience",
      serviceId: "ui-ux-design"
    },
    {
      id: "design-system",
      name: "Design System",
      description: "Consistent UI components and guidelines",
      serviceId: "ui-ux-design"
    },
    {
      id: "responsive-ui",
      name: "Responsive UI Polish",
      description: "Fine-tuning design across all screen sizes",
      serviceId: "ui-ux-design"
    }
  ]
};
