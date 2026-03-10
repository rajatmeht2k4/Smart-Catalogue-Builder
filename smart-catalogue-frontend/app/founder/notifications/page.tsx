"use client";

import { Bell, Send, AlertTriangle, CheckCircle2, Search, Info } from "lucide-react";

export default function NotificationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Notifications</h1>
                <p className="text-[13px] text-slate-500 mt-1">
                    Manage automated alerts and dispatch platform-wide announcements.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Send Notification Form */}
                <div className="lg:col-span-1 border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <Send className="w-4 h-4 text-violet-600" />
                            <h3 className="text-[14px] font-semibold text-slate-800">Dispatch Alert</h3>
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-slate-700">Target Audience</label>
                            <select className="w-full text-[13px] border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none">
                                <option>All Active Users</option>
                                <option>Pro Subscribers Only</option>
                                <option>Free Tier Users</option>
                                <option>Specific User (by Email)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-slate-700">Alert Type</label>
                            <div className="flex gap-2">
                                <label className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg border border-violet-200 bg-violet-50 cursor-pointer">
                                    <input type="radio" name="type" defaultChecked className="hidden" />
                                    <Info className="w-3.5 h-3.5 text-violet-600" />
                                    <span className="text-[12px] font-medium text-violet-900">Info</span>
                                </label>
                                <label className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg border border-amber-200 bg-amber-50 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                                    <input type="radio" name="type" className="hidden" />
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                    <span className="text-[12px] font-medium text-amber-900">Warning</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-slate-700">Message Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Scheduled Maintenance Notice"
                                className="w-full text-[13px] border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5 flex-1 flex flex-col">
                            <label className="text-[12px] font-medium text-slate-700">Message Body</label>
                            <textarea
                                placeholder="Type the detailed notification message here..."
                                className="w-full text-[13px] border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none flex-1 min-h-[100px] resize-none"
                            />
                        </div>
                        <button className="w-full bg-violet-600 text-white font-medium text-[13px] py-2.5 rounded-lg hover:bg-violet-700 transition flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Dispatch Now
                        </button>
                    </div>
                </div>

                {/* Feed */}
                <div className="lg:col-span-2 border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-slate-500" />
                            <h3 className="text-[14px] font-semibold text-slate-800">Notification History</h3>
                        </div>
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search logs..."
                                className="pl-8 pr-3 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-violet-500 w-48"
                            />
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100 overflow-y-auto max-h-[600px]">
                        {[
                            { title: "New Feature: AI Catalogue Generation", type: "info", time: "2 hours ago", audience: "All Users", success: 98, status: "completed" },
                            { title: "API Outage Warning", type: "warning", time: "1 day ago", audience: "Developers", success: 100, status: "completed" },
                            { title: "Payment Failed Notice Trigger", type: "system", time: "3 days ago", audience: "System Auto", success: "-", status: "active" },
                            { title: "Welcome to Platform Edition 2.0", type: "info", time: "1 week ago", audience: "All Users", success: 95, status: "completed" },
                            { title: "Subscription Price Changes", type: "info", time: "2 weeks ago", audience: "Free Tier", success: 99, status: "completed" },
                        ].map((log, i) => (
                            <div key={i} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                                <div className="flex items-start justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        {log.type === 'info' ? (
                                            <Info className="w-4 h-4 text-blue-500" />
                                        ) : log.type === 'warning' ? (
                                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                                        ) : (
                                            <Bell className="w-4 h-4 text-slate-400" />
                                        )}
                                        <h4 className="text-[13px] font-semibold text-slate-800">{log.title}</h4>
                                    </div>
                                    <span className="text-[11px] text-slate-400">{log.time}</span>
                                </div>
                                <div className="pl-6 flex items-center gap-4 mt-1.5">
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                        Target: {log.audience}
                                    </span>
                                    {log.status === 'completed' ? (
                                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                                            <CheckCircle2 className="w-3 h-3" />
                                            {log.success}% Delivered
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-[11px] text-violet-600 font-medium bg-violet-50 px-2 py-0.5 rounded-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                                            Active Rule
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
