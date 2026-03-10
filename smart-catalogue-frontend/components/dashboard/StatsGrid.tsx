"use client";

import StatCard from "./StatCard";
import { Eye, MessageCircle, MousePointerClick, TrendingUp } from "lucide-react";

interface Trends {
  views: number;
  productClicks: number;
  whatsapp: number;
  engagement: number;
}

interface Summary {
  totalViews: number;
  whatsappClicks: number;
  productClicks: number;
  engagementRate: string;
  trends?: Trends;
}

export default function StatsGrid({ summary }: { summary?: Summary }) {
  const views = summary?.totalViews || 0;
  const whatsapp = summary?.whatsappClicks || 0;
  const productClicks = summary?.productClicks || 0;
  const engagement = summary?.engagementRate || "0";
  const trends = summary?.trends;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
      <StatCard
        title="Total Views"
        value={views}
        subtitle="Catalogue impressions"
        trend={trends?.views}
        icon={<Eye size={18} className="text-indigo-600" />}
        iconBg="bg-indigo-50"
      />

      <StatCard
        title="Product Clicks"
        value={productClicks}
        subtitle="Products viewed"
        trend={trends?.productClicks}
        icon={<MousePointerClick size={18} className="text-amber-600" />}
        iconBg="bg-amber-50"
      />

      <StatCard
        title="WhatsApp Enquiries"
        value={whatsapp}
        subtitle="Customer enquiries"
        trend={trends?.whatsapp}
        icon={<MessageCircle size={18} className="text-emerald-600" />}
        iconBg="bg-emerald-50"
      />

      <StatCard
        title="Engagement Rate"
        value={`${engagement}%`}
        subtitle="Enquiries / Views"
        trend={trends?.engagement}
        icon={<TrendingUp size={18} className="text-sky-600" />}
        iconBg="bg-sky-50"
      />
    </div>
  );
}
