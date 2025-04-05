import React from "react";
import { PriceDistributionChart } from "./providers-chart";

export default function ProcedureMidRange() {
  return (
    <div className="p-[8px] mt-2">
      <div className="border-[1px] rounded-md px-[15px] flex flex-col xl:flex-row items-center gap-4">
        <div className="flex-1">
          <h1 className="text-[36px] font-semibold text-center">$ 1,859</h1>
          <p className="text-center text-[14px]">
            Midpoint price for an Articular Finger Fracture Repair - Surgical
            for the current search.
          </p>
        </div>
        <div className="w-full max-w-[350px] min-w-[300px]">
          <PriceDistributionChart />
        </div>
      </div>
    </div>
  );
}
