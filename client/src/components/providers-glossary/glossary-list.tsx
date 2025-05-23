"use client";
import Link from "next/link";
import React from "react";

export interface GlossaryItem {
  id: string | number;
  name: string;
  location?: string;
  tab: "procedures" | "dynProviders" | "healthSystems";
  description?: string;
}

interface GlossaryListProps {
  items: GlossaryItem[];
}

const GlossaryList: React.FC<GlossaryListProps> = ({ items }) => {
  console.log(items)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Link href={`/${item.tab}/${item.id}`} key={item.id.toString()}>
        <div key={item.id.toString()} className="">
            <h3 className="text-lg font-medium hover:underline hover:cursor-pointer text-[##2363D] mb-1">
              {item.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GlossaryList;
