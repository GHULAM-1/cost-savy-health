import Image from "next/image";
import React from "react";

export default function Vision() {
  return (
    <div className="mx-auto">
      <div className="px-4 md:px-8 lg:px-16 py-[64px] md:py-[100px]">
        <p className="text-[48px] md:text-[64px] mb-[24px] tracking-tighter md:tracking-tight font-semibold max-w-[700px]">
          The way we see it, <br className="sm:block hidden" /> we're building
          the not-so-distant future.
        </p>
        <p className="text-[16px] max-w-[448px]">
          Misaligned incentives in healthcare have led to an inadequate consumer
          experience, lack of competition, outdated transaction rails, and
          dysfunctional payer-provider relationships.
        </p>
      </div>
      <div className="mx-auto">
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
