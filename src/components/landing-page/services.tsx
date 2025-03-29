import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/landing-page/servicesData";

const Services = () => {
  return (
    <div>
      <h2 className="text-[#03363D] text-3xl font-bold mb-6 mt-8">
        Compare costs for common services.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl overflow-hidden hover:border-[#4CD7C6] transition-colors duration-300 flex justify-center flex-col"
          >
            <div className="px-6 py-8 border-b border-gray-200 flex-grow">
              <h3 className="text-[#03363D] text-xl font-bold">
                {service.name}
              </h3>
            </div>
            <Link
              href={service.link}
              className="flex items-center justify-between px-6 py-4 text-[#266e70] hover:underline duration-300"
            >
              <span className="font-bold">Compare Providers</span>
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-300"
                size={20}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
