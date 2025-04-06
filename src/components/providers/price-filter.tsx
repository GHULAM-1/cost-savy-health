import React from "react";
import { FilterDropdown } from "./filter-dropdowns";

interface PriceFilterProps {
  value: { min: string; max: string };
  onChange: (value: { min: string; max: string }) => void;
  isOpen: boolean;
  onToggle: () => void;
  onReset?: () => void;
  onApply?: () => void;
  modal?: boolean;
}

export function PriceFilter({
  value,
  onChange,
  isOpen,
  onToggle,
  onReset,
  onApply,
  modal = false,
}: PriceFilterProps) {
  return (
    <FilterDropdown
      title={"Any Price"}
      isOpen={isOpen}
      onToggle={onToggle}
      onReset={onReset}
      onApply={onApply}
      modal={modal}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            placeholder="Min Price"
            value={value.min}
            onChange={(e) => onChange({ ...value, min: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
          />
          <label className="text-xs text-gray-500 mt-1">Minimum</label>
        </div>
        <div>
          <input
            type="number"
            placeholder="Max Price"
            value={value.max}
            onChange={(e) => onChange({ ...value, max: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
          />
          <label className="text-xs text-gray-500 mt-1">Maximum</label>
        </div>
      </div>
    </FilterDropdown>
  );
}
