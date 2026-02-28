"use client";

import { Globe } from "lucide-react";

type TrafficSource = {
  source: string;
  visits: number;
  percentage: number;
};

export default function TrafficSourcesCard({ data }: { data: TrafficSource[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-3">
        Traffic Sources
      </h3>

      <div className="space-y-4">
        {data.map((source, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {source.source}
                </span>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-900 font-medium">
                  {source.visits}
                </div>
                <div className="text-xs text-gray-500">
                  {source.percentage}%
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${source.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
