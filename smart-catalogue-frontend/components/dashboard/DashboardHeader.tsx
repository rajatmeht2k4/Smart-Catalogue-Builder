"use client";

import { useUser } from "@clerk/nextjs";
import { useBusiness } from "@/lib/hooks";
import Link from "next/link";

export default function DashboardHeader() {
  const { user } = useUser();
  const { business } = useBusiness();

  const firstName = user?.firstName || "there";
  const catalogueUrl = `/catalogue/${business?.slug || ""}`;

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, {firstName}! 👋</h1>
        <p className="text-sm text-gray-500">
          Here's what's happening with your catalogue today.
        </p>

        <div className="flex gap-3 mt-4">
          <Link href="/products">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
              + Add New Product
            </button>
          </Link>
          <a href={catalogueUrl} target="_blank" rel="noopener noreferrer">
            <button className="border px-4 py-2 rounded-lg text-sm">View Live Catalogue</button>
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="border rounded-lg px-3 py-2 text-sm text-gray-600">
          Last 7 Days
        </div>
      </div>
    </div>
  );
}
