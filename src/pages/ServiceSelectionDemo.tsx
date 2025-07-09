import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import EnhancedStep1 from './onboarding/EnhancedStep1';

/**
 * Demo page to showcase the new interactive service selection cards
 */
const ServiceSelectionDemo: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon size={16} className="mr-1" />
            Back to dashboard
          </button>
          
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Interactive Service Selection</h1>
          <p className="mt-1 text-gray-500">
            A visual demonstration of the enhanced service selection cards with tooltips and descriptions
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
          <EnhancedStep1 />
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionDemo;
