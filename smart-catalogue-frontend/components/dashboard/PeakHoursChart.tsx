"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const hourlyData = [
  { hour: "6AM", views: 5 },
  { hour: "9AM", views: 15 },
  { hour: "12PM", views: 35 },
  { hour: "3PM", views: 45 },
  { hour: "6PM", views: 65 },
  { hour: "9PM", views: 55 },
];

export default function PeakHoursChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className=" font-semibold mb-3">Peak Hours</h2>
      <div className="  h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
