'use client';

import { Share } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleMouseEnter = () => {
    openDropdown();
  };

  const handleMouseLeave = () => {
    closeDropdown();
  };

  return (
    <div className="relative" onMouseLeave={handleMouseLeave}>
      <button
        className="bg-white text-[#6B1548] px-4 py-2 rounded text-sm flex items-center gap-1"
        onMouseEnter={handleMouseEnter}
        onClick={() => setIsOpen(!isOpen)} // Optional: toggle on click as well
      >
        <Share size={16}/> Share
      </button>
      {/* Dropdown content */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 transition-opacity duration-200"
          onMouseEnter={handleMouseEnter}
        >
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href);
                  toast("Link copied successfully")
                }

                setIsOpen(false); // Close dropdown after action
              }}
            >
              Copy Link
            </button>
            <a
              href="https://mail.google.com/mail/?view=cm&to=Chat@costsavvy.health&su=Feedback&body="
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => setIsOpen(false)} // Close dropdown after action
            >
              Send Email
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton; 