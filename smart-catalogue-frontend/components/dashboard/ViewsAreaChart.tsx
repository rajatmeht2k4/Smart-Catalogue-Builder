"use client";

import { viewsData } from "@/lib/mockAnalytics";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function ViewsAreaChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className=" font-semibold mb-3">Views, Clicks & Queries</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area dataKey="views" stroke="#8B5CF6" fill="#8B5CF620" />
            <Area dataKey="clicks" stroke="#EC4899" fill="#EC489920" />
            <Area dataKey="queries" stroke="#10B981" fill="#10B98120" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
