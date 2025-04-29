"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "../svg-icon";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { googleAuthUrl } from "@/api/auth/api";
import { login } from "@/api/auth/api";
export default function SignUpForm({
  authType,
  onSwitch,
}: {
  authType: "business" | "consumer" | null;
  onSwitch: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, isAuthenticated, isLoading } = useAuth();
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

    // Generating a name from email if not provided
    const name = email.split("@")[0];

    try {
      // 1. Register the user
      await register(name, email, password);

      // 2. Immediately log the user in
      const response = await login({ email, password });

      if (response.success) {
        // Show success message
        toast.success("Registration successful!");
        // Redirect to homepage
        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to register. Please try again."
      );
      toast.error("Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  //   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   setError(null);

  //   const formData = new FormData(event.currentTarget);
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   // Generating a name from email if not provided (can be updated later by user)
  //   const name = email.split('@')[0];

  //   try {
  //     // Call the register function from auth context
  //     const response = await register(name, email, password);

  //     // Store token in localStorage
  //     localStorage.setItem("token", response.token);

  //     // Store user data
  //     localStorage.setItem("user", JSON.stringify(response.user));

  //     // Show success message
  //     toast.success("Registration successful");

  //     // Redirect to the original destination or dashboard
  //     router.push("/");
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //     setError(error instanceof Error ? error.message : "Failed to register. Please try again.");

  //     toast.error("Registration failed");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Function to handle Google OAuth
  const handleGoogleSignUp = () => {
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
        <button
          onClick={onSwitch}
          className="hover:underline underline-offset-4 hover:text-gray-800 cursor-pointer"
        >
          Sign in
        </button>
        <button className="font-medium text-gray-800 underline underline-offset-4 cursor-pointer">
          Sign up
        </button>
      </div>

      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Create your free account
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
            {/* <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2 bg-white hover:bg-gray-50 border border-gray-400 text-gray-900 text-sm cursor-pointer"
                onClick={handleGoogleSignUp}
              >
                <Icon name="google" width={16} height={16} />
                Sign up with Google
              </Button>
            </div>

            <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-400">
              <span className="relative z-10 bg-white px-2 text-gray-600">
                Or continue with email
              </span>
            </div> */}

            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  placeholder="m@example.com"
                  className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-800 focus-visible:ring-gray-300 h-9"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  required
                  className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-800 focus-visible:ring-gray-300 h-9"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#098481] hover:bg-teal-700 text-white text-sm font-medium uppercase flex items-center justify-center gap-2 h-9 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
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
                    Signing Up...
                  </span>
                ) : (
                  <>
                    Sign Up
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="text-center text-xs text-gray-600">
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-gray-800"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-gray-800"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
