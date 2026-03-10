"use client";

import { Flag, Search, ThumbsDown, Trash2, Check, AlertTriangle } from "lucide-react";

const activeReports = [
    { id: "REP-992", target: "Catalogue: Fake Gucci Store", reason: "Counterfeit Goods", reportedBy: 12, date: "1 hour ago", risk: "High" },
    { id: "REP-991", target: "User Profile: Spammer99", reason: "Spam / Phishing links", reportedBy: 4, date: "4 hours ago", risk: "Medium" },
    { id: "REP-990", target: "Product: Magic Weight Loss Pill", reason: "Misleading Health Claims", reportedBy: 2, date: "1 day ago", risk: "Low" },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Trust & Safety Queue</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        Review community reports and resolve Policy violations.
                    </p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2 flex items-center gap-3">
                    <Flag className="w-4 h-4 text-red-500" />
                    <div>
                        <div className="text-[11px] font-medium text-red-800/70 uppercase tracking-wider">In Queue</div>
                        <div className="text-lg font-bold text-red-900 leading-tight">{activeReports.length} Active</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                    <h3 className="text-[14px] font-semibold text-slate-800">Pending Resolutions</h3>
                    <div className="flex items-center gap-2">
                        <select className="text-[12px] border border-gray-200 rounded-md px-2 py-1.5 bg-white text-slate-700 outline-none focus:border-violet-500">
                            <option>Sort by: Received Time</option>
                            <option>Sort by: Risk Level (High First)</option>
                            <option>Sort by: Report Count</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {activeReports.map((report) => (
                        <div key={report.id} className="p-5 hover:bg-slate-50 transition-colors flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[11px] font-mono text-slate-400">{report.id}</span>
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold
                                        ${report.risk === 'High' ? 'bg-red-100 text-red-700' :
                                            report.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                'bg-slate-100 text-slate-600'}`}>
                                        {report.risk === 'High' && <AlertTriangle className="w-3 h-3" />}
                                        {report.risk} Risk
                                    </span>
                                </div>
                                <h4 className="text-[15px] font-semibold text-slate-800 mb-1">{report.target}</h4>
                                <div className="text-[13px] text-slate-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                                    <span className="flex items-center gap-1.5"><ThumbsDown className="w-3.5 h-3.5 text-slate-400" /> {report.reason}</span>
                                    <span className="flex items-center gap-1.5"><Flag className="w-3.5 h-3.5 text-slate-400" /> Reported {report.reportedBy} times</span>
                                    <span className="text-slate-400 ml-auto border-l border-gray-200 pl-4">{report.date}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 bg-white p-2 border border-gray-100 rounded-lg shadow-sm w-full lg:w-auto mt-4 lg:mt-0">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors tooltip" title="Ignore report and keep content">
                                    <Check className="w-4 h-4 text-slate-400" />
                                    <span>Approve</span>
                                </button>
                                <div className="hidden sm:block w-px h-6 bg-gray-200" />
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[12px] font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors tooltip" title="Delete content/suspend user">
                                    <Trash2 className="w-4 h-4" />
                                    <span>Takedown</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    {activeReports.length === 0 && (
                        <div className="p-10 text-center flex flex-col items-center">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-3">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800 mb-1">Queue Empty</h3>
                            <p className="text-[13px] text-slate-500">No active reports requiring moderation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
