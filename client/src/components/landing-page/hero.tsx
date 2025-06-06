"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Search } from "lucide-react";
import SearchBar from "./landing-form";
import { getEntityRecords, HealthcareRecord } from "@/api/search/api";
import { useRouter } from "next/navigation";

interface HeroProps {
  tagline: string;
  rotatingWords: string[];
  commonProcedures: string[];
}

export default function Hero({ tagline, rotatingWords, commonProcedures }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev === rotatingWords.length - 1 ? 0 : prev + 1));
        setIsFading(false);
      }, 400); // fade out duration
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingWords]);

 


  return (
    <main className="px-6 sm:px-12 py-10 sm:py-20">
      <h1 className="text-[#403B3D] text-3xl md:text-5xl lg:text-6xl font-bold font-serif leading-15 md:leading-20 mb-4">
        {tagline} <span className="md:hidden">for</span>
        <br />
        <span className="flex items-center space-x-4">
          <span className="hidden sm:inline-block">for</span>
          <span className={`text-[#8C2F5D] transition-opacity duration-400 ${isFading ? 'fade-out' : 'fade-in'}`}>
            {rotatingWords[index]}
          </span>
        </span>
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>

      <div className="flex flex-wrap gap-3 mt-6">
        {commonProcedures.map((procedure, index) => (
          <button
            key={index}
            className="flex hover:cursor-pointer items-center gap-2 px-4 py-2 rounded-full bg-[#8C2F5D] text-white hover:bg-[#A34E78] transition-colors"
            onClick={() => router.push(`/providers?searchCare=${encodeURIComponent(procedure)}`)}
          >
            {procedure}
            <Search className="w-4 h-4" />
          </button>
        ))}
      </div>
    </main>
  );
}
