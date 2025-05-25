import React from "react";
import Link from "next/link";

interface Solution {
  title: string;
  description: string;
  link: string;
  iconImage: string; 
}

interface EnterpriseSolutionsProps {
  solutions: Solution[];
}

const EnterpriseSolutions: React.FC<EnterpriseSolutionsProps> = ({ solutions }) => {
  console.log(solutions)
  return (
    <section className="px-12 py-16 md:py-2 mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {solutions.map((solution, index) => (
          <div key={index} className="group">
            <div className="bg-white p-5 rounded-sm border-2 border-gray-200 shadow-sm mb-4 inline-block">
              <img
                src={`${solution.iconImage}`}
                alt={solution.title}
                width={24}
                height={24}
              />
            </div>
            <h3 className="text-[#03363D] text-2xl font-semibold mb-1">
              {solution.title}
            </h3>
            <p className="text-[#03363D] mb-5 leading-relaxed">
              {solution.description}
            </p>
            <Link
              href={solution.link}
              className="inline-block text-[#03363D] font-medium border-b-1 border-[#03363D] hover:text-[#8C2F5D] hover:border-[#8C2F5D] transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnterpriseSolutions;
