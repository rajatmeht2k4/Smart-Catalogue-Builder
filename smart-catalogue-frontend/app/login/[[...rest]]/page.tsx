"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/admin";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <SignIn
        path="/login"
        routing="path"
        redirectUrl={redirectUrl}
        signUpUrl="/signup"
        appearance={{
          variables: {
            colorPrimary: "#8B5CF6",
            borderRadius: "0.5rem",
          },
          elements: {
            card: "rounded-xl shadow-xl border bg-white/95 backdrop-blur",
            headerTitle: "text-2xl font-semibold text-slate-900",
            headerSubtitle: "text-slate-500",
            formButtonPrimary:
              "rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90",
            formFieldInput:
              "rounded-md border border-slate-300 focus:ring-2 focus:ring-purple-500",
          },
        }}
      />

      {/* 👇 Your custom signup CTA */}
      <p className="mt-4 text-sm text-slate-600">
        Don’t have an account?{" "}
        <Link
          href={`/signup?redirect_url=${encodeURIComponent(redirectUrl)}`}
          className="font-medium text-purple-600 hover:text-pink-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}