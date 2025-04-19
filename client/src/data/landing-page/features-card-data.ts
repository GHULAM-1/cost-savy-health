import { StaticImageData } from "next/image";
import compare from "../../../public/Features/compare.png";
import cost from "../../../public/Features/cost.png";
import search from "../../../public/Features/search.png";

export interface FeatureCard {
  image: StaticImageData;
  title: string;
  points: string[];
}

export const featureCardsData: FeatureCard[] = [
  {
    image: search,
    title: "Search for care.",
    points: [
      "Search for the care you need.",
      "Add your insurance plan.",
      "Find providers near you.",
    ],
  },
  {
    image: compare,
    title: "Compare what matters.",
    points: [
      "View and compare prices.",
      "Set location & quality preferences.",
      "Understand the price breakdown.",
    ],
  },
  {
    image: cost,
    title: "Estimate your cost.",
    points: [
      "Add your insurance benefits information.",
      "Estimate your out-of-pocket cost.",
      "Contact the provider to verify.",
    ],
  },
];
