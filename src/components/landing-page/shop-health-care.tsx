import React from "react";
import Services from "./services";
import FeatureIcon from "../svg-icon";
const ShopHealthcare = () => {
  return (
    <section className="max-w-[1800px] mx-auto px-6 sm:px-12 py-16 sm:py-20 mb-8">
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
              <FeatureIcon
                name="shield"
                alt="Picture of shield"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      <Services />
    </section>
  );
};

export default ShopHealthcare;
