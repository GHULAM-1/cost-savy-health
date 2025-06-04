import React, { useEffect, useState } from "react";

interface StickySummaryBarProps {
  price: number | string;
  onContact: () => void;
}

export default function StickySummaryBar({
  price,
  onContact,
}: StickySummaryBarProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide when main navbar is visible
  useEffect(() => {
    const navbar = document.getElementById("main-navbar");
    if (!navbar) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(false);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(navbar);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 max-w-[1600px] w-full z-50 bg-white shadow transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
      style={{ pointerEvents: show ? 'auto' : 'none' }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-8 py-4">
        <span className="text-2xl font-bold text-[#6B1548]">
          ${price}{" "}
          <span className="text-base font-normal text-gray-500">
            without insurance
          </span>
        </span>
        <button
          className="bg-[#6B1548] text-white px-8 py-2 rounded-full font-semibold text-lg"
          onClick={onContact}
        >
          Contact Provider
        </button>
      </div>
    </div>
  );
}
