import { mockProductAnalytics } from "@/lib/mockAnalytics";

export function ProductAnalyticsTable() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-6">
      <h2 className="font-semibold mb-4">Product Analytics</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="text-left py-2">Product</th>
              <th className="text-right py-2">Views</th>
              <th className="text-right py-2">Clicks</th>
              <th className="text-right py-2">Queries</th>
              <th className="text-right py-2">Rate</th>
            </tr>
          </thead>

          <tbody>
            {mockProductAnalytics.map((p, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50 border-gray-300">
                <td className="py-3">{p.name}</td>
                <td className="py-3 text-right">{p.views}</td>
                <td className="py-3 text-right">{p.clicks}</td>
                <td className="py-3 text-right">{p.queries}</td>
                <td className="py-3 text-right">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    {p.rate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
