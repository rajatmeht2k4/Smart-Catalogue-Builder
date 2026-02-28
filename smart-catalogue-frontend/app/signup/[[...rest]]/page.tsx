"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/admin";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="w-full max-w-md">
        <SignUp
          path="/signup"
          routing="path"
          redirectUrl={redirectUrl}     // 👈 after signup → onboarding
          signInUrl="/login"
          appearance={{
            elements: {
              headerTitle: "text-xl font-semibold",
              formButtonPrimary:
                "bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white",
            },
            variables: {
              colorPrimary: "#8B5CF6",
              borderRadius: "0.75rem",
            },
          }}
        />
      </div>
    </div>
  );
}