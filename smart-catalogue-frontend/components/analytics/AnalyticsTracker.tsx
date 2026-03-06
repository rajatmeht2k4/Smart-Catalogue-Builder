"use client";

import { useEffect, useRef } from "react";

export function AnalyticsTracker({ businessId }: { businessId: string }) {
    const tracked = useRef(false);

    useEffect(() => {
        if (tracked.current) return;

        // Detect source from URL query param (?ref=whatsapp) or document.referrer
        const params = new URLSearchParams(window.location.search);
        const refParam = params.get("ref")?.toLowerCase() || "";

        let source = "direct";
        if (refParam === "whatsapp") {
            source = "social";
        } else if (refParam === "facebook" || refParam === "twitter" || refParam === "instagram") {
            source = "social";
        } else if (refParam === "referral") {
            source = "referral";
        } else if (document.referrer) {
            const referrer = document.referrer.toLowerCase();
            if (referrer.includes("facebook.com") || referrer.includes("twitter.com") || referrer.includes("instagram.com") || referrer.includes("wa.me") || referrer.includes("whatsapp")) {
                source = "social";
            } else if (referrer && !referrer.includes(window.location.hostname)) {
                source = "referral";
            }
        }

        fetch("http://localhost:5000/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                businessId,
                type: "page_view",
                source,
            }),
        }).catch(console.error);

        tracked.current = true;
    }, [businessId]);

    return null;
}
