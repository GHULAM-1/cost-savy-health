import React from "react";
import Image from "next/image";

interface JoinTeamProps {
  heading: string;
  description: string;
  ctaText: string;
  image: string;
}

const JoinTeam: React.FC<JoinTeamProps> = ({
  heading,
  description,
  ctaText,
  image,
}) => {
  return (
    <div className="bg-[#8C2F5D] border-t border-[#164e56] p-8 md:p-14 py-12 md:py-20">
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-6">
        <div className="flex flex-wrap items-center gap-6 md:gap-8 text-center md:text-left">
        {image && (
  <Image 
    src={image} 
    alt="Join illustration"
    width={96}
    height={128}
    className="md:mx-0"
  />
)}
          <div>
            <h2 className="text-white text-start text-3xl md:text-5xl font-bold mb-2">
              {heading}
            </h2>
            <p className="text-gray-100 text-start text-base md:text-lg">
              {description}
            </p>
          </div>
        </div>
        <a href="/">
          <button className="bg-[#A34E78] hover:bg-[#C85990] cursor-pointer text-white px-6 py-3 rounded-full font-semibold transition-colors w-full lg:w-auto">
            {ctaText}
          </button>
        </a>
      </div>
    </div>
  );
};

export default JoinTeam;
