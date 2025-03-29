import { useState } from "react";

interface DropdownItem {
  title: string;
  description: string;
}

interface NavItemProps {
  text: string;
  hasDropdown?: boolean;
  dropdownContent?: DropdownItem[];
}

export default function NavItem({
  text,
  hasDropdown = false,
  dropdownContent = [],
}: NavItemProps) {
  // STATE
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center text-white hover:text-[#4CD7C6] transition-colors font-semibold text-[16px] py-1">
        {text}
      </button>

      {hasDropdown && (
        <div
          className={`absolute top-full lg:w-[500px] left-[-150px] bg-white rounded-lg shadow-lg py-4 px-6 z-50 transition-all duration-300 ease-out transform origin-top ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="space-y-4 grid grid-cols-2">
            {dropdownContent.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="text-[#03363d] font-semibold text-md">
                  {item.title}
                </div>
                <div className="text-gray-600 text-sm mt-1">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
