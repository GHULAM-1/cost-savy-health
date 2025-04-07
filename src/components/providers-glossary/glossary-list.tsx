"use client";
import React from 'react';

export interface GlossaryItem {
  id: string | number;
  name: string;
  location?: string;
  description?: string;
}

interface GlossaryListProps {
  items: GlossaryItem[];
}

const GlossaryList: React.FC<GlossaryListProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id.toString()} className="">
          <h3 className="text-lg font-medium hover:underline hover:cursor-pointer text-[##2363D] mb-1">{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default GlossaryList;