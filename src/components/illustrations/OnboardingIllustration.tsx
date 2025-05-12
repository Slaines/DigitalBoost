import React from 'react';

interface IllustrationProps {
  variant?: 'welcome' | 'services' | 'skills' | 'location' | 'company' | 'budget' | 'details' | 'success';
  className?: string;
}

const OnboardingIllustration: React.FC<IllustrationProps> = ({
  variant = 'welcome',
  className = '',
}) => {
  // Define different illustrations for each step
  const illustrations = {
    welcome: (
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="400" height="300" rx="10" fill="#F3F4FF" />
        <circle cx="200" cy="120" r="60" fill="#6366F1" fillOpacity="0.2" />
        <circle cx="200" cy="120" r="40" fill="#6366F1" fillOpacity="0.4" />
        <circle cx="200" cy="120" r="20" fill="#6366F1" />
        <path d="M140 180C140 157.909 157.909 140 180 140H220C242.091 140 260 157.909 260 180V260H140V180Z" fill="#6366F1" fillOpacity="0.1" />
        <rect x="160" y="180" width="80" height="80" rx="10" fill="#6366F1" fillOpacity="0.2" />
        <rect x="180" y="200" width="40" height="40" rx="5" fill="#6366F1" fillOpacity="0.4" />
        <rect x="190" y="210" width="20" height="20" rx="2" fill="#6366F1" />
      </svg>
    ),
    services: (
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="400" height="300" rx="10" fill="#F3F4FF" />
        <rect x="80" y="60" width="240" height="60" rx="8" fill="#6366F1" fillOpacity="0.1" />
        <rect x="100" y="80" width="200" height="20" rx="4" fill="#6366F1" fillOpacity="0.4" />
        <rect x="80" y="140" width="240" height="60" rx="8" fill="#6366F1" fillOpacity="0.2" />
        <rect x="100" y="160" width="200" height="20" rx="4" fill="#6366F1" fillOpacity="0.5" />
        <rect x="80" y="220" width="240" height="60" rx="8" fill="#6366F1" fillOpacity="0.1" />
        <rect x="100" y="240" width="200" height="20" rx="4" fill="#6366F1" fillOpacity="0.4" />
      </svg>
    ),
    skills: (
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="400" height="300" rx="10" fill="#F3F4FF" />
        <rect x="50" y="50" width="100" height="40" rx="20" fill="#6366F1" fillOpacity="0.2" />
        <rect x="170" y="50" width="80" height="40" rx="20" fill="#6366F1" fillOpacity="0.3" />
        <rect x="270" y="50" width="80" height="40" rx="20" fill="#6366F1" fillOpacity="0.4" />
        <rect x="80" y="110" width="120" height="40" rx="20" fill="#6366F1" fillOpacity="0.5" />
        <rect x="220" y="110" width="100" height="40" rx="20" fill="#6366F1" fillOpacity="0.3" />
        <rect x="50" y="170" width="80" height="40" rx="20" fill="#6366F1" fillOpacity="0.4" />
        <rect x="150" y="170" width="150" height="40" rx="20" fill="#6366F1" fillOpacity="0.2" />
        <rect x="100" y="230" width="120" height="40" rx="20" fill="#6366F1" fillOpacity="0.4" />
        <rect x="240" y="230" width="80" height="40" rx="20" fill="#6366F1" fillOpacity="0.5" />
      </svg>
    ),
    location: (
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="400" height="300" rx="10" fill="#F3F4FF" />
        <circle cx="200" cy="150" r="100" fill="#6366F1" fillOpacity="0.1" />
        <circle cx="200" cy="150" r="70" fill="#6366F1" fillOpacity="0.2" />
        <circle cx="200" cy="150" r="40" fill="#6366F1" fillOpacity="0.3" />
        <path d="M200 90C179.01 90 162 107.01 162 128C162 154.4 200 210 200 210C200 210 238 154.4 238 128C238 107.01 220.99 90 200 90ZM200 143C191.17 143 184 135.83 184 127C184 118.17 191.17 111 200 111C208.83 111 216 118.17 216 127C216 135.83 208.83 143 200 143Z" fill="#6366F1" />
      </svg>
    ),
    company: (
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="400" height="300" rx="10" fill="#F3F4FF" />
        <rect x="100" y="60" width="200" height="180" rx="10" fill="#6366F1" fillOpacity="0.1" />
        <rect x="120" y="80" width="160" height="20" rx="4" fill="#6366F1" fillOpacity="0.4" />
        <rect x="120" y="120" width="160" height="10" rx="4" fill="#6366F1" fillOpacity="0.3" />
        <rect x="120" y="140" width="160" height="10" rx="4" fill="#6366F1" fillOpacity="0.3" />
        <rect x="120" y="160" width="160" height="10" rx="4" fill="#6366F1" fillOpacity="0.3" />
        <rect x="120" y="200" width="60" height="24" rx="12" fill="#6366F1" />
      </svg>
    ),
    budget: (
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="400" height="300" rx="10" fill="#F3F4FF" />
        <circle cx="200" cy="150" r="80" fill="#6366F1" fillOpacity="0.1" />
        <path d="M200 90C182.46 90 165.48 95.27 151.52 105.03C137.56 114.8 127.35 128.56 122.7 144.48C118.05 160.39 119.24 177.45 126.09 192.65C132.93 207.85 145.06 220.13 160.2 227.13C175.33 234.13 192.39 235.42 208.38 230.9C224.37 226.37 238.27 216.25 248.13 202.36C257.99 188.47 263.33 171.53 263.33 154C263.33 130.23 253.69 107.3 237.29 90.87C220.9 74.44 197.98 64.77 174.22 64.67C174.15 64.67 174.07 64.67 174 64.67" stroke="#6366F1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M207 138.33C203.15 134.47 198.06 132.26 192.65 132.03C187.25 131.8 181.96 133.58 177.8 137C173.64 140.42 170.91 145.29 170.15 150.63C169.4 155.97 170.68 161.41 173.73 165.73C176.78 170.06 181.38 172.98 186.59 173.93C191.8 174.88 197.2 173.8 201.67 170.87" stroke="#6366F1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M200 90V110" stroke="#6366F1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M200 190V210" stroke="#6366F1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    details: (
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="400" height="300" rx="10" fill="#F3F4FF" />
        <rect x="80" y="60" width="240" height="180" rx="10" fill="#6366F1" fillOpacity="0.1" />
        <rect x="100" y="80" width="200" height="20" rx="4" fill="#6366F1" fillOpacity="0.4" />
        <rect x="100" y="120" width="200" height="80" rx="4" fill="#6366F1" fillOpacity="0.2" />
        <rect x="120" y="140" width="160" height="8" rx="4" fill="#6366F1" fillOpacity="0.3" />
        <rect x="120" y="160" width="160" height="8" rx="4" fill="#6366F1" fillOpacity="0.3" />
        <rect x="120" y="180" width="120" height="8" rx="4" fill="#6366F1" fillOpacity="0.3" />
        <rect x="220" y="220" width="80" height="30" rx="15" fill="#6366F1" />
      </svg>
    ),
    success: (
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="400" height="300" rx="10" fill="#F3F4FF" />
        <circle cx="200" cy="150" r="80" fill="#6366F1" fillOpacity="0.1" />
        <circle cx="200" cy="150" r="60" fill="#6366F1" fillOpacity="0.2" />
        <path d="M160 150L190 180L250 120" stroke="#6366F1" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return illustrations[variant];
};

export default OnboardingIllustration;
