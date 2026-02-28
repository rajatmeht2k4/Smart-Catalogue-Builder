"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Copy,
    Facebook,
    Instagram,
    Twitter,
    MessageCircle,
    Crown,
    Check,
    Globe,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function SharingPage() {
    const [copied, setCopied] = useState(false);
    const catalogueUrl = "https://smartcatalogue.app/npmartindia";

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(catalogueUrl);
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnPlatform = (platform: string) => {
        toast.success(`Opening ${platform}...`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold">Share Your Catalogue</h1>
                <p className="text-sm text-gray-500">
                    Share your catalogue link across multiple platforms
                </p>
            </div>

            <div className="max-w-4xl space-y-6">
                {/* Sharing Stats */}
                <Card className="p-6">
                    <h3 className="text-lg font-medium ">Sharing Stats</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-semibold">234</div>
                            <div className="text-sm text-gray-500">Total Shares</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">156</div>
                            <div className="text-sm text-gray-500">Via WhatsApp</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">78</div>
                            <div className="text-sm text-gray-500">Via Social</div>
                        </div>
                    </div>
                </Card>


                {/* Catalogue Link */}
                <Card className="p-6">
                    <h3 className="text-lg font-medium ">Your Catalogue Link</h3>
                    <div className="flex gap-2">
                        <Input value={catalogueUrl} readOnly className="bg-gray-100 border-none " />
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white" onClick={copyToClipboard}>
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" /> Copy
                                </>
                            )}
                        </Button>
                    </div>
                </Card>


                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Social Sharing */}
                    <Card className="p-6">
                        <h3 className="text-lg font-medium">Share on Social Media</h3>
                        <div className="grid  gap-3">
                            <Button
                                variant="outline"
                                className="justify-start  "
                                onClick={() => shareOnPlatform("WhatsApp")}
                            >
                                <MessageCircle className="w-5 h-5 mr-3 text-green-400 " />
                                WhatsApp
                            </Button>

                            <Button
                                variant="outline"
                                className="justify-start"
                                onClick={() => shareOnPlatform("Facebook")}
                            >
                                <Facebook className="w-5 h-5 mr-3 text-blue-600" />
                                Facebook
                            </Button>

                            <Button
                                variant="outline"
                                className="justify-start"
                                onClick={() => shareOnPlatform("Instagram")}
                            >
                                <Instagram className="w-5 h-5 mr-3 text-pink-600" />
                                Instagram
                            </Button>

                            <Button
                                variant="outline"
                                className="justify-start"
                                onClick={() => shareOnPlatform("Twitter")}
                            >
                                <Twitter className="w-5 h-5 mr-3 text-blue-400" />
                                Twitter
                            </Button>
                        </div>
                    </Card>

                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center border rounded-xl p-4">
                        <div className="text-lg font-medium">
                            Scan to open catalogue
                        </div>

                        <div className="bg-white p-3 rounded-lg shadow">
                            <QRCodeCanvas value={catalogueUrl} size={140} />
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-3"
                            onClick={() => toast.success("QR code ready to scan")}
                        >
                            Download QR (coming soon)
                        </Button>
                    </div>
                </div>

                {/* Custom Domain */}
                <Card className="p-6">
                    <div className="flex items-start justify-between mb-1">
                        <div>
                            <h3 className="text-lg font-medium flex items-center gap-2">
                                Custom Domain
                                <Badge className="bg-purple-100 text-purple-700">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Pro
                                </Badge>
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Use your own domain name for your catalogue
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Your Domain</Label>
                        <div className="flex gap-2 items-center">
                            <Globe className="w-4 h-4 text-gray-400" />
                            <Input
                                className="bg-gray-200"
                                placeholder="catalogue.yourdomain.com"
                                disabled
                            />
                        </div>
                        <Button disabled className="w-full bg-gray-800 text-white">
                            Upgrade to Pro
                        </Button>
                    </div>
                </Card>

            </div>
        </div>
    );
}
