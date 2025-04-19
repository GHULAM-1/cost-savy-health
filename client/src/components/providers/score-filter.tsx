import React from "react";
import { FilterDropdown } from "./filter-dropdowns";

interface ScoreFilterProps {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onReset?: () => void;
  onApply?: () => void;
  modal?: boolean;
}

export function ScoreFilter({
  value,
  onChange,
  isOpen,
  onToggle,
  onReset,
  onApply,
  modal = false,
}: ScoreFilterProps) {
  return (
    <FilterDropdown
      title={`Score`}
      isOpen={isOpen}
      onToggle={onToggle}
      onReset={onReset}
      onApply={onApply}
      modal={modal}
    >
      <div className="space-y-2">
        {["Any", "8+", "9+", "10"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="score"
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
