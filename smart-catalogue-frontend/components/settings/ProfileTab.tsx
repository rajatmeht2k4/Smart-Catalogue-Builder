"use client";

import { useState } from "react";
import { mockProfile } from "@/lib/mockSettings";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfileTab() {
  const [profile, setProfile] = useState(mockProfile);

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium">Business Profile</h3>
        <p className="text-sm text-gray-500">Update your business information</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-xl font-semibold">
          NP
        </div>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Change Logo
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key}>
            <Label className="mb-2">{key.replace(/([A-Z])/g, " $1")}</Label>
            {key === "Address" ? (
              <Textarea
                value={value}
                onChange={(e) =>
                  setProfile({ ...profile, [key]: e.target.value })
                }
              />
            ) : (
              <Input
                value={value}
                onChange={(e) =>
                  setProfile({ ...profile, [key]: e.target.value })
                }
              />
            )}
          </div>
        ))}
      </div>

      <Button
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        onClick={() => toast.success("Profile updated")}
      >
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </Card>
  );
}
