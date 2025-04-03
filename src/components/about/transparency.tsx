import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import transparencyData from "@/data/about/transparency-data";
import Image from "next/image";
import roleImage from "../../../public/about/about-us-role.webp";

export default function Transparency() {
  const ValueItem = ({ type, text }: { type: "do" | "dont"; text: string }) => (
    <div className="flex items-start w-full md:w-[45%] gap-3 mb-5">
      {type === "do" ? (
        <CheckCircle
          size={16}
          className="text-emerald-500 mt-[6px] flex-shrink-0"
        />
      ) : (
        <XCircle size={16} className="text-red-500 mt-[6px] flex-shrink-0" />
      )}
      <p className="text-[15px] sm:text-[14px]">{text}</p>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-center py-[64px] md:py-[40px] px-4 sm:px-6">
        <div className="flex gap-[24px] mb-[24px] flex-col max-w-[700px] text-center">
          <p className="text-4xl md:text-5xl tracking-tight font-bold text-left md:text-center">
            We don't pick sides.
          </p>
          <p className="text-lg sm:text-xl text-left md:text-center">
            Instead, we reach across the aisle to connect stakeholders in the
            healthcare industry toward a better, more transparent future.
          </p>
        </div>

        <div className="w-full max-w-[700px]">
          <div className="flex flex-row gap-12 flex-wrap gap-y-4 justify-start">
            {transparencyData.map((item) => (
              <ValueItem key={item.id} type={item.type} text={item.text} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-t from-[#a9e5e3] to-white pb-36 px-4 sm:px-6">
        <Image
          src={roleImage}
          alt="Image defining roles"
          className="mx-auto w-full sm:w-[80%] md:w-[60%]"
        />
        <figcaption className="mt-8  md:text-center md:px-56 lg:px-80 sm:px-6 text-[15px] text-center">
          We fill a unique role in the healthcare ecosystem by positioning
          ourselves as the neutral meeting place between stakeholders helping
          them facilitate transparent relationships.
        </figcaption>
      </div>
    </>
  );
}
