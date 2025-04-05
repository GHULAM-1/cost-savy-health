import React from "react";
import Icon from "../svg-icon";

export function FeedbackSection() {
  return (
    <div className="rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 mt-6 w-full max-w-[905px] bg-gray-50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div className="flex items-start md:items-center gap-3 md:gap-4 w-full">
          <div className="shrink-0">
            <Icon
              name="megaphone"
              className="w-12 h-12 md:w-16 md:h-16"
              alt="Megaphone"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-[#1B3B36] text-lg md:text-xl font-semibold text-left">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1 text-left">
              We'd love to hear from you.
            </p>
          </div>
        </div>

        <button className="md:self-start px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-[#2A665B] border-2 border-[#2A665B] rounded-full hover:bg-[#2A665B] hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap">
          Send us feedback
        </button>
      </div>
    </div>
  );
}
