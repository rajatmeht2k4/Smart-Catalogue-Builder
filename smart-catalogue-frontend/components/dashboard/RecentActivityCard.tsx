import { Eye, MessageCircle, ShoppingCart, Share2, Heart } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export function RecentActivityCard({ data }: { data?: any[] }) {
  const activities = data || [];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 mt-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>

      <div className="space-y-3 max-h-72 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm py-6 text-center">No recent activity yet.</p>
        ) : (
          activities.map((a, i) => {
            const iconMap: any = {
              view: Eye,
              query: MessageCircle,
              click: ShoppingCart,
              share: Share2,
              like: Heart,
            };

            const colorMap: any = {
              view: "bg-blue-50 text-blue-500",
              query: "bg-emerald-50 text-emerald-500",
              click: "bg-amber-50 text-amber-500",
              share: "bg-indigo-50 text-indigo-500",
              like: "bg-pink-50 text-pink-500",
            };

            const Icon = iconMap[a.type] || Eye;

            return (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorMap[a.type]}`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">{a.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {a.time ? formatDistanceToNow(new Date(a.time), { addSuffix: true }) : 'Just now'}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
