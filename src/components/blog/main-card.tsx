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
    <Link href="#" className="cursor-pointer ">
      <div className="p-6 md:p-13 md:px-40 ">
        <div className="grid md:grid-cols-[63%_37%] rounded-2xl">
          <div className="bg-white overflow-hidden shadow-sm relative h-[450px] selection:bg-transparent">
            <Image
              src={mainCardData.image}
              alt="Banner Image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 63vw"
            />
          </div>

          <div className="bg-white overflow-hidden shadow-sm p-4 box-border h-[450px] [&_*::selection]:bg-[#ace8e4] [&_*::-moz-selection]:bg-[#ace8e4]">
            <div className="text-teal-500 font-medium mb-1 text-[12px] mx-10">
              {mainCardData.category}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4C] leading-10 mb-3 mx-10">
              {mainCardData.title}
            </h2>

            <div className="space-y-0.5 text-gray-600 mb-3 mx-10 text-lg">
              {mainCardData.bulletPoints.map((point, index) => (
                <p key={index} className="font-light">
                  {point}
                </p>
              ))}
            </div>

            <div className="flex items-center space-x-4 mx-10">
              <img
                src={mainCardData.author.image}
                alt={mainCardData.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="font-medium text-[#0D3B4C] text-[12px]">
                  {mainCardData.author.name}
                </div>
                <div className="flex items-center text-gray-500 text-[12px]">
                  <span>{mainCardData.date}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
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
