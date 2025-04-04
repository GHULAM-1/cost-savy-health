import BlogHero from "@/components/blog/blog-hero";
import BlogNav from "@/components/blog/blog-nav";
import MainCard from "@/components/blog/main-card";
import ThreeArticles from "@/components/blog/three-articles";
import { article1 } from "@/data/blog/article-1";
import { article2 } from "@/data/blog/article-2";
import { article3 } from "@/data/blog/article-3";
import { article4 } from "@/data/blog/article-4";
import { otherArticles } from "@/data/blog/other-articles";
import { mainCardData1 } from "@/data/blog/main-card-1";
import { mainCardData2 } from "@/data/blog/main-card-2";
import { mainCardData3 } from "@/data/blog/main-card-3";
import { mainCardData4 } from "@/data/blog/main-card-4";
import { mainCardData5 } from "@/data/blog/main-card-5";
import React from "react";
import OtherArticles from "@/components/blog/articles";

export default function page() {
  return (
    <div className="bg-[#f6fbfc] pb-20">
      <BlogNav />
      <BlogHero />
      <MainCard mainCardData={mainCardData1} />
      <ThreeArticles articles={article1} />
      <MainCard mainCardData={mainCardData2} />
      <ThreeArticles articles={article2} />
      <MainCard mainCardData={mainCardData3} />
      <ThreeArticles articles={article3} />
      <MainCard mainCardData={mainCardData4} />
      <ThreeArticles articles={article4} />
      <MainCard mainCardData={mainCardData5} />
      <OtherArticles articles={otherArticles} />
    </div>
  );
}
