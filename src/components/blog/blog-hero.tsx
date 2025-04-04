import React from "react";
import { Plus } from "lucide-react";

export default function BlogHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:p-12 xl:px-25 md:py-20 py-15 relative">
        <div className="text-center flex flex-col items-center justify-center">
          <div className="text-[#4CD7C6] text-2xl font-bold flex items-center justify-center ">
            <Plus
              className="md:w-12 md:h-12 sm:w-8 sm:h-8 hidden sm:block"
              strokeWidth={4}
            />
            <span className="text-[#03363d] text-2xl sm:text-4xl md:text-5xl">
              Turquoise Health
            </span>
          </div>

          <h1 className="md:text-[25px] text-[16px] sm:text-lg font-bold text-[#3c5d62]  mb-6">
            Blogging on Healthcare and Price Transparency
          </h1>
        </div>
      </div>
    </div>
  );
}
