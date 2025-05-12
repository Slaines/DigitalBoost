import React, { useState, useEffect, useRef } from 'react';
import { MapPinIcon, BuildingIcon, GlobeIcon, LoaderIcon } from 'lucide-react';

interface Location {
  name: string;
  displayName: string;
  type: string;
  country: string;
  lat: string;
  lon: string;
}

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search for any location...',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch suggestions from OpenStreetMap Nominatim API
  const fetchSuggestions = async (searchValue: string) => {
    if (!searchValue.trim()) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchValue
        )}&limit=10&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        
        // Transform the API response into our Location format
        const locations: Location[] = data.map((item: any) => ({
          name: item.name || (item.address?.city || item.address?.town || item.address?.village || item.address?.state || item.address?.country || 'Unknown location'),
          displayName: item.display_name,
          type: getLocationType(item),
          country: item.address?.country || '',
          lat: item.lat,
          lon: item.lon
        }));

        setSuggestions(locations);
        setIsOpen(locations.length > 0);
        setHighlightedIndex(-1);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine the type of location for the icon
  const getLocationType = (item: any): string => {
    const type = item.type || '';
    if (type.includes('city') || type.includes('town') || type.includes('village') || item.address?.city || item.address?.town || item.address?.village) {
      return 'city';
    } else if (type.includes('country') || item.address?.country === item.name) {
      return 'country';
    }
    return 'place';
  };

  // Get the appropriate icon based on location type
  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'city':
        return <BuildingIcon size={16} className="text-indigo-500" />;
      case 'country':
        return <GlobeIcon size={16} className="text-green-500" />;
      default:
        return <MapPinIcon size={16} className="text-amber-500" />;
    }
  };

  // Update suggestions when input value changes
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Debounce the API request to avoid excessive calls
    searchTimeout.current = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
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
    // Don't call onChange yet, wait for selection
  };

  const handleSelectSuggestion = (location: Location, event?: React.MouseEvent) => {
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

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() && setSuggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pl-10 text-gray-800 placeholder-gray-400 transition-all duration-200 ${className}`}
          aria-label="Search for a location"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <LoaderIcon size={18} className="text-indigo-500 animate-spin" />
          ) : (
            <MapPinIcon size={18} className="text-gray-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-80 overflow-y-auto"
        >
          <ul className="py-1 divide-y divide-gray-100">
            {suggestions.map((location, index) => (
              <li
                key={`${location.name}-${index}`}
                className={`px-4 py-2.5 cursor-pointer hover:bg-indigo-50 ${
                  highlightedIndex === index ? 'bg-indigo-50' : ''
                }`}
                onClick={(event) => handleSelectSuggestion(location, event)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    {getLocationIcon(location.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-gray-800">{location.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-full">
                      {location.displayName}
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {suggestions.length === 0 && !isLoading && (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                No locations found. Try a different search.
              </li>
            )}

            {isLoading && (
              <li className="px-4 py-3 text-sm text-gray-500 text-center flex items-center justify-center">
                <LoaderIcon size={16} className="animate-spin mr-2" />
                Searching locations...
              </li>
            )}
          </ul>
          <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-100 bg-gray-50">
            Powered by OpenStreetMap
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
