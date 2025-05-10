import { PricingPlanType, ServiceType, StatType, StepType, TestimonialType } from "../types";

export const services: ServiceType[] = [
  {
    id: 1,
    title: "Website Development",
    description: "Custom-designed, responsive websites that showcase your brand and convert visitors into customers.",
    icon: "Globe",
  },
  {
    id: 2,
    title: "Search Engine Optimization",
    description: "Strategic SEO to improve your visibility in search results and drive organic traffic to your website.",
    icon: "Search",
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to increase brand awareness and generate quality leads.",
    icon: "Megaphone",
  },
  {
    id: 4,
    title: "Content Creation",
    description: "Engaging, SEO-optimized content that resonates with your audience and establishes authority.",
    icon: "FileText",
  },
  {
    id: 5,
    title: "Social Media Management",
    description: "Strategic social media campaigns to build community, engagement, and brand loyalty.",
    icon: "ShareNodes",
  },
  {
    id: 6,
    title: "Analytics & Reporting",
    description: "Detailed analytics and reporting to track performance and inform strategic decisions.",
    icon: "BarChart",
  }
];

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechSolutions Inc.",
    comment: "Working with this team transformed our online presence. Our website traffic increased by 150% in just three months, and our conversion rate doubled!",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    company: "GreenLeaf Organics",
    comment: "The SEO and content strategy they implemented took us from page 5 to page 1 of Google search results for our key terms. Our organic leads have increased significantly.",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300"
  },
  {
    id: 3,
    name: "Jennifer Lee",
    company: "Bright Future Education",
    comment: "Their social media management has been exceptional. We've seen a 200% increase in engagement and have built a loyal online community around our brand.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
  }
];

export const pricingPlans: PricingPlanType[] = [
  {
    id: 1,
    name: "Starter",
    price: 499,
    description: "Perfect for small businesses just starting their digital journey",
    features: [
      "Custom Website (5 pages)",
      "Basic SEO Setup",
      "Monthly Performance Report",
      "Email Support",
      "1 Social Media Platform"
    ]
  },
  {
    id: 2,
    name: "Growth",
    price: 999,
    description: "Ideal for businesses looking to expand their online presence",
    features: [
      "Custom Website (10 pages)",
      "Advanced SEO Strategy",
      "Weekly Performance Reports",
      "Priority Support",
      "3 Social Media Platforms",
      "Content Creation (4 posts/month)",
      "Email Marketing Setup"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: 1999,
    description: "Comprehensive solution for established businesses",
    features: [
      "Custom Website (Unlimited pages)",
      "Premium SEO Strategy",
      "Real-time Analytics Dashboard",
      "24/7 Dedicated Support",
      "All Social Media Platforms",
      "Content Creation (12 posts/month)",
      "Email Marketing Campaigns",
      "Conversion Rate Optimization",
      "PPC Campaign Management"
    ]
  }
];

export const stats: StatType[] = [
  {
    id: 1,
    value: "250+",
    label: "Clients Served"
  },
  {
    id: 2,
    value: "94%",
    label: "Client Retention"
  },
  {
    id: 3,
    value: "180%",
    label: "Average ROI"
  },
  {
    id: 4,
    value: "15+",
    label: "Years Experience"
  }
];

export const steps: StepType[] = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "We'll discuss your business goals, target audience, and current digital presence to understand your needs.",
    icon: "UserPlus"
  },
  {
    id: 2,
    title: "Custom Strategy",
    description: "Our team develops a tailored digital strategy aligned with your business objectives and budget.",
    icon: "LightbulbDollar"
  },
  {
    id: 3,
    title: "Implementation",
    description: "We execute the strategy, creating and optimizing your digital assets with regular updates.",
    icon: "Rocket"
  },
  {
    id: 4,
    title: "Monitor & Improve",
    description: "We continuously track performance, provide detailed reports, and refine our approach for optimal results.",
    icon: "LineChart"
  }
];