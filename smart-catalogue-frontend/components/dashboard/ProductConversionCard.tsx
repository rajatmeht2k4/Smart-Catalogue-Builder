import { topProductsData } from "@/lib/mockAnalytics";

export function ProductConversionCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Conversion Rates</h3>
    
      {topProductsData.map((p) => {
        const rate = Math.round((p.conversions / p.taps) * 100);
        return (
          <div key={p.name} className="mb-5">
            <div className="flex justify-between text-sm">
              <span>{p.name} <span className="text-xs    text-gray-500">(Conversion {p.conversions})</span></span>
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
      })}
    </div>
  );
}
