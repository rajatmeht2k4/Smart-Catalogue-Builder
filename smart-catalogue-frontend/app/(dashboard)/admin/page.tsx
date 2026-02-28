"use client";
import { useEffect, useState } from "react";
import { mockSummary, mockProductClicks, mockTrafficSources, mockDeviceBreakdown } from "@/lib/mockAnalytics";
import ViewsAreaChart from "@/components/dashboard/ViewsAreaChart";
import { TopProductsList } from "@/components/dashboard/TopProductsList";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DeviceBreakdownChart from "@/components/dashboard/DeviceBreakdownChart";
import TrafficSourcesCard from "@/components/dashboard/TrafficSourcesCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import PeakHoursChart from "@/components/dashboard/PeakHoursChart";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { ProductConversionCard } from "@/components/dashboard/ProductConversionCard";
import { PerformanceRecommendations } from "@/components/dashboard/PerformanceRecommendations";
import { VisitorInsights } from "@/components/dashboard/VisitorInsights";
import { ProductAnalyticsTable } from "@/components/dashboard/ProductAnalyticsTable";
import PerformanceScores from "@/components/dashboard/PerformanceScores";

export default function AdminPage() {
  const [shops, setShops] = useState<any[]>([]);
  const [shopId, setShopId] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({ views: 0, whatsapp: 0 });

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "audience" | "performance">("overview");


  useEffect(() => {
    setStats(mockSummary);
  }, [shopId]);

  return (
    <div>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main>
        <DashboardHeader />



        {/* Stats */}
        <StatsGrid />


        {/* Share Link */}
        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3 mt-8">
          <p className="text-sm text-gray-600 shrink-0">Share your catalogue:</p>
          <input
            value="http://localhost:3000/catalogue/demo"
            readOnly
            className="border rounded-xl px-3 py-2 flex-1"
          />
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg whitespace-nowrap">
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
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <ViewsAreaChart />
              <PeakHoursChart />
            </div>

            {/* Recent Activity */}
            <RecentActivityCard />

          </>
        )}



        {activeTab === "products" && (
          <>
            <ProductAnalyticsTable />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* <TopProductsList data={mockProductClicks} />

              <ProductConversionCard /> */}
            </div>
          </>
        )}

        {activeTab === "audience" && (
          <div className="mt-4">
            <VisitorInsights />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Device Breakdown */}
              <DeviceBreakdownChart data={mockDeviceBreakdown} />

              {/* Traffic Sources */}
              <TrafficSourcesCard data={mockTrafficSources} />
            </div>
          </div>
        )}




        {activeTab === "performance" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

            <PerformanceScores />

              <PerformanceRecommendations />
            </div>
        )}






      </main>
    </div>
  );
}
