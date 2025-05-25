// components/about/collaborative-panel.tsx
import Link from 'next/link'
import React from 'react'
import PanelFeatures from './pannel-features'
import { PanelFeatureType } from './pannel-features'
export interface CollaborativePanelProps {
  heading: string
  subtext: string
  ctaText: string
  ctaLink: string
  features: PanelFeatureType[]
}

export default function CollaborativePanel({
  heading,
  subtext,
  ctaText,
  ctaLink,
  features,
}: CollaborativePanelProps) {
  return (
    <section className="px-2 sm:px-12 pt-10 pb-10">
      <div className="px-6 sm:px-12 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-left max-w-xl self-start">
            <h2 className="text-black lg:text-[48px] text-4xl font-bold leading-[1.1] mb-4">
              {heading.split('<br>').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < heading.split('<br>').length - 1 && (
                    <br className="hidden lg:block" />
                  )}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-md text-[#03363D] leading-relaxed mb-2">
              {subtext}
            </p>
          </div>

          <Link href={ctaLink} passHref>
            <p className="inline-block bg-[#A34E78] self-start lg:self-end rounded-full text-white px-7 py-3 hover:text-white transition-colors duration-300 text-md font-medium">
              {ctaText}
            </p>
          </Link>
        </div>
      </div>
      <PanelFeatures features={features} />
    </section>
  )
}
