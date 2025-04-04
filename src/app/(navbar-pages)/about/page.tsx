import AboutHero from "@/components/about/about-hero";
import Transparency from "@/components/about/transparency";
import Vision from "@/components/about/vision";
import React from "react";
import ServiceHighlight from "@/components/about/service-highlights";
import CollaborativePannel from "@/components/about/collaborative-pannel";
import quotation from "../../../public/Testimonial/Quotation.webp";
import Testimonial from "@/components/testimonial";
import LeadershipShowcase from "@/components/about/leadership-showcase";
import { JoinTeam } from "@/components/about/about-join-team";
import PeopleGrid from "@/components/about/people-grid";
import advisors from "@/data/about/advisors";
import investors from "@/data/about/investors";
export default function About() {
  return (
    <div>
      <AboutHero />
      <Vision />
      <Transparency />
      <ServiceHighlight />
      <CollaborativePannel />
      <Testimonial
        image={quotation}
        testimonial="Turquoise Health allowed us to unlock access to the data we needed to help better understand market dynamics as we prepare for an important commercial launch."
        reference="—VP, Payer Relations at a Healthcare Technology Company"
      />
      <div className="bg-[#f8f7fa] border-b-2 pb-20">
        <LeadershipShowcase />
        <JoinTeam />
        <PeopleGrid data={advisors} heading="Advisors" />
        <PeopleGrid data={investors} heading="Investors" />
      </div>
    </div>
  );
}
