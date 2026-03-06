"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

export default function BillingTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6 ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Current Plan</h3>
            <p className="text-sm text-muted-foreground">
              Manage your subscription and billing
            </p>
          </div>
          <Badge className="bg-purple-100 text-purple-700">
            <Crown className="w-3 h-3 mr-1" /> FREE
          </Badge>
        </div>

        <div className="rounded-lg bg-gray-100 p-4 text-sm space-y-2 mt-4">
          <div className="flex justify-between">
            <span>Current Plan</span>
            <span className="font-medium">Free Starter</span>
          </div>
          <div className="flex justify-between">
            <span>Products Limit</span>
            <span className="font-medium">50</span>
          </div>
          <div className="flex justify-between">
            <span>Analytics</span>
            <span className="font-medium">Basic</span>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <Crown className="w-4 h-4 mr-2" /> Upgrade to Pro
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Billing History</h3>
        <p className="text-sm text-muted-foreground">No billing history available</p>
      </Card>
    </div>
  );
}
