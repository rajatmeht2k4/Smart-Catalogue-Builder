"use client";

import StatCard from "./StatCard";
import { Clock, Eye, MessageCircle, MousePointerClick, TrendingUp, Users } from "lucide-react";

export default function StatsGrid() {
  return (
    <>
     {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <StatCard
                  title="Total Views"
                  value={543}
                  subtitle="Catalogue impressions"
                  trend={15}
                  icon={<Eye size={18} className="text-blue-600" />}
                  iconBg="bg-blue-100"
                  
                />
      
                <StatCard
                  title="Unique Visitors"
                  value={234}
                  subtitle="Individual users"
                  trend={8}
                  icon={<Users size={18} className="text-purple-600" />}
                  iconBg="bg-purple-100"
                />
      
                <StatCard
                  title="WhatsApp Queries"
                  value={67}
                  subtitle="Customer inquiries"
                  trend={23}
                  icon={<MessageCircle size={18} className="text-green-600" />}
                  iconBg="bg-green-100"
                />
      
                <StatCard
                  title="Product Clicks"
                  value={409}
                  subtitle="Total interactions"
                  trend={12}
                  icon={<MousePointerClick size={18} className="text-orange-600" />}
                  iconBg="bg-orange-100"
                />
      
                <StatCard
                  title="Conversion Rate"
                  value="16.4%"
                  subtitle="Views to queries"
                  trend={-2}
                  icon={<TrendingUp size={18} className="text-indigo-600" />}
                  iconBg="bg-indigo-100"
                />
      
                <StatCard
                  title="Avg. Session Time"
                  value="2m 34s"
                  subtitle="Time on catalogue"
                  trend={5}
                  icon={<Clock size={18} className="text-pink-600" />}
                  iconBg="bg-pink-100"
                />
              </div>
    </>
    
  );
}
