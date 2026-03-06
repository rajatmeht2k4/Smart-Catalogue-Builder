"use client";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Fixed color mapping by device name, not by array index
const COLOR_MAP: Record<string, string> = {
    mobile: "#8B5CF6",   // Purple
    desktop: "#EC4899",  // Pink
    tablet: "#F59E0B",   // Orange
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
        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="font-semibold">Device Breakdown</h2>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            nameKey="name"
                            data={formattedData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            paddingAngle={1}
                            cornerRadius={3}
                        >
                            {formattedData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #eee",
                                fontSize: "12px",
                            }}
                            formatter={(value, name) => [`${value}`, name]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom legend */}
            <div className="grid grid-cols-3 text-center">
                <div className="flex flex-col items-center gap-1 text-purple-600">
                    <Smartphone size={20} />
                    <p className="text-sm">Mobile</p>
                    <p className="font-semibold">{getPercentage("mobile")}%</p>
                </div>

                <div className="flex flex-col items-center gap-1 text-pink-600">
                    <Monitor size={20} />
                    <p className="text-sm">Desktop</p>
                    <p className="font-semibold">{getPercentage("desktop")}%</p>
                </div>

                <div className="flex flex-col items-center gap-1 text-orange-500">
                    <Tablet size={20} />
                    <p className="text-sm">Tablet</p>
                    <p className="font-semibold">{getPercentage("tablet")}%</p>
                </div>
            </div>
        </div>
    );
}
