import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  FileText, 
  Package, 
  Receipt, 
  TrendingUp, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Order Service', icon: ShoppingCart, path: '/order-service' },
  { name: 'My Requests', icon: FileText, path: '/my-requests' },
  { name: 'My Deliverables', icon: Package, path: '/my-deliverables' },
  { name: 'Invoices', icon: Receipt, path: '/invoices' },
  { name: 'Upsell', icon: TrendingUp, path: '/upsell' },
  { name: 'Support', icon: HelpCircle, path: '/support' },
];

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white transition-all duration-300 shadow-md lg:relative ${
        collapsed ? 'w-[70px]' : 'w-64'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-[#0055A4]">
            Services
          </h2>
        )}
        <button 
          onClick={toggleSidebar}
          className={`${collapsed ? 'mx-auto' : 'ml-auto'} p-1 rounded-full hover:bg-gray-100`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center ${
                collapsed ? 'justify-center' : 'justify-start'
              } rounded-md px-2 py-3 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-[#0055A4]' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-[#0055A4]' : 'text-gray-500'}`} />
              {!collapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;