import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";
import TopImg from "../../../public/banners/TopR1.png";

function MainCard() {
  return (
    <div className="p-6 md:p-12 md:px-48">
      <div className="grid md:grid-cols-[60%_40%]  rounded-2xl">
        <div className="bg-white overflow-hidden shadow-sm h-full">
          <Image
            src={TopImg}
            alt="Banner Image"
            className=" object-cover" // Added full sizing
          />
        </div>
        {/* Content Card - Now takes 40% of space */}
        <div className="bg-white overflow-hidden shadow-sm p-4 ">
          <div className="text-teal-500 font-medium mb-1 text-[14px]">
            PRESS RELEASES
          </div>

          <h2 className="text-3xl md:text-4xl text-[#0D3B4C] leading-tight mb-4">
            Introducing the PATIENTS Framework for a Patient-Centered Healthcare
            Transaction
          </h2>

          <div className="space-y-4 text-gray-600 mb-8">
            <p className="text-lg font-medium">
              Publicly Accountable Transparent
            </p>
            <p className="text-lg font-medium">Interoperable Efficient</p>
            <p className="text-lg font-medium">
              Nonproprietary Transaction Standard
            </p>
          </div>

          {/* Author Info */}
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
              alt="Chris Severn"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-medium text-[#0D3B4C]">CHRIS SEVERN</div>
              <div className="flex items-center text-gray-500 text-sm">
                <span>2 APR 2025</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>3 MIN READ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCard;
