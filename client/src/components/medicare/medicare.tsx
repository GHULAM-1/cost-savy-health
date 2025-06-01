import React from "react";
import MediHero from "./medi-hero";
import FeaturesGrid from "./medicards";
import { medicare } from "@/api/sanity/queries";

export default async function MediCare() {
  const medicareDoc = await medicare();
  const data = medicareDoc[0];

  
  return (
    <>
      <MediHero medicareItems={data} /> 
      <FeaturesGrid items={data} />
    </>
  );
}
