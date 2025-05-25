export const dynamic = 'force-dynamic'  
export const fetchCache = 'force-no-store'

import React from 'react'
import { getHomePage } from '@/api/sanity/queries'
import Hero from '@/components/landing-page/hero'
import FeatureCards from '@/components/features-card'
import ShopHealthcare from '@/components/landing-page/shop-health-care'
import PriceTransparency from '@/components/landing-page/price-transparency'
import Testimonial from '@/components/testimonial'
import Enterprise from '@/components/landing-page/enterprise'
import EnterpriseSolutions from '@/components/enterprise-solution'
import JoinTeam from '@/components/landing-page/join-team'

export default async function HomePage() {
  const homeData = await getHomePage()
  console.log(homeData)
  return (
    <>
      <Hero {...homeData.hero} />
      <FeatureCards cards={homeData.featureCards.cards} />
      <ShopHealthcare {...homeData.shopHealthcare} />
      <PriceTransparency {...homeData.priceTransparency} />
      <Testimonial
        testimonial={homeData.testimonial.testimonial}
        image={homeData.testimonial.image}
      />
      <Enterprise {...homeData.enterprise} />
      <EnterpriseSolutions solutions={homeData.enterpriseSolutions.solutions} />
      <JoinTeam {...homeData.joinTeam} />
    </>
  )
}
