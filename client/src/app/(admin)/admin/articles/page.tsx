"use client";

import React from "react";
import { ExternalLink, PenSquare } from "lucide-react";

export default function AdminArticles() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
        <p className="text-gray-500 mt-1">Manage blog posts and healthcare guides</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl text-center">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <PenSquare className="w-7 h-7 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Manage content in Sanity Studio</h2>
        <p className="text-gray-500 text-sm mb-6">
          Articles, blog posts, hero taglines, rotating words, and procedure chips are all managed
          through Sanity CMS. Click below to open Sanity Studio.
        </p>
        <a
          href="https://www.sanity.io/manage"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#6b2458] hover:bg-[#8C2F5D] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          Open Sanity Studio <ExternalLink className="w-4 h-4" />
        </a>

        <div className="mt-8 text-left border-t pt-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What you can manage in Sanity</p>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              "Blog articles and guides",
              "Hero tagline and rotating words on homepage",
              "Common procedure chips",
              "Featured content and promotions",
            ].map(item => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6b2458] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
