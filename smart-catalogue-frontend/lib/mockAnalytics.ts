import { Eye, Users, MessageCircle, MousePointerClick, TrendingUp, Clock } from "lucide-react";

export const mockSummary = {
    views: 124,
    whatsapp: 18,
  };
  
  export const mockDailyViews = [
    { date: "Mon", views: 45, clicks: 32, queries: 10 },
    { date: "Tue", views: 62, clicks: 48, queries: 12 },
    { date: "Wed", views: 55, clicks: 40, queries: 11 },
    { date: "Thu", views: 78, clicks: 58, queries: 15 },
    { date: "Fri", views: 92, clicks: 68, queries: 18 },
    { date: "Sat", views: 121, clicks: 91, queries: 22 },
    { date: "Sun", views: 88, clicks: 64, queries: 17 },
  ];
  
  export const mockProductClicks = [
    { productName: "Mango Masti", count: 45 },
    { productName: "Bubble Gum", count: 38 },
    { productName: "Coffee", count: 32 },
    { productName: "Gulab", count: 28 },
    { productName: "Orange", count: 25 },
  ];

  export const mockDeviceBreakdown = [
    { name: "Mobile", value: 68 },
    { name: "Desktop", value: 25 },
    { name: "Tablet", value: 7 },
  ];
  
  export const mockTrafficSources = [
    { source: "WhatsApp", visits: 234, percentage: 45 },
    { source: "Instagram", visits: 156, percentage: 30 },
    { source: "Facebook", visits: 78, percentage: 15 },
    { source: "Direct", visits: 52, percentage: 10 },
  ];

  export const mockProductAnalytics = [
    { name: "Mango Masti", views: 45, clicks: 40, queries: 12, rate: 26.7 },
    { name: "Bubble Gum", views: 38, clicks: 33, queries: 10, rate: 26.3 },
    { name: "Coffee", views: 32, clicks: 27, queries: 8, rate: 25.0 },
    { name: "Gulab", views: 28, clicks: 23, queries: 7, rate: 25.0 },
    { name: "Orange", views: 25, clicks: 20, queries: 6, rate: 24.0 },
  ];
  
  
  
  export const viewsData = [
    { day: "Mon", views: 45, clicks: 32, queries: 8 },
    { day: "Tue", views: 62, clicks: 48, queries: 12 },
    { day: "Wed", views: 55, clicks: 41, queries: 10 },
    { day: "Thu", views: 78, clicks: 59, queries: 15 },
    { day: "Fri", views: 95, clicks: 72, queries: 18 },
    { day: "Sat", views: 120, clicks: 91, queries: 23 },
    { day: "Sun", views: 88, clicks: 66, queries: 17 },
  ];
  
  export const topProductsData = [
    { name: "Mango Masti", taps: 45, conversions: 12 ,},
    { name: "Bubble Gum", taps: 38, conversions: 10 },
    { name: "Coffee", taps: 32, conversions: 8 },
    { name: "Gulab", taps: 28, conversions: 7 },
  ];
  
  export const deviceData = [
    { name: "Mobile", value: 68, color: "#8B5CF6" },
    { name: "Desktop", value: 25, color: "#EC4899" },
    { name: "Tablet", value: 7, color: "#F59E0B" },
  ];
  
  export const trafficSourceData = [
    { source: "WhatsApp", visits: 234, percentage: 45 },
    { source: "Instagram", visits: 156, percentage: 30 },
    { source: "Facebook", visits: 78, percentage: 15 },
    { source: "Direct", visits: 52, percentage: 10 },
  ];
  
  export const stats = [
    { label: "Total Views", value: "543", change: "+15%", desc: "Catalogue impressions" },
    { label: "Unique Visitors", value: "234", change: "+8%", desc: "Individual users" },
    { label: "WhatsApp Queries", value: "67", change: "+23%", desc: "Customer inquiries" },
    { label: "Product Clicks", value: "409", change: "+12%", desc: "Total interactions" },
    { label: "Conversion Rate", value: "16.4%", change: "-2%", desc: "Views to queries" },
    { label: "Avg Session Time", value: "2m 34s", change: "+5%", desc: "Time on catalogue" },
  ];

  export const recentActivity = [
    { type: "view", message: "Someone viewed Mango Masti", time: "5 min ago" },
    { type: "query", message: "New WhatsApp query for Bubble Gum", time: "12 min ago" },
    { type: "click", message: "Buy Now clicked on Coffee", time: "18 min ago" },
    { type: "view", message: "Someone viewed your catalogue", time: "25 min ago" },
    { type: "share", message: "Catalogue shared via WhatsApp", time: "45 min ago" },
    { type: "query", message: "New WhatsApp query for Gulab", time: "1 hour ago" },
    { type: "like", message: "Product added to favorites", time: "2 hours ago" },
  ];
  

  export const mockPerformanceMetrics = [
    { title: "Page Load Time", value: "1.2s", status: "good" },
    { title: "Mobile Score", value: "95/100", status: "excellent" },
    { title: "SEO Score", value: "88/100", status: "good" },
    { title: "Accessibility", value: "92/100", status: "excellent" },
  ];
  

 

export const mockStats = [
  {
    title: "Total Views",
    value: 543,
    subtitle: "Catalogue impressions",
    trend: 15,
    icon: Eye,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "Unique Visitors",
    value: 234,
    subtitle: "Individual users",
    trend: 8,
    icon: Users,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    title: "WhatsApp Queries",
    value: 67,
    subtitle: "Customer inquiries",
    trend: 23,
    icon: MessageCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    title: "Product Clicks",
    value: 409,
    subtitle: "Total interactions",
    trend: 12,
    icon: MousePointerClick,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  {
    title: "Conversion Rate",
    value: "16.4%",
    subtitle: "Views to queries",
    trend: -2,
    icon: TrendingUp,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
  },
  {
    title: "Avg. Session Time",
    value: "2m 34s",
    subtitle: "Time on catalogue",
    trend: 5,
    icon: Clock,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100",
  },
];
