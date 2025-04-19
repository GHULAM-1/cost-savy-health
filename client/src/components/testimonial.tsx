import React from "react";
import Image, { StaticImageData } from "next/image";

interface TestimonialProps {
  image: StaticImageData | string;
  testimonial: string;
  reference?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  image,
  testimonial,
  reference,
}) => {
  return (
    <section className="bg-[#035153] text-white py-28 px-12 mb-8">
      <Image src={image} alt="Quotation mark" className="mb-3" />
      <p className="text-2xl md:text-4xl font-bold leading-tight mb-8">
        {testimonial}
      </p>
      {reference && (
        <p className="text-md md:text-lg italic opacity-75">{reference}</p>
      )}
    </section>
  );
};

export default Testimonial;
