import React from "react";
import quotation from "../../../public/Testimonial/Quotation.webp";
import Image from "next/image";
const Testimonial = () => {
  return (
    <section className="bg-[#03363D] text-white py-28 max-w-[1800px] mx-auto px-12 mb-8">
      <Image src={quotation} alt="Quotation mark" className="mb-3" />
      <p className="text-3xl md:text-4xl font-bold leading-tight mb-8">
        I recently got a few confusing bills from a hospital, and the tool gave
        me confidence that I wasn't being overcharged for certain procedures.
      </p>
    </section>
  );
};

export default Testimonial;
