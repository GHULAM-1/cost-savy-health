import React, { Suspense } from "react";
import { Search } from "lucide-react";
import HeroHeading from "./hero-heading";
import { commonProcedures } from "@/data/landing-page/hero-data";
import SearchBar from "./landing-form";
import { Suspense } from "react";

const SearchBarLoading = () => (
  <div className="w-full max-w-4xl mx-auto my-8 h-12 bg-gray-100 rounded-lg animate-pulse"></div>
);

export default function Hero() {
  return (
    <main className="px-6 sm:px-12 py-10 sm:py-20">
      <HeroHeading />
<<<<<<< HEAD
      <Suspense fallback={<SearchBarLoading />}>
=======
      <Suspense fallback={<div>Loading...</div>}>
>>>>>>> stagging
        <SearchBar />
      </Suspense>
      <div className="flex flex-wrap gap-3">
        {commonProcedures.map((procedure, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e6e6f] text-white hover:bg-[#044955] transition-colors"
          >
            {procedure}
            <Search className="w-4 h-4" />
          </button>
        ))}
      </div>
    </main>
  );
}