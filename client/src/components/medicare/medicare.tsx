import React from "react";
import MediHero from "./medi-hero";
import FeaturesGrid from "./medicards";
import { medicare } from "@/api/sanity/queries";

export default async function MediCare() {
  const medicareDoc = await medicare();
  const data = medicareDoc[0];

  const featureItems = [
    {
      image: "/old.jpg",
      heading: "Medicare Advantage",
      description:
        "Medicare Advantage plans combine hospital, medical, and prescription drug coverage into one convenient plan. With added benefits like vision, dental, and fitness programs, they offer comprehensive care tailored to your needs.",
    },
    {
      image: "/old.jpg",
      heading: "Medicaid Plans",
      description:
        "Explore income-based Medicaid options that provide essential healthcare services at low or no cost, ensuring coverage for eligible individuals and families.",
    },
    // add more items as needed
  ];
  return (
    <>
      <MediHero medicareItems={data} /> 
      <FeaturesGrid items={data} />
    </>
  );
}
