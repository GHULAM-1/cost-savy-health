"use client";
import MobileMenu from "./mobile-menu";
import React, { useState } from "react";
import PromotionBar from "./landing-page/promotion-bar";
import NavLinks from "./nav-links";
import Hamburger from "./hamburger-icon";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignUpModal from "./landing-page/sign-up-modal";
export default function Navbar() {
  // STATES
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // HANDLERS
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const router = useRouter();
  const handleSelection = (option: "business" | "consumer") => {
    router.push(`/auth?type=${option}`);
    if (option) closeModal();
  };

  return (
    <div>
      <nav className="py-3 px-2 md:px-5  bg-[#6B1548] w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <img src="/logo.png" alt="" className="w-[80%]" />
            </Link>
          </div>

          <div className="hidden lg:flex  items-center gap-5 text-[16px]">
            <NavLinks />
            <div className="flex items-center justify-center text-white">|</div>

            <button
              onClick={openModal}
              className="text-white hover:text-[#F3E8EF] transition-colors font-medium cursor-pointer"
            >
              Sign Up
            </button>
            <a href="/auth">
              <button className="bg-[#A34E78] text-white hover:text-[#0A2533] px-5 py-1 rounded-full hover:bg-[#F3E8EF] transition-colors cursor-pointer">
                Platform Sign In
              </button>
            </a>
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

      {isModalOpen && (
        <SignUpModal onClose={closeModal} onSelection={handleSelection} />
      )}
    </div>
  );
}
