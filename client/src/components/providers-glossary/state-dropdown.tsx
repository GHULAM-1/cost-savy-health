"use client";
import React from 'react';

export interface StateOption {
  id: string | number;
  name: string;
}

interface StateDropdownProps {
  states: StateOption[];
  selectedState: string;
  onStateChange: (state: string) => void;
  show: boolean;
}

const StateDropdown: React.FC<StateDropdownProps> = ({
  states,
  selectedState,
  onStateChange,
  show
}) => {
  if (!show) return null;
  
  return (
    <select 
      className="px-[10px] py-[8px] border rounded-full bg-[#e6e6e6] text-gray-800 min-w-[150px] md:min-w-[350px]"
      value={selectedState}
      onChange={(e) => onStateChange(e.target.value)}
    >
      <option value="" className='font-bold'>All States</option>
      {states.map((state) => (
        <option key={state.id.toString()} value={state.name}>
          {state.name}
        </option>
      ))}
    </select>
  );
};

export default StateDropdown;