import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Container from "../ui/Container";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-3">DigitalBoost</h3>
            <p className="text-gray-400 mb-3 text-sm">
              Empowering businesses with creative digital solutions since 2023.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-gray-700 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-gray-700 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-gray-700 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-gray-700 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-indigo-400">Our Services</h3>
            <div className="grid grid-cols-1 gap-1">
              <h4 className="text-xs font-medium text-gray-500 mb-1">Creative & Visual</h4>
              <a href="/service/graphic-design" className="text-gray-400 hover:text-white text-sm transition-colors">
                Graphic Design
              </a>
              <a href="/service/video-editing" className="text-gray-400 hover:text-white text-sm transition-colors">
                Video Editing
              </a>
              <a href="/service/image-editing" className="text-gray-400 hover:text-white text-sm transition-colors">
                Image Editing
              </a>

              <h4 className="text-xs font-medium text-gray-500 mt-2 mb-1">Marketing & Content</h4>
              <a href="/service/social-media-management" className="text-gray-400 hover:text-white text-sm transition-colors">
                Social Media
              </a>
              <a href="/service/content-creation" className="text-gray-400 hover:text-white text-sm transition-colors">
                Content Creation
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-indigo-400">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/work" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Our Work
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-indigo-400">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0 text-indigo-400" />
                <span className="text-gray-400 text-sm">
                  15 Creative Street, Digital District<br />London, UK EC4R 3TE
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0 text-indigo-400" />
                <span className="text-gray-400 text-sm">+44 20 7946 0958</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0 text-indigo-400" />
                <a href="mailto:hello@digitalboost.com" className="text-gray-400 text-sm hover:text-indigo-400 transition-colors">hello@digitalboost.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} DigitalBoost Ltd. All rights reserved.
          </p>
          <div className="mt-3 md:mt-0 flex items-center">
            <Link 
              to="/contact" 
              className="mr-4 px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors inline-block"
            >
              Get a Free Quote
            </Link>
            <div className="flex space-x-4">
              <a href="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Terms
              </a>
              <a href="/privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Privacy
              </a>
              <a href="/cookies" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;