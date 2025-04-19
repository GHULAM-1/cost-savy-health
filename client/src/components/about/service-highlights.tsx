import Link from "next/link";
import React from "react";
import EnterpriseFeatures from "../enterprise-features";
import serviceFeaturesData from "@/data/about/service-features-data";
const ServiceHighlight = () => {
  return (
    <section className="bg-[#035153]  px-2 sm:px-12 pt-20 pb-10">
      <div className="px-6 sm:px-12 lg:pt-20 pb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-left  self-start">
            <h2 className="text-white lg:text-[48px] md:text-5xl text-3xl font-bold leading-[1.1] mb-4 ">
              The industry's most comprehensive price transparency <br />
              platform.
            </h2>
          </div>

          <Link
            href="#"
            className="inline-block bg-[#098481] self-start lg:self-end rounded-full text-white px-7 py-3 hover:bg-[#5e9a9c] transition-colors duration-300 text-md font-medium"
          >
            <div className="flex items-center justify-center gap-1">
              <p>View </p>
              <p>Partners</p>
            </div>
          </Link>
        </div>
      </div>
      <EnterpriseFeatures
        accordionData={serviceFeaturesData}
        textColor="text-white"
      />
    </section>
  );
};

export default ServiceHighlight;
