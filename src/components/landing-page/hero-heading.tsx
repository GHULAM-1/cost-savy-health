"use client";
import React, { useState, useEffect } from "react";

export default function HeroHeading() {
  const rotatingWords = ["CT scans", "MRIs", "ultrasounds", "tonsil removal"];

  // State to track the current word index
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Set an interval to rotate words every 2 seconds
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === rotatingWords.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  return (
    <h1 className="text-[#03363D] text-3xl md:text-5xl leading-15 lg:text-6xl font-bold md:leading-20 font-serif md:mb-4">
      Know what you'll pay <span className="md:hidden">for</span>
      <br />
      <span className="flex items-center space-x-4">
        <span className="text-[#03363D] hidden sm:flex">for</span>
        <span
          key={rotatingWords[index]}
          className="text-[#15706f] animate-slideUp"
        >
          {rotatingWords[index]}
        </span>
      </span>
    </h1>
  );
}
