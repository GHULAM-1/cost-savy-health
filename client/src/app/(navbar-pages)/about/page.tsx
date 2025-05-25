export const dynamic = 'force-dynamic'  
export const fetchCache = 'force-no-store'

import React from 'react'
import AboutHero from '@/components/about/about-hero'
import Vision from '@/components/about/vision'
import Transparency from '@/components/about/transparency'
import ServiceHighlight from '@/components/about/service-highlights'
import CollaborativePannel from '@/components/about/collaborative-pannel'
import Testimonial from '@/components/testimonial'
import LeadershipShowcase from '@/components/about/leadership-showcase'
import JoinTeam from '@/components/about/about-join-team'
import PeopleGrid from '@/components/about/people-grid'
import { getAboutPage } from '@/api/sanity/queries'

export default async function AboutPage() {
  const about = await getAboutPage()

  return (
    <div>
      <AboutHero {...about.hero} />
      <Vision {...about.vision} />
      <Transparency {...about.transparency} />
      <ServiceHighlight {...about.serviceHighlight} />
      <CollaborativePannel {...about.collaborativePanel} />
      <Testimonial
        image={about.testimonial.imageUrl}
        testimonial={about.testimonial.testimonial}
        reference={about.testimonial.reference}
      />
      <div className="bg-[#f8f7fa] border-b-2 pb-20">
        <LeadershipShowcase
          title={about.leadership.title}
          description={about.leadership.description}
          members={about.leadership.members}
        />
        <JoinTeam {...about.joinTeam} />
        <PeopleGrid data={about.advisors} heading="Advisors" />
        <PeopleGrid data={about.investors} heading="Investors" />
      </div>
    </div>
  )
}
