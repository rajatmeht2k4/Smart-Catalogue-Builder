"use client";

import StatCard from "./StatCard";
import { Clock, Eye, MessageCircle, MousePointerClick, TrendingUp, Users } from "lucide-react";

interface Summary {
  totalViews: number;
  totalClicks: number;
  whatsappClicks: number;
  productClicks: number;
  conversionRate: string;
  avgSessionDuration: string;
}

export default function StatsGrid({ summary }: { summary?: Summary }) {
  const views = summary?.totalViews || 0;
  const clicks = summary?.totalClicks || 0;
  const whatsapp = summary?.whatsappClicks || 0;
  const productClicks = summary?.productClicks || 0;
  const conversion = summary?.conversionRate || "0";
  const avgSession = summary?.avgSessionDuration || "0m 0s";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <StatCard
        title="Total Views"
        value={views}
        subtitle="Catalogue impressions"
        trend={0}
        icon={<Eye size={18} className="text-blue-600" />}
        iconBg="bg-blue-100"
      />

      <StatCard
        title="Total Clicks"
        value={clicks}
        subtitle="All interactions"
        trend={0}
        icon={<MousePointerClick size={18} className="text-orange-600" />}
        iconBg="bg-orange-100"
      />

      <StatCard
        title="WhatsApp Clicks"
        value={whatsapp}
        subtitle="Customer enquiries"
        trend={0}
        icon={<MessageCircle size={18} className="text-green-600" />}
        iconBg="bg-green-100"
      />

      <StatCard
        title="Product Clicks"
        value={productClicks}
        subtitle="Products viewed"
        trend={0}
        icon={<Users size={18} className="text-purple-600" />}
        iconBg="bg-purple-100"
      />

      <StatCard
        title="Conversion Rate"
        value={`${conversion}%`}
        subtitle="Clicks / Views"
        trend={0}
        icon={<TrendingUp size={18} className="text-pink-600" />}
        iconBg="bg-pink-100"
      />

      <StatCard
        title="Avg. Session"
        value={avgSession}
        subtitle="Time on catalogue"
        trend={0}
        icon={<Clock size={18} className="text-amber-600" />}
        iconBg="bg-amber-100"
      />
    </div>
  );
}
