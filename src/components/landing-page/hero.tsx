import { Search, MapPin, ShieldPlus } from "lucide-react";
import HeroHeading from "./hero-heading";
import { commonProcedures } from "@/data/landing-page/hero-data";

export default function Hero() {
  return (
    <main className="max-w-[1800px] mx-auto px-6 sm:px-12 py-10 sm:py-20">
      <HeroHeading />

      <div className="flex flex-col md:flex-col lg:flex-row w-full border-2 border-gray-200 rounded-lg overflow-hidden divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-gray-200 mb-8">
        <div className="flex-1 px-4 py-3 flex items-center w-full">
          <Search
            className="text-gray-400 ml-2 mr-2"
            color="#03363D"
            size={24}
          />
          <input
            type="text"
            placeholder="Search for care..."
            className="w-full focus:outline-none text-lg text-zinc-900"
          />
        </div>

        <div className="flex-1 px-4 py-3 flex items-center w-full">
          <MapPin
            className="text-gray-400 ml-2 mr-2"
            color="#03363D"
            size={24}
          />
          <input
            type="text"
            placeholder="Enter Zip Code"
            className="w-full focus:outline-none text-lg text-zinc-900"
          />
        </div>

        <div className="flex-1 px-4 py-3 flex items-center w-full">
          <ShieldPlus
            className="text-[#4CD7C6] mr-2"
            color="#03363D"
            size={24}
          />
          <span className="text-gray-700">I&apos;m not using insurance</span>
        </div>

        <div className="flex px-4 py-3 w-full lg:w-auto">
          <button className="flex items-center justify-center bg-[#03363D] text-white px-4 py-2 rounded hover:bg-[#044955] transition-colors w-full">
            <span className="lg:hidden">Search Care</span>
            <Search size={24} className="hidden lg:block" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {commonProcedures.map((procedure, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e6e6f] text-white hover:bg-[#044955] transition-colors"
          >
            {procedure}
            <Search className="w-4 h-4" />
          </button>
        ))}
      </div>
    </main>
  );
}
