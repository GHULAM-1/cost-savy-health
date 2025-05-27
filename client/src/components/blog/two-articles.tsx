import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Author {
  image: string;
  name: string;
}

interface Article {
  image: string;
  category: string;
  title: string;
  description: string;
  authors: Author[];
  date: string;
  slug:string;
  readTime: string;
}

interface TwoArticlesProps {
  articles: Article[];
}

export default function TwoArticles({ articles }: TwoArticlesProps) {
  return (
    <div className="p-6  lg:px-12 xl:px-25">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <Link
            href={`/blog/article/${article.slug}`} 
            key={index}
            className="cursor-pointer flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-56 xl:h-64">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 1024px) 50vw, 50vw"
              />
            </div>

            <div className="p-6">
              <div className="text-[#098481] text-[12px] lg:text-xs font-light mb-2">
                {article.category}
              </div>
              <h2 className="text-2xl lg:text-xl xl:text-2xl font-bold text-[#0D3B4C] leading-tight mb-4">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4 font-light lg:text-sm xl:text-base">
                {article.description}
              </p>

              <div className="flex items-center mt-auto text-[12px]">
                <div
                  className={`flex ${
                    article.authors.length > 1 ? "-space-x-2 mr-3" : "mr-3"
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
                <div>
                  <div className="font-medium text-[#0D3B4C] lg:text-xs xl:text-sm">
                    {article.authors.map((a) => a.name).join(", ")}
                  </div>
                  <div className="flex items-center text-gray-500 text-[12px]">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
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
  );
}
