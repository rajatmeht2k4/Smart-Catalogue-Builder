"use client";

import { useState } from "react";
import { useSuperAdminBusinesses } from "@/lib/hooks";
import { Search, Building2, Package, Eye, Navigation, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function MasterBusinessDirectory() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1);
        const timer = setTimeout(() => {
            setDebouncedSearch(e.target.value);
        }, 500);
        return () => clearTimeout(timer);
    };

    const { businesses, pagination, isLoading, error } = useSuperAdminBusinesses(page, debouncedSearch);

    if (error) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="bg-red-50 border border-red-100 rounded-2xl p-8 max-w-md text-center shadow-sm">
                    <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                    <h3 className="text-red-800 font-semibold mb-2">Access Denied</h3>
                    <p className="text-red-600/80 text-[13px] leading-relaxed">Super Admin access required to view the Master Directory.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Master Directory (CRM)</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        Global index of all businesses registered on the platform.
                    </p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search businesses or slugs..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full sm:w-80 bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 shadow-sm transition-all"
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-[0px_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#fcfcfc] text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Business</th>
                                <th className="px-6 py-4">Status & Age</th>
                                <th className="px-6 py-4 text-center">Products</th>
                                <th className="px-6 py-4 text-center">Traffic</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                                        <div className="flex justify-center mb-3">
                                            <div className="h-6 w-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                        Loading directory...
                                    </td>
                                </tr>
                            ) : businesses.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center text-slate-500 bg-gray-50/50">
                                        No businesses found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                businesses.map((b: any) => (
                                    <tr key={b._id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0 border border-violet-100/50">
                                                    <Building2 className="h-5 w-5 text-violet-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800">{b.name}</p>
                                                    <a
                                                        href={`/catalogue/${b.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[12px] text-sky-600 hover:text-sky-700 flex items-center mt-0.5 group font-medium"
                                                    >
                                                        <LinkIcon className="h-3 w-3 mr-1 opacity-50 group-hover:opacity-100" />
                                                        /{b.slug}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className={`h-2 w-2 rounded-full ${b.productCount > 0 ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.4)]' : 'bg-amber-400'}`} />
                                                <span className="text-[13px] font-medium text-slate-700">{b.productCount > 0 ? 'Active' : 'Onboarding'}</span>
                                            </div>
                                            <span className="text-[11px] text-slate-500">
                                                Joined {formatDistanceToNow(new Date(b.createdAt), { addSuffix: true })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-slate-700 text-[13px] font-medium">
                                                <Package className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                                                {b.productCount}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-5">
                                                <div className="text-center">
                                                    <p className="text-slate-800 font-semibold text-[13px]">{b.totalViews || 0}</p>
                                                    <p className="text-[10px] text-slate-500 uppercase font-medium mt-0.5">Views</p>
                                                </div>
                                                <div className="w-px h-6 bg-gray-200" />
                                                <div className="text-center">
                                                    <p className="text-emerald-600 font-semibold text-[13px]">{b.totalClicks || 0}</p>
                                                    <p className="text-[10px] text-slate-500 uppercase font-medium mt-0.5">Leads</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end">
                                                <button className="p-2 border border-gray-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 bg-white rounded-lg text-slate-400 transition-all shadow-sm group" title="Impersonate Dashboard">
                                                    <Navigation className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {pagination && pagination.pages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 bg-[#fcfcfc] flex items-center justify-between">
                        <span className="text-[12px] text-slate-500 font-medium">
                            Showing page <span className="text-slate-800">{pagination.page}</span> of <span className="text-slate-800">{pagination.pages}</span> ({pagination.total} total)
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-slate-700 disabled:opacity-50 hover:bg-gray-50 shadow-sm transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                disabled={page === pagination.pages}
                                className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-slate-700 disabled:opacity-50 hover:bg-gray-50 shadow-sm transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
