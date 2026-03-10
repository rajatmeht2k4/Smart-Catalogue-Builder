"use client";

import { ShieldCheck, Plus, Trash2, Edit2 } from "lucide-react";

const mockAdmins = [
    { name: "Global Founder", email: "admin@npmart.com", role: "Super Admin", access: "Full System" },
    { name: "Sarah Jennings", email: "sarah@staff.com", role: "Moderator", access: "Catalogues & Users" },
    { name: "Mike Thompson", email: "mike@staff.com", role: "Support Team", access: "Tickets Only" },
];

export default function RolesPage() {
    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Roles & Permissions</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        Manage your staff and assign system access levels.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-medium text-[13px] shadow-sm">
                    <Plus className="w-4 h-4" />
                    Invite Admin
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Available Roles Context */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-4 h-4 text-violet-600" />
                            <h3 className="text-[14px] font-semibold text-slate-800">Role Definitions</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-[13px] font-bold text-slate-800">Super Admin</h4>
                                <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">Unrestricted access. Can modify system settings, billing, and all user data.</p>
                            </div>
                            <div className="h-px w-full bg-gray-100" />
                            <div>
                                <h4 className="text-[13px] font-bold text-slate-800">Moderator</h4>
                                <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">Can suspend users, delete flagged catalogues, and view analytics. Cannot modify system settings.</p>
                            </div>
                            <div className="h-px w-full bg-gray-100" />
                            <div>
                                <h4 className="text-[13px] font-bold text-slate-800">Support Team</h4>
                                <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">Can read user data and manage support tickets only.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Roster */}
                <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="text-[14px] font-semibold text-slate-800">Current Staff</h3>
                        <span className="text-[12px] font-medium text-slate-500">3 Active Members</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-white">
                                    <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Staff Member</th>
                                    <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                    <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockAdmins.map((admin, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="text-[13px] font-semibold text-slate-800">{admin.name}</div>
                                            <div className="text-[12px] text-slate-500">{admin.email}</div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div>
                                                <div className="text-[13px] font-semibold text-slate-700">{admin.role}</div>
                                                <div className="text-[11px] text-slate-400 mt-0.5">{admin.access}</div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3 text-slate-400">
                                                <button className="hover:text-blue-600 transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                {admin.role !== 'Super Admin' && (
                                                    <button className="hover:text-red-600 transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
