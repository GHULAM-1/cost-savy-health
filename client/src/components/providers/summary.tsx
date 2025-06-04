import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Printer,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { Provider } from "@/types/sanity/sanity-types";
import { PortableText } from "@portabletext/react";
import { HealthcareRecord } from "@/api/search/api";

interface SummaryProps {
  procedure: any;
  providers: HealthcareRecord[];
  insurance: string;
  onChangeRate?: () => void;
}

export function Summary({
  procedure,
  providers,
  insurance,
  onChangeRate,
}: SummaryProps) {
  // View more state for introduction
  const [showFull, setShowFull] = React.useState(false);
  const charLimit = 250;
  console.log("prooo", providers[0]?.["Description of Service"]);
  console.log("prooo", providers[0]);
  const [feesOpen, setFeesOpen] = useState(false);
  const [optional, setOptional] = useState(false);
  const facilityFees = [
    "Colonoscopy",
    "Anesthesia - General",
    "Gastrointestinal Services - General",
    "Intramuscular Injection of 10mg Propofol",
    "Microscopic/gross-exam of Surgical Pathology Biopsies/Exam/resections",
    "Pharmacy (Also see 063X, an extension of 250X) - General",
    "Pharmacy - Extension of 025X - Drugs requiring detailed coding",
    "Recovery Room - General",
  ];
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
  const description = providers[0]?.["Description of Service"];
  if (Array.isArray(description)) {
    const plain = getPlainText(description);
    if (plain.length > charLimit && !showFull) {
      truncated = plain.slice(0, charLimit) + "...";
    }
  }

  return (
    <>
      <div className="w-full mx-auto max-w-[780px] h-3 bg-[repeating-linear-gradient(45deg,_#4b5563_0px,_#4b5563_1px,_transparent_1px,_transparent_4px)] mb-6" />

      <div className="w-full max-w-[740px] mx-auto space-y-6 border-2 rounded-2xl px-4 sm:px-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <h1 className="text-xl md:text-2xl font-semibold text-[#2d3c3b]">
              Summary
            </h1>
            <button 
              className="text-[#A34E78] hover:bg-gray-100 p-2 rounded-sm hover:cursor-pointer self-end mt-2 sm:mt-0"
              onClick={() => window.print()}
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <span className="bg-[#F3F4F6] px-3 text-sm py-[2px] rounded-[2px] border-[1px]">
                {providers[0]?.billing_code_type}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-[#2d3c3b]">
              {providers[0]?.billing_code_name}
            </h2>

            <div className="text-[#2d3c3b] text-sm md:text-base leading-relaxed">
              {typeof description === "string" && description}
              {Array.isArray(description) &&
                (truncated && !showFull ? (
                  <>
                    <span>{truncated}</span>
                    <button
                      className=" text-[#A34E78] underline cursor-pointer text-sm"
                      onClick={() => setShowFull(true)}
                    >
                      View more
                    </button>
                  </>
                ) : (
                  <>
                    <PortableText value={description} />
                    {showFull && (
                      <button
                        className="text-[#A34E78] underline cursor-pointer text-sm"
                        onClick={() => setShowFull(false)}
                      >
                        View less
                      </button>
                    )}
                  </>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white rounded-lg border">
              <div className="p-2 bg-gray-50 rounded-lg">
                <MapPin className="w-6 h-6 text-[#2d3c3b]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2d3c3b] text-base">
                  {providers[0]?.provider_name}
                </h3>
                <p className="text-[#2d3c3b] text-sm">
                  {providers[0]?.provider_city}, {providers[0]?.provider_state},{" "}
                  {providers[0]?.provider_zip_code}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 p-4 bg-white rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Plus className="w-6 h-6 text-[#2d3c3b]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d3c3b] text-base">
                    {insurance}
                  </h3>
                  <p className="text-[#2d3c3b] text-sm">Insurance</p>
                </div>
              </div>
              <button
                className="text-[#A34E78] font-medium text-sm hover:cursor-pointer"
                onClick={onChangeRate}
              >
                Change
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 p-4 bg-white rounded-lg border">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-[#2d3c3b]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d3c3b] text-base">
                    Primary Service Cost
                  </h3>
                  <p className="text-[#2d3c3b] text-sm">
                    Estimated cost with associated fees.
                  </p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-xl md:text-2xl font-semibold text-[#2d3c3b]">
                  ${providers[0]?.negotiated_rate}
                </div>
                <button className="text-[#A34E78] font-medium text-sm">
                  Case Rate
                </button>
              </div>
            </div>

            <div className="w-full bg-[#F8F8FA]  rounded-lg border mb-2">
              <button
                className="w-full flex items-center justify-between p-2 font-semibold text-[#A34E78] text-base"
                onClick={() => setFeesOpen((open) => !open)}
              >
                <span>Facility Fees</span>
                <div className="flex gap-3">
                  <span className="text-sm font-normal">
                    {facilityFees.length} Fees
                  </span>
                  {feesOpen ? (
                    <ChevronUp className="w-5 h-5 hover:cursor-pointer" />
                  ) : (
                    <ChevronDown className="w-5 h-5 hover:cursor-pointer" />
                  )}
                </div>
              </button>
              <ul
                className={`overflow-hidden transition-all duration-300 ${
                  feesOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                {facilityFees.map((fee, idx) => (
                  <li
                    key={idx}
                    className="px-2 py-2 border-t text-[#2d3c3b] text-sm"
                  >
                    {fee}
                  </li>
                ))}
              </ul>
              <button
                className="w-full flex items-center justify-between border-t-[1px] p-2 font-semibold text-[#A34E78] text-base"
                onClick={() => setOptional((open) => !open)}
              >
                <span>Optional Fees</span>
                <div className="flex gap-3">
                  <span className="text-sm font-normal">
                    {facilityFees.length} Fees
                  </span>
                  {optional ? (
                    <ChevronUp className="w-5 h-5 hover:cursor-pointer" />
                  ) : (
                    <ChevronDown className="w-5 h-5 hover:cursor-pointer" />
                  )}
                </div>
              </button>
              <ul
                className={`overflow-hidden transition-all duration-300 ${
                  optional ? 'max-h-96' : 'max-h-0'
                }`}
              >
                {facilityFees.map((fee, idx) => (
                  <li
                    key={idx}
                    className="px-2 py-2 border-t text-[#2d3c3b] text-sm"
                  >
                    {fee}
                  </li>
                ))}
              </ul>
              <p className="text-[#2d3c3b] mt-2 border-t-[1px] px-2 py-2 text-sm md:text-base leading-relaxed">
                This estimate includes services commonly performed during this
                treatment. We include these services to give you the most
                accurate estimate possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2">
        <div className="bg-white p-4 sm:p-6 max-w-[780px] mx-auto pb-20 sm:pb-28">
          <h2 className="text-base sm:text-lg font-semibold text-[#2d3c3b] mb-2">
            Disclaimer
          </h2>
          <p className="text-[#2d3c3b] leading-relaxed text-xs sm:text-sm">
            Individual treatments can vary, causing costs to change. Use the
            prices above to estimate your out-of-pocket cost. To verify your
            out-of-pocket cost, contact your healthcare provider.
          </p>
        </div>
      </div>
    </>
  );
}

export default Summary;
