import React, { useState } from "react";
import {
  Brush,
  Camera,
  Image as ImageIcon,
  Megaphone,
  FileText,
  Mail,
  Search,
  Monitor
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

// Define the services organized by category
const categories = [
  {
    key: "creative",
    label: "Creative & Visual",
    services: [
      {
        id: 1,
        title: "Graphic Design",
        description: "Logos, banners, and custom social media posts for your brand.",
        icon: <Brush size={24} />,
        link: "/service/graphic-design"
      },
      {
        id: 2,
        title: "Video Editing",
        description: "Reels, short promos, interviews, and content for every platform.",
        icon: <Camera size={24} />,
        link: "/service/video-editing"
      },
      {
        id: 3,
        title: "Image Editing",
        description: "Retouching, product photos, and visual enhancements for all needs.",
        icon: <ImageIcon size={24} />,
        link: "/service/image-editing"
      }
    ]
  },
  {
    key: "marketing",
    label: "Marketing & Content",
    services: [
      {
        id: 4,
        title: "Social Media Management",
        description: "Scheduling, feed curation, and engagement for all major platforms.",
        icon: <Megaphone size={24} />,
        link: "/service/social-media-management"
      },
      {
        id: 5,
        title: "Content Creation",
        description: "Blogs, newsletters, and short copy tailored to your audience.",
        icon: <FileText size={24} />,
        link: "/service/content-creation"
      },
      {
        id: 6,
        title: "Email Marketing",
        description: "Campaigns, templates, and content that drive results.",
        icon: <Mail size={24} />,
        link: "/service/email-marketing"
      }
    ]
  },
  {
    key: "web",
    label: "Web & Visibility",
    services: [
      {
        id: 7,
        title: "SEO Optimization",
        description: "On-page tweaks, metadata, and alt tags to boost your ranking.",
        icon: <Search size={24} />,
        link: "/service/seo-optimization"
      },
      {
        id: 8,
        title: "Web Design",
        description: "Template-based WordPress/Shopify pages for fast, effective launches.",
        icon: <Monitor size={24} />,
        link: "/service/web-design"
      }
    ]
  }
];

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState("creative");

  const activeCategory = categories.find((cat) => cat.key === activeTab);

  return (
    <section id="services" className="relative py-20 bg-white">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Explore our digital agency's core offerings by category."
          centered
        />
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm border
                ${activeTab === cat.key
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"}
              `}
              onClick={() => setActiveTab(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        
        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCategory?.services.map((service, idx) => (
            <div
              key={service.id}
              className="bg-white p-7 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 group relative fade-in"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-5 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>
              <Link
                to={service.link}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm"
              >
                Learn more
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </Container>
      
      {/* Sticky Get a Free Quote Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          to="/contact"
          className="px-6 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition-all text-base"
          style={{ boxShadow: "0 4px 24px 0 rgba(99,102,241,0.15)" }}
        >
          Get a Free Quote
        </Link>
      </div>
      
      {/* Fade-in animation style */}
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeInUp 0.7s forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;