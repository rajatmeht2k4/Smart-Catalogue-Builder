"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function PeakHoursChart({ data }: { data: any[] }) {
  // Map backend format {_id: 14, count: 5} to recharts format
  const formattedData = data.map(d => {
    const hourNum = d._id;
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    let hour12 = hourNum % 12;
    if (hour12 === 0) hour12 = 12;

    return {
      hour: `${hour12} ${ampm}`,
      visitors: d.count
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-3">Peak Hours</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ value: 'Visitors', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#9ca3af' } }}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid #eee', fontSize: '13px' }}
              formatter={(value: any) => [`${value} visitors`, 'Peak Traffic']}
            />
            <Bar dataKey="visitors" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
