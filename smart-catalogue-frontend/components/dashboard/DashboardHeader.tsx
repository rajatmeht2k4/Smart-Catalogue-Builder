"use client";

import { useUser } from "@clerk/nextjs";
import { useBusiness } from "@/lib/hooks";
import Link from "next/link";
import { Plus, ExternalLink, CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const { user } = useUser();
  const { business } = useBusiness();

  const firstName = user?.firstName || "there";
  const catalogueUrl = `/catalogue/${business?.slug || ""}`;

  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here's what's happening with your catalogue today.
        </p>

        <div className="flex gap-2 mt-4">
          <Link href="/products">
            <button className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus size={16} />
              Add Product
            </button>
          </Link>
          <a href={catalogueUrl} target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center gap-1.5 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 transition-colors">
              <ExternalLink size={14} />
              View Catalogue
            </button>
          </a>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs text-slate-500">
        <CalendarDays size={14} />
        Last 7 Days
      </div>
    </div>
  );
}
