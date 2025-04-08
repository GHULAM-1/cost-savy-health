import React, { Suspense } from "react";
import { AuthSlider } from "@/components/auth/auth-slider";

<<<<<<< HEAD
const AuthLoading = () => (
  <div className="flex min-h-svh items-center justify-center bg-[#03363d]">
    <div className="text-white">Loading authentication...</div>
  </div>
);

=======
>>>>>>> stagging
export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-[#03363d]">
      <div className="flex w-full max-w-sm flex-col gap-6">
<<<<<<< HEAD
        <Suspense fallback={<AuthLoading />}>
=======
        <Suspense fallback={<div>Loading...</div>}>
>>>>>>> stagging
          <AuthSlider />
        </Suspense>
      </div>
    </div>
  );
}