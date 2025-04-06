import React from "react";
import { MapPin, Star, ShieldCheck, Check } from "lucide-react";
import { ProviderCardProps } from "@/types/providers/providers-card";

interface ExtendedProviderCardProps extends ProviderCardProps {
  onClick?: () => void;
}

export default function ProviderCard({
  facility,
  onClick,
}: ExtendedProviderCardProps) {
  return (
    <div
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="grid md:grid-cols-[3fr_1fr_1fr] gap-4 md:gap-8 p-4 md:p-0">
        <div className="flex flex-col items-start gap-2 md:p-4">
          <div className="flex items-start gap-4">
            <div className="hidden md:flex w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#CD8B65] items-center justify-center">
              <span className="text-white text-md md:text-lg font-semibold">
                {facility.initial}
              </span>
            </div>
            <div>
              <h2 className="text-[#1B3B36] text-md md:text-lg font-semibold leading-tight">
                {facility.name}
              </h2>
              <p className="text-gray-500 text-sm">{facility.type}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="text-gray-600 space-y-2 md:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="md:size-[18px] text-[#1B3B36]" />
                  <span className="text-[#1B3B36] text-sm md:text-base">
                    {facility.location.city}, {facility.location.state} (
                    {facility.location.distance} mi)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star
                    size={16}
                    className="md:size-[18px] fill-#757575 stroke-#757575"
                  />
                  <span className="text-sm md:text-base">
                    {facility.rating !== null ? facility.rating : "No rating"}
                  </span>
                </div>
              </div>
              {facility.inNetwork && (
                <div className="flex items-center gap-2 text-[#2A665B] mt-2">
                  <ShieldCheck size={16} className="md:size-[18px]" />
                  <span className="text-sm md:text-base">In Network</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:border-r-2 md:border-gray-200 md:pr-6 py-2 md:py-4 text-center md:text-right order-last md:order-none">
          <div className="text-sm text-gray-600">
            up to{" "}
            <span className="text-lg md:text-xl font-semibold text-[#1B3B36]">
              ${facility.price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-center md:justify-end items-center gap-1 text-[#2A665B] mt-1">
            <span className="text-sm underline">Significantly lower</span>
            <span className="text-xs transform transition-transform duration-300 group-hover:-rotate-45">
              ↓
            </span>
          </div>
        </div>

        <div className="md:pl-4 self-center text-sm order-2 md:order-none">
          <div className="text-gray-600 mb-1 font-bold">Price verified by:</div>
          <div className="flex items-center gap-1 font-medium">
            <Check
              size={16}
              strokeWidth={3}
              className="md:size-[18px] text-[#2A665B]"
            />
            <span className="text-[#2A665B] text-sm md:text-base">
              Insurance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
