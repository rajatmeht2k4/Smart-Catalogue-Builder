"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Save } from "lucide-react";
import { toast } from "sonner";
import { useBusiness } from "@/lib/hooks";
import { useAuth } from "@clerk/nextjs";

export default function ProfileTab() {
  const { business, isLoading, mutate } = useBusiness();
  const { getToken } = useAuth();
  const [profile, setProfile] = useState({ name: "", tagline: "", whatsapp: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (business) {
      setProfile({
        name: business.name || "",
        tagline: business.tagline || "",
        whatsapp: business.whatsapp || "",
      });
    }
  }, [business]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/api/business/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated successfully!");
      mutate(); // refresh business data globally
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium">Business Profile</h3>
        <p className="text-sm text-gray-500">Update your business information</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-xl font-semibold uppercase text-purple-700">
          {profile.name ? profile.name.substring(0, 2) : "NP"}
        </div>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Change Logo
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2">Business Name</Label>
          <Input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="E.g. FreshMart"
          />
        </div>

        <div>
          <Label className="mb-2">Tagline</Label>
          <Input
            value={profile.tagline}
            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            placeholder="E.g. Quality fresh goods"
          />
        </div>

        <div>
          <Label className="mb-2">WhatsApp Number</Label>
          <Input
            value={profile.whatsapp}
            onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
            placeholder="Enter number with country code"
          />
        </div>
      </div>

      <Button
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        onClick={handleSave}
        disabled={isSaving}
      >
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </Card>
  );
}
