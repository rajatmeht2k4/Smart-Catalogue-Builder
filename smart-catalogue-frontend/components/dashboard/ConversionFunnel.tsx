"use client";

import { Eye, MousePointerClick, MessageCircle, ChevronRight } from "lucide-react";

interface FunnelData {
    views: number;
    productClicks: number;
    enquiries: number;
}

export default function ConversionFunnel({ data }: { data?: FunnelData }) {
    const views = data?.views || 0;
    const clicks = data?.productClicks || 0;
    const enquiries = data?.enquiries || 0;

    const stages = [
        {
            label: "Views",
            value: views,
            icon: Eye,
            color: "bg-indigo-600",
            lightColor: "bg-indigo-50",
            textColor: "text-indigo-600",
            width: "100%",
        },
        {
            label: "Product Clicks",
            value: clicks,
            icon: MousePointerClick,
            color: "bg-amber-500",
            lightColor: "bg-amber-50",
            textColor: "text-amber-600",
            width: views > 0 ? `${Math.max((clicks / views) * 100, 8)}%` : "8%",
        },
        {
            label: "Enquiries",
            value: enquiries,
            icon: MessageCircle,
            color: "bg-emerald-500",
            lightColor: "bg-emerald-50",
            textColor: "text-emerald-600",
            width: views > 0 ? `${Math.max((enquiries / views) * 100, 5)}%` : "5%",
        },
    ];

    const dropOff1 = views > 0 ? Math.round(((views - clicks) / views) * 100) : 0;
    const dropOff2 = clicks > 0 ? Math.round(((clicks - enquiries) / clicks) * 100) : 0;

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 mt-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Conversion Funnel</h2>
            <p className="text-xs text-gray-400 mb-5">Where customers drop off</p>

            <div className="space-y-3">
                {stages.map((stage, i) => (
                    <div key={stage.label}>
                        <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${stage.lightColor}`}>
                                    <stage.icon size={14} className={stage.textColor} />
                                </div>
                                <span className="text-sm text-gray-700">{stage.label}</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{stage.value.toLocaleString()}</span>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                                className={`${stage.color} h-2.5 rounded-full transition-all duration-700`}
                                style={{ width: stage.width }}
                            />
                        </div>

                        {/* Drop-off indicator */}
                        {i < stages.length - 1 && (
                            <div className="flex items-center gap-1 ml-9 mt-1.5 mb-1">
                                <ChevronRight size={12} className="text-gray-300" />
                                <span className="text-xs text-gray-400">
                                    {i === 0 ? dropOff1 : dropOff2}% drop-off
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
