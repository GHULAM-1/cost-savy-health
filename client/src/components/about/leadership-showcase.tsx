import React from 'react'
import TeamGrid, { TeamMemberType } from './team-members'

export interface LeadershipShowcaseProps {
  title: string
  description: string
  members: TeamMemberType[]
}

export default function LeadershipShowcase({
  title,
  description,
  members,
}: LeadershipShowcaseProps) {
  console.log(members)
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-lg">
          <h1 className="text-5xl  font-bold leading-[1.1] font-serif text-gray-900 mb-7">
            {title}
          </h1>
          <p className="text-md text-gray-600 max-w-md mb-16">
            {description}
          </p>
        </div>
        <TeamGrid members={members} />
      </div>
    </div>
  )
}
