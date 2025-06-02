import React from "react";
import { Info, ChevronDown } from "lucide-react";

interface SearchHeaderProps {
  searchTerm: string;
  resultCount: number;
  showVerification: boolean;
  onVerificationToggle: () => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
}

export function SearchHeader({
  searchTerm,
  resultCount,
  showVerification,
  onVerificationToggle,
  sortOrder,
  onSortChange,
}: SearchHeaderProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  const sortOptions = [
    { value: "lowest", label: "Lowest price" },
    { value: "highest", label: "Highest price" },
    { value: "distance", label: "Distance" },
    { value: "rating", label: "Rating" },
  ];

  return (
    <div className="mb-6 space-y-2">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col items-start">
          {resultCount > 0 ? (
            <>
              <h1 className="text-[#1B3B36] text-lg md:text-xl font-semibold">
                {resultCount} results for {searchTerm}
              </h1>
              <p className="text-[#A34E78] text-xs sm:text-sm mt-1">
                Results show the max estimated price before your coverage is
                applied.
              </p>
            </>
          ) : (
            <h1 className="text-[#1B3B36] text-lg md:text-xl font-semibold">
              No results found for {searchTerm}
            </h1>
          )}
        </div>

        {resultCount > 0 && (
          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#1B3B36] font-medium text-sm whitespace-nowrap">
                Price verification
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={showVerification}
                onClick={onVerificationToggle}
                className={`relative inline-flex h-5 w-10 md:h-6 md:w-12 items-center rounded-full transition-colors duration-200 ease-in-out ${
                  showVerification ? "bg-[#A34E78]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                    showVerification
                      ? "translate-x-5 md:translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <Info size={16} className="text-[#2A665B] cursor-help shrink-0" />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 w-full sm:w-48 text-[#1B3B36] font-medium text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#2A665B] focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
