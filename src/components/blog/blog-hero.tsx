import React from "react";
import { Plus } from "lucide-react";

import BlogNav from "./blog-nav";
export default function BlogHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center">
          <div className="text-[#4CD7C6] text-2xl font-bold flex items-center justify-center ">
            <Plus size={64} strokeWidth={4} />
            <span className="text-[#03363d] text-5xl">Turquoise Health</span>
          </div>

          <h1 className="text-[25px] font-bold text-[#3c5d62]  mb-6">
            Blogging on Healthcare and Price Transparency
          </h1>
        </div>
      </div>
    </div>
  );
}
