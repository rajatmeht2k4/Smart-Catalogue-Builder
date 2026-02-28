import { Check, TrendingUp, Share2 } from "lucide-react";

export function PerformanceRecommendations() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow col-span-full">
            <h2 className="font-semibold mb-3">Performance Recommendations</h2>

            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Great mobile experience!
                        </p>
                        <p className="text-xs text-gray-600">
                            Your catalogue loads quickly on mobile devices.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Optimize product images
                        </p>
                        <p className="text-xs text-gray-600">
                            Compress images to improve load time by 20%.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Share2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            Add more products
                        </p>
                        <p className="text-xs text-gray-600">
                            Catalogues with 10+ products get 40% more engagement.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
