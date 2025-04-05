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

export default function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <Card className="bg-white border border-gray-300 text-gray-900 rounded-t-lg pt-0">
      <Link
        href="/"
        className="flex items-center justify-center bg-gray-100 p-4 rounded-t-lg"
      >
        <Icon name="half-logo" width={36} height={36} />
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
          <div className="grid gap-4">
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full gap-2 bg-white hover:bg-gray-50 border border-gray-400 text-gray-900 text-sm cursor-pointer"
              >
                <Icon name="google" width={16} height={16} />
                Sign in with Google
              </Button>
            </div>

            <div className="relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-400">
              <span className="relative z-10 bg-white px-2 text-gray-600">
                Or continue with email
              </span>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="email" className="text-sm text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-white border border-gray-400 text-gray-900 placeholder:text-gray-500 focus-visible:ring-gray-300 h-9"
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password" className="text-sm text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-white border border-gray-400 text-gray-900 placeholder:text-gray-500 focus-visible:ring-gray-300 h-9"
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
                className="w-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center text-sm font-medium uppercase gap-2 h-9 cursor-pointer text-white"
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
