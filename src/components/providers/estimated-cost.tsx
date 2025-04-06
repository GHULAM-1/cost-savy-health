"use client";
import React, { useState } from "react";
import { facilities } from "@/data/procedure/provider-facility";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import Calculator from "./calculator";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ProviderDropdown from "./provider-dropdown";
import Icon from "../svg-icon";
import { useRouter } from "next/navigation";
import { ContactProviderModal } from "./contact-provider-model";

export default function EstimatedCost() {
  // STATES
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // HANDLERS
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const insurance = searchParams.get("insurance");
  const searchCare = searchParams.get("searchCare");

  const { providerId } = useParams();
  const facility = facilities.find((item) => item.id === providerId);
  const goBackToProviders = () => router.push("/providers");

  if (!facility) {
    return (
      <div className="flex items-center justify-center text-gray-600">
        Facility not found.
      </div>
    );
  }

  const isUsingInsurance = insurance && insurance !== "no-insurance";

  return (
    <div className="p-4">
      <div className="max-w-[730px] mx-auto">
        <button
          className="inline-flex items-center text-teal-700 mb-6 cursor-pointer"
          onClick={goBackToProviders}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Results
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className=" hidden md:flex w-16 h-16 sm:w-12 sm:h-12 bg-[#c96529] rounded-full  items-center justify-center text-white text-xl sm:text-lg font-semibold">
                {facility.initial || "N"}
              </div>
              <div>
                <h1 className="text-xl sm:text-lg font-semibold text-[#00756b]">
                  {facility.name}
                </h1>
                <p className="text-gray-600 text-sm">
                  {facility.location.city} {facility.location.state} — Distance{" "}
                  {facility.location.distance}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl sm:text-lg font-semibold text-[#03363d] mb-4">
              {searchCare || "Procedure not specified"}
            </h2>

            <ProviderDropdown defaultValue={insurance || ""} />

            <div
              className={`mt-4 p-3 rounded-lg ${
                facility.inNetwork
                  ? "bg-[#e3f7f5] text-[#03363d]"
                  : "bg-red-200 text-red-50"
              } w-full inline-flex items-center`}
            >
              <span className="flex items-center w-full text-sm">
                <ShieldCheck className="w-5 h-5 mr-2" />
                {facility.inNetwork
                  ? "The provider is in network"
                  : "The provider is out of network"}
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="lg:hidden bg-[#f0faf9] w-full max-w-3xl rounded-xl p-2 sm:px-4 flex flex-col gap-4 mx-auto">
              <div className="flex justify-center">
                <div className="p-3 rounded-full flex items-center justify-center">
                  <Icon
                    name="Dollar"
                    alt="Dollar Sign"
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-[#2d3c3b] text-lg font-semibold">
                  Estimated Cost
                </h2>
                <p className="text-[#2d3c3b] text-sm">
                  The total price{" "}
                  <span className="font-semibold text-[#03363d]">before</span>{" "}
                  insurance.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm text-[#2d3c3b]">Up to</div>
                <div className="text-[#2d3c3b] text-2xl font-semibold">
                  {isUsingInsurance ? "$2,170" : "$1,770"}
                </div>
                <div className="flex items-center gap-1 text-[#407672]">
                  <span className="font-medium text-sm">
                    Price Fully Verified
                  </span>
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="hidden lg:flex bg-[#f0faf9] w-full max-w-3xl rounded-xl p-2 sm:px-4 items-start justify-between gap-4 mx-auto">
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-full flex items-center justify-center">
                  <Icon
                    name="Dollar"
                    alt="Dollar Sign"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h2 className="text-[#2d3c3b] text-lg font-semibold">
                    Estimated Cost
                  </h2>
                  <p className="text-[#2d3c3b] text-sm">
                    The total price{" "}
                    <span className="font-semibold text-[#03363d]">before</span>{" "}
                    insurance.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#2d3c3b]">Up to</div>
                <div className="text-[#2d3c3b] text-2xl font-semibold">
                  {isUsingInsurance ? "$2,170" : "$1,770"}
                </div>
                <div className="flex items-center justify-end gap-1 text-[#407672]">
                  <span className="font-medium text-sm">
                    Price Fully Verified
                  </span>
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {isUsingInsurance && (
            <div className="w-full max-w-3xl rounded-xl flex flex-col gap-4 shadow-sm px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl p-4 bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="p-3 rounded-full flex items-center justify-center">
                    <Icon name="Shield-2" alt="Shield" width={48} height={48} />
                  </div>
                  <div>
                    <h2 className="text-[#2d3c3b] text-lg font-semibold">
                      Calculate Your Out-Of-Pocket Cost
                    </h2>
                    <p className="text-[#2d3c3b] text-sm">
                      Add your insurance information to estimate
                      <br />
                      your total out-of-pocket cost.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                  className="flex items-center gap-2 text-sm text-[#407672] font-semibold rounded-2xl hover:bg-[#e3f7f5] cursor-pointer px-3 py-2 transition-all duration-200"
                >
                  {isCalculatorOpen ? (
                    <>
                      Hide Calculator
                      <ChevronUp className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Show Calculator
                      <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              <div className="transition-all duration-300 ease-in-out">
                {isCalculatorOpen && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <Calculator />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="px-4 mb-4">
            <button
              className="w-full bg-[#15706f] text-white py-3 text-sm px-6 rounded-4xl font-medium hover:bg-[#1d4d45] transition-colors duration-200 flex items-center justify-center gap-3"
              onClick={openModal}
            >
              Contact Provider to Verify
            </button>
            <ContactProviderModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
