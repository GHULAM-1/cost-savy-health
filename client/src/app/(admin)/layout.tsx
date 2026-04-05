"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Youtube,
  Upload,
  Database,
  LogOut,
  ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/videos", label: "YouTube Videos", icon: Youtube },
  { href: "/admin/cpt-upload", label: "CPT Upload", icon: Upload },
  { href: "/admin/csv-files", label: "CSV Repository", icon: Database },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-[#6b2458] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">Access Denied</p>
          <p className="text-gray-500 mb-6">Your account does not have admin privileges.</p>
          <Link href="/" className="text-[#6b2458] underline">Back to homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-[#2d1120] flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/">
            <p className="text-white font-bold text-lg leading-tight">CostSavvy</p>
            <p className="text-white/50 text-xs mt-0.5">Admin Portal</p>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#6b2458] text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-white/60 text-xs mb-1 truncate">{user.email ?? user.name}</p>
          <button
            onClick={() => { logout(); router.replace("/"); }}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
