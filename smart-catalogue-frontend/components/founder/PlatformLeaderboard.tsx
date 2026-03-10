"use client";

import { Crown, Eye, MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export function PlatformLeaderboard({ topBusinesses }: { topBusinesses: any[] }) {
    if (!topBusinesses || topBusinesses.length === 0) return null;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                        <Crown className="h-5 w-5 text-amber-500 mr-2.5" />
                        Power User Leaderboard
                    </h3>
                    <p className="text-[13px] text-slate-500 mt-1">Top performing catalogues by global traffic</p>
                </div>
            </div>

            <div className="space-y-3">
                {topBusinesses.map((business, index) => (
                    <div
                        key={business._id}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-amber-100 text-amber-600 border border-amber-200' :
                                    index === 1 ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                                        index === 2 ? 'bg-orange-100 text-orange-600 border border-orange-200' :
                                            'bg-gray-100 text-gray-500'
                                }`}>
                                #{index + 1}
                            </div>
                            <div className="min-w-0">
                                <Link href={`/catalogue/${business.slug}`} target="_blank" className="font-semibold text-sm text-slate-800 hover:text-violet-600 transition-colors flex items-center group">
                                    <span className="truncate max-w-[200px]">{business.name}</span>
                                    <ExternalLink className="h-3 w-3 ml-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                </Link>
                                <div className="text-[11px] text-slate-500 mt-0.5">
                                    Joined {formatDistanceToNow(new Date(business.createdAt), { addSuffix: true })}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 sm:gap-8 text-right shrink-0 ml-4">
                            <div>
                                <p className="text-sm font-semibold text-slate-800 flex items-center justify-end">
                                    {business.totalViews?.toLocaleString() || 0}
                                    <Eye className="h-3.5 w-3.5 text-sky-500 ml-1.5" />
                                </p>
                                <p className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">Views</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <p className="text-sm font-semibold text-slate-800 flex items-center justify-end">
                                    {business.totalClicks?.toLocaleString() || 0}
                                    <MessageCircle className="h-3.5 w-3.5 text-emerald-500 ml-1.5" />
                                </p>
                                <p className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">Leads</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
