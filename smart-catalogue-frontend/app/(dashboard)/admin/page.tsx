"use client";
import { useState } from "react";
import ViewsAreaChart from "@/components/dashboard/ViewsAreaChart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DeviceBreakdownChart from "@/components/dashboard/DeviceBreakdownChart";
import TrafficSourcesCard from "@/components/dashboard/TrafficSourcesCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import PeakHoursChart from "@/components/dashboard/PeakHoursChart";
import ConversionFunnel from "@/components/dashboard/ConversionFunnel";
import DayOfWeekChart from "@/components/dashboard/DayOfWeekChart";
import SourceConversionCard from "@/components/dashboard/SourceConversionCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { ProductAnalyticsTable } from "@/components/dashboard/ProductAnalyticsTable";
import PerformanceScores from "@/components/dashboard/PerformanceScores";
import { SmartInsights } from "@/components/dashboard/SmartInsights";
import { useDashboardAnalytics, useBusiness } from "@/lib/hooks";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "audience", label: "Audience" },
  { id: "insights", label: "Insights" },
] as const;

type TabId = typeof tabs[number]["id"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const { analytics, isLoading: analyticsLoading } = useDashboardAnalytics();
  const { business, isLoading: businessLoading } = useBusiness();

  const isLoading = analyticsLoading || businessLoading;

  return (
    <div>
      <DashboardHeader />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-600 border-t-transparent" />
        </div>
      ) : (
        <>
          <StatsGrid summary={analytics?.summary} />

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mt-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative
                  ${activeTab === tab.id
                    ? "text-indigo-700"
                    : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <ViewsAreaChart data={analytics?.dailyViews || []} />
                <PeakHoursChart data={analytics?.peakHours || []} />
              </div>
              <ConversionFunnel data={analytics?.funnelData} />
              <RecentActivityCard data={analytics?.recentActivity || []} />
            </>
          )}

          {activeTab === "products" && (
            <div className="mt-6">
              <ProductAnalyticsTable data={analytics?.topProducts || []} />
            </div>
          )}

          {activeTab === "audience" && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DayOfWeekChart data={analytics?.dayOfWeek} bestDay={analytics?.bestDay} />
                <SourceConversionCard data={analytics?.sourceConversion} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <DeviceBreakdownChart data={analytics?.deviceBreakdown || []} />
                <TrafficSourcesCard data={analytics?.trafficSources || []} />
              </div>
            </div>
          )}

          {activeTab === "insights" && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <PerformanceScores data={analytics?.performanceScores || []} />
              </div>
              <SmartInsights data={analytics?.insights} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
