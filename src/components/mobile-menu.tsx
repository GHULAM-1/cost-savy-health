import React from "react";
import NavLinks from "./nav-links";
import { X } from "lucide-react";

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function MobileMenu({
  isMenuOpen,
  toggleMenu,
}: MobileMenuProps) {
  return (
    <div
      className={`fixed inset-0 bg-[#03363d] z-50 transition-transform ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={toggleMenu}
        className="absolute top-6 right-6 text-white"
      >
        <X size={30} />
      </button>
      <div className="flex flex-col items-center justify-center h-full text-white space-y-6">
        <NavLinks />
        <button className="text-white hover:text-[#4CD7C6] transition-colors font-medium">
          Sign Up
        </button>
        <button className="bg-[#a9e6e1] text-[#0A2533] px-5 py-2 rounded-full hover:bg-teal-100 transition-colors cursor-pointer">
          Platform Sign In
        </button>
      </div>
    </div>
  );
}
