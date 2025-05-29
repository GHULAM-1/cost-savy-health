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
export default function MediHero({medicareItems}:Props) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-0 py-12 lg:py-24">
        <div className="relative">
          <div>
            <img
              src="/medi.jpg"
              alt="Two people discussing insurance options"
              className=" shadow-lg w-full object-cover"
            />
          </div>
          <div className="top-2 sm:top-5 md:top-15 lg:top-30 left-2 sm:left-5 text-white absolute  flex w-full items-start flex-col text-left">
            <h1 className="text-base sm:text-xl sm:w-[75%] md:text-3xl lg:text-5xl md:mb-5 font-bold ">
              {medicareItems.heading}
            </h1>
            <p className="mt-2 sm:mt-4 text-sm md:text-lg lg:text-2xl text-wrap  md:mb-5">
              {medicareItems.description}
            </p>
            <div className="mt-3 sm:mt-6 flex flex-row justify-start gap-4">
              <a
                href="/quote"
                className="px-2 sm:px-3 md:px-6 py-1 md:py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
              >
                Get a Quote
              </a>
              <a
                href="tel:8888888888"
                className="inline-block px-2 sm:px-3 md:px-6 py-1 md:py-3 border-2 text-white border-purple-700 hover:text-purple-700 rounded-md hover:bg-purple-50 transition-colors"
              >
                {medicareItems.number}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
