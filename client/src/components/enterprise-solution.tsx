import React from "react";
import { enterpriseSolutionsData } from "@/data/landing-page/enterprise-solutions-data";

const EnterpriseSolutions = () => {
  return (
    <section className=" px-12 py-16 md:py-2 mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {enterpriseSolutionsData.map((solution, index) => (
          <div key={index} className="group">
            <div className="bg-white p-5 rounded-sm border-2 border-gray-200 shadow-sm mb-4 inline-block">
              {solution.icon}
            </div>
            <h3 className="text-[#03363D] text-2xl font-semibold mb-1">
              {solution.title}
            </h3>
            <p className="text-[#03363D] mb-5 leading-relaxed">
              {solution.description}
            </p>
            <a
              href={solution.link}
              className="inline-block text-[#03363D] font-medium border-b-1 border-[#03363D] hover:text-[#1D5E5A] hover:border-[#1D5E5A] transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnterpriseSolutions;