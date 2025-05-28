import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { services } from "../data";
import { Link } from "react-router-dom";

// Extended service details with more content for each service
const serviceDetails = {
  "Website Development": {
    features: [
      "Custom, responsive design optimized for all devices",
      "User-friendly navigation and intuitive interface",
      "Fast loading speeds and performance optimization",
      "SEO-friendly structure and clean code",
      "Content management system integration",
      "Secure hosting and SSL certificate"
    ],
    benefits: [
      "Establish a professional online presence",
      "Improve user experience and engagement",
      "Increase conversion rates with strategic design",
      "Build credibility and trust with customers",
      "Easily update content without technical knowledge"
    ],
    process: [
      "Discovery and requirements gathering",
      "Wireframing and design mockups",
      "Development and coding",
      "Content integration",
      "Testing and quality assurance",
      "Launch and post-launch support"
    ],
    caseStudy: {
      client: "TechSolutions Inc.",
      challenge: "Outdated website with poor mobile experience and low conversion rates.",
      solution: "Complete redesign with responsive layout, improved navigation, and strategic call-to-actions.",
      result: "150% increase in mobile traffic, 75% increase in lead generation, and 40% higher conversion rate."
    }
  },
  "Search Engine Optimization": {
    features: [
      "Comprehensive SEO audit and strategy",
      "Keyword research and competitive analysis",
      "On-page optimization and content enhancement",
      "Technical SEO improvements",
      "Local SEO optimization",
      "Regular performance reporting"
    ],
    benefits: [
      "Improve visibility in search engine results",
      "Increase organic traffic to your website",
      "Target qualified leads through strategic keywords",
      "Build authority in your industry",
      "Achieve sustainable, long-term growth"
    ],
    process: [
      "Initial audit and analysis",
      "Strategy development",
      "On-page and technical optimization",
      "Content creation and enhancement",
      "Link building and off-page SEO",
      "Monitoring and continuous improvement"
    ],
    caseStudy: {
      client: "GreenLeaf Organics",
      challenge: "New e-commerce store with no search visibility and struggling to compete with established brands.",
      solution: "Comprehensive SEO strategy focusing on long-tail keywords, content marketing, and technical optimization.",
      result: "First page rankings for 35 target keywords, 200% increase in organic traffic, and 85% growth in online sales."
    }
  },
  "Digital Marketing": {
    features: [
      "Multi-channel marketing strategy",
      "Social media advertising and management",
      "Email marketing campaigns",
      "Content marketing",
      "PPC advertising",
      "Conversion rate optimization"
    ],
    benefits: [
      "Reach your target audience across multiple platforms",
      "Generate qualified leads and increase conversions",
      "Build brand awareness and recognition",
      "Engage with customers and build relationships",
      "Maximize ROI with data-driven strategies"
    ],
    process: [
      "Audience analysis and market research",
      "Strategy development and channel selection",
      "Campaign creation and content development",
      "Implementation and launch",
      "Performance tracking and optimization",
      "Reporting and strategy refinement"
    ],
    caseStudy: {
      client: "Bright Future Education",
      challenge: "Limited online presence and struggling to attract new students in a competitive market.",
      solution: "Integrated digital marketing strategy across social media, email, and content marketing with targeted advertising.",
      result: "300% increase in qualified leads, 150% growth in social media engagement, and 45% reduction in cost per acquisition."
    }
  },
  "Content Creation": {
    features: [
      "SEO-optimized blog posts and articles",
      "Website copy and landing pages",
      "Email newsletters and campaigns",
      "Social media content",
      "Video scripts and production",
      "Infographics and visual content"
    ],
    benefits: [
      "Establish thought leadership and authority",
      "Improve search engine rankings with quality content",
      "Engage and educate your target audience",
      "Support lead generation and nurturing",
      "Build brand voice and personality"
    ],
    process: [
      "Content strategy development",
      "Keyword research and topic selection",
      "Content creation and optimization",
      "Review and approval",
      "Publication and promotion",
      "Performance analysis and refinement"
    ],
    caseStudy: {
      client: "HealthPlus Medical Group",
      challenge: "Lack of engaging content to attract and educate potential patients about their services.",
      solution: "Comprehensive content strategy with blog posts, patient stories, and educational resources.",
      result: "250% increase in blog traffic, 40% higher time on site, and 65% increase in appointment requests through content."
    }
  },
  "Social Media Management": {
    features: [
      "Platform-specific strategy development",
      "Content calendar creation",
      "Regular posting and community management",
      "Paid social media advertising",
      "Influencer outreach and partnerships",
      "Analytics and performance reporting"
    ],
    benefits: [
      "Build and engage with your online community",
      "Increase brand awareness and recognition",
      "Drive website traffic and lead generation",
      "Provide responsive customer service",
      "Gain valuable insights about your audience"
    ],
    process: [
      "Platform audit and audience analysis",
      "Strategy development and goal setting",
      "Content creation and calendar planning",
      "Implementation and community management",
      "Advertising campaign management",
      "Reporting and strategy optimization"
    ],
    caseStudy: {
      client: "Urban Style Clothing",
      challenge: "New fashion brand with limited visibility and struggling to build a customer base.",
      solution: "Strategic social media presence across Instagram, TikTok, and Facebook with influencer partnerships.",
      result: "20,000+ followers in 6 months, 400% increase in website traffic from social media, and 75% growth in online sales."
    }
  },
  "Analytics & Reporting": {
    features: [
      "Custom analytics dashboard setup",
      "Goal tracking and conversion analysis",
      "User behavior and journey mapping",
      "Regular performance reports",
      "Competitive benchmarking",
      "Data-driven recommendations"
    ],
    benefits: [
      "Make informed business decisions based on data",
      "Identify opportunities for growth and improvement",
      "Understand customer behavior and preferences",
      "Measure ROI of marketing initiatives",
      "Optimize budget allocation for maximum results"
    ],
    process: [
      "Analytics audit and goal definition",
      "Tracking implementation and setup",
      "Dashboard creation and customization",
      "Regular monitoring and analysis",
      "Insight generation and recommendations",
      "Strategy refinement based on data"
    ],
    caseStudy: {
      client: "Global Finance Partners",
      challenge: "Unable to track marketing performance and make data-driven decisions about budget allocation.",
      solution: "Comprehensive analytics setup with custom dashboards and regular reporting on key metrics.",
      result: "30% increase in marketing ROI, identification of top-performing channels, and 50% improvement in conversion rates."
    }
  }
};

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the service by slug
  const service = services.find(s => s.title.toLowerCase().replace(/\s+/g, '-') === slug);
  
  // If service not found, redirect to services page
  useEffect(() => {
    if (!service) {
      navigate('/');
    }
  }, [service, navigate]);
  
  if (!service) {
    return null;
  }
  
  // Get the detailed content for this service
  const details = serviceDetails[service.title as keyof typeof serviceDetails];
  
  // Get icon based on service title
  const getServiceIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      "Website Development": "💻",
      "Search Engine Optimization": "🔍",
      "Digital Marketing": "📈",
      "Content Creation": "✍️",
      "Social Media Management": "📱",
      "Analytics & Reporting": "📊"
    };
    return iconMap[service.title] || "🚀";
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 pt-32 mt-0 relative overflow-hidden">
        {/* Abstract shapes in background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500 blur-3xl"></div>
        </div>

        <Container>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="text-5xl mb-6 mx-auto">{getServiceIcon()}</div>
            <SectionHeading
              title={service.title}
              subtitle={service.description}
              centered
            />
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/onboarding">
                <Button variant="primary" size="lg" className="px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                  Get Started
                </Button>
              </Link>
              <a href="#benefits" className="text-blue-600 hover:text-blue-800 font-medium flex items-center group">
                Learn more
                <svg className="w-5 h-5 ml-1 transform group-hover:translate-y-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Features Section */}
      <section className="py-20" id="features">
        <Container>
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">Features</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-xl text-gray-600">
              Our {service.title} service includes everything you need to succeed online.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {details.features.map((feature, index) => (
              <div key={index} className="bg-white p-8 pt-12 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
                {/* Number badge in top-left corner */}
                <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="font-bold text-lg">{index + 1}</span>
                </div>
                
                {/* Decorative element - full width */}
                <div className="absolute top-0 left-0 right-0 h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4 pl-8">{feature.split(':')[0] || feature}</h3>
                <p className="text-gray-600">{feature.split(':')[1] || feature}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white" id="benefits">
        <Container>
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">Benefits</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Service</h2>
            <p className="text-xl text-gray-600">
              Discover how our {service.title} service can transform your business and drive growth.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {details.benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 flex items-center justify-center mr-5 text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit}</h3>
                  <p className="text-gray-600">Experience the transformative impact this can have on your business results and long-term growth.</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      
      {/* Process Section */}
      <section className="py-20" id="process">
        <Container>
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">Our Process</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How We Work</h2>
            <p className="text-xl text-gray-600">
              Our proven methodology for delivering exceptional {service.title} results.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[39px] top-12 bottom-12 w-1 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full opacity-50"></div>
              
              {details.process.map((step, index) => (
                <div key={index} className="flex items-start mb-16 relative group">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center mr-8 z-10 text-white font-bold text-2xl shadow-lg transform group-hover:scale-110 transition-all duration-300">
                    {index + 1}
                  </div>
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl border border-gray-100 flex-grow transform group-hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step}</h3>
                    <p className="text-gray-600">We implement industry best practices and tailored strategies to ensure optimal results for your business.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      
      {/* Case Study Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50" id="case-study">
        <Container>
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">Success Story</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Real Results</h2>
            <p className="text-xl text-gray-600">
              See how we've transformed businesses with our {service.title} expertise.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row items-start mb-8 pb-8 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{details.caseStudy.client}</h3>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">5.0 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </span>
                  The Challenge
                </h4>
                <p className="text-gray-700">{details.caseStudy.challenge}</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Our Solution
                </h4>
                <p className="text-gray-700">{details.caseStudy.solution}</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  The Results
                </h4>
                <p className="text-gray-700">{details.caseStudy.result}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to elevate your {service.title.toLowerCase()}?</h2>
            <p className="text-xl mb-10 opacity-90">
              Let's work together to achieve your business goals with our proven strategies and expert team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/onboarding">
                <Button variant="secondary" size="lg" className="px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  Get Started Today
                </Button>
              </Link>
              <a href="#features" className="text-white hover:text-blue-100 font-medium flex items-center group">
                Explore Features
                <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
