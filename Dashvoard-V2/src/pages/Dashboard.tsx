import React, { useState } from 'react';
import { Clock, FileText, Package, Download, Star, Calendar, CheckCircle } from 'lucide-react';
import KPICard from '../components/KPICard';
import Timeline from '../components/Timeline';
import RequestsTable from '../components/RequestsTable';

// Mock data for deposit status
const depositStatus = {
  isPaid: false,
  amount: 500,
};

// Mock data for scheduled call
const scheduledCall = {
  datetime: '2025-06-15T14:00:00',
  timezone: 'America/New_York',
  isWithin24Hours: true,
  joinLink: 'https://meet.example.com/abc123',
};

const timelineItems = [
  {
    date: 'Today',
    title: 'Design Review',
    description: 'Final review of website mockups',
    status: 'in-progress' as const,
    progress: 45,
  },
  {
    date: 'Jun 15, 2025',
    title: 'Frontend Development',
    description: 'Start of coding phase',
    status: 'upcoming' as const,
    progress: 0,
  },
  {
    date: 'Jun 30, 2025',
    title: 'QA Testing',
    description: 'Bug fixing and performance testing',
    status: 'upcoming' as const,
    progress: 0,
  },
  {
    date: 'Jul 15, 2025',
    title: 'Launch',
    description: 'Website goes live',
    status: 'upcoming' as const,
    progress: 0,
  },
];

const deliverables = [
  {
    category: 'Design & 3D & Motion',
    items: [
      {
        id: 1,
        name: 'Product Renders',
        files: [
          { name: 'Product-Front.jpg', type: 'image', size: '2.4 MB', url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg' },
          { name: 'Product-Side.jpg', type: 'image', size: '2.1 MB', url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg' },
          { name: '3D-Source.obj', type: 'document', size: '15.6 MB', url: '#' },
        ]
      },
      {
        id: 2,
        name: '3D Showreel',
        files: [
          { name: 'Animation.mp4', type: 'video', size: '45.2 MB', url: '#' },
          { name: 'Storyboard.pdf', type: 'document', size: '1.8 MB', url: '#' },
        ]
      }
    ]
  },
  {
    category: 'Web & Applications',
    items: [
      {
        id: 3,
        name: 'Corporate Website',
        files: [
          { name: 'Homepage-Desktop.jpg', type: 'image', size: '1.8 MB', url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg' },
          { name: 'Homepage-Mobile.jpg', type: 'image', size: '1.2 MB', url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg' },
          { name: 'Documentation.pdf', type: 'document', size: '2.4 MB', url: '#' },
        ]
      }
    ]
  }
];

const requestsData = [
  {
    id: '1',
    project: 'Product Renders Pack',
    pack: 'Premium',
    status: 'in-progress' as const,
    progress: 45,
    nextMilestone: 'Final Renders Review',
  },
  {
    id: '2',
    project: 'Corporate Website Pack',
    pack: 'Enterprise',
    status: 'pending' as const,
    progress: 0,
    nextMilestone: 'Initial Design Review',
  },
];

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Design & 3D & Motion');
  const [rating, setRating] = useState(0);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-12 gap-4">
        {/* Deposit Status */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Deposit Status</h2>
            <div className="relative group">
              <p className="text-2xl font-bold text-[#0055A4]">${depositStatus.amount}</p>
              <div className="hidden group-hover:block absolute z-10 w-64 p-2 mt-2 text-sm text-gray-500 bg-white border rounded shadow-lg">
                Deposit holds your project slot and ensures immediate start upon approval
              </div>
            </div>
            <button 
              className={`mt-4 w-full px-4 py-2 rounded-md transition-colors ${
                depositStatus.isPaid 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-[#0055A4] text-white hover:bg-blue-700'
              }`}
              disabled={depositStatus.isPaid}
            >
              {depositStatus.isPaid ? 'Paid' : 'Pay Deposit'}
            </button>
          </div>
        </div>

        {/* Scheduled Call */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Next Call</h2>
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">{formatDateTime(scheduledCall.datetime)}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">Timezone: {scheduledCall.timezone}</p>
            {scheduledCall.isWithin24Hours && (
              <button className="px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors w-full">
                Join Call
              </button>
            )}
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="col-span-12 md:col-span-6">
          <Timeline items={timelineItems} />
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Project Deliverables</h2>
          <div className="flex space-x-2">
            {deliverables.map(category => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-4 py-2 rounded-md text-sm ${
                  activeCategory === category.category
                    ? 'bg-[#0055A4] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {deliverables.map(category => (
          category.category === activeCategory && (
            <div key={category.category} className="space-y-6">
              {category.items.map(item => (
                <div key={item.id} className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">{item.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {item.files.map((file, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="aspect-video bg-gray-100 rounded-md mb-3 overflow-hidden">
                          {file.type === 'image' ? (
                            <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FileText className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Download className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ))}
      </div>

      {/* Active Requests */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Active Requests</h2>
        <RequestsTable requests={requestsData} />
      </div>

      {/* Post-Delivery Banner */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-2">Thank you for your business!</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="p-1"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors">
            Leave Feedback
          </button>
          <button className="px-6 py-2 border border-[#0055A4] text-[#0055A4] rounded-md hover:bg-blue-50 transition-colors">
            Start New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;