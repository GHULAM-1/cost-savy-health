import Link from "next/link";
import React from "react";
import EnterpriseFeatures from "../enterprise-features";
import FeatureIcon from "../svg-icon";
const Enterprise = () => {
  return (
    <>
      <section className="max-w-[1800px] mx-auto px-6 sm:px-12 pt-20 pb-10">
        <FeatureIcon
          name={"enterprise"}
          alt={"Balancing weights"}
          width={200}
          height={200}
        />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-left max-w-xl self-start">
            <h2 className="text-[#03363D] text-4xl md:text-5xl font-serif font-bold leading-[1.1] mb-4">
              Turquoise for <br /> enterprise.
            </h2>
            <p className="text-lg text-[#03363D] leading-relaxed mb-2">
              We're proud to be working with some of the industry's newest,
              oldest, and boldest. See how Turquoise can benefit your
              organization.
            </p>
          </div>

          <Link
            href="#"
            className="inline-block bg-[#1D5E5A] self-start lg:self-end rounded-full text-white px-7 py-3 hover:bg-[#044955] transition-colors duration-300 text-md font-medium"
          >
            <div className="flex items-center justify-center gap-1">
              <p>Turquoise</p>
              <p>Platform</p>
            </div>
          </Link>
        </div>
      </section>
      <EnterpriseFeatures />
    </>
  );
};

export default Enterprise;
