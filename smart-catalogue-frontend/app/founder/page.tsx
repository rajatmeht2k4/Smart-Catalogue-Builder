"use client";

import { useSuperAdminStats } from "@/lib/hooks";
import { PlatformOverviewGrid } from "@/components/founder/PlatformOverviewGrid";
import { PlatformGrowthCharts } from "@/components/founder/PlatformGrowthCharts";
import { PlatformLeaderboard } from "@/components/founder/PlatformLeaderboard";
import { SystemHealthWidget } from "@/components/founder/SystemHealthWidget";
import { LiveActivityStream } from "@/components/founder/LiveActivityStream";
import { Activity } from "lucide-react";

export default function SuperAdminOverview() {
    const { stats, isLoading, error } = useSuperAdminStats();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center">
                    <div className="h-8 w-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-slate-500 text-[13px] animate-pulse">Loading global platform data...</p>
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="bg-red-50 border border-red-100 rounded-2xl p-8 max-w-md text-center shadow-sm">
                    <Activity className="h-10 w-10 text-red-500 mx-auto mb-4" />
                    <h3 className="text-red-800 font-semibold mb-2">Access Denied</h3>
                    <p className="text-red-600/80 text-[13px] leading-relaxed">
                        You must be authorized as a Super Admin to view this data. Ensure your server is running and FOUNDER_USER_ID matches if in production.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Command Center</h1>
                <p className="text-[13px] text-slate-500 mt-1">
                    Global metrics across all registered businesses and catalogues.
                </p>
            </div>

            <PlatformOverviewGrid data={stats.overview} />

            <PlatformGrowthCharts
                growthData={stats.growthChart}
                trafficData={stats.trafficChart}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <PlatformLeaderboard topBusinesses={stats.leaderboard} />
                    <LiveActivityStream activities={stats.recentActivity} />
                </div>
                <div className="lg:col-span-1">
                    <SystemHealthWidget />
                </div>
            </div>
        </div>
    );
}
