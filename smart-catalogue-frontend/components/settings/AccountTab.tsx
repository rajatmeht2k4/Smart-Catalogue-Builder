"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Label } from "../ui/label";

export default function AccountTab() {
    return (
        <div className="space-y-6">
            <Card className="p-6 ">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Current Password" />
                    <Label>New Password</Label>
                    <Input type="password" placeholder="New Password" />
                    <Label>Confirm Password</Label>
                    <Input type="password" placeholder="Confirm New Password" />

                </div>
                <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => toast.success("Password updated")}
                >
                    Update Password
                </Button>
            </Card>

            <Card className="p-6 ">
                <h3 className="text-lg font-medium">Delete Account</h3>
                <p className="flex items-center text-sm text-muted-foreground gap-2  text-red-600 font-medium">
                    <AlertTriangle className="h-5 w-5 " />
                    Once you delete your account, there is no going back.
                </p>
                <Button variant="destructive" className="w-full bg-red-600">
                    Delete Account
                </Button>
            </Card>
        </div>
    );
}
