import React from "react";
import FeatureIcon from "../svg-icon";
import features from "../../data/landing-page/price-transperency-data";

export default function PriceTransparency() {
  return (
    <section className="max-w-[1800px] mx-auto px-8 md:px-12 bg-gradient-to-b from-[#e9f8f8] to-white py-12 md:py-20 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
        <div>
          <h2 className="text-[#03363D] text-4xl md:text-5xl font-serif font-bold leading-[1.1] mb-6">
            What the health is price transparency?
          </h2>
          <p className="text-lg text-[#03363D] leading-relaxed mb-8">
            For the first time in the history of US healthcare, hospitals and
            health plans are required by law to make their prices publicly
            available. Turquoise Health gives you the power and intelligence to
            take action, determine a price, and make cost-conscious decisions
            about your healthcare.
          </p>
          <a
            href="#"
            className="inline-block bg-[#1D5E5A] text-white px-6 py-3 rounded-full hover:bg-[#044955] transition-colors duration-300"
          >
            Resource Hub
          </a>
        </div>
        <div className="space-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <FeatureIcon name={feature.icon} alt={feature.title} />
              </div>
              <div>
                <h3 className="text-[#03363D] text-2xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#03363D] text-xl leading-relaxed">
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
