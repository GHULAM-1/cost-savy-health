import React from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedIn: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

const TeamGrid: React.FC<TeamGridProps> = ({ members }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member) => (
        <div key={member.name} className="bg-white rounded-lg overflow-hidden">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-gray-600 mb-4">{member.role}</p>
            <a
              href={member.linkedIn}
              className="text-gray-500 hover:text-gray-700 underline text-sm"
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
