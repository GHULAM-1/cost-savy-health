"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqData, FAQItem } from "@/data/procedure/procedure-faqs";
import Icon from "../svg-icon";

export function ProviderFaqs() {
  return (
    <div className="w-full max-w-[1600px] p-2 border-b-2 py-8 pb-20">
      <img src="/cloud.jpg" alt="" className="w-36 h-36" />
      <h2 className="text-4xl font-bold  text-[#03363D] mt-10 mb-10">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((faq: FAQItem) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border-none shadow-sm rounded-2xl bg-gray-50 py-1"
          >
            <AccordionTrigger className="text-lg p-4 hover:no-underline rounded-t-2xl cursor-pointer">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="cursor-pointer">
              <p className="text-[16px] text-gray-600 px-4 py-2">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
