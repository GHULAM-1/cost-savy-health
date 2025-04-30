import Link from "next/link";
import React from "react";
import EnterpriseFeatures from "../enterprise-features";
import FeatureIcon from "../svg-icon";
import enterpriseFeaturesData from "@/data/landing-page/enterprise-features-data";
const Enterprise = () => {
  return (
    <>
      <section className=" px-6 sm:px-12 pt-20 pb-10">
        {/* <FeatureIcon
          name={"enterprise"}
          alt={"Balancing weights"}
          width={200}
          height={200}
        /> */}
        <img src="/Icons/enterprise.png" alt="" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-left  self-start">
            <h2 className="text-[#403B3D] text-4xl md:text-5xl font-serif font-bold leading-[1.1] mb-4">
              Cost Savvy for <br /> enterprise.
            </h2>
            <p className="text-lg text-[#403B3D] leading-relaxed mb-2">
              We're proud to be working with some of the industry's newest,
              oldest, and boldest. See how Cost Savvy can benefit your
              organization.
            </p>
          </div>

          <Link
            href="#"
            className="inline-block bg-[#8C2F5D] self-start lg:self-end rounded-full text-white px-7 py-3 hover:bg-[#A34E78] transition-colors duration-300 text-md font-medium"
          >
            <div className="flex items-center justify-center gap-1">
              <p>Cost Savvy</p>
              <p>Platform</p>
            </div>
          </Link>
        </div>
      </section>
      <EnterpriseFeatures
        accordionData={enterpriseFeaturesData}
        textColor="text-grey-600"
      />
    </>
  );
};

export default Enterprise;
