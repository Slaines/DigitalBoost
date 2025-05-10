import React from 'react';

interface MyDataSectionProps {
  userData?: {
    service?: string;
    skills?: string[];
    location?: string;
    companyName?: string;
    companySize?: string;
    industry?: string;
    budget?: {
      type: string;
      range: string;
    };
    projectDetails?: string;
  };
}

const MyDataSection: React.FC<MyDataSectionProps> = ({ userData }) => {
  // Mock data for demonstration purposes
  const mockUserData = {
    service: 'Website Development',
    skills: ['UI/UX Design', 'Full Stack Development', 'Wordpress Development'],
    location: 'Paris, France',
    companyName: 'TechInnovate Solutions',
    companySize: '11-50 people',
    industry: 'Technology',
    budget: {
      type: 'One-time',
      range: '$5,000 - $10,000'
    },
    projectDetails: 'We need a modern, responsive website with e-commerce capabilities that reflects our brand identity and provides a seamless user experience.'
  };

  // Use provided data or fallback to mock data
  const displayData = userData || mockUserData;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Data</h1>
      <p className="text-gray-600 mb-8">
        Information you provided during the onboarding process.
      </p>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Service & Skills */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Service & Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Selected Service</p>
              <p className="text-indigo-600 font-medium">{displayData.service}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {displayData.skills?.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Company Name</p>
              <p className="font-medium">{displayData.companyName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Company Size</p>
              <p className="font-medium">{displayData.companySize}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Industry</p>
              <p className="font-medium">{displayData.industry}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Location</h2>
          <p className="text-sm font-medium text-gray-500 mb-1">Your Location</p>
          <p className="font-medium">{displayData.location}</p>
        </div>

        {/* Budget */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Budget</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Budget Type</p>
              <p className="font-medium">{displayData.budget?.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Budget Range</p>
              <p className="font-medium">{displayData.budget?.range}</p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h2>
          <p className="text-sm font-medium text-gray-500 mb-1">Context & Goals</p>
          <p className="font-medium whitespace-pre-line">{displayData.projectDetails}</p>
        </div>
      </div>
    </div>
  );
};

export default MyDataSection;
