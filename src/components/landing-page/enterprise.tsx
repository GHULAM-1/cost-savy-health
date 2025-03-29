import Link from "next/link";
import React from "react";
import EnterpriseFeatures from "../enterprise-features";
const Enterprise = () => {
  return (
    <>
      <section className="max-w-[1800px] mx-auto px-6 sm:px-12 pt-20 pb-10">
        <svg
          width="200"
          height="200"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M40 160h160v20H40z" fill="#4CD7C6" />
          <rect x="60" y="100" width="60" height="60" fill="#4CD7C6" />
          <rect
            x="80"
            y="60"
            width="40"
            height="40"
            fill="#4CD7C6"
            fillOpacity="0.8"
          />
          <rect
            x="130"
            y="80"
            width="50"
            height="80"
            fill="#4CD7C6"
            fillOpacity="0.6"
          />
          <circle cx="50" cy="140" r="15" fill="#E6B19F" />
          <circle cx="190" cy="140" r="15" fill="#E6B19F" />
          <circle cx="160" cy="60" r="15" fill="#E6B19F" />
        </svg>

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
            className=" inline-block bg-[#1D5E5A] self-start lg:self-end rounded-full text-white px-7 py-3  hover:bg-[#044955] transition-colors duration-300 text-md font-medium"
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
