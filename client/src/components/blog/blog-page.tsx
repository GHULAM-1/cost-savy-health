export const revalidate = 60

import BlogHero from "@/components/blog/blog-hero";
import BlogNav from "@/components/blog/blog-nav";
import MainCard from "@/components/blog/main-card";
import ThreeArticles from "@/components/blog/three-articles";
import OtherArticles from "@/components/blog/articles";
import React from "react";
import { getBlogData } from "@/api/sanity/queries";

export default async function BlogPage() {
  const { mainCards, articleGroups, otherArticles } = await getBlogData();

  return (
    <div className="bg-[#f6fbfc] pb-20">
      <BlogNav />
      <BlogHero />
      
      {mainCards.map((mainCard: any) => (
        <React.Fragment key={mainCard._id}>
          <MainCard mainCardData={mainCard} />
          {articleGroups[mainCard._id] && (
            <ThreeArticles articles={articleGroups[mainCard._id].slice(0, 3)} />
          )}
        </React.Fragment>
      ))}
      
      <OtherArticles articles={otherArticles} />
    </div>
  );
}