import React from "react";
import Image from "next/image";

interface Advisor {
  name: string;
  title: string;
  imageUrl: string;
  linkedin: string;
}

interface Props {
  data: Advisor[];
  heading: string;
}

const PeopleGrid: React.FC<Props> = ({ data, heading }) => {
  console.log(data)
  return (
    <div className="py-12 sm:px-6 lg:px-6 px-2 ">
      <h2 className="text-2xl font-extrabold text-gray-800 mx-auto mb-8 lg:text-left mt-6 lg:ml-12 text-center">
        {heading}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto ">
        {data.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col items-start bg-white shadow-md rounded-lg p-6 border 
            border-transparent transition-all duration-300 ease-in-out hover:border-[#8C2F5D] hover:shadow-2xl"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={64}
              height={64}
              className="rounded-full mb-4 self-start"
            />
            <h3 className="text-lg font-semibold text-gray-800 text-left">
              {item.name}
            </h3>
            <p className="text-gray-600 text-left">{item.title}</p>
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-gray-800 transition-colors group-hover:text-[#8C2F5D]"
            >
              LinkedIn Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleGrid;
