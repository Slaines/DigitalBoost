import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Why Us", href: "#why-us" },
    { name: "Pricing", href: "#pricing" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled
          ? "shadow-md py-2"
          : "py-4"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-blue-600">
              DigitalBoost
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isScrolled ? "text-gray-700 hover:text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link to="/onboarding">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
            <Link to="/login" className="ml-4">
              <UserCircle size={24} className="text-indigo-600 hover:text-indigo-700 transition-colors" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link to="/onboarding">
                <Button variant="primary" size="sm" className="mt-2">
                  Get Started
                </Button>
              </Link>
              <Link to="/login" className="flex items-center mt-4">
                <UserCircle size={24} className="text-indigo-600 mr-2" />
                <span className="text-gray-700 hover:text-blue-600 font-medium">Login</span>
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;