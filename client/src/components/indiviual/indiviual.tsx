import React from "react";
import IndiviualHero from "./indiviual-hero";
import FeaturesGrid from "./indiviualcards";
import { indiviual, medicare } from "@/api/sanity/queries";

export default async function Indiviual() {
  const indiviualDoc = await indiviual();
  const data = indiviualDoc[0];

  
  return (
    <>
      <IndiviualHero medicareItems={data} /> 
      <FeaturesGrid items={data} />
    </>
  );
}
