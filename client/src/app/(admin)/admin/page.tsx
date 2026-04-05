"use client";

import React from "react";
import Link from "next/link";
import { FileText, Youtube, Upload, Database, ArrowRight } from "lucide-react";

const CARDS = [
  {
    href: "/admin/articles",
    icon: FileText,
    title: "Articles",
    desc: "Manage blog posts and healthcare guides via Sanity CMS",
    color: "bg-blue-50 text-blue-600",
  },
  {
    href: "/admin/videos",
    icon: Youtube,
    title: "YouTube Videos",
    desc: "Add and manage educational video content",
    color: "bg-red-50 text-red-600",
  },
  {
    href: "/admin/cpt-upload",
    icon: Upload,
    title: "CPT Upload",
    desc: "Upload hospital standard charge CSV files for AI price search",
    color: "bg-green-50 text-green-600",
  },
  {
    href: "/admin/csv-files",
    icon: Database,
    title: "CSV Repository",
    desc: "Browse all uploaded CSV files and their processing status",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage CostSavvy content and price data</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
        {CARDS.map(({ href, icon: Icon, title, desc, color }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-[#6b2458]/30 transition-all"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
              {title}
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#6b2458]" />
            </h2>
            <p className="text-sm text-gray-500">{desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-xl border border-gray-200 p-6 max-w-3xl">
        <h2 className="font-semibold text-gray-800 mb-3">Quick Links</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="https://costsavvy-backend.onrender.com" target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
            Backend API ↗
          </a>
          <a href="https://www.costsavvy.health" target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
            Live Site ↗
          </a>
          <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer"
            className="px-3 py-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
            Sanity Studio ↗
          </a>
        </div>
      </div>
    </div>
  );
}
