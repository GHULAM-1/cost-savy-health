// components/about/service-highlight.tsx
import Link from "next/link";
import React from "react";
import EnterpriseFeatures, { AccordionItemType } from "../enterprise-features";

export interface ServiceHighlightProps {
  heading: string;
  ctaText?: string;
  ctaLink: string;
  features: AccordionItemType[];
}

export default function ServiceHighlight({
  heading,
  ctaText = "Learn More",
  ctaLink,
  features,
}: ServiceHighlightProps) {
<<<<<<< HEAD
  const [firstWord, ...restWords] = (ctaText ?? "").split(" ");
=======
  const [firstWord, ...restWords] = (ctaText || "Learn More").split(" ");
>>>>>>> 476f20623a02c13685dbc31331904640ba376ebf
  const rest = restWords.join(" ");
  return (
    <section className="bg-[#8C2F5D] px-2 sm:px-12 pt-20 pb-10">
      <div className="px-6 sm:px-12 lg:pt-20 pb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-left self-start">
            <h2 className="text-white lg:text-[48px] md:text-5xl text-3xl font-bold leading-[1.1] mb-4">
              {heading}
            </h2>
          </div>
<<<<<<< HEAD
          {ctaText && (
          <Link
            href={ctaLink}
            className="inline-block bg-[#A34E78] self-start lg:self-end rounded-full text-white px-7 py-3 hover:bg-[#F3E8EF] hover:text-black transition-colors duration-300 text-md font-medium"
            >
              <div className="flex items-center justify-center gap-1">
                <p>{firstWord} </p>
                <p>{rest}</p>
              </div>
            </Link>
          )}
=======
          {ctaLink && (
  <Link
    href={ctaLink}
    className="inline-block bg-[#A34E78] self-start lg:self-end rounded-full text-white px-7 py-3 hover:bg-[#F3E8EF] hover:text-black transition-colors duration-300 text-md font-medium"
  >
    {ctaText}
  </Link>
)}
>>>>>>> 476f20623a02c13685dbc31331904640ba376ebf
        </div>
      </div>
      <EnterpriseFeatures accordionData={features} className="text-white" />
    </section>
  );
}
