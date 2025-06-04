"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface DropdownItem {
  title: string;
  description?: string;
  url: string;
}


interface NavItemProps {
  text: string;
  hasDropdown?: boolean;
  dropdownContent?: DropdownItem[];
  onItemClick?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function NavItem({
  text,
  hasDropdown = false,
  dropdownContent = [],
  onItemClick,
  isMobileMenuOpen,
}: NavItemProps) {
  // STATE
  const [isOpen, setIsOpen] = useState(false);

  // Effect to close dropdown when mobile menu closes
  useEffect(() => {
    // Only close if the mobile menu is explicitly closing
    if (isMobileMenuOpen === false) {
      setIsOpen(false);
    }
  }, [isMobileMenuOpen]); // Re-run when isMobileMenuOpen changes

  const handleDropdownItemClick = () => {
    setIsOpen(false); // Close the dropdown
    onItemClick?.(); // Call the external callback
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center hover:cursor-pointer text-white hover:text-[#F3E8EF] transition-colors font-semibold text-[16px] py-1">
        {text}
      </button>

      {hasDropdown && (
        <div
          className={`absolute top-full lg:w-[500px] left-[-100px]  md:left-[-150px] bg-white rounded-lg shadow-lg py-4 px-6 z-50 transition-all duration-300 ease-out transform origin-top ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="space-y-4 grid sm:grid-cols-2">
            {dropdownContent.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="cursor-pointer md:p-2 rounded-md hover:bg-gray-100 transition-colors block"
                onClick={handleDropdownItemClick}
              >
                <div className="text-[#03363d]  font-semibold text-md">
                  {item.title}
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  {item.description}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
