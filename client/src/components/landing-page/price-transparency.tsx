import React from "react";
import Image from "next/image";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface PriceTransparencyProps {
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  features: FeatureItem[];
}

export default function PriceTransparency({
  heading,
  description,
  ctaText,
  ctaLink,
  features,
}: PriceTransparencyProps) {
  return (
    <section className="px-8 md:px-12 bg-gradient-to-b from-[#F7C2D7] to-white py-12 md:py-20 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
        <div>
          <h2 className="text-[#403B3D] font-tiempos text-4xl md:text-5xl font-bold leading-[1.1] mb-6">
            {heading}
          </h2>
          <p className="text-lg text-[#403B3D] leading-relaxed mb-8">
            {description}
          </p>
          <a
            href={ctaLink}
            className="inline-block bg-[#8C2F5D] text-white px-6 py-3 rounded-full hover:bg-[#C85990] transition-colors duration-300"
          >
            {ctaText}
          </a>
        </div>
        <div className="space-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <img src={`/Icons/${feature.icon}.png`} alt={feature.title} />
              </div>
              <div>
                <h3 className="text-[#403B3D] text-2xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#403B3D] text-xl leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
