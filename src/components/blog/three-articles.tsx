import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";
import TwoArticles from "@/components/blog/two-articles";
import Link from "next/link";

interface Article {
  image: string;
  category: string;
  title: string;
  description: string;
  authors: {
    image: string;
    name: string;
  }[];
  date: string;
  readTime: string;
}

interface ThreeArticlesProps {
  articles: Article[];
}

export default function ThreeArticles({ articles }: ThreeArticlesProps) {
  const firstThreeArticles = articles.slice(0, 3);
  const remainingArticles = articles.slice(3);

  return (
    <>
      <div className="p-4 md:p-8 lg:p-12 xl:px-25">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {firstThreeArticles.map((article, index) => (
            <Link
              href="#"
              key={index}
              className="cursor-pointer flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-48 xl:h-56">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="text-teal-500 text-xs md:text-sm font-medium mb-2">
                  {article.category}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-[#0D3B4C] mb-3">
                  {article.title}
                </h2>

                <p className="text-gray-600 text-sm md:text-base mb-4 font-light flex-grow">
                  {article.description}
                </p>

                <div className="flex items-center space-x-3">
                  <div
                    className={`flex ${
                      article.authors.length > 1 ? "-space-x-2" : ""
                    }`}
                  >
                    {article.authors.map((author, authorIndex) => (
                      <img
                        key={authorIndex}
                        src={author.image}
                        alt={author.name}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#0D3B4C] text-xs md:text-sm truncate">
                      {article.authors.map((a) => a.name).join(", ")}
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <span>{article.date}</span>
                      <span className="mx-1 md:mx-2">•</span>
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {remainingArticles.length > 0 && (
        <div className="mt-8 md:mt-12">
          <TwoArticles articles={remainingArticles} />
        </div>
      )}
    </>
  );
}
