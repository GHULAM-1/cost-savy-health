import React from "react";
import JoinUs from "../../../public/JoinUS/JoinUs.webp";
import Image from "next/image";

const JoinTeam = () => {
  return (
    <div className="bg-[#03363d] max-w-[1800px] mx-auto border-t border-[#164e56] p-8 md:p-14 py-12 md:py-20">
      <div className=" flex flex-wrap items-center justify-center md:justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6 md:gap-8 text-center md:text-left">
          <Image
            src={JoinUs}
            alt="Decorative stairs illustration"
            width={96}
            height={128}
            className=" md:mx-0"
          />
          <div>
            <h2 className="text-white text-start text-3xl md:text-5xl font-bold mb-2">
              Join the team.
            </h2>
            <p className="text-gray-100 text-start text-base md:text-lg">
              We're eliminating the financial complexity of healthcare. You in?
            </p>
          </div>
        </div>
        <button className="bg-[#1e6e6f] hover:bg-[#1b6364] cursor-pointer text-white px-6 py-3 rounded-full font-semibold transition-colors w-full lg:w-auto">
          Job Openings
        </button>
      </div>
    </div>
  );
};

export default JoinTeam;
