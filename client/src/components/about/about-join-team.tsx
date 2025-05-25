// components/about/join-team.tsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface JoinTeamProps {
  heading: string
  description: string
  imageUrl?: string
  ctaText: string
  ctaLink: string
}

export default function JoinTeam({
  heading,
  description,
  imageUrl,
  ctaText,
  ctaLink,
}: JoinTeamProps) {
  return (
    <div className="lg:px-0 px-4">
      <div className="bg-[#8C2F5D] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 flex-grow self-start md:self-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={heading}
                width={136}
                height={136}
                className="text-[#1B4B43] self-start md:self-center"
                priority
              />
            )}
            <div>
              <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-4 text-start md:text-center lg:text-left">
                {heading}
              </h2>
              <p className="text-[#9DB5B0] text-base sm:text-lg max-w-md text-left md:text-center lg:text-left">
                {description}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-auto flex lg:flex lg:items-center lg:justify-end self-center">
            <Link href={ctaLink} passHref>
              <p className="inline-block bg-[#A34E78] text-white px-6 py-3 rounded-full font-medium hover:bg-[#A34E78] transition-colors text-center w-full lg:w-auto">
                {ctaText}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}