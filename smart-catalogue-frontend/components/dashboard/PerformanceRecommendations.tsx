"use client";

import { Check, TrendingUp, Share2, AlertTriangle } from "lucide-react";
import { useDashboardAnalytics, useProducts } from "@/lib/hooks";

export function PerformanceRecommendations() {
    const { analytics } = useDashboardAnalytics();
    const { products } = useProducts();

    const totalViews = analytics?.summary?.totalViews || 0;
    const totalClicks = analytics?.summary?.totalClicks || 0;
    const productCount = products?.length || 0;

    // Build dynamic recommendations
    const recommendations = [];

    if (productCount >= 10) {
        recommendations.push({
            icon: Check,
            color: "bg-green-500",
            bgColor: "bg-green-50",
            title: "Great product catalogue!",
            desc: `You have ${productCount} products. Catalogues with 10+ products get 40% more engagement.`
        });
    } else {
        recommendations.push({
            icon: Share2,
            color: "bg-indigo-500",
            bgColor: "bg-indigo-50",
            title: "Add more products",
            desc: `You have ${productCount} product${productCount !== 1 ? 's' : ''}. Catalogues with 10+ products get 40% more engagement.`
        });
    }

    if (totalViews > 0 && totalClicks > 0) {
        const convRate = ((totalClicks / totalViews) * 100).toFixed(1);
        recommendations.push({
            icon: TrendingUp,
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
            title: `Conversion rate: ${convRate}%`,
            desc: totalClicks / totalViews > 0.1
                ? "Great click-through rate! Your catalogue is engaging visitors well."
                : "Try improving product images and descriptions to boost engagement."
        });
    } else {
        recommendations.push({
            icon: AlertTriangle,
            color: "bg-amber-500",
            bgColor: "bg-amber-50",
            title: "Share your catalogue",
            desc: "Start sharing your catalogue link to get your first visitors and track engagement."
        });
    }

    recommendations.push({
        icon: Check,
        color: "bg-green-500",
        bgColor: "bg-green-50",
        title: "Great mobile experience!",
        desc: "Your catalogue loads quickly on mobile devices."
    });

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 col-span-full">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Performance Recommendations</h2>

            <div className="space-y-4">
                {recommendations.map((rec, i) => {
                    const Icon = rec.icon;
                    return (
                        <div key={i} className={`flex items-start gap-3 p-4 ${rec.bgColor} rounded-lg`}>
                            <div className={`w-8 h-8 ${rec.color} rounded-full flex items-center justify-center`}>
                                <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {rec.title}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {rec.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
