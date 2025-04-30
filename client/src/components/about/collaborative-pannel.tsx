import Link from "next/link";
import React from "react";
import PannelFeatures from "./pannel-features";

const CollaborativePannel = () => {
  return (
    <section className=" px-2 sm:px-12 pt-10 pb-10">
      <div className="px-6 sm:px-12 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-left max-w-xl self-start">
            <h2 className="text-black lg:text-[48px] text-4xl  font-bold leading-[1.1] mb-4 ">
              We want to work with innovative <br />
              organizations.
            </h2>
            <p className="text-md text-[#03363D] leading-relaxed mb-2">
              Together we can guarantee a new future of healthcare.
            </p>
          </div>

          <Link
            href="#"
            className="inline-block bg-[#A34E78] self-start lg:self-end rounded-full text-white px-7 py-3  hover:text-white transition-colors duration-300 text-md font-medium"
          >
            <div className="flex items-center justify-center gap-1">
              <p>View </p>
              <p>Partners</p>
            </div>
          </Link>
        </div>
      </div>
      <PannelFeatures />
    </section>
  );
};

export default CollaborativePannel;
