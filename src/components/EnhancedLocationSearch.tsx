import React, { useState, useEffect, useRef } from 'react';
import { MapPinIcon, BuildingIcon, SearchIcon } from 'lucide-react';
import { cities } from '../data/cities';

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Enhanced locations with more data and more cities
const enhancedCities = [
  ...cities,
  // Add Moroccan cities including Al Hoceima
  { name: "Al Hoceima", country: "Morocco" },
  { name: "Nador", country: "Morocco" },
  { name: "Tetouan", country: "Morocco" },
  { name: "Tangier", country: "Morocco" },
  { name: "Chefchaouen", country: "Morocco" },
  { name: "Oujda", country: "Morocco" },
  { name: "Fez", country: "Morocco" },
  { name: "Meknes", country: "Morocco" },
  { name: "Rabat", country: "Morocco" },
  { name: "Casablanca", country: "Morocco" },
  { name: "Marrakech", country: "Morocco" },
  { name: "Agadir", country: "Morocco" },
  { name: "Essaouira", country: "Morocco" },
  { name: "Ouarzazate", country: "Morocco" },
  { name: "Dakhla", country: "Morocco" },
  { name: "Laayoune", country: "Morocco" },
  { name: "Ifrane", country: "Morocco" },
  { name: "Taroudant", country: "Morocco" },
  { name: "Taza", country: "Morocco" },
  { name: "Mohammedia", country: "Morocco" },
  { name: "Kenitra", country: "Morocco" },
  { name: "Safi", country: "Morocco" },
  { name: "El Jadida", country: "Morocco" },
  
  // Add more major world cities
  { name: "Dubai", country: "United Arab Emirates" },
  { name: "Abu Dhabi", country: "United Arab Emirates" },
  { name: "Riyadh", country: "Saudi Arabia" },
  { name: "Doha", country: "Qatar" },
  { name: "Kuwait City", country: "Kuwait" },
  { name: "Manama", country: "Bahrain" },
  { name: "Muscat", country: "Oman" },
  { name: "Amman", country: "Jordan" },
  { name: "Beirut", country: "Lebanon" },
  { name: "Jerusalem", country: "Israel" },
  { name: "Tel Aviv", country: "Israel" },
  { name: "Damascus", country: "Syria" },
  { name: "Baghdad", country: "Iraq" },
  { name: "Tehran", country: "Iran" },
  { name: "Kabul", country: "Afghanistan" },
  { name: "Islamabad", country: "Pakistan" },
  { name: "Lahore", country: "Pakistan" },
  { name: "Karachi", country: "Pakistan" },
  { name: "New Delhi", country: "India" },
  { name: "Mumbai", country: "India" },
  { name: "Bangalore", country: "India" },
  { name: "Chennai", country: "India" },
  { name: "Kolkata", country: "India" },
  { name: "Dhaka", country: "Bangladesh" },
  { name: "Colombo", country: "Sri Lanka" },
  { name: "Kathmandu", country: "Nepal" },
  { name: "Thimphu", country: "Bhutan" },
  { name: "Male", country: "Maldives" },
  { name: "Yangon", country: "Myanmar" },
  { name: "Bangkok", country: "Thailand" },
  { name: "Phnom Penh", country: "Cambodia" },
  { name: "Vientiane", country: "Laos" },
  { name: "Hanoi", country: "Vietnam" },
  { name: "Ho Chi Minh City", country: "Vietnam" },
  { name: "Kuala Lumpur", country: "Malaysia" },
  { name: "Singapore", country: "Singapore" },
  { name: "Jakarta", country: "Indonesia" },
  { name: "Bali", country: "Indonesia" },
  { name: "Manila", country: "Philippines" },
  { name: "Taipei", country: "Taiwan" },
  { name: "Seoul", country: "South Korea" },
  { name: "Tokyo", country: "Japan" },
  { name: "Osaka", country: "Japan" },
  { name: "Kyoto", country: "Japan" },
  { name: "Beijing", country: "China" },
  { name: "Shanghai", country: "China" },
  { name: "Hong Kong", country: "China" },
  { name: "Macau", country: "China" },
  { name: "Ulaanbaatar", country: "Mongolia" },
  // European cities
  { name: "Brussels", country: "Belgium" },
  { name: "Antwerp", country: "Belgium" },
  { name: "Copenhagen", country: "Denmark" },
  { name: "Helsinki", country: "Finland" },
  { name: "Lyon", country: "France" },
  { name: "Marseille", country: "France" },
  { name: "Nice", country: "France" },
  { name: "Frankfurt", country: "Germany" },
  { name: "Munich", country: "Germany" },
  { name: "Hamburg", country: "Germany" },
  { name: "Cologne", country: "Germany" },
  { name: "Athens", country: "Greece" },
  { name: "Thessaloniki", country: "Greece" },
  { name: "Dublin", country: "Ireland" },
  { name: "Cork", country: "Ireland" },
  { name: "Florence", country: "Italy" },
  { name: "Venice", country: "Italy" },
  { name: "Milan", country: "Italy" },
  { name: "Naples", country: "Italy" },
  { name: "Luxembourg", country: "Luxembourg" },
  { name: "Amsterdam", country: "Netherlands" },
  { name: "Rotterdam", country: "Netherlands" },
  { name: "Oslo", country: "Norway" },
  { name: "Lisbon", country: "Portugal" },
  { name: "Porto", country: "Portugal" },
  { name: "Barcelona", country: "Spain" },
  { name: "Valencia", country: "Spain" },
  { name: "Malaga", country: "Spain" },
  { name: "Seville", country: "Spain" },
  { name: "Stockholm", country: "Sweden" },
  { name: "Gothenburg", country: "Sweden" },
  { name: "Geneva", country: "Switzerland" },
  { name: "Zurich", country: "Switzerland" },
  { name: "Bern", country: "Switzerland" },
  { name: "Edinburgh", country: "United Kingdom" },
  { name: "Glasgow", country: "United Kingdom" },
  { name: "Manchester", country: "United Kingdom" },
  { name: "Liverpool", country: "United Kingdom" },
  { name: "Birmingham", country: "United Kingdom" },
  { name: "Leeds", country: "United Kingdom" },
  // African cities
  { name: "Cairo", country: "Egypt" },
  { name: "Alexandria", country: "Egypt" },
  { name: "Nairobi", country: "Kenya" },
  { name: "Lagos", country: "Nigeria" },
  { name: "Abuja", country: "Nigeria" },
  { name: "Casablanca", country: "Morocco" },
  { name: "Marrakech", country: "Morocco" },
  { name: "Cape Town", country: "South Africa" },
  { name: "Johannesburg", country: "South Africa" },
  { name: "Durban", country: "South Africa" },
  { name: "Pretoria", country: "South Africa" },
  { name: "Dakar", country: "Senegal" },
  { name: "Accra", country: "Ghana" },
  { name: "Addis Ababa", country: "Ethiopia" },
  { name: "Tunis", country: "Tunisia" },
  { name: "Algiers", country: "Algeria" },
  { name: "Tripoli", country: "Libya" },
  { name: "Khartoum", country: "Sudan" },
  { name: "Dar es Salaam", country: "Tanzania" },
  { name: "Kampala", country: "Uganda" },
  // Oceania cities
  { name: "Auckland", country: "New Zealand" },
  { name: "Wellington", country: "New Zealand" },
  { name: "Christchurch", country: "New Zealand" },
  { name: "Sydney", country: "Australia" },
  { name: "Melbourne", country: "Australia" },
  { name: "Brisbane", country: "Australia" },
  { name: "Perth", country: "Australia" },
  { name: "Adelaide", country: "Australia" },
  { name: "Gold Coast", country: "Australia" },
  { name: "Hobart", country: "Australia" },
  { name: "Darwin", country: "Australia" },
  { name: "Canberra", country: "Australia" },
  { name: "Suva", country: "Fiji" },
  { name: "Port Moresby", country: "Papua New Guinea" },
  { name: "Apia", country: "Samoa" }
];

// Allow partial matches for better city matching
const matchesCity = (cityName: string, search: string): boolean => {
  const cityLower = cityName.toLowerCase();
  const searchLower = search.toLowerCase();
  
  // Direct includes
  if (cityLower.includes(searchLower)) return true;
  
  // Check for space or dash differences
  if (cityLower.replace(/-/g, ' ').includes(searchLower)) return true;
  if (cityLower.replace(/ /g, '-').includes(searchLower)) return true;
  
  // Handle Al/El/etc. prefix variations
  if (cityLower.startsWith('al ') && cityLower.substring(3).includes(searchLower)) return true;
  if (searchLower.startsWith('al ') && cityLower.includes(searchLower.substring(3))) return true;
  
  return false;
};

const EnhancedLocationSearch: React.FC<LocationSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search for a location...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Array<{ name: string; country: string }>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter locations based on input value with improved matching
  const filterLocations = (searchTerm: string) => {
    if (!searchTerm.trim()) return [];
    
    const term = searchTerm.toLowerCase().trim();
    
    // First try exact matches
    const exactMatches = enhancedCities.filter(city => 
      city.name.toLowerCase().includes(term) || 
      city.country.toLowerCase().includes(term)
    );
    
    // If we have exact matches, return those
    if (exactMatches.length > 0) {
      return exactMatches.slice(0, 10);
    }
    
    // Otherwise try more flexible matching
    return enhancedCities
      .filter(city => 
        matchesCity(city.name, term) || 
        city.country.toLowerCase().includes(term)
      )
      .slice(0, 10); // Limit to 10 suggestions for better performance
  };

  // Update suggestions when input value changes
  useEffect(() => {
    if (inputValue.trim()) {
      const filteredSuggestions = filterLocations(inputValue);
      setSuggestions(filteredSuggestions);
      setIsOpen(filteredSuggestions.length > 0);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [inputValue]);

  // Update input value when external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        suggestionsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // For better UX, show suggestions as user types
    if (newValue.trim()) {
      const filteredSuggestions = filterLocations(newValue);
      setSuggestions(filteredSuggestions);
      setIsOpen(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (location: { name: string; country: string }, event?: React.MouseEvent) => {
    // If this was triggered by a mouse event, prevent the blur from firing
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const fullLocation = `${location.name}, ${location.country}`;
    setInputValue(fullLocation);
    onChange(fullLocation);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
    // Enter
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[highlightedIndex]);
      }
    }
    // Escape
    else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Also allow creation of custom locations
  const handleCreateCustomLocation = () => {
    if (inputValue.trim() && !value) {
      onChange(inputValue.trim());
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center relative rounded-lg overflow-hidden border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-300 bg-white">
        <div className="pl-3 flex items-center pointer-events-none text-gray-400">
          <SearchIcon size={18} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() && setSuggestions(filterLocations(inputValue))}
          placeholder={placeholder}
          className={`w-full py-3 pl-2 pr-3 text-gray-800 placeholder-gray-400 focus:outline-none ${className}`}
          aria-label="Search for a location"
        />
        
        {inputValue && (
          <button
            type="button"
            onClick={handleCreateCustomLocation}
            className="px-3 py-1 mr-1 bg-indigo-100 text-indigo-700 text-xs rounded-md hover:bg-indigo-200 focus:outline-none transition-colors"
          >
            Use this location
          </button>
        )}
      </div>

      {isOpen && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-72 overflow-y-auto"
        >
          <ul className="py-1">
            {suggestions.map((location, index) => (
              <li
                key={`${location.name}-${location.country}`}
                className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                  highlightedIndex === index 
                    ? 'bg-indigo-50 text-indigo-900' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={(event) => handleSelectSuggestion(location, event)}
              >
                <div className="flex items-center">
                  <BuildingIcon size={16} className="text-indigo-500 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">{location.name}</div>
                    <div className="text-xs text-gray-500">{location.country}</div>
                  </div>
                </div>
              </li>
            ))}
            
            {suggestions.length === 0 && inputValue.trim() && (
              <li className="px-4 py-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 text-amber-800 p-2 rounded-full">
                    <MapPinIcon size={16} />
                  </div>
                  <div>
                    <div className="text-gray-700 font-medium">No exact matches found</div>
                    <div className="text-gray-600 text-xs mb-2">You can still use this location</div>
                    <button
                      className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 focus:outline-none transition-colors"
                      onClick={handleCreateCustomLocation}
                    >
                      Use "{inputValue}" as my location
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EnhancedLocationSearch;
