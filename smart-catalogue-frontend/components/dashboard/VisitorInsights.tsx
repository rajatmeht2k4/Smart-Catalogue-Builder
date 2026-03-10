import { Clock, MousePointerClick, UserPlus } from "lucide-react";

export function VisitorInsights({ data }: { data?: any }) {
  const stats = [
    {
      icon: Clock,
      label: "Avg. Session Duration",
      value: data?.avgSessionDuration || "0m 0s",
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: MousePointerClick,
      label: "Interactions per Session",
      value: data?.pagesPerSession || "0",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: UserPlus,
      label: "New Visitors",
      value: data?.newVisitors || "0%",
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Visitor Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/50">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon size={16} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
