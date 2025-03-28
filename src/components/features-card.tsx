import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import compare from "../../public/Features/compare.png";
import cost from "../../public/Features/cost.png";
import search from "../../public/Features/search.png";

const FeatureCards = () => {
  // Feature Card Data
  const features = [
    {
      Image: (
        <Image
          src={search}
          alt="picture of a search-bar"
          width={124}
          height={124}
        />
      ),
      title: "Search for care.",
      points: [
        "Search for the care you need.",
        "Add your insurance plan.",
        "Find providers near you.",
      ],
    },
    {
      Image: (
        <Image
          src={compare}
          alt="comparing what matters"
          width={124}
          height={124}
        />
      ),
      title: "Compare what matters.",
      points: [
        "View and compare prices.",
        "Set location & quality preferences.",
        "Understand the price breakdown.",
      ],
    },
    {
      Image: (
        <Image
          src={cost}
          alt="estimating cost picture"
          width={124}
          height={124}
        />
      ),
      title: "Estimate your cost.",
      points: [
        "Add your insurance benefits information.",
        "Estimate your out-of-pocket cost.",
        "Contact the provider to verify.",
      ],
    },
  ];

  return (
    <section className=" ">
      <div className="max-w-[1800px] mx-auto px-6 py-12 sm:py-14 mb-8 sm:px-12 bg-gradient-to-b from-white to-[#E6FAF8]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg transition-shadow duration-300 border-[#e0f7f4] border-solid border-[6px] sm:border-[8px]"
            >
              <div className="flex justify-center sm:justify-start mb-5 sm:mb-6">
                {feature.Image}
              </div>
              <h3 className="text-[#03363D] text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center sm:text-start">
                {feature.title}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {feature.points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className="flex items-center justify-start gap-2 text-[#03363D]"
                  >
                    <Check className="w-5 h-5 sm:w-6 sm:h-6" /> {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
