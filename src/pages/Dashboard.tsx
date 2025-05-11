import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  LineChart, 
  Calendar, 
  MessageSquare, 
  Users, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  ChevronDown,
  Clock,
  Database
} from 'lucide-react';
import MyDataSection from '../components/dashboard/MyDataSection';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);


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
  const [activeSection, setActiveSection] = useState<string>('Dashboard');

  const projects = [
    {
      name: 'Website Redesign',
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-800',
      dueDate: '15/06/2025',
      progress: 65,
      teamMembers: [
        { initials: 'JD', color: 'bg-blue-500' },
        { initials: 'AM', color: 'bg-green-500' },
        { initials: 'KL', color: 'bg-purple-500' }
      ]
    },
    {
      name: 'Social Media Campaign',
      status: 'Planning',
      statusColor: 'bg-blue-100 text-blue-800',
      dueDate: '01/07/2025',
      progress: 25,
      teamMembers: [
        { initials: 'JD', color: 'bg-blue-500' },
        { initials: 'AM', color: 'bg-green-500' }
      ]
    },
    {
      name: 'SEO Optimization',
      status: 'Completed',
      statusColor: 'bg-green-100 text-green-800',
      dueDate: '05/05/2025',
      progress: 100,
      teamMembers: [
        { initials: 'JD', color: 'bg-blue-500' },
        { initials: 'AM', color: 'bg-green-500' },
        { initials: 'KL', color: 'bg-purple-500' }
      ]
    }
  ];

  const events = [
    {
      title: 'Team Meeting',
      time: 'Today, 2:00 PM',
      icon: <Clock size={16} className="text-indigo-500" />
    },
    {
      title: 'Project Deadline',
      time: 'Tomorrow, 5:00 PM',
      icon: <Clock size={16} className="text-indigo-500" />
    }
  ];

  // Sidebar navigation items
  const sidebarItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', icon: <FolderKanban size={20} /> },
    { name: 'Analytics', icon: <LineChart size={20} /> },
    { name: 'My Data', icon: <Database size={20} /> },
    { name: 'Calendar', icon: <Calendar size={20} /> },
    { name: 'Messages', icon: <MessageSquare size={20} /> },
    { name: 'Team', icon: <Users size={20} /> },
    { name: 'Documents', icon: <FileText size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-700 text-white flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-indigo-800">
          <h1 className="text-xl font-bold">DigitalBoost</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`flex items-center px-6 py-3 text-sm ${activeSection === item.name ? 'bg-indigo-800' : 'hover:bg-indigo-600'}`}
                  onClick={() => setActiveSection(item.name)}
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
          <h1 className="text-xl font-semibold">Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search" 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <Bell size={20} />
            </button>
            
            {/* User dropdown */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                  {currentUser?.displayName ? currentUser.displayName.charAt(0) : 'U'}
                </div>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              
              {/* Profile dropdown menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === 'Dashboard' && (
            <>
              {/* Greeting message */}
              <div className="bg-white rounded-lg shadow p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  Hello, <span className="text-indigo-600">
                    {currentUser?.displayName ? currentUser.displayName.split(' ')[0] : 'User'}
                  </span>
                </h1>
                <p className="text-gray-600 mt-2">Welcome to your DigitalBoost dashboard</p>
              </div>
              
              {/* Projects section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Projects</h2>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    New Project
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  {projects.map((project, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-b-0">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-sm font-medium text-indigo-600 mr-3">{project.name}</h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${project.statusColor}`}>
                                {project.status}
                              </span>
                            </div>
                            <div className="flex items-center mt-2">
                              <div className="flex -space-x-2 mr-4">
                                {project.teamMembers.map((member, i) => (
                                  <div 
                                    key={i} 
                                    className={`w-6 h-6 rounded-full ${member.color} flex items-center justify-center text-xs text-white border-2 border-white`}
                                  >
                                    {member.initials}
                                  </div>
                                ))}
                              </div>
                              <div className="text-xs text-gray-500">
                                {project.teamMembers.length} team members
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Due {project.dueDate}
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="ml-3 text-xs text-gray-500">{project.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bottom sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
                  <div className="space-y-4">
                    {events.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div className="p-2 bg-indigo-100 rounded-lg mr-4">
                          {event.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{event.title}</h3>
                          <p className="text-xs text-gray-500">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Account Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Account Information</h2>
                  <p className="text-sm text-gray-500 mb-4">Personal details and application.</p>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-1/3 text-sm font-medium text-gray-500">Full name</div>
                      <div className="w-2/3 text-sm text-gray-900">
                        {currentUser?.displayName || 'Not provided'}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-1/3 text-sm font-medium text-gray-500">Email address</div>
                      <div className="w-2/3 text-sm text-gray-900">
                        {currentUser?.email || 'Not provided'}
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-1/3 text-sm font-medium text-gray-500">Account created</div>
                      <div className="w-2/3 text-sm text-gray-900">
                        {currentUser?.metadata.creationTime ? 
                          new Date(currentUser.metadata.creationTime).toLocaleString() : 
                          'Unknown'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection === 'My Data' && (
            <MyDataSection />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
