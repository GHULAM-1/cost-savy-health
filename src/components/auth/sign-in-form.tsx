"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { FormEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "../svg-icon";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function SignInForm({
  authType,
  onSwitch,
}: {
  authType: "business" | "consumer" | null;
  onSwitch: () => void;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    console.log("Form Values:", values);
  };
  return (
    <Card className="bg-white border border-gray-300 text-gray-900 rounded-t-lg pt-0">
      <Link
        href="/"
        className="flex items-center justify-center bg-gray-100 p-2 rounded-t-lg"
      >
        <img src="/icon-black.png" alt="" />
      </Link>

      <div className="text-center text-normal text-gray-600 flex items-center justify-center border-b pb-3 gap-16">
        <button className="font-medium text-gray-800 underline underline-offset-4 cursor-pointer">
          Sign in
        </button>
        <button
          onClick={onSwitch}
          className="hover:underline underline-offset-4 hover:text-gray-800 cursor-pointer"
        >
          Sign up
        </button>
      </div>

      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-bold">Sign In</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Welcome back to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <input type="hidden" name="authType" value={authType ?? ""} />

          <div className="grid gap-4">
            <Button
              variant="outline"
              className="w-full gap-2 bg-white hover:bg-gray-50 border border-gray-400 text-gray-900 text-sm cursor-pointer"
            >
              <Icon name="google" width={16} height={16} />
              Sign in with Google
            </Button>

            <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-400">
              <span className="relative z-10 bg-white px-2 text-gray-600">
                Or continue with email
              </span>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" name="email" type="email" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  required
                />
              </div>

              <div className="text-right flex items-center justify-center">
                <a
                  href="#"
                  className="text-xs text-gray-600 underline underline-offset-4 hover:text-gray-800"
                >
                  Don't remember your password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium uppercase gap-2 h-9"
              >
                Sign In
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
