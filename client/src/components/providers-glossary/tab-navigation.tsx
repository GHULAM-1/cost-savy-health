"use client";
import React from 'react';

export interface TabType {
  id: string;
  label: string;
  hasSearch: boolean;
}

interface TabNavigationProps {
  tabs: TabType[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b pb-[28px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-[16px] py-[8px] ${
            activeTab === tab.id
              ? ' bg-[#8C2F5D] rounded-full text-white font-medium text-[12px] sm:text-[12px] md:text-[18px]'
              : 'text-gray-700 text-[12px] sm:text-[12px] md:text-[18px]'
          } focus:outline-none`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;