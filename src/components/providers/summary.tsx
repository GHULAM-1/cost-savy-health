import React from "react";
import { MapPin, Plus, Printer, ChevronDown, AlertCircle } from "lucide-react";

export function Summary() {
  return (
    <>
      <div className="w-full mx-auto max-w-[780px] h-3 bg-[repeating-linear-gradient(45deg,_#4b5563_0px,_#4b5563_1px,_transparent_1px,_transparent_4px)] mb-6" />

      <div className="w-full max-w-[740px] mx-auto space-y-6 border-2 rounded-2xl px-4 sm:px-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <h1 className="text-xl md:text-2xl font-semibold text-[#2d3c3b]">
              Summary
            </h1>
            <button className="text-[#407672] self-end mt-2 sm:mt-0">
              <Printer className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-gray-100 rounded-md text-sm font-medium">
              PU000
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-[#2d3c3b]">
              Bronchoscopy
            </h2>

            <p className="text-[#2d3c3b] text-sm md:text-base leading-relaxed">
              Bronchoscopy is a procedure used to directly visualize the inside
              of the lungs. It employs a bronchoscope, a long, flexible tube
              with a light and camera at the end. Specially designed surgic...
            </p>

            <button className="text-[#407672] font-medium text-sm md:text-base">
              View more
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white rounded-lg border">
              <div className="p-2 bg-gray-50 rounded-lg">
                <MapPin className="w-6 h-6 text-[#2d3c3b]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2d3c3b] text-base">
                  Kingsbrook Jewish Medical Center
                </h3>
                <p className="text-[#2d3c3b] text-sm">
                  585 Schenectady Avenue, Brooklyn, NY 11203
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
                    Anthem CA PPO
                  </h3>
                  <p className="text-[#2d3c3b] text-sm">Insurance</p>
                </div>
              </div>
              <button className="text-[#407672] font-medium text-sm">
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
              <div className="text-right">
                <div className="text-xl md:text-2xl font-semibold text-[#2d3c3b]">
                  $2,170
                </div>
                <button className="text-[#407672] font-medium text-sm">
                  Case Rate
                </button>
              </div>
            </div>

            <button className="w-full flex items-center justify-between p-4 bg-white rounded-lg border">
              <span className="font-semibold text-[#2d3c3b] text-base">
                Facility Fees
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[#2d3c3b] text-sm">10 Fees</span>
                <ChevronDown className="w-5 h-5 text-[#2d3c3b]" />
              </div>
            </button>
          </div>

          <p className="text-[#2d3c3b] text-sm md:text-base leading-relaxed">
            This estimate includes services commonly performed during this
            treatment. We include these services to give you the most accurate
            estimate possible.
          </p>
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
