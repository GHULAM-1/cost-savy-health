"use client";
import { fullDescription } from "@/data/procedure/procedure-info";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo } from "react";

export default function ProcedureInfo() {
  //STATES
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  //HOOKS
  const searchParams = useSearchParams();

  //CONSTANTS
  const searchCare = searchParams.get("searchCare") || "Forearm/Wrist Repair - Non-Surgical";

  //FUNCTIONS
  const { shortDescription } = useMemo(() => {
    const firstParagraph = fullDescription.split("\n")[0];

    const targetLength = 250;
    let cutoffPoint = firstParagraph.indexOf(". ", targetLength - 30);
    if (cutoffPoint === -1 || cutoffPoint < targetLength / 2) {
      cutoffPoint = firstParagraph.indexOf(". ", targetLength);
    }
    if (cutoffPoint === -1) {
      cutoffPoint = firstParagraph.indexOf(" ", targetLength);
    }
    if (cutoffPoint === -1) cutoffPoint = targetLength;

    return {
      shortDescription: firstParagraph.substring(0, cutoffPoint + 1),
    };
  }, [fullDescription]);

  return (
    <div className="max-w-[750px] p-[16px]">
      <div className="flex items-center gap-2 mb-3">
        <h1 className="font-semibold text-[28px] text-[#03363D]">
          {searchCare}
        </h1>
        <div>
          <span className="bg-[#f3f4f3] border-[1px] border-gray-200 rounded-[2px] text-[14px] py-[2px] px-[8px] text-gray-600">
            MS019
          </span>
        </div>
      </div>

      <div className="text-[15px] leading-relaxed text-gray-700">
        {showFullDescription ? (
          <div className="space-y-6">
            {fullDescription.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p>
            {shortDescription}
            <span className="text-gray-400">...</span>
          </p>
        )}

        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-[#176F6F] hover:text-[#176F6F] font-medium mt-2 focus:outline-none focus:underline"
          aria-expanded={showFullDescription}
        >
          {showFullDescription ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
}
