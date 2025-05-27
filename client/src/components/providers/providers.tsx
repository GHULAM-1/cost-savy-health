"use client";
import React, { Suspense, useState } from "react";
import ProvidersSearch from "./providers-search";
import ProcedureInfoDetails from "./procedure-info-details";
import ProviderCards from "./provider-cards";
import ProviderMap from "./provider-map";
import { FilterBar } from "./filter";
import { Map } from "lucide-react";

export default function AllProviders() {
  //STATES
  const [isMapVisible, setIsMapVisible] = useState(false);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProvidersSearch />
        <FilterBar />
        <ProcedureInfoDetails />
        <div className="lg:hidden flex items-center justify-start my-4 ml-4">
          <button
            onClick={() => setIsMapVisible(!isMapVisible)}
            className="px-6 py-2 bg-[#2A665B] text-white rounded-full flex items-center gap-2"
          >
            <Map size={18} />
            {isMapVisible ? "View List" : "View Map"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
          <div
            className={`${
              isMapVisible ? "hidden lg:block" : "block"
            } w-full lg:w-2/3`}
          >
            <ProviderCards />
          </div>

          <div
            className={`${
              isMapVisible ? "block" : "hidden lg:block"
            } w-full lg:w-1/3 lg:sticky lg:top-4 lg:h-[calc(100vh-530px)] mt-10`}
          >
            <div className="">
              <ProviderMap />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
