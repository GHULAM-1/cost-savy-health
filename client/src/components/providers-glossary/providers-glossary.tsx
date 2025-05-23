"use client";
import React, { useState, useEffect } from "react";

import TabNavigation from "./tab-navigation";
import AlphabetNav from "./alphabet-nav";
import SearchInput from "./search-input";
import GlossaryList from "./glossary-list";
import Pagination from "../pagination";
import StateDropdown from "./state-dropdown";

import {
  TabType,
  SearchFieldType,
  GlossaryItem,
} from "../../types/providers-glossary/glossary-types";

import {
  mockStates,
} from "@/data/providers-glossary/glossary";
import {
  fetchHealthSystems,
  fetchProcedures,
  fetchProviders,
} from "@/api/sanity/queries";

export default function ProvidersGlossaryPage() {
  const tabs: TabType[] = [
    {
      id: "procedures",
      label: "Procedures",
      hasSearch: true,
      hasStateFilter: true,
    },
    {
      id: "providers",
      label: "Providers",
      hasSearch: true,
      hasStateFilter: true,
    },
    {
      id: "health-systems",
      label: "Health Systems",
      hasSearch: true,
      hasStateFilter: false,
    },
  ];
  const [items, setItems] = useState<GlossaryItem[]>([]);
  //CONSTANTS
  const itemsPerPage = 30;
  // States
  const [activeTab, setActiveTab] = useState<string>("providers");
  const [loading, setLoading]         = useState<boolean>(false);
  const [activeLetter, setActiveLetter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");


  const filteredData = items.filter((item) => {
    const matchesLetter =
      activeLetter === "ALL" ||
      item.name.charAt(0).toUpperCase() === activeLetter;
    const matchesSearch =
      !searchValue ||
      item.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesState =
      !selectedState || (item.state && item.state === selectedState);
    return matchesLetter && matchesSearch && matchesState;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //HOOKS
  useEffect(() => {
    setCurrentPage(1);
    (async () => {
      setLoading(true);
      try {
        let data: GlossaryItem[] = [];
        if (activeTab === "procedures") {
          data = await fetchProcedures();
        } else if (activeTab === "providers") {
          data = await fetchProviders();
        } else {
          data = await fetchHealthSystems();
        }
        setItems(data);
      } catch (err) {
        console.error("Failed loading glossary items:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeTab]);

  useEffect(() => {
    setSearchValue("");
    setSelectedState("");
    setActiveLetter("ALL");
  }, [activeTab]);

  const field: SearchFieldType = {
    value: searchValue,
    onChange: setSearchValue,
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <div className="">
      <div className=" px-[10px] md:px-20 bg-[#8C2F5D] relative">
        <h1 className="text-[40px] md:text-[48px] font-bold text-white  pt-[45px] pb-[137px]">
          Browse All
        </h1>
      </div>
      <div className="mx-auto px-20 bg-gray-100 min-h-[2000px] md:min-h-[1100px] lg:min-h-[809px]">
        <div className="bg-white py-[28px] px-[13px] absolute top-[230px] left-0 right-0 mx-auto w-full max-w-[1400px]  shadow-md">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 mt-4">
            {currentTab.hasSearch && (
              <div className="w-full md:w-3/2">
                <SearchInput
                  field={field}
                  searchOptions={items}
                  placeholder={`Search for ${currentTab.label.toLowerCase()}...`}
                />
              </div>
            )}

            <div className="w-full md:w-auto">
              <StateDropdown
                states={mockStates}
                selectedState={selectedState}
                onStateChange={setSelectedState}
                show={currentTab.hasStateFilter || false}
              />
            </div>
          </div>

          <div className="border-[1px] ">
            <div className="bg-[#F7FBFB] pt-2 px-2">
              <AlphabetNav
                activeLetter={activeLetter}
                onLetterChange={setActiveLetter}
              />
            </div>
            <div className="p-2">
              {loading ? (
                <p className="text-center py-10 text-lg">Loading…</p>
              ) : (
                <GlossaryList items={currentItems}  />
              )}
            </div>
          </div>

          {!loading && currentItems.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No items found matching your criteria.
              </p>
            </div>
          )}

          {filteredData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
