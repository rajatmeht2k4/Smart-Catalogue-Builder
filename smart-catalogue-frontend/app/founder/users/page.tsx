"use client";

import { Users, Search, MoreVertical, Shield, ShieldOff, Mail } from "lucide-react";

const mockUsers = [
    { id: "1", name: "Alice Freeman", email: "alice@vintageclothing.com", business: "Vintage Clothing Co.", role: "Owner", status: "Active", joined: "Oct 12, 2025" },
    { id: "2", name: "Bob Smith", email: "bob@techgadgets.io", business: "Tech Gadgets Outlet", role: "Owner", status: "Active", joined: "Nov 05, 2025" },
    { id: "3", name: "Carol Davis", email: "carol@bakery.com", business: "Sweet Treats Bakery", role: "Staff", status: "Suspended", joined: "Dec 01, 2025" },
    { id: "4", name: "David Chen", email: "david@chenelectronics.com", business: "Chen Electronics", role: "Owner", status: "Active", joined: "Jan 15, 2026" },
    { id: "5", name: "Emma Wilson", email: "emma@handcrafted.net", business: "Handcrafted Goods by Emma", role: "Owner", status: "Active", joined: "Feb 20, 2026" },
];

export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">User Management</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        View and manage all registered users across the platform.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-3">
                        <Users className="w-4 h-4 text-violet-600" />
                        <div>
                            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Users</div>
                            <div className="text-lg font-bold text-slate-800 leading-tight">12,450</div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-3">
                        <ShieldOff className="w-4 h-4 text-red-500" />
                        <div>
                            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Suspended</div>
                            <div className="text-lg font-bold text-slate-800 leading-tight">42</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or business..."
                            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="text-[12px] border border-gray-200 rounded-md px-2 py-1.5 bg-white text-slate-700 outline-none focus:border-violet-500">
                            <option>All Roles</option>
                            <option>Owners</option>
                            <option>Staff</option>
                        </select>
                        <select className="text-[12px] border border-gray-200 rounded-md px-2 py-1.5 bg-white text-slate-700 outline-none focus:border-violet-500">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Suspended</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">User</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Business</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Joined</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs shrink-0">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-[13px] font-semibold text-slate-800">{user.name}</div>
                                                <div className="text-[12px] text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[13px] text-slate-700 font-medium">
                                        {user.business}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium
                                            ${user.role === 'Owner' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                            <span className="text-[12px] font-medium text-slate-700">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[12px] text-slate-500 hidden sm:table-cell">
                                        {user.joined}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-slate-400 hover:text-blue-600 transition-colors tooltip" title="Email User">
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <button className="text-slate-400 hover:text-red-600 transition-colors tooltip" title={user.status === 'Active' ? 'Suspend' : 'Activate'}>
                                                {user.status === 'Active' ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4 text-red-500" />}
                                            </button>
                                            <button className="text-slate-400 hover:text-slate-700 transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
                    <span className="text-[12px] text-slate-500">Showing 1 to 5 of 12,450 results</span>
                    <div className="flex gap-1 text-[12px]">
                        <button className="px-3 py-1 border border-gray-200 rounded bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1 border border-gray-200 rounded bg-white text-slate-700 hover:bg-slate-50 font-medium">1</button>
                        <button className="px-3 py-1 border border-gray-200 rounded bg-white text-slate-500 hover:bg-slate-50">2</button>
                        <button className="px-3 py-1 border border-gray-200 rounded bg-white text-slate-500 hover:bg-slate-50">3</button>
                        <span className="px-2 py-1 text-slate-400">...</span>
                        <button className="px-3 py-1 border border-gray-200 rounded bg-white text-slate-500 hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
