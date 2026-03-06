import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function TopProductsList({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">Top Performing Products</h2>
        <div className="h-72 flex items-center justify-center text-sm text-gray-500">
          No product data available yet.
        </div>
      </div>
    );
  }

  return (

    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">Top Performing Products</h2>
      <div className=" h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={120} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              contentStyle={{
                borderRadius: "6px"
              }
              }
            />
            <Bar dataKey="clicks" fill="#EC4899" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
