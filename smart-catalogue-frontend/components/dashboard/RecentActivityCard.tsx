import { Eye, MessageCircle, ShoppingCart, Share2, Heart } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export function RecentActivityCard({ data }: { data?: any[] }) {
  const activities = data || [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Activity</h3>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">No recent activity yet.</p>
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
              view: "bg-blue-100 text-blue-600",
              query: "bg-green-100 text-green-600",
              click: "bg-orange-100 text-orange-600",
              share: "bg-purple-100 text-purple-600",
              like: "bg-pink-100 text-pink-600",
            };

            const Icon = iconMap[a.type] || Eye;

            return (
              <div key={i} className="flex items-start gap-3 border-b pb-4 last:border-0 border-gray-300">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${colorMap[a.type]}`}
                >
                  <Icon size={16} />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-900">{a.message}</p>
                  <p className="text-xs text-gray-500">
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
