"use client";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLOR_MAP: Record<string, string> = {
    mobile: "#4f46e5",
    desktop: "#3b82f6",
    tablet: "#f59e0b",
};

export default function DeviceBreakdownChart({ data }: { data: any[] }) {
    const formattedData = data.map(d => ({
        name: d._id.charAt(0).toUpperCase() + d._id.slice(1),
        value: d.count,
        color: COLOR_MAP[d._id.toLowerCase()] || "#94a3b8"
    }));

    const total = formattedData.reduce((acc, curr) => acc + curr.value, 0);

    const getPercentage = (name: string) => {
        if (total === 0) return 0;
        const item = formattedData.find(d => d.name.toLowerCase() === name.toLowerCase());
        return item ? Math.round((item.value / total) * 100) : 0;
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Device Breakdown</h2>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            nameKey="name"
                            data={formattedData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={45}
                            paddingAngle={2}
                            cornerRadius={4}
                        >
                            {formattedData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                fontSize: "12px",
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                            }}
                            formatter={(value, name) => [`${value}`, name]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 text-center mt-2">
                <div className="flex flex-col items-center gap-1">
                    <Smartphone size={16} className="text-indigo-600" />
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="text-sm font-semibold text-gray-900">{getPercentage("mobile")}%</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <Monitor size={16} className="text-blue-500" />
                    <p className="text-xs text-gray-500">Desktop</p>
                    <p className="text-sm font-semibold text-gray-900">{getPercentage("desktop")}%</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <Tablet size={16} className="text-amber-500" />
                    <p className="text-xs text-gray-500">Tablet</p>
                    <p className="text-sm font-semibold text-gray-900">{getPercentage("tablet")}%</p>
                </div>
            </div>
        </div>
    );
}
