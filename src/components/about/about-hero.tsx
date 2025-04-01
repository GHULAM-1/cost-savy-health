import Image from "next/image";
import React from "react";

export default function AboutHero() {
  return (
    <div className="bg-[#02363d] max-w-[1800px] w-full py-16 md:py-24 lg:py-36 px-4 md:px-8 lg:px-16 mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
      <div className="max-w-2xl ">
        <div className="mb-4">
          <p className="bg-[#176f6f] text-white px-2 py-[2px] rounded text-[16px] inline-block">
            About Us
          </p>
        </div>
        <div className="text-white">
          <h1 className="text-[48px] md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Healthcare pricing is laughably complex.
          </h1>
          <p className="text-[18px] mb-8 opacity-90 max-w-xl">
            We make it simple through the industry's most comprehensive price
            transparency platform.
          </p>
        </div>
        <div>
          <button className="bg-[#e2f7f5] hover:bg-[#a8e6e1] py-3 px-[20px] rounded-full text-[#02363d]  transition-colors duration-200">
            Contact Us
          </button>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto md:block hidden">
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