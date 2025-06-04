"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getProcedureByTitle } from "@/api/sanity/queries";
import { PortableText } from "@portabletext/react";

export default function ProcedureInfo({ type }: { type: string }) {
  //STATES
  const [procedure, setProcedure] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  //HOOKS
  const searchParams = useSearchParams();

  //CONSTANTS
  const searchCare = searchParams.get("searchCare") || "";

  // Fetch procedure data
  useEffect(() => {
    const fetchProcedure = async () => {
      if (!searchCare) return;

      setLoading(true);
      try {
        const data = await getProcedureByTitle(searchCare);
        setProcedure(data);
      } catch (error) {
        console.error("Error fetching procedure:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedure();
  }, [searchCare]);

  // View more state
  const [showFull, setShowFull] = useState(false);
  const charLimit = 250;

  // Helper to get plain text from Portable Text blocks
  function getPlainText(blocks: any[]): string {
    return blocks
      .map((block) =>
        typeof block === "string"
          ? block
          : block.children
          ? block.children.map((child: any) => child.text).join("")
          : ""
      )
      .join(" ");
  }

  let truncated = null;
  if (procedure && procedure.introduction && Array.isArray(procedure.introduction)) {
    const plain = getPlainText(procedure.introduction);
    if (plain.length > charLimit && !showFull) {
      truncated = plain.slice(0, charLimit) + "...";
    }
  }

  if (loading) {
    return (
      <div className="w-fit p-[16px]">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-[16px] w-fit">
      <div className="flex items-center gap-2 mb-3">
        <h1 className="font-semibold text-[28px] text-[#03363D] whitespace-wrap">
          {searchCare}
        </h1>
        <div>
          <span className="bg-[#f3f4f3] border-[1px] border-gray-200 rounded-[2px] text-[14px] py-[2px] px-[8px] text-gray-600 whitespace-nowrap">
            {type}
          </span>
        </div>
      </div>
      {procedure ? (
        <div className="text-[15px] leading-relaxed text-gray-700">
          <div className="prose">
            {truncated && !showFull ? (
              <>
                <span>{truncated}</span>
                <button
                  className="ml-2 text-[#A34E78] underline cursor-pointer text-sm"
                  onClick={() => setShowFull(true)}
                >
                  View more
                </button>
              </>
            ) : (
              <>
                <PortableText value={procedure.introduction} />
                {showFull && (
                  <button
                    className="text-[#A34E78] underline cursor-pointer text-sm"
                    onClick={() => setShowFull(false)}
                  >
                    View less
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="text-[15px] leading-relaxed text-gray-700">
          <div className="prose">
            <p>No procedure information found.</p>
          </div>
        </div>
      )}
    </div>
  );
}
