"use client";

import { Building2, ShoppingBag, Eye, MessageCircle } from "lucide-react";

export function PlatformOverviewGrid({ data }: { data: any }) {
    if (!data) return null;

    const stats = [
        {
            label: "Total Businesses",
            value: data.totalBusinesses.toLocaleString(),
            icon: Building2,
            color: "text-violet-600",
            bg: "bg-violet-50",
        },
        {
            label: "Products Hosted",
            value: data.totalProducts.toLocaleString(),
            icon: ShoppingBag,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Global Views",
            value: data.platformViews.toLocaleString(),
            icon: Eye,
            color: "text-sky-600",
            bg: "bg-sky-50",
        },
        {
            label: "Global Leads",
            value: data.platformLeads.toLocaleString(),
            icon: MessageCircle,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0px_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-300 relative overflow-hidden group"
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-[13px] font-medium text-slate-500 mb-1">
                                {stat.label}
                            </p>
                            <h3 className="text-3xl font-bold text-slate-800">
                                {stat.value}
                            </h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg} transition-colors duration-300 group-hover:scale-110`}>
                            <stat.icon size={22} className={stat.color} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
