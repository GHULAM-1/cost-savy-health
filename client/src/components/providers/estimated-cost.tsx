"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

import Icon from "../svg-icon";
import ProviderDropdown from "./provider-dropdown";
import Calculator from "./calculator";
import { ContactProviderModal } from "./contact-provider-model";

import { HealthcareRecord } from "@/types/sanity/sanity-types";
import { getHealthcareRecordById } from "@/api/sanity/queries";

export default function EstimatedCost() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  //STATES
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [provider, setProvider] = useState<HealthcareRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const rawId = params.providerId;
  const providerId = Array.isArray(rawId) ? rawId[0] : rawId || "";
  const insurance = searchParams.get("insurance") || "";
  const searchCare = searchParams.get("searchCare") || "";

  const goBackToProviders = () => router.push("/providers");
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const isUsingInsurance = insurance && insurance !== "no-insurance";
  //HANDLERS
  useEffect(() => {
    if (!providerId) return;
    setLoading(true);
    getHealthcareRecordById(providerId)
      .then((res) => setProvider(res))
      .catch((err) => {
        console.error(err);
        setProvider(null);
      })
      .finally(() => setLoading(false));
  }, [providerId]);

  if (loading) {
    return <div className="text-center text-gray-600 mt-6">Loading…</div>;
  }
  if (!provider) {
    return (
      <div className="text-center text-gray-600 mt-6">Provider not found.</div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-[730px] mx-auto">
        <button
          className="inline-flex items-center text-[#098481] mb-6 cursor-pointer"
          onClick={goBackToProviders}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Results
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex w-16 h-16 bg-[#c96529] rounded-full items-center justify-center text-white text-xl font-semibold">
                {provider.provider_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#098481]">
                  {provider.provider_name}
                </h1>
                <p className="text-gray-600 text-sm">
                  {provider.provider_city}, {provider.provider_state}{" "}
                  {provider.provider_zip_code || ""}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#03363d] mb-4">
              {searchCare || "Procedure not specified"}
            </h2>

            <ProviderDropdown defaultValue={insurance} />

            <div
              className={`mt-4 p-3 rounded-lg ${
                true ? "bg-[#e3f7f5] text-[#03363d]" : "bg-red-200 text-red-50"
              } w-full inline-flex items-center`}
            >
              <span className="flex items-center w-full text-sm">
                <ShieldCheck className="w-5 h-5 mr-2" />
                {"The provider is in network"}
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-[#f0faf9] w-full max-w-3xl rounded-xl p-2 sm:px-4 flex flex-col lg:flex-row items-center justify-between gap-4 mx-auto">
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
                  ${provider.negotiated_rate.toLocaleString()}
                </div>
                <div className="flex items-center justify-end gap-1 text-[#098481]">
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
                  className="flex items-center gap-2 text-sm text-[#407672] font-semibold rounded-2xl hover:bg-[#098481] hover:text-white cursor-pointer px-3 py-2 transition-all duration-200"
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
              {isUsingInsurance && isCalculatorOpen && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <Calculator procedureCost={provider.negotiated_rate} />
                </div>
              )}
            </div>
          )}

          <div className="px-4 mb-4">
            <button
              className="w-full bg-[#098481] text-white py-3 text-sm px-6 rounded-4xl font-medium hover:bg-[#035153] transition-colors duration-200 flex items-center justify-center gap-3"
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
