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
      <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg ">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
            {icon}
          </div>
  
          {trend !== undefined && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                trend >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {trend >= 0 ? `+${trend}%` : `${trend}%`}
            </span>
          )}
        </div>
  
        <div className="mt-4">
          <h3 className="text-2xl font-semibold">{value}</h3>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>
    );
  }
  