"use client";

import { Globe, MessageCircle, Link as LinkIcon } from "lucide-react";

const sourceIcons: Record<string, any> = {
  direct: LinkIcon,
  social: MessageCircle,
  referral: Globe,
};

const sourceColors: Record<string, string> = {
  direct: "bg-indigo-600",
  social: "bg-blue-500",
  referral: "bg-emerald-500",
};

export default function TrafficSourcesCard({ data }: { data: any[] }) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  const formattedData = data.map(d => ({
    source: d._id.charAt(0).toUpperCase() + d._id.slice(1),
    sourceKey: d._id,
    visits: d.count,
    percentage: total > 0 ? Math.round((d.count / total) * 100) : 0
  })).sort((a, b) => b.visits - a.visits);

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Traffic Sources</h2>

      <div className="space-y-4">
        {formattedData.map((source, index) => {
          const Icon = sourceIcons[source.sourceKey] || Globe;
          const barColor = sourceColors[source.sourceKey] || "bg-gray-400";

          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-700">{source.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{source.visits}</span>
                  <span className="text-xs text-gray-400">{source.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className={`${barColor} h-1.5 rounded-full transition-all duration-500`}
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        {formattedData.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No traffic data yet.</p>
        )}
      </div>
    </div>
  );
}
