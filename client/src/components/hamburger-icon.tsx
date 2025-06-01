import React from "react";

interface HamburgerProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function Hamburger({ toggleMenu }: HamburgerProps) {
  return (
    <label onClick={toggleMenu}>
      <div className="w-12 h-12 cursor-pointer flex flex-col items-center lg:hidden justify-center">
        <div className="w-[50%] h-[3px] bg-white rounded-sm mb-[4px]"></div>{" "}
        <div className="w-[50%] h-[3px] bg-white rounded-md mb-[4px]"></div>{" "}
        <div className="w-[50%] h-[3px] bg-white rounded-md"></div>{" "}
      </div>
    </label>
  );
}
