import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";

export interface FeatureCardProps {
  image:string;
  title: string;
  points: string[];
}

interface FeatureCardsProps {
  cards: FeatureCardProps[];
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ cards }) => {
  console.log(cards)
  return (
    <section>
      <div className="px-6 py-12 sm:py-14 mb-8 sm:px-12 bg-gradient-to-b from-white to-[#F3E8EF]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg transition-shadow duration-300 border-[#F3E8EF] border-solid border-[6px] sm:border-[8px]"
            >
              <div className="flex justify-center sm:justify-start mb-5 sm:mb-6">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={124}
                  height={124}
                />
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
