"use client";

import { FileText, Search, Clock, LogIn, Settings, ShieldAlert, Download } from "lucide-react";

export default function AuditLogsPage() {
    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Audit Logs</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        Chronological record of security events and administrative actions.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-slate-600 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-1.5 flex flex-col justify-center min-w-[120px]">
                        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Storage</div>
                        <div className="text-[13px] font-bold text-slate-800 leading-tight">30 Days Retention</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by IP, user, or event type..."
                            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="text-[12px] border border-gray-200 rounded-md px-2 py-1.5 bg-white text-slate-700 outline-none focus:border-violet-500">
                            <option>All Event Types</option>
                            <option>Authentication</option>
                            <option>Settings Change</option>
                            <option>Security Alert</option>
                        </select>
                        <select className="text-[12px] border border-gray-200 rounded-md px-2 py-1.5 bg-white text-slate-700 outline-none focus:border-violet-500">
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                </div>

                <div className="p-6">
                    <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-4">

                        {/* Event Item */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-violet-100 border-2 border-white flex items-center justify-center">
                                <Settings className="w-2.5 h-2.5 text-violet-600" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                                <h4 className="text-[14px] font-semibold text-slate-800">Global API Rate Limit Updated</h4>
                                <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                                    <Clock className="w-3 h-3" />
                                    10 mins ago
                                </span>
                            </div>
                            <div className="text-[13px] text-slate-600">
                                <span className="font-medium text-slate-800">Global Founder</span> changed limit from <span className="font-mono text-[11px] bg-slate-100 px-1 rounded">100</span> to <span className="font-mono text-[11px] bg-slate-100 px-1 rounded">150</span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-2 font-mono">
                                IP: 192.168.1.105 | Session: ax_992kx
                            </div>
                        </div>

                        {/* Event Item */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center">
                                <ShieldAlert className="w-2.5 h-2.5 text-amber-600" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                                <h4 className="text-[14px] font-semibold text-slate-800">Failed Login Attempt Spike</h4>
                                <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                                    <Clock className="w-3 h-3" />
                                    2 hours ago
                                </span>
                            </div>
                            <div className="text-[13px] text-slate-600">
                                System detected 15 failed login attempts for account <span className="font-medium text-slate-800">sarah@staff.com</span>. Account temporarily locked.
                            </div>
                            <div className="text-[11px] text-slate-400 mt-2 font-mono">
                                Request IP Range: 45.33.*.*
                            </div>
                        </div>

                        {/* Event Item */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center">
                                <LogIn className="w-2.5 h-2.5 text-emerald-600" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                                <h4 className="text-[14px] font-semibold text-slate-800">Super Admin Login</h4>
                                <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                                    <Clock className="w-3 h-3" />
                                    5 hours ago
                                </span>
                            </div>
                            <div className="text-[13px] text-slate-600">
                                Successful authentication by <span className="font-medium text-slate-800">admin@npmart.com</span> via OAuth (Google).
                            </div>
                            <div className="text-[11px] text-slate-400 mt-2 font-mono">
                                IP: 104.28.19.10 | Device: macOS v14.3 Safari
                            </div>
                        </div>

                    </div>
                    <button className="w-full py-3 mt-4 text-[13px] font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors rounded-lg">
                        Load More Logs
                    </button>
                </div>
            </div>
        </div>
    );
}
