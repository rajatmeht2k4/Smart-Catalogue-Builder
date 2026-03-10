"use client";

import { Activity, Users, Layers, TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const trafficData = [
    { date: "Mar 1", visitors: 4000, pageviews: 2400 },
    { date: "Mar 2", visitors: 3000, pageviews: 1398 },
    { date: "Mar 3", visitors: 2000, pageviews: 9800 },
    { date: "Mar 4", visitors: 2780, pageviews: 3908 },
    { date: "Mar 5", visitors: 1890, pageviews: 4800 },
    { date: "Mar 6", visitors: 2390, pageviews: 3800 },
    { date: "Mar 7", visitors: 3490, pageviews: 4300 },
];

const growthData = [
    { name: "Week 1", users: 400, catalogues: 240 },
    { name: "Week 2", users: 300, catalogues: 139 },
    { name: "Week 3", users: 200, catalogues: 980 },
    { name: "Week 4", users: 278, catalogues: 390 },
];

const usageData = [
    { name: "Retail", value: 400 },
    { name: "Food & Bev", value: 300 },
    { name: "Services", value: 300 },
    { name: "Wholesale", value: 200 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Analytics</h1>
                <p className="text-[13px] text-slate-500 mt-1">
                    Deep dive into platform usage, traffic, and conversion metrics.
                </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Unique Visitors (30d)", value: "124.5K", trend: "+12.5%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Pageviews", value: "1.2M", trend: "+8.2%", icon: Layers, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Avg Session Duration", value: "4m 12s", trend: "-2.1%", icon: Activity, color: "text-amber-600", bg: "bg-amber-50" },
                    { label: "Conversion Rate", value: "3.24%", trend: "+1.1%", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border border-gray-200">
                        <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <p className="text-[13px] text-slate-500 font-medium mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                            <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-slate-800">Traffic Over Time</h3>
                        <p className="text-[13px] text-slate-500">Unique visitors vs pageviews for the last 7 days.</p>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '13px' }}
                                    labelStyle={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}
                                />
                                <Area type="monotone" dataKey="pageviews" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPageviews)" />
                                <Area type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Industry Breakdown */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-slate-800">Catalogue Categories</h3>
                        <p className="text-[13px] text-slate-500">Distribution by industry.</p>
                    </div>
                    <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={usageData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {usageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-2xl font-bold text-slate-800">1.2K</span>
                            <span className="text-[11px] text-slate-500 font-medium">TOTAL</span>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {usageData.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                <span className="text-[12px] text-slate-600 truncate">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Growth */}
                <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200">
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-slate-800">Platform Growth</h3>
                        <p className="text-[13px] text-slate-500">New user registrations vs catalogues created per week.</p>
                    </div>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="users" name="New Users" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                <Bar dataKey="catalogues" name="New Catalogues" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
