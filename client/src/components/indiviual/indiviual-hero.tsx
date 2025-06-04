import Image from "next/image";
import React from "react";
type Feature = {
    imageUrl: string;
    heading: string;
    description: string;
  };
type MedicareDoc = {
    _id: string;
    heading: string;
    description: string;
    number: string;
    imageUrl: string;
    featuresGrid: Feature[];
  };
  
  type Props = {
    medicareItems: MedicareDoc;
  };
export default function IndiviualHero({medicareItems}:Props) {
  return (
    <section className="bg-white overflow-hidden">
      <div 
        className="relative w-full bg-[url('/medi.jpg')] bg-cover bg-center py-12 md:py-24 lg:py-32"
        style={{ minHeight: '300px' }} // Add a minimum height to ensure the background is visible
      >
        <div className="relative z-10 text-white px-6 w-[70%] sm:w-[50%] flex flex-col items-start text-left ml-2 sm:ml-10">
          <h1 className="text-sm sm:text-xl font-tiempos md:text-3xl lg:text-5xl mb-2 md:mb-4 font-bold leading-tight">
            {medicareItems.heading}
          </h1>
          <p className="mt-2 sm:mt-4 text-sm md:text-lg lg:text-xl text-wrap mb-4 md:mb-6">
            {medicareItems.description}
          </p>
          <div className="mt-3 sm:mt-6 flex flex-col  sm:flex-row justify-start gap-2 sm:gap-4">
            <a
              href="/quote"
              className="px-2 md:text-base text-xs text-center sm:px-3 md:px-6 py-1 md:py-3 bg-[#A34E78] text-white rounded-md hover:bg-[#C85990] transition-colors"
            >
              Get a Quote
            </a>
            <a
              href={`tel:${medicareItems.number}`}
              className="inline-block px-2 md:text-base text-center text-xs sm:px-3 md:px-6 py-1 md:py-3 border-2 text-white border-[#A34E78] rounded-md hover:bg-[#C85990] transition-colors"
            >
              {medicareItems.number}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
