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
    Eye,
    MousePointerClick,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useBusiness, useDashboardAnalytics } from "@/lib/hooks";

export default function SharingPage() {
    const [copied, setCopied] = useState(false);
    const { business } = useBusiness();
    const { analytics } = useDashboardAnalytics();

    const catalogueUrl = `http://localhost:3000/catalogue/${business?.slug || ""}`;

    const totalViews = analytics?.summary?.totalViews || 0;

    // Traffic source breakdown from backend
    const trafficSources: any[] = analytics?.trafficSources || [];
    const socialCount = trafficSources.find((s: any) => s._id === "social")?.count || 0;
    const directCount = trafficSources.find((s: any) => s._id === "direct")?.count || 0;
    const referralCount = trafficSources.find((s: any) => s._id === "referral")?.count || 0;

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(catalogueUrl);
        setCopied(true);
        toast.success("Link copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    // Append ?ref= so the AnalyticsTracker knows where the visitor came from
    const waShareUrl = `${catalogueUrl}?ref=whatsapp`;
    const fbShareUrl = `${catalogueUrl}?ref=facebook`;
    const twShareUrl = `${catalogueUrl}?ref=twitter`;
    const shareText = `Check out ${business?.name || "our"} catalogue: `;

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
                {/* Live Stats */}
                <Card className="p-6">
                    <h3 className="text-lg font-medium ">Sharing Stats</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-semibold">{totalViews}</div>
                            <div className="text-sm text-gray-500">Total Views</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">{socialCount}</div>
                            <div className="text-sm text-gray-500">Via Social</div>
                        </div>
                        <div>
                            <div className="text-2xl font-semibold">{directCount}</div>
                            <div className="text-sm text-gray-500">Via Direct</div>
                        </div>
                    </div>
                </Card>


                {/* Catalogue Link */}
                <Card className="p-6">
                    <h3 className="text-lg font-medium ">Your Catalogue Link</h3>
                    <div className="flex gap-2">
                        <Input value={catalogueUrl} readOnly className="bg-gray-100 border-none " />
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={copyToClipboard}>
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
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(shareText + waShareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" className="justify-start w-full">
                                    <MessageCircle className="w-5 h-5 mr-3 text-green-400 " />
                                    WhatsApp
                                </Button>
                            </a>

                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fbShareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" className="justify-start w-full">
                                    <Facebook className="w-5 h-5 mr-3 text-blue-600" />
                                    Facebook
                                </Button>
                            </a>

                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + twShareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" className="justify-start w-full">
                                    <Twitter className="w-5 h-5 mr-3 text-blue-400" />
                                    Twitter
                                </Button>
                            </a>
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
                            onClick={() => {
                                const canvas = document.querySelector("canvas");
                                if (canvas) {
                                    const link = document.createElement("a");
                                    link.download = `${business?.slug || "catalogue"}-qr.png`;
                                    link.href = canvas.toDataURL();
                                    link.click();
                                    toast.success("QR code downloaded!");
                                }
                            }}
                        >
                            Download QR
                        </Button>
                    </div>
                </div>

                {/* Custom Domain */}
                <Card className="p-6">
                    <div className="flex items-start justify-between mb-1">
                        <div>
                            <h3 className="text-lg font-medium flex items-center gap-2">
                                Custom Domain
                                <Badge className="bg-amber-100 text-amber-700">
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
