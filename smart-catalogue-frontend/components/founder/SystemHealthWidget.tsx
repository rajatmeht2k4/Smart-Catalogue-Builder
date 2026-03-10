"use client";

import { useSuperAdminSystemHealth } from "@/lib/hooks";
import { Activity, Server, Database, Wifi } from "lucide-react";

export function SystemHealthWidget() {
    const { health, isLoading, error } = useSuperAdminSystemHealth();

    if (error) {
        return (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <Activity className="h-8 w-8 text-red-500 mb-3" />
                <p className="text-red-800 font-semibold text-sm">Monitor Offline</p>
                <p className="text-red-600/80 text-xs mt-1">Failed to connect to telemetry service.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] flex flex-col">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    System Health
                </h3>
                <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    Live
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-5">

                {/* API Latency */}
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center text-[13px] font-medium text-slate-600">
                            <Wifi className="h-4 w-4 mr-2 text-violet-500" />
                            API Latency
                        </div>
                        <span className="text-[13px] font-bold text-slate-800">
                            {isLoading ? "--" : health?.network?.apiLatencyMs}ms
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                            className="bg-violet-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: isLoading ? "0%" : `${Math.min((health?.network?.apiLatencyMs / 200) * 100, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Database Queries */}
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center text-[13px] font-medium text-slate-600">
                            <Database className="h-4 w-4 mr-2 text-sky-500" />
                            Active DB Queries
                        </div>
                        <span className="text-[13px] font-bold text-slate-800">
                            {isLoading ? "--" : health?.database?.activeQueries}/sec
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                            className="bg-sky-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: isLoading ? "0%" : `${Math.min((health?.database?.activeQueries / 100) * 100, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Server Memory */}
                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center text-[13px] font-medium text-slate-600">
                            <Server className="h-4 w-4 mr-2 text-amber-500" />
                            Node Memory Used
                        </div>
                        <span className="text-[13px] font-bold text-slate-800">
                            {isLoading ? "--" : health?.memory?.nodeUsedMB} MB
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                            className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: isLoading ? "0%" : `${Math.min((health?.memory?.nodeUsedMB / 1024) * 100, 100)}%` }}
                        />
                    </div>
                </div>

            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[11px] text-slate-500">
                <span>Uptime: {isLoading ? "--" : Math.floor((health?.uptime || 0) / 3600)}h {Math.floor(((health?.uptime || 0) % 3600) / 60)}m</span>
                <span>Polling every 5s</span>
            </div>

        </div>
    );
}
