export function ProductAnalyticsTable({ data = [] }: { data: any[] }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 mt-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Product Analytics</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400">
              <th className="text-left py-2.5 font-medium">Product</th>
              <th className="text-right py-2.5 font-medium">Clicks</th>
              <th className="text-right py-2.5 font-medium">Enquiries</th>
              <th className="text-right py-2.5 font-medium">Conversion</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">No product analytics data yet.</td>
              </tr>
            ) : (
              data.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-3 text-gray-800 font-medium">{p.name}</td>
                  <td className="py-3 text-right text-gray-600">{p.clicks || 0}</td>
                  <td className="py-3 text-right text-gray-600">{p.queries || 0}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${(p.conversionRate || 0) > 10
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-gray-100 text-gray-500"
                      }`}>
                      {p.conversionRate || 0}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
