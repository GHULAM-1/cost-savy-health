import Link from "next/link";
import React from "react";
import Image from "next/image";
import EnterpriseFeatures from "../enterprise-features";

interface EnterpriseFeature {
  value: string;
  title: string;
  content: string;
  image: string;
}

interface EnterpriseProps {
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  iconImage: string;
  features: EnterpriseFeature[];
}

const Enterprise: React.FC<EnterpriseProps> = ({
  heading,
  description,
  ctaText,
  ctaLink,
  iconImage,
  features,
}) => {
  
  return (
    <>
      <section className="px-6 sm:px-12 pt-20 pb-10">
        <Image
          src={iconImage}
          alt="Enterprise Icon"
          width={200}
          height={200}
        />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-left self-start">
            <h2 className="text-[#403B3D] text-4xl md:text-5xl font-serif font-bold leading-[1.1] mb-4">
              {heading}
            </h2>
            <p className="text-lg text-[#403B3D] leading-relaxed mb-2">
              {description}
            </p>
          </div>

          <Link
            href={ctaLink}
            className="inline-block bg-[#8C2F5D] self-start lg:self-end rounded-full text-white px-7 py-3 hover:bg-[#A34E78] transition-colors duration-300 text-md font-medium"
          >
            <div className="flex items-center justify-center gap-1">
              {ctaText.split(" ").map((word, i) => (
                <p key={i}>{word}</p>
              ))}
            </div>
          </Link>
        </div>
      </section>

      <EnterpriseFeatures
        accordionData={features.map((f) => ({
          value: f.value,
          title: f.title,
          content: f.content,
          imageUrl: f.image,
        }))}
      />
    </>
  );
};

export default Enterprise;
