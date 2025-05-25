// components/about/vision.tsx
import Image from 'next/image'
import React from 'react'

export interface VisionProps {
  headline: string
  subtext: string
  imageUrl?: string
}

export default function Vision({ headline, subtext, imageUrl }: VisionProps) {
  return (
    <div className="mx-auto">
      <div className="px-4 md:px-8 lg:px-16 py-16 md:py-20 lg:py-28">
        <p className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] mb-6 md:mb-8 lg:mb-12 tracking-tight font-semibold max-w-[700px] leading-[1.2]">
          {headline.split('<br>').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < headline.split('<br>').length - 1 && (
                <br className="hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </p>
        <p className="text-[14px] sm:text-[16px] max-w-[448px] leading-[1.5]">
          {subtext}
        </p>
      </div>
      {imageUrl && (
        <div className="mx-auto w-full px-4 sm:px-8 md:px-12">
          <Image
            src={imageUrl}
            alt={headline.replace(/<br.*?>/g, ' ')}
            width={1740}
            height={100}
            priority
          />
        </div>
      )}
    </div>
  )
}
