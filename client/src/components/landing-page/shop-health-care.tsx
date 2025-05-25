import React from "react";
import Services from "./services";
import Image from "next/image";

interface ShopHealthcareProps {
  heading: string;
  description: string;
  iconImage: string;
  services: {
    sectionTitle: string;
    items: {
      name: string;
      link: string;
    }[];
  };
}

const ShopHealthcare: React.FC<ShopHealthcareProps> = ({
  heading,
  description,
  iconImage,
  services,
}) => {
  return (
    <section className="px-6 sm:px-12 py-16 sm:py-20 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-20 lg:gap-32 xl:gap-96">
        <div className="md:text-left flex flex-col">
          <h2 className="text-[#403B3D] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            {heading}
          </h2>
          <p className="text-lg sm:text-xl text-[#403B3D] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="relative flex justify-start md:justify-start">
          <div className="w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px]">
            <div className="absolute top-0 left-0 flex">
              <Image
                src={iconImage}
                alt="Healthcare Icon"
                width={250}
                height={250}
              />
            </div>
          </div>
        </div>
      </div>

      <Services sectionTitle={services.sectionTitle} items={services.items} />
    </section>
  );
};

export default ShopHealthcare;
