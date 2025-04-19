import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  defaultImage: string;
  hoverImage: string;
  linkedIn: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

const TeamGrid: React.FC<TeamGridProps> = ({ members }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member) => (
        <div
          key={member.name}
          className="group bg-white shadow-md rounded-lg overflow-hidden border border-transparent ease-in-out transition-all duration-300 hover:border-[#1B4B43] hover:shadow-xl"
        >
          <div className="relative overflow-hidden rounded-t-lg w-full h-[393px]">
            <Image
              src={member.defaultImage}
              alt={member.name}
              fill
              className=" group-hover:opacity-0 duration-0 "
            />
            <Image
              src={member.hoverImage}
              alt={`${member.name} hover`}
              fill
              className="absolute top-0 left-0  opacity-0  duration-0 group-hover:opacity-100 "
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#1B4B43] transition-colors">
              {member.name}
            </h3>
            <p className="text-gray-600 mb-4">{member.role}</p>
            <a
              href={member.linkedIn}
              className="text-gray-800 transition-colors group-hover:text-[#098481] underline text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamGrid;
