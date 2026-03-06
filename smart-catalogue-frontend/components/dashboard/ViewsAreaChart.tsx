"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function ViewsAreaChart({ data }: { data: any[] }) {
  // Map backend format {_id: 'YYYY-MM-DD', views: 5} to recharts format with weekday names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formattedData = data.map(d => {
    const date = new Date(d._id + "T00:00:00");
    const dayName = dayNames[date.getDay()];
    const dayNum = date.getDate();
    return {
      label: `${dayName} ${dayNum}`,
      views: d.views
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">Daily Views <span className="text-sm font-normal text-gray-400">(Last 7 days)</span></h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ value: 'Views', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#9ca3af' } }}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #eee', fontSize: '13px' }}
              formatter={(value: any) => [`${value} views`, 'Page Views']}
            />
            <Area dataKey="views" stroke="#8B5CF6" fill="#8B5CF620" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
