import React, { useState } from 'react';
import { FileText, Download, MoreHorizontal, ExternalLink, Eye } from 'lucide-react';

const deliverables = [
  {
    id: '1',
    projectName: 'Website Redesign',
    type: 'image',
    title: 'Homepage Mockup',
    description: 'Final design for the homepage',
    dateDelivered: '2025-06-01',
    url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    versions: 3,
  },
  {
    id: '2',
    projectName: 'Website Redesign',
    type: 'image',
    title: 'Mobile Views',
    description: 'Responsive designs for mobile devices',
    dateDelivered: '2025-06-03',
    url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    versions: 2,
  },
  {
    id: '3',
    projectName: 'Content Creation',
    type: 'document',
    title: 'Blog Articles',
    description: 'Set of 5 SEO-optimized blog posts',
    dateDelivered: '2025-05-28',
    url: 'https://example.com/document.pdf',
    versions: 1,
  },
  {
    id: '4',
    projectName: 'Logo Design',
    type: 'image',
    title: 'Logo Final',
    description: 'Final logo design with all variations',
    dateDelivered: '2025-05-15',
    url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    versions: 4,
  },
];

const MyDeliverables = () => {
  const [activeDeliverable, setActiveDeliverable] = useState(deliverables[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDeliverables = deliverables.filter(deliverable => 
    deliverable.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deliverable.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">My Deliverables</h1>
        <div className="mt-3 sm:mt-0 w-full sm:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-60 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0055A4]"
              placeholder="Search deliverables..."
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deliverables List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">All Deliverables</h2>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {filteredDeliverables.length > 0 ? (
              filteredDeliverables.map((deliverable) => (
                <div
                  key={deliverable.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    activeDeliverable.id === deliverable.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveDeliverable(deliverable)}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <FileText className={`h-5 w-5 ${activeDeliverable.id === deliverable.id ? 'text-[#0055A4]' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{deliverable.title}</h3>
                      <p className="text-sm text-gray-500">{deliverable.projectName}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{formatDate(deliverable.dateDelivered)}</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                          {deliverable.versions} {deliverable.versions === 1 ? 'version' : 'versions'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No deliverables match your search.
              </div>
            )}
          </div>
        </div>
        
        {/* Preview Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="font-medium text-gray-900">{activeDeliverable.title}</h2>
              <p className="text-sm text-gray-500">{activeDeliverable.description}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Preview">
                <Eye className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Download">
                <Download className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Open in new tab">
                <ExternalLink className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="More options">
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
            {activeDeliverable.type === 'image' ? (
              <img 
                src={activeDeliverable.url} 
                alt={activeDeliverable.title}
                className="max-w-full max-h-[500px] object-contain shadow-md"
              />
            ) : activeDeliverable.type === 'document' ? (
              <div className="w-full h-full flex items-center justify-center bg-white border border-gray-200 rounded-lg p-8">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900">{activeDeliverable.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{activeDeliverable.description}</p>
                  <button className="mt-4 px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Download Document
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8 text-gray-500">
                Preview not available
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="version-select" className="block text-sm font-medium text-gray-700">
                  Version
                </label>
                <select
                  id="version-select"
                  className="mt-1 block w-40 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055A4]"
                >
                  <option value="latest">Latest Version (v{activeDeliverable.versions})</option>
                  {Array.from({ length: activeDeliverable.versions - 1 }, (_, i) => (
                    <option key={i} value={`v${activeDeliverable.versions - i - 1}`}>
                      Version {activeDeliverable.versions - i - 1}
                    </option>
                  ))}
                </select>
              </div>
              <button className="px-4 py-2 bg-[#0055A4] text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download All Files
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import for the search icon
import { Search } from 'lucide-react';

export default MyDeliverables;