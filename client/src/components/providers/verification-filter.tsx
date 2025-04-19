import React from "react";
import { FilterDropdown } from "./filter-dropdowns";

interface VerificationFilterProps {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onReset?: () => void;
  onApply?: () => void;
  modal?: boolean;
}

export function VerificationFilter({
  value,
  onChange,
  isOpen,
  onToggle,
  onReset,
  onApply,
  modal = false,
}: VerificationFilterProps) {
  return (
    <FilterDropdown
      title={"Verification"}
      isOpen={isOpen}
      onToggle={onToggle}
      onReset={onReset}
      onApply={onApply}
      modal={modal}
    >
      <div className="space-y-2">
        {[
          "Fully Verified",
          "Partially Verified by Hospital",
          "Partially Verified by Insurance",
        ].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input
              type="radio"
              name="verification"
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
