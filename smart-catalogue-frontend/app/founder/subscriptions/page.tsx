"use client";

import { CreditCard, TrendingUp, DollarSign, DownloadCloud } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const planDistributionData = [
    { name: "Free Tier", value: 8400 },
    { name: "Pro Plan ($12/mo)", value: 3200 },
    { name: "Enterprise ($49/mo)", value: 850 },
];
const COLORS = ['#94a3b8', '#8b5cf6', '#10b981'];

const recentTransactions = [
    { id: "TX-9021", user: "Alice Freeman", plan: "Pro Plan", amount: "$12.00", date: "Today, 10:24 AM", status: "Succeeded" },
    { id: "TX-9020", user: "Tech Gadgets Outlet", plan: "Enterprise", amount: "$49.00", date: "Today, 09:12 AM", status: "Succeeded" },
    { id: "TX-9019", user: "Sweet Treats Bakery", plan: "Pro Plan", amount: "$12.00", date: "Yesterday", status: "Failed" },
    { id: "TX-9018", user: "Handcrafted Goods", plan: "Pro Plan", amount: "$12.00", date: "Yesterday", status: "Refunded" },
];

export default function SubscriptionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Subscription & Billing</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        Track recurring revenue, active subscriptions, and payment statuses.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-slate-600 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                    <DownloadCloud className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-violet-600" />
                        </div>
                        <h3 className="text-[13px] font-medium text-slate-500 uppercase tracking-wider">MRR</h3>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-slate-800">$80,050</span>
                        <span className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            +14.2%
                        </span>
                    </div>
                    <p className="text-[12px] text-slate-400 mt-2">vs last month ($70,050)</p>
                </div>

                <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 h-[150px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={planDistributionData}
                                    innerRadius={45}
                                    outerRadius={70}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {planDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number | undefined) => [`${value} Users`, undefined]}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-xl font-bold text-slate-800">12.4K</span>
                            <span className="text-[10px] text-slate-500 font-medium">TOTAL</span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                        <h3 className="text-[14px] font-semibold text-slate-800 mb-1">Plan Distribution</h3>
                        {planDistributionData.map((plan, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                    <span className="text-[13px] text-slate-600 font-medium">{plan.name}</span>
                                </div>
                                <span className="text-[13px] font-bold text-slate-800">{plan.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-slate-800">Recent Transactions</h3>
                    <button className="text-[13px] font-medium text-violet-600 hover:text-violet-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Transaction ID</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">User / Business</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Plan</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3.5 text-[12px] font-mono text-slate-500">{tx.id}</td>
                                    <td className="px-5 py-3.5 text-[13px] font-medium text-slate-700">{tx.user}</td>
                                    <td className="px-5 py-3.5 text-[12px] text-slate-600">{tx.plan}</td>
                                    <td className="px-5 py-3.5 text-[13px] font-semibold text-slate-800">{tx.amount}</td>
                                    <td className="px-5 py-3.5 text-[12px] text-slate-500">{tx.date}</td>
                                    <td className="px-5 py-3.5 text-right">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium
                                            ${tx.status === 'Succeeded' ? 'bg-emerald-50 text-emerald-700' :
                                                tx.status === 'Failed' ? 'bg-red-50 text-red-700' :
                                                    'bg-slate-100 text-slate-600'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
