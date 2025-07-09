/**
 * Extended service details including descriptions and bullet points
 */

export interface ServiceDetail {
  id: string;
  name: string;
  description: string;
  details: string[];
  icon?: string; // We'll use this as a key to map to the actual React icon component
}

export interface ServiceCategoryWithDetails {
  name: string;
  services: ServiceDetail[];
}

export const serviceDetailsData: ServiceCategoryWithDetails[] = [
  {
    name: "Advertising & Marketing",
    services: [
      { 
        id: "social-media-marketing", 
        name: "Social Media Marketing", 
        description: "Strategic posting, engagement & paid campaigns across platforms",
        details: [
          "Content calendar & scheduled posting",
          "Engagement strategy & community management",
          "Performance analytics & optimization"
        ],
        icon: "Share2"
      },
      { 
        id: "email-marketing", 
        name: "Email Marketing", 
        description: "Targeted campaigns, automation & subscriber growth",
        details: [
          "Campaign design & copywriting",
          "Automation sequences & drip campaigns",
          "A/B testing & conversion tracking"
        ],
        icon: "Mail"
      },
      { 
        id: "seo-optimization", 
        name: "SEO Optimization", 
        description: "Technical audit, on-page optimization & backlink building",
        details: [
          "Technical site audit & performance fixes",
          "Keyword research & on-page optimization",
          "Backlink acquisition & content strategy"
        ],
        icon: "Search"
      },
      { 
        id: "content-marketing", 
        name: "Content Marketing", 
        description: "Blog posts, guides & valuable content that converts",
        details: [
          "Content strategy & editorial calendar",
          "Blog posts, guides & downloadable assets",
          "Distribution strategy & performance tracking"
        ],
        icon: "FileText"
      },
    ],
  },
  {
    name: "Creative & Visual",
    services: [
      { 
        id: "content-creation", 
        name: "Content Creation", 
        description: "Engaging written & visual assets for your brand",
        details: [
          "Blog posts & website copy",
          "Social media captions & newsletters",
          "eBooks & downloadable guides"
        ],
        icon: "PenTool"
      },
      { 
        id: "graphic-design", 
        name: "Graphic Design", 
        description: "Brand identity, marketing assets & visual elements",
        details: [
          "Logo design & brand guidelines",
          "Marketing materials & social graphics",
          "Print materials & packaging design"
        ],
        icon: "Palette"
      }
    ],
  },
  {
    name: "Development & Product",
    services: [
      { 
        id: "website-development", 
        name: "Website Development", 
        description: "Custom websites, from simple landing pages to complex portals",
        details: [
          "Custom design & responsive development",
          "CMS implementation & content migration",
          "Performance optimization & analytics setup"
        ],
        icon: "Code"
      },
      { 
        id: "e-commerce", 
        name: "E-commerce Solutions", 
        description: "Online stores with secure payment & inventory management",
        details: [
          "Custom store design & development",
          "Payment gateway integration",
          "Inventory & order management systems"
        ],
        icon: "ShoppingCart"
      },
      { 
        id: "ui-ux-design", 
        name: "UI/UX Design", 
        description: "User-centered interfaces with seamless experiences",
        details: [
          "User research & persona development",
          "Wireframing & interactive prototyping",
          "Usability testing & refinement"
        ],
        icon: "Layout"
      },
    ],
  },
];
