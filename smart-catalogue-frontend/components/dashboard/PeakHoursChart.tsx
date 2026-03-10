"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function PeakHoursChart({ data }: { data: any[] }) {
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
    <div className="bg-white p-5 rounded-xl border border-gray-100">
      <h2 className="text-sm font-semibold text-gray-900 mb-1">Peak Hours</h2>
      <p className="text-xs text-gray-400 mb-4">IST timezone</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              width={25}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              }}
              formatter={(value: any) => [`${value}`, 'Visitors']}
            />
            <Bar dataKey="visitors" fill="#4f46e5" fillOpacity={0.85} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
