import { StaticImageData } from "next/image";
import First from "../../../public/FAQ/First.webp";
import Second from "../../../public/FAQ/Second.webp";
import Third from "../../../public/FAQ/Third.webp";

export type AccordionItemType = {
  value: string;
  title: string;
  content: string;
  image: StaticImageData;
};

export const enterpriseFeaturesData: AccordionItemType[] = [
  {
    value: "item-1",
    title: "Data",
    content:
      "Price transparency data is your newest competitive advantage. We combine a wide range of data to give you the highest fidelity picture of costs across the healthcare landscape.",
    image: First,
  },
  {
    value: "item-2",
    title: "Contacting",
    content:
      "Managed-care contracts are not your average contracts. With our healthcare-specific contract management software, you'll finally be able to get information into the hands that need it most.",
    image: Second,
  },
  {
    value: "item-3",
    title: "Compliance",
    content:
      "Compliance is a never-ending effort. We'll generate your machine-readable files and create your patient estimate tool ensuring you stay compliant with every regulatory update.",
    image: Third,
  },
];
