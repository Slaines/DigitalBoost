import React, { useState, useEffect } from 'react';
import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-30 flex h-16 items-center justify-between px-4 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 block lg:hidden rounded-full p-1 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="font-bold text-[#0055A4] text-xl">
          <span>Outsourced</span>
          <span className="font-light">Services</span>
        </div>
      </div>

      <div className="mx-4 flex-1 max-w-md hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            className="block w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-[#0055A4] focus:outline-none focus:ring-1 focus:ring-[#0055A4]" 
            placeholder="Search..." 
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="relative p-1 rounded-full hover:bg-gray-100">
          <Bell className="h-6 w-6 text-gray-500" />
          <span className="absolute top-0 right-0 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>
        <div className="relative p-1 rounded-full bg-[#0055A4] text-white">
          <User className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;