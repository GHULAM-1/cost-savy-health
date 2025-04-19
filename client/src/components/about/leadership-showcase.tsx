import React from "react";
import TeamMembers from "./team-members";
import { teamMembers } from "@/data/about/team-members";
export default function LeadershipShowcase() {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold leading-[1.1] font-serif text-gray-900 mb-7">
            Meet the leadership team.
          </h1>
          <p className="text-md text-gray-600 max-w-md mb-16">
            We've combined the best of healthcare leaders and enterprise SaaS
            experts to lead us towards reducing financial complexity.
          </p>
        </div>
        <TeamMembers members={teamMembers} />
      </div>
    </div>
  );
}
