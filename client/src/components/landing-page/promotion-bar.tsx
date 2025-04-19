import React from "react";
import { Sparkle } from "lucide-react";

export default function PromotionBar() {
  return (
    <div className="max-w-[1800px] bg-[#15706f] mx-auto px-4 sm:px-6 text-white py-2 sm:py-3 relative overflow-hidden">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Sparkle color="#288c8a" size={14} fill="#288c8a" />
        <Sparkle color="#3ac4bb" size={18} fill="#3ac4bb" />
        <span className="font-medium text-sm sm:text-base text-center">
          Turquoise for organizations.
        </span>
        <Sparkle color="#288c8a" size={14} fill="#288c8a" />
        <Sparkle color="#3ac4bb" size={18} fill="#3ac4bb" />
      </div>
    </div>
  );
}
