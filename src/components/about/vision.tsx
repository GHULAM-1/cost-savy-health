import Image from "next/image";
import React from "react";

export default function Vision() {
  return (
    <div className="mx-auto">
      <div className="px-4 md:px-8 lg:px-16 py-16 md:py-20 lg:py-28">
        <p className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] mb-6 md:mb-8 lg:mb-12 tracking-tight font-semibold max-w-[700px] leading-[1.2]">
          The way we see it, <br className="hidden sm:block" /> we're building
          the not-so-distant future.
        </p>
        <p className="text-[14px] sm:text-[16px] max-w-[448px] leading-[1.5]">
          Misaligned incentives in healthcare have led to an inadequate consumer
          experience, lack of competition, outdated transaction rails, and
          dysfunctional payer-provider relationships.
        </p>
      </div>
      <div className="mx-auto w-full px-4 sm:px-8 md:px-12">
        <Image
          src="/about/about-us-culture.png"
          alt="culture"
          width={1740}
          height={100}
          priority
        />
      </div>
    </div>
  );
}
