"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function PlatformGrowthCharts({ growthData, trafficData }: { growthData: any[], trafficData: any[] }) {

    const customTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-100 p-3 rounded-lg shadow-lg">
                    <p className="text-[13px] font-medium text-slate-500 mb-1">{label}</p>
                    <p className="text-lg font-bold" style={{ color: payload[0].color }}>
                        {payload[0].value} <span className="text-xs font-normal text-slate-400 capitalize">{payload[0].name}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            {/* 30-Day Growth Component */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.02)]">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800">New Business Signups</h3>
                    <p className="text-[13px] text-slate-500 mt-0.5">Last 30 Days Growth Velocity</p>
                </div>
                <div className="h-64 w-full">
                    {growthData && growthData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(v) => v.split('-')[2]}
                                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={15}
                                />
                                <YAxis
                                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip content={customTooltip} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area
                                    type="monotone"
                                    dataKey="signups"
                                    name="Signups"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSignups)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">No growth data yet</div>
                    )}
                </div>
            </div>

            {/* 30-Day Traffic Component */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.02)]">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800">Global Platform Traffic</h3>
                    <p className="text-[13px] text-slate-500 mt-0.5">Daily Views Across All Catalogues (Last 30 Days)</p>
                </div>
                <div className="h-64 w-full">
                    {trafficData && trafficData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(v) => v.split('-')[2]}
                                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={15}
                                />
                                <YAxis
                                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={customTooltip} cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    name="Views"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorViews)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">No traffic data yet</div>
                    )}
                </div>
            </div>

        </div>
    );
}
