"use client";

import { LifeBuoy, Filter, Clock, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";

const mockTickets = [
    { id: "TKT-4921", subject: "Billing issue with Pro plan downgrade", user: "Alice Freeman", priority: "High", status: "Open", time: "2h ago" },
    { id: "TKT-4920", subject: "Custom domain SSL certificate failing", user: "Tech Gadgets Outlet", priority: "Urgent", status: "Open", time: "5h ago" },
    { id: "TKT-4919", subject: "How to export catalogue to PDF?", user: "Sweet Treats Bakery", priority: "Low", status: "Closed", time: "1d ago" },
    { id: "TKT-4918", subject: "Product images are blurry on mobile", user: "Handcrafted Goods", priority: "Medium", status: "In Progress", time: "1d ago" },
];

export default function SupportPage() {
    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Support Desk</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        Handle escalated user support tickets and bugs.
                    </p>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Unresolved</div>
                        <div className="text-xl font-bold text-slate-800">24</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">In Progress</div>
                        <div className="text-xl font-bold text-slate-800">12</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avg Response</div>
                        <div className="text-xl font-bold text-slate-800">4.2<span className="text-sm font-medium text-slate-500 ml-1">hrs</span></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Resolved (7d)</div>
                        <div className="text-xl font-bold text-slate-800">148</div>
                    </div>
                </div>
            </div>

            {/* Ticket Queue */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-[14px] font-semibold text-slate-800">Recent Priority Tickets</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-slate-600 bg-white border border-gray-200 rounded-md hover:bg-slate-50 transition-colors">
                        <Filter className="w-3.5 h-3.5" />
                        Filters
                    </button>
                </div>
                <div className="divide-y divide-gray-100">
                    {mockTickets.map((ticket) => (
                        <div key={ticket.id} className="p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center justify-between cursor-pointer group">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[11px] font-mono text-slate-400">{ticket.id}</span>
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold
                                        ${ticket.priority === 'Urgent' ? 'bg-red-100 text-red-700' :
                                            ticket.priority === 'High' ? 'bg-amber-100 text-amber-700' :
                                                ticket.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-slate-100 text-slate-600'}`}>
                                        {ticket.priority}
                                    </span>
                                </div>
                                <h4 className="text-[14px] font-semibold text-slate-800 truncate group-hover:text-violet-600 transition-colors">{ticket.subject}</h4>
                                <div className="text-[12px] text-slate-500 mt-1 flex items-center gap-2">
                                    <span>From: <span className="font-medium text-slate-700">{ticket.user}</span></span>
                                    <span>•</span>
                                    <span>Updated {ticket.time}</span>
                                </div>
                            </div>
                            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-2 shrink-0">
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium border
                                    ${ticket.status === 'Open' ? 'bg-amber-50 text-amber-700 border-amber-200/50' :
                                        ticket.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200/50' :
                                            'bg-emerald-50 text-emerald-700 border-emerald-200/50'}`}>
                                    {ticket.status}
                                </span>
                                <button className="text-[12px] font-medium text-violet-600 hover:text-violet-700 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                    Assign to me
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/30">
                    <button className="text-[13px] font-medium text-slate-600 hover:text-slate-800 transition-colors w-full text-center">
                        View All Open Tickets (24)
                    </button>
                </div>
            </div>
        </div>
    );
}
