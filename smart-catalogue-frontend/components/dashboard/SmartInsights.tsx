"use client";

import { TrendingUp, TrendingDown, Info, AlertTriangle, Check } from "lucide-react";

interface Insight {
    type: "positive" | "warning" | "info";
    title: string;
    desc: string;
}

const iconMap = {
    positive: Check,
    warning: AlertTriangle,
    info: Info,
};

const colorMap = {
    positive: { bg: "bg-emerald-50", icon: "bg-emerald-500", text: "text-emerald-800" },
    warning: { bg: "bg-amber-50", icon: "bg-amber-500", text: "text-amber-800" },
    info: { bg: "bg-blue-50", icon: "bg-blue-500", text: "text-blue-800" },
};

export function SmartInsights({ data }: { data?: Insight[] }) {
    const insights = data || [];

    if (insights.length === 0) {
        return (
            <div className="bg-white p-5 rounded-xl border border-gray-100 col-span-full">
                <h2 className="text-sm font-semibold text-gray-900 mb-2">Business Insights</h2>
                <p className="text-sm text-gray-400 text-center py-6">
                    Start getting visitors to your catalogue to unlock insights.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 col-span-full">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Business Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {insights.map((insight, i) => {
                    const Icon = iconMap[insight.type];
                    const colors = colorMap[insight.type];

                    return (
                        <div
                            key={i}
                            className={`flex items-start gap-3 p-3.5 ${colors.bg} rounded-lg`}
                        >
                            <div className={`w-7 h-7 ${colors.icon} rounded-full flex items-center justify-center flex-shrink-0`}>
                                <Icon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div>
                                <p className={`text-sm font-medium ${colors.text}`}>{insight.title}</p>
                                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{insight.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
