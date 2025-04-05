import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

interface FilterDropdownProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

export function FilterDropdown({
  title,
  isOpen,
  onToggle,
  children,
  className = "",
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="px-4 py-2 md:px-6 md:py-2 bg-[#a9e6e1] text-[#1B3B36] rounded-full font-medium flex items-center gap-2 text-sm md:text-base"
      >
        {title}
        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute md:left-0 right-0 top-full mt-2 w-full min-w-[280px] md:w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-10">
          <div className="max-h-[60vh] overflow-y-auto">{children}</div>
          <div className="flex flex-col md:flex-row justify-between gap-2 mt-4 pt-4 border-t">
            <button className="text-[#2A665B] font-medium text-sm md:text-base order-2 md:order-1">
              Reset
            </button>
            <button className="px-4 py-2 bg-[#2A665B] text-white rounded-full font-medium text-sm md:text-base order-1 md:order-2">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
