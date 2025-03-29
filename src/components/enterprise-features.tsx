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
import First from "../../public/FAQ/First.webp";
import Second from "../../public/FAQ/Second.webp";
import Third from "../../public/FAQ/Third.webp";

const EnterpriseFeatures = () => {
  const accordionTrigger =
    "text-xl text-left font-semibold text-gray-700 hover:no-underline py-6 sm:py-7";
  const accordionContent = "text-base sm:text-lg text-gray-600";

  const accordionData = [
    {
      value: "item-1",
      title: "Data",
      content:
        "Price transparency data is your newest competitive advantage. We combine a wide range of data to give you the highest fidelity picture of costs across the healthcare landscape.",
    },
    {
      value: "item-2",
      title: "Contacting",
      content:
        "Managed-care contracts are not your average contracts. With our healthcare-specific contract management software, you'll finally be able to get information into the hands that need it most.",
    },
    {
      value: "item-3",
      title: "Compliance",
      content:
        "Compliance is a never-ending effort. We'll generate your machine-readable files and create your patient estimate tool ensuring you stay compliant with every regulatory update.",
    },
  ];

  // Controlled state for the active Accordion item.
  const [activeItem, setActiveItem] = useState("item-1");

  // Determine which image to show based on activeItem.
  const getActiveImage = () => {
    switch (activeItem) {
      case "item-1":
        return First;
      case "item-2":
        return Second;
      case "item-3":
        return Third;
      default:
        return First;
    }
  };

  return (
    <section className="max-w-[1800px] mx-auto px-6 md:px-12 py-4 mb-18">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <Image
          src={getActiveImage()}
          alt="Feature illustration"
          className="rounded-2xl w-full object-cover"
        />
        <Accordion
          type="single"
          collapsible
          value={activeItem}
          onValueChange={(val) => setActiveItem(val as string)}
          className="w-full px-4 text-[#03363D]"
        >
          {accordionData.map((item) => (
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
