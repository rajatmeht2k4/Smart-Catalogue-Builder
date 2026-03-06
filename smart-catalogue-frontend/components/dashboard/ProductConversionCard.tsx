export function ProductConversionCard({ data = [] }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Conversion Rates</h3>

      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No conversion data available.</p>
      ) : (
        data.map((p) => {
          const rate = p.taps ? Math.round((p.conversions / p.taps) * 100) : 0;
          return (
            <div key={p.name || p.id} className="mb-5">
              <div className="flex justify-between text-sm">
                <span>{p.name} <span className="text-xs text-gray-500">(Conversion {p.conversions || 0})</span></span>
                <span>{rate}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500"
                  style={{ width: `${rate}%` }}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
