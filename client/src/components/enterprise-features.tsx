// components/about/enterprise-features.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type AccordionItemType = {
  value: string; // unique ID per item
  title: string;
  content: string;
  imageUrl: string;
};

interface EnterpriseFeaturesProps {
  accordionData: AccordionItemType[];
  defaultActiveItem?: string;
  className?: string;
}

const EnterpriseFeatures: React.FC<EnterpriseFeaturesProps> = ({
  className,
  accordionData,
  defaultActiveItem = accordionData[0]?.value || "",
}) => {
  const [activeItem, setActiveItem] = useState(defaultActiveItem);
  const activeFeature = accordionData.find((f) => f.value === activeItem);

  return (
    <section className="px-2 md:px-12 py-4 mb-18">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {activeFeature && (
          <Image
            src={activeFeature.imageUrl}
            alt={activeFeature.title}
            className="rounded-2xl w-full object-cover"
            width={600}
            height={400}
          />
        )}
        <Accordion
          type="single"
          collapsible
          value={activeItem}
          onValueChange={(v) => setActiveItem(v as string)}
          className="w-full px-3"
        >
          {accordionData.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger
                className={cn(
                  "text-black",
                  "text-xl text-left font-semibold hover:no-underline py-6 sm:py-7",
                  className
                )}
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent
                className={cn("text-base sm:text-lg text-black", className)}
              >
                <div>{item.content}</div>
                <Link
                  href="#"
                  className={cn(
                    "inline-block mt-4 text-black font-medium underline hover:underline",
                    className
                  )}
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
