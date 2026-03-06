"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function NotificationsTab() {
  const [state, setState] = useState({
    email: true,
    push: false,
    sms: true,
    orderUpdates: true,
    marketing: false,
    weeklyReports: true,
  });

  const Item = ({
    title,
    desc,
    keyName,
  }: { title: string; desc: string; keyName: keyof typeof state }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Switch
        className="bg-gray-300"
        checked={state[keyName]}
        onCheckedChange={(v) => setState({ ...state, [keyName]: v })}
      />
    </div>
  );

  return (
    <Card className="p-8 gap-2">
      <h3 className="text-lg font-medium">Notification Preferences</h3>
      <Item title="Email Notifications" desc="Receive notifications via email" keyName="email" />
      <Item title="Push Notifications" desc="Receive push notifications on your device" keyName="push" />
      <Item title="SMS Notifications" desc="Receive important updates via SMS" keyName="sms" />
      <Item title="Order Updates" desc="Get notified about new customer queries" keyName="orderUpdates" />
      <Item title="Marketing Emails" desc="Receive tips and promotional content" keyName="marketing" />
      <Item title="Weekly Reports" desc="Get weekly analytics summary" keyName="weeklyReports" />

      <Button
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        onClick={() => toast.success("Preferences saved")}
      >
        <Save className="w-4 h-4 mr-2" />
        Save Preferences
      </Button>
    </Card>
  );
}
