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
  return (

    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">Top Performing Products</h2>
      <div className=" h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="productName" type="category" width={120} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip 
              contentStyle={{
                borderRadius:"6px"
              }
              }
            />
            <Bar dataKey="count" fill="#EC4899" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
