"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from "lucide-react";

export interface SearchOption {
  id: string | number;
  name: string;
}

export interface SearchFieldType {
  value: string;
  onChange: (value: string) => void;
}

interface SearchInputProps {
  field: SearchFieldType;
  searchOptions: SearchOption[];
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  field, 
  searchOptions,
  placeholder = "Search for providers..." 
}) => {
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    field.onChange(value);
    setShowResults(value.length > 0);
  };

  const handleOptionSelect = (option: SearchOption) => {
    field.onChange(option.name);
    setSearchQuery(option.name);
    setShowResults(false);
  };

  const handleClearSearch = () => {
    field.onChange("");
    setSearchQuery("");
    setShowResults(false);
  };

  const filteredOptions = searchOptions
    .filter((option) => 
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 15);

  return (
    <div className="relative w-full" ref={inputRef}>
      <div className="relative flex items-center border rounded-full">
        <Search className="absolute left-3 text-gray-500" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-8 py-2  focus:outline-none"
          onFocus={() => searchQuery && setShowResults(true)}
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Clear search"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}
      </div>

      {showResults && filteredOptions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.id.toString()}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}

      {showResults && filteredOptions.length === 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10 p-3 text-center text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchInput;