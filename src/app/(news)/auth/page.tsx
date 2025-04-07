import React, { Suspense } from "react";
import { AuthSlider } from "@/components/auth/auth-slider";

const AuthLoading = () => (
  <div className="flex min-h-svh items-center justify-center bg-[#03363d]">
    <div className="text-white">Loading authentication...</div>
  </div>
);

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[#03363d]">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={<AuthLoading />}>
          <AuthSlider />
        </Suspense>
      </div>
    </div>
  );
}