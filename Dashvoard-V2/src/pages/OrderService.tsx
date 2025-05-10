import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const categories = [
  { id: 'design', name: 'Design', description: 'Website, Logo, Branding' },
  { id: 'development', name: 'Development', description: 'Frontend, Backend, Mobile' },
  { id: 'marketing', name: 'Marketing', description: 'SEO, Social Media, Ads' },
  { id: 'content', name: 'Content', description: 'Writing, Video, Graphics' },
];

const packs = {
  design: [
    { id: 'basic', name: 'Basic', price: 499, deliveryTime: '7 days', description: 'Simple design with minimal revisions' },
    { id: 'standard', name: 'Standard', price: 999, deliveryTime: '10 days', description: 'Comprehensive design with multiple revisions' },
    { id: 'premium', name: 'Premium', price: 1999, deliveryTime: '14 days', description: 'Premium design with unlimited revisions' },
  ],
  development: [
    { id: 'basic', name: 'Basic', price: 999, deliveryTime: '14 days', description: 'Simple website with basic functionality' },
    { id: 'standard', name: 'Standard', price: 2499, deliveryTime: '21 days', description: 'Full-featured website with custom functionality' },
    { id: 'premium', name: 'Premium', price: 4999, deliveryTime: '30 days', description: 'Enterprise-grade website with advanced features' },
  ],
  marketing: [
    { id: 'basic', name: 'Basic', price: 299, deliveryTime: '7 days', description: 'Basic SEO optimization' },
    { id: 'standard', name: 'Standard', price: 599, deliveryTime: '14 days', description: 'Complete SEO strategy and implementation' },
    { id: 'premium', name: 'Premium', price: 1299, deliveryTime: '30 days', description: 'Full digital marketing strategy and execution' },
  ],
  content: [
    { id: 'basic', name: 'Basic', price: 199, deliveryTime: '3 days', description: '3 pages of content' },
    { id: 'standard', name: 'Standard', price: 399, deliveryTime: '7 days', description: '7 pages of content' },
    { id: 'premium', name: 'Premium', price: 799, deliveryTime: '14 days', description: '15 pages of content' },
  ],
};

const OrderService = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    deadline: '',
    additionalRequirements: '',
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep(2);
  };

  const handlePackSelect = (pack: any) => {
    setSelectedPack(pack);
    setStep(3);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process order
    setStep(4);
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Order Service</h1>
        {step > 1 && (
          <button 
            onClick={handleGoBack}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
        )}
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? 'bg-[#0055A4] text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`w-12 h-1 ${step >= 2 ? 'bg-[#0055A4]' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? 'bg-[#0055A4] text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`w-12 h-1 ${step >= 3 ? 'bg-[#0055A4]' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? 'bg-[#0055A4] text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
          <div className={`w-12 h-1 ${step >= 4 ? 'bg-[#0055A4]' : 'bg-gray-200'}`}></div>
        </div>
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 4 ? 'bg-[#0055A4] text-white' : 'bg-gray-200 text-gray-600'}`}>
            4
          </div>
        </div>
      </div>
      
      {/* Step 1: Select Category */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Select Service Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#0055A4] hover:shadow-md cursor-pointer transition-all"
              >
                <h3 className="font-medium text-lg">{category.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                <div className="flex justify-end mt-4">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 2: Select Pack */}
      {step === 2 && selectedCategory && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Select Service Pack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packs[selectedCategory as keyof typeof packs].map((pack) => (
              <div
                key={pack.id}
                onClick={() => handlePackSelect(pack)}
                className="border border-gray-200 rounded-lg p-6 hover:border-[#0055A4] hover:shadow-md cursor-pointer transition-all flex flex-col"
              >
                <h3 className="font-medium text-lg">{pack.name}</h3>
                <p className="text-[#0055A4] text-2xl font-bold mt-2">${pack.price}</p>
                <p className="text-gray-600 text-sm mt-2">{pack.description}</p>
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Delivery:</span> {pack.deliveryTime}
                </div>
                <button className="mt-4 px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors">
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 3: Fill Form */}
      {step === 3 && selectedPack && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Project Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:border-transparent"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Deadline (Optional)
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Requirements (Optional)
              </label>
              <textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0055A4] focus:border-transparent"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="px-6 py-3 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue to Summary
            </button>
          </form>
        </div>
      )}
      
      {/* Step 4: Summary */}
      {step === 4 && selectedPack && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>
          
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Service Type:</span>
              <span className="font-medium">{categories.find(c => c.id === selectedCategory)?.name} - {selectedPack.name}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Project Name:</span>
              <span className="font-medium">{formData.projectName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Delivery Time:</span>
              <span className="font-medium">{selectedPack.deliveryTime}</span>
            </div>
            {formData.deadline && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Preferred Deadline:</span>
                <span className="font-medium">{formData.deadline}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center text-xl font-bold my-6">
            <span>Total:</span>
            <span>${selectedPack.price}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 px-6 py-3 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors">
              Pay Now
            </button>
            <button className="flex-1 px-6 py-3 border border-[#0055A4] text-[#0055A4] rounded-md hover:bg-blue-50 transition-colors">
              Pay Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderService;