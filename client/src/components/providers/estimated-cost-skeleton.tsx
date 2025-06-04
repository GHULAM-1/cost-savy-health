import React from "react";

export default function EstimatedCostSkeleton() {
  return (
    <div className="max-w-[730px] mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="hidden md:flex w-16 h-16 bg-gray-200 rounded-full" />
          <div>
            <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="p-5 border-b border-gray-200">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
          <div className="h-10 w-full bg-gray-100 rounded mb-4" />
        </div>
        <div className="p-4">
          <div className="h-16 w-full bg-gray-100 rounded mb-4" />
        </div>
        <div className="px-4 mb-4">
          <div className="h-10 w-full bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
} 