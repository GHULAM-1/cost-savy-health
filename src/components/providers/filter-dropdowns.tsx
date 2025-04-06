import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onReset?: () => void;
  onApply?: () => void;
  modal?: boolean;
}

export function FilterDropdown({
  title,
  children,
  isOpen,
  onToggle,
  onReset,
  onApply,
  modal = false,
}: FilterDropdownProps) {
  return (
    <div className="relative">
      {!modal && (
        <button
          onClick={onToggle}
          className="flex items-center gap-1 text-[#1B3B36] text-sm md:text-base font-medium border border-gray-200 rounded-full px-4 py-2 hover:border-[#2A665B] transition bg-[#a9e6e1]"
        >
          {title}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      {(isOpen || modal) && (
        <div
          className={`${
            !modal &&
            "absolute z-10 w-80 md:w-[420px] bg-white border border-gray-200 rounded-2xl shadow-lg mt-2 p-5 space-y-4"
          } ${modal && "w-full"}`}
        >
          <div>{children}</div>
          {!modal && (
            <div className="flex items-center justify-end gap-2 pt-4 border-t">
              <button
                onClick={onReset}
                className="text-sm md:text-base text-[#2A665B] font-medium px-3 py-1 hover:underline"
              >
                Reset
              </button>
              <button
                onClick={onApply}
                className="text-sm md:text-base bg-[#2A665B] text-white font-medium px-4 py-2 rounded-full hover:bg-[#22584E] transition"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
