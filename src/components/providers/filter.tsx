"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { FilterDropdown } from "./filter-dropdowns";

export function FilterBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="flex flex-wrap items-center gap-3  px-4 sm:px-0">
      <button className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center bg-[#a9e6e1] rounded-full">
        <Menu className="text-[#1B3B36] w-4 h-4 md:w-6 md:h-6" />
      </button>

      <div className="flex flex-wrap gap-3">
        <FilterDropdown
          title="Within 50 miles"
          isOpen={openDropdown === "distance"}
          onToggle={() => toggleDropdown("distance")}
        >
          <h3 className="text-lg md:text-xl font-semibold text-[#1B3B36] mb-4">
            Distance
          </h3>
          <div className="space-y-3">
            {[
              "Within 5 miles",
              "Within 10 miles",
              "Within 25 miles",
              "Within 50 miles",
            ].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="distance"
                  value={option}
                  className="w-4 h-4 md:w-5 md:h-5 text-[#2A665B] border-gray-300 focus:ring-[#2A665B]"
                />
                <span className="text-sm md:text-base text-gray-700">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </FilterDropdown>

        <FilterDropdown
          title="Any Quality Score"
          isOpen={openDropdown === "quality"}
          onToggle={() => toggleDropdown("quality")}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-[#1B3B36]">
                Care Quality
              </h3>
              <button className="text-[#2A665B] underline text-xs md:text-sm">
                What's this?
              </button>
            </div>
            <div className="space-y-3">
              {["2+", "3+", "4+", "5"].map((rating) => (
                <label key={rating} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="quality"
                    value={rating}
                    className="w-4 h-4 md:w-5 md:h-5 text-[#2A665B] border-gray-300 focus:ring-[#2A665B]"
                  />
                  <span className="text-sm md:text-base text-gray-700">
                    ★ {rating}
                  </span>
                </label>
              ))}
            </div>
            <label className="flex items-center gap-2 mt-4 pt-4 border-t">
              <input
                type="checkbox"
                className="w-4 h-4 md:w-5 md:h-5 text-[#2A665B] border-gray-300 rounded focus:ring-[#2A665B]"
              />
              <span className="text-sm md:text-base text-gray-700">
                Include unrated providers
              </span>
            </label>
          </div>
        </FilterDropdown>

        <FilterDropdown
          title="Any Price"
          isOpen={openDropdown === "price"}
          onToggle={() => toggleDropdown("price")}
        >
          <h3 className="text-lg md:text-xl font-semibold text-[#1B3B36] mb-4">
            Price Range
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                placeholder="$ 1,372"
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-200 rounded-lg text-sm md:text-base"
              />
              <label className="text-xs md:text-sm text-gray-500 mt-1">
                Minimum
              </label>
            </div>
            <div>
              <input
                type="number"
                placeholder="$ 7,778"
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-200 rounded-lg text-sm md:text-base"
              />
              <label className="text-xs md:text-sm text-gray-500 mt-1">
                Maximum
              </label>
            </div>
          </div>
        </FilterDropdown>

        <FilterDropdown
          title="Any Verification"
          isOpen={openDropdown === "verification"}
          onToggle={() => toggleDropdown("verification")}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-[#1B3B36]">
                Price Verification
              </h3>
              <button className="text-[#2A665B] underline text-xs md:text-sm">
                What's this?
              </button>
            </div>
            <div className="space-y-3">
              {[
                "Fully Verified",
                "Partially Verified by Hospital",
                "Partially Verified by Insurance",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="verification"
                    value={option}
                    className="w-4 h-4 md:w-5 md:h-5 text-[#2A665B] border-gray-300 focus:ring-[#2A665B]"
                  />
                  <span className="text-sm md:text-base text-gray-700 truncate">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </FilterDropdown>
      </div>
    </div>
  );
}
