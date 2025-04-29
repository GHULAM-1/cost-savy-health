"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { FormEvent, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "../svg-icon";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { googleAuthUrl } from "@/api/auth/api";

export default function SignInForm({
  authType,
  onSwitch,
}: {
  authType: "business" | "consumer" | null;
  onSwitch: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the redirect URL from query params (if any)
  const from = searchParams.get("from") || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, router, from]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Call the login function from auth context
      await login(email, password);

      toast.success("Login Successfull");

      // Redirect to the original destination or dashboard
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to sign in. Please check your credentials."
      );
      toast.success("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle Google OAuth
  const handleGoogleSignIn = () => {
    // Store the destination URL in localStorage before redirecting
    localStorage.setItem("authRedirectUrl", from);

    // Redirect to Google OAuth endpoint
    window.location.href = googleAuthUrl;
  };

  // If already authenticated and not loading, don't render the form
  if (isAuthenticated && !isLoading) return null;

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
        {error && (
          <div className="bg-red-50 text-red-500 p-2 mb-4 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="authType" value={authType ?? ""} />

          <div className="grid gap-4">
            {/* <Button
              type="button"
              variant="outline"
              className="w-full gap-2 bg-white hover:bg-gray-50 border border-gray-400 text-gray-900 text-sm cursor-pointer"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              <Icon name="google" width={16} height={16} />
              Sign in with Google
            </Button> */}

            {/* <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-400">
              <span className="relative z-10 bg-white px-2 text-gray-600">
                Or continue with email
              </span>
            </div> */}

            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  name="email"
                  type="email"
                  required
                  className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-800 focus-visible:ring-gray-300 h-9"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  required
                  className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-800 focus-visible:ring-gray-300 h-9"
                  disabled={isSubmitting}
                />
              </div>

              <div className="text-right flex items-center justify-center">
                <a
                  href="/forgot-password"
                  className="text-xs text-gray-600 underline underline-offset-4 hover:text-gray-800"
                >
                  Don't remember your password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#098481] hover:bg-teal-700 text-white text-sm font-medium uppercase gap-2 h-9"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  <>
                    Sign In
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
