import React, { useEffect, useState } from "react";
import { PriceDistributionChart } from "./providers-chart";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getEntityRecords,
  getProviders,
  HealthcareRecord,
} from "@/api/search/api";

export default function ProcedureMidRange() {
  //HOOKS
  const searchParams = useSearchParams();
  const router = useRouter();

  //CONSTANTS
  const initialSearchCare =
    searchParams.get("searchCare") || "Forearm/Wrist Repair - Non-Surgical";

  const searchCare = searchParams.get("searchCare") || "";
  const zipCode = searchParams.get("zipCode") || "";
  const insurance = searchParams.get("insurance") || "";
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<HealthcareRecord[]>([]);

  useEffect(() => {
    setLoading(true);

    const queryParams = Array.from(searchParams.keys());
    const onlySearchCare =
      queryParams.length === 1 && queryParams[0] === "searchCare";
    if (onlySearchCare && searchCare) {
      getEntityRecords(searchCare, 1, 50)
        .then((res: any) => {
          if (res && Array.isArray(res)) {
            setProviders(res);
          } else {
            console.error("getEntityRecords did not return an array:", res);
            setProviders([]);
          }
        })
        .catch((err) => {
          console.error("Error fetching entity records:", err);
          setProviders([]);
        })
        .finally(() => setLoading(false));
    } else {
      getProviders({
        searchCare,
        zipCode,
        insurance,
      })
        .then((res) => {
          setProviders(res.data);
        })
        .catch((err) => {
          console.error(err);
          setProviders([]);
        })
        .finally(() => setLoading(false));
    }
  }, [searchCare, zipCode, insurance, searchParams]);

  let minPrice = 0;
  let maxPrice = 0;
  let midpointPrice = 0;

  if (providers.length > 0) {
    const rates = providers
      .map((p) => parseFloat(p.negotiated_rate as unknown as string))
      .filter((r) => !isNaN(r))
      .sort((a, b) => a - b);

    if (rates.length) {
      minPrice = rates[0]!;
      maxPrice = rates[rates.length - 1]!;

      const mid = Math.floor(rates.length / 2);
      if (rates.length % 2 === 0) {
        midpointPrice = (rates[mid - 1]! + rates[mid]!) / 2;
      } else {
        midpointPrice = rates[mid]!;
      }
    }
  }

  console.log({ minPrice, maxPrice, midpointPrice });

  return (
    <div className="p-[8px] mt-2">
      <div className="border-[1px] rounded-md px-[15px] flex flex-col xl:flex-row items-center gap-4">
        <div className="flex-1">
          <h1 className="text-[36px] font-semibold text-center">$ {midpointPrice.toFixed(3)}</h1>
          <p className="text-center text-[14px]">
            Midpoint price for {initialSearchCare}
            for the current search.
          </p>
        </div>
        <div className="w-full max-w-[350px] min-w-[300px]">
          <PriceDistributionChart midpointPrice={midpointPrice} />
        </div>
      </div>
    </div>
  );
}
