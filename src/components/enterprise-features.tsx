"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  enterpriseFeaturesData,
  AccordionItemType,
} from "@/data/landing-page/enterprise-features-data";

const EnterpriseFeatures = () => {
  const accordionTrigger =
    "text-xl text-left font-semibold text-gray-700 hover:no-underline py-6 sm:py-7";
  const accordionContent = "text-base sm:text-lg text-gray-600";
  // STATE
  const [activeItem, setActiveItem] = useState<string>("item-1");

  const activeFeature =
    enterpriseFeaturesData.find((item) => item.value === activeItem) ||
    enterpriseFeaturesData[0];

  return (
    <section className="max-w-[1800px] mx-auto px-6 md:px-12 py-4 mb-18">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <Image
          src={activeFeature.image}
          alt={activeFeature.title}
          className="rounded-2xl w-full object-cover"
        />
        <Accordion
          type="single"
          collapsible
          value={activeItem}
          onValueChange={(val) => setActiveItem(val as string)}
          className="w-full px-4 text-[#03363D]"
        >
          {enterpriseFeaturesData.map((item: AccordionItemType) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className={accordionTrigger}>
                {item.title}
              </AccordionTrigger>
              <AccordionContent className={accordionContent}>
                <div>{item.content}</div>
                <Link
                  href="#"
                  className="inline-block mt-4 text-[#1D5E5A] font-medium underline hover:underline"
                >
                  Learn more
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default EnterpriseFeatures;
