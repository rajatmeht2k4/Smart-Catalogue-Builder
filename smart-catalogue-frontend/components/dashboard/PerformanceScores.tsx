import { mockPerformanceMetrics } from "@/lib/mockAnalytics";

const statusColorMap: Record<string, string> = {
  excellent: "bg-green-100 text-green-700",
  good: "bg-blue-100 text-blue-700",
  bad: "bg-red-100 text-red-700",
};

export default function PerformanceScores() {
  return (
    <>
      {mockPerformanceMetrics.map((item) => (
        <div
          key={item.title}
          className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between"
        >
          <div>
            <p className="text-sm text-gray-500">{item.title}</p>
            <h3 className="text-2xl font-semibold mt-2">{item.value}</h3>
          </div>

          <div className="mt-3">
            <span
              className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${statusColorMap[item.status]}`}
            >
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
