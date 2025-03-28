import React from "react";
import Services from "./services";
const ShopHealthcare = () => {
  return (
    <section className="max-w-[1800px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-20 lg:gap-32 xl:gap-96">
        <div className="md:text-left flex flex-col">
          <h2 className="text-[#03363D] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Shop healthcare just like anything else.
          </h2>
          <p className="text-lg sm:text-xl text-[#03363D] leading-relaxed">
            The new way to take control of your healthcare is here. With
            Turquoise Health, you can finally answer the question, "How much
            will it cost?"
          </p>
        </div>
        <div className="relative flex justify-start md:justify-start">
          <div className="w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px]">
            <div className="absolute top-0 left-0 flex">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 300 300"
                fill="none"
                className="max-w-full"
              >
                <path
                  d="M150 30L270 90V210L150 270L30 210V90L150 30Z"
                  fill="#4CD7C6"
                  fillOpacity="0.2"
                />
                <path
                  d="M150 40L260 95V205L150 260L40 205V95L150 40Z"
                  fill="#4CD7C6"
                  fillOpacity="0.4"
                />
                <path
                  d="M150 50L250 100V200L150 250L50 200V100L150 50Z"
                  fill="#4CD7C6"
                />
                <circle cx="80" cy="220" r="30" fill="#E6B19F" />
                <circle cx="220" cy="80" r="30" fill="#E6B19F" />
                <path d="M140 140H160V160H140V140Z" fill="white" />
                <path d="M150 130V170" stroke="white" strokeWidth="4" />
                <path d="M130 150H170" stroke="white" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Services />
    </section>
  );
};

export default ShopHealthcare;
