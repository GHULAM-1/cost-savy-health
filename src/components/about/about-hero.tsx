import Image from "next/image";
import React from "react";

export default function AboutHero() {
  return (
    <div className="bg-[#02363d] py-12 sm:py-16 md:py-24 lg:py-28 px-8 sm:px-6 md:px-8 lg:px-24 mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 md:gap-12 lg:gap-16">
      <div className="max-w-xl md:max-w-2xl">
        <div className="mb-4 sm:mb-6">
          <p className="bg-[#176f6f] text-white px-3 py-1 rounded text-[14px] sm:text-[16px] inline-block">
            About Us
          </p>
        </div>
        <div className="text-white">
          <h1 className="text-[32px] sm:text-[40px] md:text-7xl  font-bold mb-4 sm:mb-6 md:mb-8 leading-[1.2] ">
            Healthcare pricing is laughably complex.
          </h1>
          <p className="text-[16px] sm:text-[18px] opacity-90 max-w-md sm:max-w-lg mb-6 sm:mb-8">
            We make it simple through the industry's most comprehensive price
            transparency platform.
          </p>
        </div>
        <div>
          <button className="bg-[#e2f7f5] hover:bg-[#a8e6e1] py-2 px-6 sm:py-3 sm:px-8 rounded-full text-[#02363d] transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </div>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto md:block hidden">
        <Image
          src="/about-us-hero.svg"
          alt="Healthcare pricing visualization"
          width={385}
          height={415}
          priority
        />
      </div>
    </div>
  );
}
