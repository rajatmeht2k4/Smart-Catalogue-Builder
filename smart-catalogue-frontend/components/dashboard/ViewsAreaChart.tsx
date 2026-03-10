"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function ViewsAreaChart({ data }: { data: any[] }) {
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
    <div className="bg-white p-5 rounded-xl border border-gray-100">
      <h2 className="text-sm font-semibold text-gray-900 mb-1">Daily Views</h2>
      <p className="text-xs text-gray-400 mb-4">Last 7 days</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              }}
              formatter={(value: any) => [`${value}`, 'Views']}
            />
            <Area
              dataKey="views"
              stroke="#4f46e5"
              fill="#4f46e5"
              fillOpacity={0.08}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#4f46e5', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
