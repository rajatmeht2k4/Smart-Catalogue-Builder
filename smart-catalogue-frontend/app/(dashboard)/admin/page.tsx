"use client";
import { useState } from "react";
import ViewsAreaChart from "@/components/dashboard/ViewsAreaChart";
import { TopProductsList } from "@/components/dashboard/TopProductsList";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DeviceBreakdownChart from "@/components/dashboard/DeviceBreakdownChart";
import TrafficSourcesCard from "@/components/dashboard/TrafficSourcesCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import PeakHoursChart from "@/components/dashboard/PeakHoursChart";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { VisitorInsights } from "@/components/dashboard/VisitorInsights";
import { ProductAnalyticsTable } from "@/components/dashboard/ProductAnalyticsTable";
import PerformanceScores from "@/components/dashboard/PerformanceScores";
import { PerformanceRecommendations } from "@/components/dashboard/PerformanceRecommendations";
import { useDashboardAnalytics, useBusiness } from "@/lib/hooks";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "audience" | "performance">("overview");
  const { analytics, isLoading: analyticsLoading } = useDashboardAnalytics();
  const { business, isLoading: businessLoading } = useBusiness();

  const isLoading = analyticsLoading || businessLoading;

  return (
    <div>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main>
        <DashboardHeader />

        {isLoading ? (
          <div className="flex justify-center items-center py-20 mt-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <StatsGrid summary={analytics?.summary} />

            {/* Share Link */}
            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3 mt-8">
              <p className="text-sm text-gray-600 shrink-0">Share your catalogue:</p>
              <input
                value={`http://localhost:3000/catalogue/${business?.slug || ""}`}
                readOnly
                className="border rounded-xl px-3 py-2 flex-1"
              />
              <button
                onClick={() => navigator.clipboard.writeText(`http://localhost:3000/catalogue/${business?.slug || ""}`)}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Copy Link
              </button>
            </div>

            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-full p-1 w-full justify-between gap-1 mt-6 ">
              {[
                { id: "overview", label: "Overview" },
                { id: "products", label: "Products" },
                { id: "audience", label: "Audience" },
                { id: "performance", label: "Performance" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2 rounded-full text-sm font-medium transition ${activeTab === tab.id
                    ? "bg-white shadow"
                    : "text-gray-500 hover:text-black"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <ViewsAreaChart data={analytics?.dailyViews || []} />
                  <PeakHoursChart data={analytics?.peakHours || []} />
                </div>
                <RecentActivityCard data={analytics?.recentActivity || []} />
              </>
            )}

            {activeTab === "products" && (
              <div className="mt-8">
                <ProductAnalyticsTable data={analytics?.topProducts || []} />
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <TopProductsList data={analytics?.topProducts || []} />
                </div> */}
              </div>
            )}

            {activeTab === "audience" && (
              <div className="mt-8">
                <VisitorInsights data={analytics?.visitorInsights} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <DeviceBreakdownChart data={analytics?.deviceBreakdown || []} />
                  <TrafficSourcesCard data={analytics?.trafficSources || []} />
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <PerformanceScores data={analytics?.performanceScores || []} />
                <PerformanceRecommendations />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
