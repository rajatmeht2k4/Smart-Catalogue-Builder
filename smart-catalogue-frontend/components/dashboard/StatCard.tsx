type StatCardProps = {
  title: string;
  value: number | string;
  subtitle: string;
  trend?: number;
  icon: React.ReactNode;
  iconBg: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBg,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>

        {trend !== undefined && trend !== 0 && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
              }`}
          >
            {trend >= 0 ? `+${trend}%` : `${trend}%`}
          </span>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{title}</p>
      </div>
    </div>
  );
}