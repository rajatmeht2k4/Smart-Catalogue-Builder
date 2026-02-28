"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function PreferencesTab() {
  return (
    <Card className="p-6 ">
      <div>
        <h3 className="text-lg font-medium">Application Preferences</h3>
      </div>
      <div>
        <Label>Language</Label>
        <select className="w-full border rounded-md p-2 mt-1">
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      <div>
        <Label>Timezone</Label>
        <select className="w-full border rounded-md p-2 mt-1">
          <option>Asia/Kolkata (IST)</option>
          <option>America/New_York</option>
        </select>
      </div>

      <div>
        <Label>Date Format</Label>
        <select className="w-full border rounded-md p-2 mt-1">
          <option>DD/MM/YYYY</option>
          <option>MM/DD/YYYY</option>
        </select>
      </div>

      <Button
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        onClick={() => toast.success("Preferences saved")}
      >
        <Save className="w-4 h-4 mr-2" />
        Save Preferences
      </Button>
    </Card>
  );
}
