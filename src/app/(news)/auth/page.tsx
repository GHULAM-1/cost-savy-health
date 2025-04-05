import React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { AuthSlider } from "@/components/auth/auth-slider";
export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[#03363d]">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <AuthSlider />
      </div>
    </div>
  );
}
