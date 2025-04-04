"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

export function AuthSlider() {
  const [activeForm, setActiveForm] = useState("signin");

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
            onSwitch={() => activeForm === "signin" && setActiveForm("signup")}
          />
        </div>
        <div className="w-1/2 px-4">
          <SignUpForm
            onSwitch={() => activeForm === "signup" && setActiveForm("signin")}
          />
        </div>
      </div>
    </div>
  );
}
