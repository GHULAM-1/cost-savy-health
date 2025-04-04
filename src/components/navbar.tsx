"use client";
import React, { useState } from "react";
import PromotionBar from "./landing-page/promotion-bar";
import NavLinks from "./nav-links";
import Hamburger from "./hamburger-icon";
import MobileMenu from "./mobile-menu";
import { X } from "lucide-react";
import Link from "next/link";
export default function Navbar() {
  // STATES
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // HANDLERS
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="py-3 px-2 md:px-5  bg-[#03363d] w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <div className="text-[#4CD7C6] text-2xl font-bold flex items-center justify-center gap-1">
                <span className="text-5xl">+</span>
                <span className="text-white">Turquoise Health</span>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-5 text-[16px]">
            <NavLinks />
            <div className="flex items-center justify-center text-white">|</div>
            <button className="text-white hover:text-[#4CD7C6] transition-colors font-medium">
              Sign Up
            </button>
            <button className="bg-[#a9e6e1] text-[#0A2533] px-5 py-1 rounded-full hover:bg-teal-100 transition-colors cursor-pointer">
              Platform Sign In
            </button>
          </div>

          <div className="lg:hidden">
            {isMenuOpen ? (
              <button onClick={toggleMenu} className="text-white">
                <X size={30} />
              </button>
            ) : (
              <Hamburger isOpen={isMenuOpen} toggleMenu={toggleMenu} />
            )}
          </div>
        </div>
      </nav>

      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* <PromotionBar /> */}
    </div>
  );
}
