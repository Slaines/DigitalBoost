import React from 'react';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';

const upsellPackages = [
  {
    id: 'premium-design',
    title: 'Premium Design Package',
    description: 'Upgrade your design with premium templates and custom elements',
    originalPrice: 1999,
    discountedPrice: 1499,
    features: [
      'Custom website design',
      'Mobile-responsive layouts',
      'Premium UI components',
      'Brand identity guidelines',
      'Unlimited revisions',
    ],
    recommended: true,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'seo-bundle',
    title: 'SEO Performance Bundle',
    description: 'Comprehensive SEO strategy to boost your search rankings',
    originalPrice: 1299,
    discountedPrice: 999,
    features: [
      'Keyword research & analysis',
      'On-page SEO optimization',
      'Content strategy',
      'Backlink building',
      'Monthly performance reports',
    ],
    recommended: false,
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'content-bundle',
    title: 'Content Marketing Bundle',
    description: 'Engage your audience with high-quality content',
    originalPrice: 899,
    discountedPrice: 699,
    features: [
      'Blog post writing (10 articles)',
      'Social media content creation',
      'Email newsletter templates',
      'Lead magnet development',
      'Content distribution strategy',
    ],
    recommended: false,
    image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'deluxe-bundle',
    title: 'Deluxe Service Bundle',
    description: 'All-in-one solution for your digital marketing needs',
    originalPrice: 3999,
    discountedPrice: 2999,
    features: [
      'Premium website design',
      'SEO optimization',
      'Content marketing',
      'Social media management',
      'Analytics and reporting',
      'Dedicated account manager',
    ],
    recommended: false,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const Upsell = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  const calculateSavings = (original: number, discounted: number) => {
    const savings = original - discounted;
    const percentage = Math.round((savings / original) * 100);
    return { savings, percentage };
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Recommended Services</h1>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 md:p-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Enhance Your Results</h2>
          <p className="mt-2 text-lg text-gray-600">
            Based on your project history and goals, we've crafted special offers to help you achieve even better results.
          </p>
          <div className="mt-6">
            <button className="px-6 py-3 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center">
              Explore All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {upsellPackages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
              pkg.recommended ? 'border-[#0055A4]' : 'border-gray-200'
            }`}
          >
            {pkg.recommended && (
              <div className="bg-[#0055A4] px-4 py-1 text-center">
                <span className="text-xs font-medium text-white inline-flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-white" /> RECOMMENDED FOR YOU
                </span>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-1/3">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6 md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                  <p className="mt-1 text-gray-600">{pkg.description}</p>
                  
                  <div className="mt-4 flex items-baseline">
                    <span className="text-2xl font-bold text-[#0055A4]">
                      {formatCurrency(pkg.discountedPrice)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatCurrency(pkg.originalPrice)}
                    </span>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      Save {calculateSavings(pkg.originalPrice, pkg.discountedPrice).percentage}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <button className="w-full px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Testimonials */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">What Our Clients Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 italic">"The Premium Design Package completely transformed our website. The team was professional and delivered beyond expectations."</p>
            <p className="mt-4 font-medium">- Sarah J., Marketing Director</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 italic">"After implementing the SEO Performance Bundle, our organic traffic increased by 80% in just three months. Highly recommended!"</p>
            <p className="mt-4 font-medium">- Michael L., E-commerce Owner</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 italic">"The Content Marketing Bundle provided us with high-quality articles that really resonated with our audience. Engagement is up across all platforms."</p>
            <p className="mt-4 font-medium">- Emily R., Startup Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upsell;