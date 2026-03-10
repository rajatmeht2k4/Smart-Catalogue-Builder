"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface DayData {
    day: string;
    views: number;
}

export default function DayOfWeekChart({ data, bestDay }: { data?: DayData[]; bestDay?: string }) {
    const chartData = data || [];

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100">
            <div className="flex items-start justify-between mb-1">
                <div>
                    <h2 className="text-sm font-semibold text-gray-900">Best Day of Week</h2>
                    <p className="text-xs text-gray-400 mt-0.5">When your catalogue gets the most traffic</p>
                </div>
                {bestDay && (
                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                        {bestDay}
                    </span>
                )}
            </div>

            <div className="h-52 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 11, fill: "#9ca3af" }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            allowDecimals={false}
                            tick={{ fontSize: 11, fill: "#9ca3af" }}
                            tickLine={false}
                            axisLine={false}
                            width={25}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                fontSize: "12px",
                                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                            }}
                            formatter={(value: any) => [`${value}`, "Views"]}
                        />
                        <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.day === bestDay ? "#f59e0b" : "#4f46e5"}
                                    fillOpacity={entry.day === bestDay ? 1 : 0.7}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
