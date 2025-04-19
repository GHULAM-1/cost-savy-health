"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type AccordionItemType = {
  value: string;
  title: string;
  content: string;
  image: StaticImageData;
};

interface EnterpriseFeaturesProps {
  accordionData: AccordionItemType[];
  defaultActiveItem?: string;
  textColor?: string;
}

const EnterpriseFeatures: React.FC<EnterpriseFeaturesProps> = ({
  accordionData,
  defaultActiveItem = "item-1",
  textColor = "text-gray-700",
}) => {
  // STATE
  const [activeItem, setActiveItem] = useState<string>(defaultActiveItem);

  const activeFeature =
    accordionData.find((item) => item.value === activeItem) || accordionData[0];

  return (
    <section className="px-2 md:px-12 py-4 mb-18">
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
          className="w-full px-3"
        >
          {accordionData.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger
                className={`text-xl text-left font-semibold hover:no-underline py-6 sm:py-7 ${textColor}`}
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent className={`text-base sm:text-lg ${textColor}`}>
                <div>{item.content}</div>
                <Link
                  href="#"
                  className={`inline-block mt-4 ${textColor} font-medium underline hover:underline`}
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
