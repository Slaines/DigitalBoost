import React, { useState } from 'react';
import RequestsTable from '../components/RequestsTable';

const allRequestsData = [
  {
    id: '1',
    project: 'Website Redesign',
    pack: 'Premium',
    status: 'in-progress' as const,
    progress: 45,
    nextMilestone: 'Design Review',
  },
  {
    id: '2',
    project: 'SEO Optimization',
    pack: 'Basic',
    status: 'pending' as const,
    progress: 0,
    nextMilestone: 'Keyword Research',
  },
  {
    id: '3',
    project: 'Content Creation',
    pack: 'Standard',
    status: 'completed' as const,
    progress: 100,
    nextMilestone: 'Final Delivery',
  },
  {
    id: '4',
    project: 'Logo Design',
    pack: 'Premium',
    status: 'in-progress' as const,
    progress: 70,
    nextMilestone: 'Final Revisions',
  },
  {
    id: '5',
    project: 'Social Media Campaign',
    pack: 'Standard',
    status: 'in-progress' as const,
    progress: 30,
    nextMilestone: 'Content Creation',
  },
  {
    id: '6',
    project: 'Email Newsletter',
    pack: 'Basic',
    status: 'canceled' as const,
    progress: 10,
    nextMilestone: 'N/A',
  },
  {
    id: '7',
    project: 'Market Research',
    pack: 'Premium',
    status: 'completed' as const,
    progress: 100,
    nextMilestone: 'Final Delivery',
  },
  {
    id: '8',
    project: 'Landing Page',
    pack: 'Standard',
    status: 'completed' as const,
    progress: 100,
    nextMilestone: 'Final Delivery',
  },
];

const MyRequests = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filteredRequests = allRequestsData.filter(request => {
    if (activeFilter === 'all') return true;
    return request.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">My Requests</h1>
        <div className="mt-3 sm:mt-0">
          <button className="px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors">
            New Request
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'all' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'pending' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'in-progress' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'completed' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === 'canceled' ? 'bg-[#0055A4] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('canceled')}
          >
            Canceled
          </button>
        </div>
      </div>
      
      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <RequestsTable requests={filteredRequests} />
      </div>
    </div>
  );
};

export default MyRequests;