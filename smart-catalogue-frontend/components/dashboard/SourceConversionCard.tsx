"use client";

import { Globe, MessageCircle, Link as LinkIcon } from "lucide-react";

interface SourceData {
    source: string;
    sourceKey: string;
    views: number;
    clicks: number;
    enquiries: number;
    clickRate: number;
    enquiryRate: number;
}

const sourceIcons: Record<string, any> = {
    direct: LinkIcon,
    social: MessageCircle,
    referral: Globe,
};

export default function SourceConversionCard({ data }: { data?: SourceData[] }) {
    const sources = data || [];

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Channel Performance</h2>
            <p className="text-xs text-gray-400 mb-4">Which traffic source converts best</p>

            <div className="space-y-4">
                {sources.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">No traffic data yet.</p>
                ) : (
                    sources.map((s, i) => {
                        const Icon = sourceIcons[s.sourceKey] || Globe;
                        return (
                            <div key={i} className="p-3 rounded-lg bg-gray-50/50">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Icon size={14} className="text-gray-400" />
                                        <span className="text-sm font-medium text-gray-800">{s.source}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{s.views} views</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">{s.clickRate}%</p>
                                        <p className="text-xs text-gray-400">Click Rate</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-emerald-600">{s.enquiryRate}%</p>
                                        <p className="text-xs text-gray-400">Enquiry Rate</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
