import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MainCardProps {
  mainCardData: {
    image: string;
    category: string;
    title: string;
    bulletPoints: string[];
    author: {
      image: string;
      name: string;
    };
    date: string;
    readTime: string;
  };
}
export default function MainCard({ mainCardData }: MainCardProps) {
  return (
    <Link href="#" className="cursor-pointer">
      <div className="p-4 sm:p-6 md:p-13 md:px-7 lg:p-12 xl:px-25">
        <div className="grid grid-cols-1 lg:grid-cols-[63%_37%] rounded-2xl">
          <div className="bg-white overflow-hidden shadow-sm relative h-[250px] sm:h-[300px] lg:h-[450px] selection:bg-transparent">
            <Image
              src={mainCardData.image}
              alt="Banner Image"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 63vw"
              priority
            />
          </div>

          <div className="bg-white overflow-hidden shadow-sm p-4 box-border [&_*::selection]:bg-[#ace8e4] [&_*::-moz-selection]:bg-[#ace8e4] lg:h-[450px]">
            <div className="text-teal-500 font-medium mb-2 text-xs sm:text-[13px] lg:text-sm mx-4 lg:mx-8 xl:mx-11">
              {mainCardData.category}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0D3B4C] leading-snug sm:leading-tight lg:leading-[1.2] xl:leading-10 mb-3 mx-4 lg:mx-8 xl:mx-11">
              {mainCardData.title}
            </h2>

            <div className="space-y-2 lg:space-y-1.5 xl:space-y-2 text-gray-600 mb-4 mx-4 lg:mx-8 xl:mx-11 text-base sm:text-[15px] lg:text-sm xl:text-base">
              {mainCardData.bulletPoints.map((point, index) => (
                <p key={index} className="font-light break-words line-clamp-3">
                  {point}
                </p>
              ))}
            </div>

            <div className="flex items-center space-x-4 mx-4 lg:mx-8 xl:mx-11">
              <img
                src={mainCardData.author.image}
                alt={mainCardData.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="font-medium text-[#0D3B4C] text-xs sm:text-[13px] lg:text-sm">
                  {mainCardData.author.name}
                </div>
                <div className="flex items-center text-gray-500 text-xs sm:text-[13px]">
                  <span>{mainCardData.date}</span>
                  <span className="mx-1 sm:mx-2">•</span>
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>{mainCardData.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
