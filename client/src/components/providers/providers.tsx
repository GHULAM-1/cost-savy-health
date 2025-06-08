"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProvidersSearch from "./providers-search";
import ProcedureInfoDetails from "./procedure-info-details";
import ProviderCards from "./provider-cards";
import ProviderMap from "./provider-map";
import { FilterBar } from "./filter";
import { Map } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getEntityRecords,
  getProviders,
  HealthcareRecord,
} from "@/api/search/api";

export default function AllProviders() {
  //STATES
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [providers, setProviders] = useState<HealthcareRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // URL params
  const searchCare = searchParams.get("searchCare") || "";
  const zipCode = searchParams.get("zipCode") || "";
  const insurance = searchParams.get("insurance") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    // Check if any search parameters are provided
    const hasSearchParams = searchCare || zipCode || insurance;
    if (!hasSearchParams) {
      router.push("/");
      return;
    }

    setLoading(true);
    const queryKeys = Array.from(searchParams.keys());
    const onlySearchCare =
      queryKeys.length === 1 && queryKeys[0] === "searchCare";

    const fetchData =
      onlySearchCare && searchCare
        ? getEntityRecords(searchCare, 1, 50).then((res) => {
            if (res) {
              setProviders(res.data);
              setTotalCount(res.pagination.total);
            } else {
              setProviders([]);
              setTotalCount(0);
            }
          })
        : getProviders({
            searchCare,
            zipCode,
            insurance,
            page: currentPage,
            limit: 10,
          }).then((res) => {
            setProviders(res.data);
            setTotalCount(res.pagination.total);
          });

    fetchData.finally(() => setLoading(false));
  }, [searchCare, zipCode, insurance, currentPage, router]);

  // derive map props
  console.log(providers)
  const type = providers[0]?.billing_code_type
  const zipCodes = providers.map((p) => p.provider_zip_code);
  const names = providers.map((p) => p.provider_name);
  console.log(names)

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProvidersSearch />
        {providers.length > 0 && <FilterBar />}
        <ProcedureInfoDetails type={type}/>
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
            <ProviderCards
              providers={providers}
              loading={loading}
              totalCount={totalCount}
              searchCare={searchCare}
            />
          </div>

          <div
            className={`${
              isMapVisible ? "block" : "hidden lg:block"
            } w-full lg:w-1/3 lg:sticky lg:top-4 ${providers.length > 0 ? 'lg:h-[calc(100vh-530px)]' : ''} mt-10`}
          >
            <div className="">
              <ProviderMap zipCodes={zipCodes} names={names} />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
