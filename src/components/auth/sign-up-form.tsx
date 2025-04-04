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

export default function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <Card className="bg-white border border-teal-200 text-teal-900 rounded-t-lg pt-0">
      <Link
        href="/"
        className="flex items-center justify-center bg-gray-200 p-4 rounded-t-lg"
      >
        <Icon name="half-logo" width={36} height={36} />
      </Link>

      <div className="text-center text-normal text-teal-600 flex items-center justify-center border-b pb-3 gap-16">
        <button
          onClick={onSwitch}
          className="hover:underline underline-offset-4 hover:text-teal-800 cursor-pointer"
        >
          Sign in
        </button>
        <button className="font-medium text-teal-800 underline underline-offset-4 cursor-pointer">
          Sign up
        </button>
      </div>

      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
        <CardDescription className="text-sm text-teal-600">
          Create your free account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full gap-2 bg-white hover:bg-teal-50 border border-teal-700 text-teal-900 text-sm cursor-pointer"
              >
                <Icon name="google" width={16} height={16} />
                Sign up with Google
              </Button>
            </div>

            <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-teal-700">
              <span className="relative z-10 bg-white px-2 text-teal-700">
                Or continue with email
              </span>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="email" className="text-sm text-teal-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-white border border-teal-300 text-teal-900 placeholder:text-teal-800 focus-visible:ring-teal-300 h-9"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password" className="text-sm text-teal-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-white border border-teal-300 text-teal-900 placeholder:text-teal-800 focus-visible:ring-teal-300 h-9"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-sm font-medium uppercase flex items-center justify-center gap-2 h-9 cursor-pointer"
              >
                Sign Up
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center text-xs text-teal-600">
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-teal-800"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline underline-offset-4 hover:text-teal-800"
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
