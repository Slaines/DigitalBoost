import React, { useState, useEffect, useRef } from 'react';
import { filterCities } from '../data/cities';

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  value,
  onChange,
  placeholder = 'Add a location (city, region or country)',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Array<{ name: string; country: string }>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions when input value changes
  useEffect(() => {
    if (inputValue.trim()) {
      const filteredSuggestions = filterCities(inputValue);
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
    // Don't call onChange yet, wait for selection
  };

  const handleSelectSuggestion = (suggestion: { name: string; country: string }, event?: React.MouseEvent) => {
    // If this was triggered by a mouse event, prevent the blur from firing
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const fullLocation = `${suggestion.name}, ${suggestion.country}`;
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

  // We don't need the blur handler as it's causing the double-click issue
  // The selection is handled directly in handleSelectSuggestion

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => inputValue.trim() && suggestions.length > 0 && setIsOpen(true)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        autoComplete="off"
      />
      
      {isOpen && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.name}-${suggestion.country}`}
              className={`px-4 py-2 cursor-pointer ${
                index === highlightedIndex ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50'
              }`}
              onMouseDown={(e) => handleSelectSuggestion(suggestion, e)}
            >
              <div className="font-medium">{suggestion.name}</div>
              <div className="text-sm text-gray-500">{suggestion.country}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityAutocomplete;
