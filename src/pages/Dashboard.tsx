import React, { useState } from 'react';
import HelpSection from '../components/dashboard/HelpSection';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Database,
  HelpCircle,
  CreditCard,
  Search,
  ChevronDown,
  Briefcase,
  DollarSign,
  Clock
} from '../utils/icons';
import MyDataSection from '../components/dashboard/MyDataSection';
import DeliverablesSection from '../components/dashboard/DeliverablesSection';
import ProjectTrackingSection from '../components/dashboard/ProjectTrackingSection';
import BillingSection from '../components/dashboard/BillingSection';
import { useClientData, useProjects } from '../api/hooks';

interface DashboardProps {
  initialSection?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ initialSection = 'Dashboard' }) => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  
  // Using TanStack Query to fetch client data
  const { data: clientData = {
    activeProjectsCount: 0,
    pendingMilestonesCount: 0,
    hasOutstandingInvoice: false,
    outstandingInvoiceAmount: 0,
    outstandingInvoiceDueDays: 0,
    nextMilestoneDate: null
  } } = useClientData();
  
  // Using TanStack Query to fetch projects data
  const { data: fetchedProjects = [] } = useProjects();


  const handleLogout = async () => {
    try {
      await logout();
      // Force navigation to homepage after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // State for active section
  const [activeSection, setActiveSection] = useState<string>(initialSection);

  // Use the fetched projects data
  const projects = fetchedProjects;

  // Get recent projects for the dashboard
  const recentProjects = projects.slice(0, 2);
  
  // Sidebar navigation items with personalized links
  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, link: '/dashboard' },
    { name: 'Project Tracking', icon: <FolderKanban size={20} />, link: '/project-tracking' },
    { name: 'Deliverables', icon: <FileText size={20} />, link: '/deliverables' },
    { name: 'My Data', icon: <Database size={20} />, link: '/my-data' },
    { name: 'Help', icon: <HelpCircle size={20} />, link: '/help' },
    { name: 'Billing & Payments', icon: <CreditCard size={20} />, link: '/billing' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <div className="bg-indigo-700 text-white w-64 flex-shrink-0 hidden md:flex md:flex-col">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-xl font-bold">DigitalBoost</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.link} 
                  className={`flex items-center px-6 py-3 text-sm ${activeSection === item.name ? 'bg-indigo-800' : 'hover:bg-indigo-600'}`}
                  onClick={(e) => {
                    // Only handle dashboard and deliverables internally
                    if (item.name === 'Dashboard' || item.name === 'Deliverables') {
                      e.preventDefault(); // Prevent default navigation
                      setActiveSection(item.name);
                      // Update URL without page reload
                      window.history.pushState({}, '', item.link);
                    } else {
                      // For other links like Project Tracking, allow normal navigation
                      // This will trigger a full page navigation to the new route
                    }
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User profile at bottom */}
        <div className="p-4 border-t border-indigo-800 flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-medium mr-3">
            {currentUser?.displayName ? currentUser.displayName.charAt(0) : 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{currentUser?.displayName || 'User'}</p>
            <p className="text-xs text-indigo-300 truncate">{currentUser?.email || 'user@example.com'}</p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">{activeSection}</h1>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* User menu */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center"
              >
                <span className="hidden md:block mr-2 text-sm">{currentUser?.displayName || 'User'}</span>
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                  {currentUser?.displayName ? currentUser.displayName.charAt(0) : 'U'}
                </div>
                <ChevronDown size={16} className="ml-1 text-gray-500" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Dashboard content */}
          {activeSection === 'Dashboard' && (
            <>
              {/* Welcome message */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-1">Good morning, {currentUser?.displayName || 'User'} 👋</h2>
                <p className="text-gray-600">You're all caught up—here's the latest on your active services.</p>
              </div>
            
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Projects</p>
                      <h3 className="text-xl font-semibold text-gray-900">{clientData.activeProjectsCount}</h3>
                    </div>
                  </div>
                </div>
                
                {clientData.hasOutstandingInvoice && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                        <DollarSign size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Outstanding Invoice
                        </p>
                        <h3 className="text-xl font-semibold text-gray-900">
                          €{clientData.outstandingInvoiceAmount.toLocaleString()} due in {clientData.outstandingInvoiceDueDays} days
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Next Milestone</p>
                      <h3 className="text-xl font-semibold text-gray-900">Due in 5 days</h3>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Active Projects */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Active Projects</h2>
                  <span className="text-sm text-gray-500">{recentProjects.length} total projects</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Web Development Project Card */}
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <div>
                        <div className="text-xs text-indigo-600 font-medium mb-1">Web Development</div>
                        <h3 className="text-lg font-medium">Website Redesign</h3>
                      </div>
                      <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">In Progress</div>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>1/3 stages complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center divide-x divide-gray-200">
                        <div className="px-2">
                          <div className="text-xs font-medium mb-1">Design</div>
                          <div className="text-indigo-600 font-medium text-xs">✓</div>
                        </div>
                        <div className="px-2">
                          <div className="text-xs font-medium mb-1">Dev</div>
                          <div className="text-gray-500 font-medium text-xs">...</div>
                        </div>
                        <div className="px-2">
                          <div className="text-xs font-medium mb-1">QA</div>
                          <div className="text-gray-500 font-medium text-xs">-</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-3 bg-gray-50 text-xs">
                      <div className="flex items-center">
                        <span className="mr-1">Next milestone:</span>
                        <span className="font-medium">Frontend Implementation due in 5 days</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Marketing Project Card */}
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <div>
                        <div className="text-xs text-purple-600 font-medium mb-1">Marketing</div>
                        <h3 className="text-lg font-medium">Social Media Campaign</h3>
                      </div>
                      <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Planning</div>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>1/3 stages complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 text-center divide-x divide-gray-200">
                        <div className="px-2">
                          <div className="text-xs font-medium mb-1">Strategy</div>
                          <div className="text-purple-600 font-medium text-xs">✓</div>
                        </div>
                        <div className="px-2">
                          <div className="text-xs font-medium mb-1">Content</div>
                          <div className="text-gray-500 font-medium text-xs">...</div>
                        </div>
                        <div className="px-2">
                          <div className="text-xs font-medium mb-1">Launch</div>
                          <div className="text-gray-500 font-medium text-xs">-</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-3 bg-gray-50 text-xs">
                      <div className="flex items-center">
                        <span className="mr-1">Next milestone:</span>
                        <span className="font-medium">Content Creation due in 8 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer Shortcut Bar removed as requested */}
            </>
          )}

          {activeSection === 'Deliverables' && (
            <DeliverablesSection />
          )}

          {activeSection === 'Help' && (
            <HelpSection />
          )}

          {activeSection === 'Project Tracking' && (
            <>
              <h1 className="text-xl font-semibold mb-6">Project Tracking</h1>
              <ProjectTrackingSection 
                canCreateProject={true}
                onCreateProject={() => {
                  console.log('Create new project');
                  // In a real app, this would open a modal or navigate to a create project page
                }}
              />
            </>
          )}

          {activeSection === 'My Data' && (
            <MyDataSection 
              user={{
                name: currentUser?.displayName || '',
                email: currentUser?.email || '',
                phone: currentUser?.phoneNumber || '',
                company: {
                  name: 'Your Company',
                  website: 'www.example.com',
                  industry: 'Technology'
                },
                billingAddress: {
                  line1: '123 Business St',
                  city: 'Tech City',
                  zip: '12345',
                  country: 'United States'
                },
                subscription: {
                  tier: 'Growth',
                  nextBillingDate: '2025-06-15'
                },
                linked: {
                  google: false,
                  microsoft: false
                }
              }}
              onSave={async (path, value) => {
                // In a real app, this would save to Firestore or another backend
                console.log(`Saving ${path}:`, value);
                // Simulate API call
                return new Promise(resolve => setTimeout(resolve, 500));
              }}
            />
          )}
          
          {activeSection === 'Billing & Payments' && (
            <BillingSection />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;