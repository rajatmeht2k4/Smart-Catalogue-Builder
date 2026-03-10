"use client";

import { Building2, Package, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function LiveActivityStream({ activities }: { activities: any[] }) {
    if (!activities || activities.length === 0) {
        return (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col items-center justify-center text-center text-slate-400">
                <Clock className="h-8 w-8 mb-3 opacity-20" />
                <p className="text-sm">No recent platform activity</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-[0px_2px_8px_rgba(0,0,0,0.02)] overflow-hidden  flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 bg-[#fcfcfc] flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                        Live Activity Stream
                    </h3>
                    <p className="text-[12px] text-slate-500 mt-0.5">Real-time pulse of platform interactions</p>
                </div>
                <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
            </div>

            <div className="flex-1 overflow-y-auto max-h-[400px]">
                <div className="divide-y divide-gray-100">
                    {activities.map((activity, i) => {
                        const isSignup = activity.type === 'business_signup';

                        return (
                            <div key={`${activity.id}-${i}`} className="p-4 hover:bg-gray-50/50 transition-colors flex gap-4">
                                <div className={`mt-1 h-9 w-9 rounded-full flex items-center justify-center shrink-0 border 
                  ${isSignup ? 'bg-violet-50 border-violet-100 text-violet-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                                    {isSignup ? <Building2 size={16} /> : <Package size={16} />}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <p className="text-[13px] font-semibold text-slate-800">
                                            {activity.title}
                                        </p>
                                        <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap ml-2">
                                            {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-slate-500 truncate">
                                        {activity.subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
