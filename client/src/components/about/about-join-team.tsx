import React from "react";
import Image from "next/image";
import AboutUsJoin from "../../../public/JoinUS/about-us-join.webp";

export function JoinTeam() {
  return (
    <div className="lg:px-16 px-4">
      <div className="bg-[#035153] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 flex-grow self-start md:self-center">
            <Image
              src={AboutUsJoin}
              alt="Tea Pot"
              width={136}
              height={136}
              className="text-[#1B4B43] self-start md:self-center"
            />
            <div>
              <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-4 text-start md:text-center lg:text-left">
                Join the team.
              </h2>
              <p className="text-[#9DB5B0] text-base sm:text-lg max-w-md text-left md:text-center lg:text-left">
                We're on a journey to help everyday Americans to know the price
                of healthcare. You in?
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto flex lg:flex lg:items-center lg:justify-end self-center">
            <a
              href="#"
              className="inline-block bg-[#098481] text-white px-6 py-3 rounded-full font-medium hover:bg-[#86cdc0] transition-colors text-center w-full lg:w-auto"
            >
              Job Openings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
