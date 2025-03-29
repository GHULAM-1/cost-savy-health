import React from "react";
import { PlusSquare, ShieldPlus, Building2, Asterisk } from "lucide-react";

const EnterpriseSolutions = () => {
  const solutions = [
    {
      icon: <PlusSquare className="text-[#03363D]" size={24} color="#1D5E5A" />,
      title: "For providers.",
      description:
        "Harness price transparency as a competitive edge without staffing up or spreading thin.",
      link: "#",
    },
    {
      icon: (
        <ShieldPlus className=" text-[#03363D]" size={24} color="#1D5E5A" />
      ),
      title: "For payers.",
      description:
        "Stay ahead of legislation and requirements while driving value-based care decisions.",
      link: "#",
    },
    {
      icon: <Building2 className=" text-[#03363D]" size={24} color="#1D5E5A" />,
      title: "For employers.",
      description:
        "Empower yourself to shop smart for healthcare plans with our transparency-enabled products.",
      link: "#",
    },
    {
      icon: <Asterisk className=" text-[#03363D]" size={24} color="#1D5E5A" />,
      title: "For life sciences.",
      description:
        "Overhaul your commercial strategy with data perfect for the busiest CEO or the most meticulous data scientist.",
      link: "#",
    },
  ];

  return (
    <section className="max-w-[1800px] mx-auto px-12 py-16 md:py-2 mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {solutions.map((solution, index) => (
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
              className="inline-block text-[#03363D] font-medium border-b-1 border-[#03363D]  hover:text-[#1D5E5A] hover:border-[#1D5E5A] transition-colors duration-300"
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
