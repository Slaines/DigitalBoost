/**
 * Service goals data structure
 * Each service has a set of possible business goals that clients can select
 */

export interface ServiceGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type ServiceGoalsMap = {
  [serviceId: string]: ServiceGoal[];
};

export const serviceGoalsMap: ServiceGoalsMap = {
  // Advertising & Marketing
  "social-media-marketing": [
    {
      id: "increase_brand_awareness",
      title: "Increase Brand Awareness",
      description: "Get your brand in front of more potential customers",
      icon: "TrendingUpIcon"
    },
    {
      id: "drive_engagement",
      title: "Drive Engagement",
      description: "Increase likes, comments and shares on your content",
      icon: "MessageSquareIcon"
    },
    {
      id: "generate_leads",
      title: "Generate Leads",
      description: "Convert social followers into qualified leads",
      icon: "UsersIcon"
    }
  ],
  "content-marketing": [
    {
      id: "build_authority",
      title: "Build Authority",
      description: "Establish your brand as a trusted industry leader",
      icon: "AwardIcon"
    },
    {
      id: "educate_audience",
      title: "Educate Audience",
      description: "Share valuable knowledge with your target customers",
      icon: "BookOpenIcon"
    },
    {
      id: "drive_conversions",
      title: "Drive Conversions",
      description: "Create content that motivates purchase decisions",
      icon: "ShoppingCartIcon"
    }
  ],
  "email-marketing": [
    {
      id: "grow_subscriber_list",
      title: "Grow Subscriber List",
      description: "Expand your email audience with qualified contacts",
      icon: "ListIcon"
    },
    {
      id: "increase_open_rates",
      title: "Increase Open Rates",
      description: "Get more recipients to engage with your emails",
      icon: "MailOpenIcon"
    },
    {
      id: "automate_campaigns",
      title: "Automate Drip Campaigns",
      description: "Set up targeted sequences that nurture leads",
      icon: "RepeatIcon"
    }
  ],
  "seo-optimization": [
    {
      id: "improve_rankings",
      title: "Improve Rankings",
      description: "Climb higher in search results for targeted keywords",
      icon: "TrendingUpIcon"
    },
    {
      id: "drive_organic_traffic",
      title: "Drive Organic Traffic",
      description: "Increase visitors from search engines without paying for ads",
      icon: "UsersIcon"
    },
    {
      id: "boost_local_visibility",
      title: "Boost Local Visibility",
      description: "Stand out in local searches and map results",
      icon: "MapPinIcon"
    }
  ],
  
  // Creative & Visual
  "content-creation": [
    {
      id: "build_brand_identity",
      title: "Build Brand Identity",
      description: "Create a distinctive visual presence across platforms",
      icon: "PaletteIcon"
    },
    {
      id: "increase_social_engagement",
      title: "Increase Social Engagement",
      description: "Produce eye-catching content that drives interaction",
      icon: "HeartIcon"
    },
    {
      id: "tell_brand_story",
      title: "Tell Brand Story",
      description: "Craft compelling visual narratives about your company",
      icon: "BookIcon"
    }
  ],
  "graphic-design": [
    {
      id: "refresh_brand_image",
      title: "Refresh Brand Image",
      description: "Update your visual identity with modern design",
      icon: "RefreshCwIcon"
    },
    {
      id: "create_marketing_materials",
      title: "Create Marketing Materials",
      description: "Design assets for specific marketing campaigns",
      icon: "LayersIcon"
    },
    {
      id: "improve_visual_consistency",
      title: "Improve Visual Consistency",
      description: "Unify your brand's look across all touchpoints",
      icon: "GridIcon"
    }
  ],
  
  // Development & Product
  "website-development": [
    {
      id: "launch_new_site",
      title: "Launch New Site",
      description: "Create a modern, responsive website from scratch",
      icon: "GlobeIcon"
    },
    {
      id: "improve_user_experience",
      title: "Improve User Experience",
      description: "Enhance your site's navigation and functionality",
      icon: "SmileIcon"
    },
    {
      id: "add_custom_features",
      title: "Add Custom Features",
      description: "Integrate new functionality into your existing website",
      icon: "CodesandboxIcon"
    }
  ],
  "e-commerce": [
    {
      id: "launch_online_store",
      title: "Launch Online Store",
      description: "Start selling products with a new e-commerce platform",
      icon: "ShoppingBagIcon"
    },
    {
      id: "optimize_checkout_flow",
      title: "Optimize Checkout Flow",
      description: "Reduce cart abandonment and increase conversions",
      icon: "CreditCardIcon"
    },
    {
      id: "expand_sales_channels",
      title: "Expand Sales Channels",
      description: "Connect your store to additional marketplaces",
      icon: "ShareIcon"
    }
  ],
  "ui-ux-design": [
    {
      id: "redesign_user_interface",
      title: "Redesign User Interface",
      description: "Give your digital product a visual refresh",
      icon: "LayoutIcon"
    },
    {
      id: "improve_conversion_rate",
      title: "Improve Conversion Rate",
      description: "Optimize flows to increase goal completions",
      icon: "TrendingUpIcon"
    },
    {
      id: "enhance_accessibility",
      title: "Enhance Accessibility",
      description: "Make your product usable for all people",
      icon: "UsersIcon"
    }
  ]
};

export const timelineOptions = [
  { id: "asap", label: "ASAP", value: "asap" },
  { id: "2_weeks", label: "2 wks", value: "2_weeks" },
  { id: "1_month", label: "1 mo", value: "1_month" }, // default
  { id: "3_months", label: "3 mos", value: "3_months" },
  { id: "6_months", label: "6 mos", value: "6_months" }
];
