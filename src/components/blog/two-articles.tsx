import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";

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
  readTime: string;
}

interface TwoArticlesProps {
  articles: Article[];
}

export default function TwoArticles({ articles }: TwoArticlesProps) {
  return (
    <div className="p-6 md:pt-12 md:px-40">
      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col bg-white">
            <Image
              src={article.image}
              alt={article.title}
              width={320}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <div className="text-teal-500 text-[12px] font-light mb-2">
                {article.category}
              </div>
              <h2 className="text-2xl text-[#0D3B4C] font-bold leading-tight mb-4">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4 font-light">
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
                  <div className="font-medium text-[#0D3B4C]">
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
          </div>
        ))}
      </div>
    </div>
  );
}
