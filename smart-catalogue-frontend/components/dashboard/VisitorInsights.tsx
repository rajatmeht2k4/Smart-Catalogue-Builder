export function VisitorInsights({ data }: { data?: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-4">Visitor Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-2xl font-bold text-purple-600">{data?.avgSessionDuration || "0m 0s"}</p>
          <p className="text-sm text-gray-500">Avg. Session Duration</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-purple-600">{data?.pagesPerSession || "0"}</p>
          <p className="text-sm text-gray-500">Interactions per Session</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-purple-600">{data?.newVisitors || "0%"}</p>
          <p className="text-sm text-gray-500">New Visitors</p>
        </div>
      </div>
    </div>
  );
}
