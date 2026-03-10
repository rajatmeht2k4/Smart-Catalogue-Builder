"use client";

import { Layers, Search, MoreVertical, Eye, Box, AlertTriangle } from "lucide-react";

const mockCatalogues = [
    { id: "1", name: "Summer Collection 2026", owner: "Vintage Clothing Co.", products: 45, views: "12.4K", status: "Published", updated: "2 hours ago" },
    { id: "2", name: "Tech Accessories", owner: "Tech Gadgets Outlet", products: 120, views: "8.1K", status: "Published", updated: "1 day ago" },
    { id: "3", name: "Custom Cakes Menu", owner: "Sweet Treats Bakery", products: 24, views: "3.2K", status: "Flagged", updated: "3 days ago" },
    { id: "4", name: "Home Appliances Promo", owner: "Chen Electronics", products: 8, views: "950", status: "Draft", updated: "4 days ago" },
    { id: "5", name: "Artisan Leather Bags", owner: "Handcrafted Goods by Emma", products: 16, views: "5.6K", status: "Published", updated: "1 week ago" },
];

export default function CataloguesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Catalogue Moderation</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        Monitor all published catalogues and review flagged content.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-3">
                        <Layers className="w-4 h-4 text-violet-600" />
                        <div>
                            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Active</div>
                            <div className="text-lg font-bold text-slate-800 leading-tight">4,280</div>
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
                            placeholder="Search catalogues by name or owner..."
                            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="text-[12px] border border-gray-200 rounded-md px-2 py-1.5 bg-white text-slate-700 outline-none focus:border-violet-500">
                            <option>All Statuses</option>
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Flagged</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Catalogue Name</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Owner</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Metrics</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Last Updated</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockCatalogues.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="text-[13px] font-semibold text-slate-800">{cat.name}</div>
                                        <div className="text-[12px] text-slate-500 sm:hidden">{cat.owner}</div>
                                    </td>
                                    <td className="px-5 py-4 text-[13px] text-slate-600 font-medium hidden sm:table-cell">
                                        {cat.owner}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-4 text-[12px] text-slate-500 font-medium">
                                            <div className="flex items-center gap-1.5 tooltip" title="Total Products">
                                                <Box className="w-3.5 h-3.5" />
                                                {cat.products}
                                            </div>
                                            <div className="flex items-center gap-1.5 tooltip" title="Total Views">
                                                <Eye className="w-3.5 h-3.5" />
                                                {cat.views}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium
                                            ${cat.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' :
                                                cat.status === 'Flagged' ? 'bg-red-50 text-red-700 border border-red-200/50' :
                                                    'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                            {cat.status === 'Flagged' && <AlertTriangle className="w-3 h-3 mr-1" />}
                                            {cat.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-[12px] text-slate-500 hidden md:table-cell">
                                        {cat.updated}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-slate-400 hover:text-violet-600 transition-colors tooltip" title="View Live Catalogue">
                                                <Eye className="w-4 h-4" />
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
            </div>
        </div>
    );
}
