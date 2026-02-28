"use client";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#8B5CF6", "#EC4899", "#F59E0B"]; // Mobile, Desktop, Tablet

export default function DeviceBreakdownChart({ data }: { data: any[] }) {
    return (

        <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="font-semibold">Device Breakdown</h2>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            nameKey="name"
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            paddingAngle={1}
                            cornerRadius={3}


                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #eee",
                                fontSize: "12px",
                            }}
                            formatter={(value, name) => [`${value}%`, name]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom legend like Figma */}
            <div className="grid grid-cols-3 text-center">
                <div className="flex flex-col items-center gap-1 text-purple-600">
                    <Smartphone size={20} />
                    <p className="text-sm">Mobile</p>
                    <p className="font-semibold">68%</p>
                </div>

                <div className="flex flex-col items-center gap-1 text-pink-600">
                    <Monitor size={20} />
                    <p className="text-sm">Desktop</p>
                    <p className="font-semibold">25%</p>
                </div>

                <div className="flex flex-col items-center gap-1 text-orange-500">
                    <Tablet size={20} />
                    <p className="text-sm">Tablet</p>
                    <p className="font-semibold">7%</p>
                </div>
            </div>
        </div>
    );
}
