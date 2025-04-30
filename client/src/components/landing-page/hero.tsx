import React, { Suspense } from "react";
import { Search } from "lucide-react";
import HeroHeading from "./hero-heading";
import { commonProcedures } from "@/data/landing-page/hero-data";
import SearchBar from "./landing-form";


export default function Hero() {
  return (
    <main className="px-6 sm:px-12 py-10 sm:py-20">
      <HeroHeading />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>
      <div className="flex flex-wrap gap-3">
        {commonProcedures.map((procedure, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#8C2F5D] text-white hover:bg-[#A34E78] transition-colors"
          >
            {procedure}
            <Search className="w-4 h-4" />
          </button>
        ))}
      </div>
    </main>
  );
}