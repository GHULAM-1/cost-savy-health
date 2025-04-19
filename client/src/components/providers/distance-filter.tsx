import React from "react";
import { FilterDropdown } from "./filter-dropdowns";

interface DistanceFilterProps {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onReset?: () => void;
  onApply?: () => void;
  modal?: boolean;
}

export function DistanceFilter({
  value,
  onChange,
  isOpen,
  onToggle,
  onReset,
  onApply,
  modal = false,
}: DistanceFilterProps) {
  return (
    <FilterDropdown
      title={"Distance Filter"}
      isOpen={isOpen}
      onToggle={onToggle}
      onReset={onReset}
      onApply={onApply}
      modal={modal}
    >
      <div className="space-y-2">
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
              checked={value === option}
              onChange={() => onChange(option)}
              className="w-4 h-4"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </FilterDropdown>
  );
}
