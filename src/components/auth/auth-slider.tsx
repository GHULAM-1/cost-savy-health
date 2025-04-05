"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

export function AuthSlider() {
  const [activeForm, setActiveForm] = useState("signin");
  const searchParams = useSearchParams();
  const rawAuthType = searchParams.get("type");
  const authType =
    rawAuthType === "business" || rawAuthType === "consumer"
      ? rawAuthType
      : null;

  return (
    <div className="overflow-hidden relative h-[700px] w-full flex items-center justify-center">
      <div
        className={cn(
          "flex w-[200%] absolute left-0 transition-all duration-300 ease-in-out",
          {
            "translate-x-0": activeForm === "signin",
            "-translate-x-1/2": activeForm === "signup",
          }
        )}
      >
        <div className="w-1/2 px-4">
          <SignInForm
            authType={authType}
            onSwitch={() => activeForm === "signin" && setActiveForm("signup")}
          />
        </div>
        <div className="w-1/2 px-4">
          <SignUpForm
            authType={authType}
            onSwitch={() => activeForm === "signup" && setActiveForm("signin")}
          />
        </div>
      </div>
    </div>
  );
}
