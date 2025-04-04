import React from "react";
import Link from "next/link";
import { Wifi } from "lucide-react";

export default function BlogNav() {
  return (
    <div className="flex items-center justify-between px-4 sm:px-8 md:px-20 lg:px-40 text-sm text-[#3c5d62] font-light py-5 sticky top-0 bg-[#f6fbfc] z-10">
      <Link href="#">BACK TO TURQUOISE HEALTH</Link>
      <Link href="#">
        <Wifi className="w-5 h-5" />
      </Link>
    </div>
  );
}
