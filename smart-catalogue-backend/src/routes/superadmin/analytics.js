import express from "express";
import Business from "../../models/Business.js";
import Product from "../../models/Product.js";
import Analytics from "../../models/Analytics.js";
import isFounder from "../../middleware/isFounder.js";

const router = express.Router();

/**
 * GET /api/superadmin/analytics/platform
 * Returns enterprise-level, platform-wide aggregations.
 */
router.get("/platform", isFounder, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // ── 1. Fast Global Counts ──
    const totalBusinesses = await Business.countDocuments();
    const activeBusinesses = await Business.countDocuments({ products: { $exists: true } }); // Simplification for MVP
    const totalProducts = await Product.countDocuments();
    
    // We get total views and leads by summing the cached values on Business models
    // OR we could use Analytics facet. Since Business has totalViews and totalClicks, we'll sum those.
    const [globalSums] = await Business.aggregate([
      {
        $group: {
          _id: null,
          platformViews: { $sum: "$totalViews" },
          platformLeads: { $sum: "$totalClicks" }
        }
      }
    ]);

    const platformViews = globalSums?.platformViews || 0;
    const platformLeads = globalSums?.platformLeads || 0;

    // ── 2. Growth Engine (Daily Signups last 30 days) ──
    const dailySignups = await Business.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Fill missing days
    const signupMap = {};
    for (const d of dailySignups) signupMap[d._id] = d.count;
    
    const growthChart = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      const key = d.toISOString().split("T")[0];
      growthChart.push({ date: key, signups: signupMap[key] || 0 });
    }

    // ── 3. Platform Traffic (Last 30 days daily views) ──
    const dailyPlatformViews = await Analytics.aggregate([
      { $match: { type: "page_view", createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
           views: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const viewsMap = {};
    for (const d of dailyPlatformViews) viewsMap[d._id] = d.views;
    
    const trafficChart = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      const key = d.toISOString().split("T")[0];
      trafficChart.push({ date: key, views: viewsMap[key] || 0 });
    }

    // ── 4. Global Leaderboard (Top 5 businesses by views) ──
    const leaderboard = await Business.find()
        .sort({ totalViews: -1 })
        .limit(5)
        .select("name slug totalViews totalClicks createdAt")
        .lean();

    // ── 5. Recent Activity Feed ──
    const recentBusinesses = await Business.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name createdAt slug")
      .lean();

    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name createdAt businessId price")
      .lean();

    // Transform and unify
    let recentActivity = [];
    
    recentBusinesses.forEach(b => {
       recentActivity.push({
           id: b._id.toString(),
           type: 'business_signup',
           title: 'New Business Registered',
           subtitle: `${b.name} joined the platform`,
           date: b.createdAt
       });
    });

    recentProducts.forEach(p => {
       recentActivity.push({
           id: p._id.toString(),
           type: 'product_created',
           title: 'New Product Created',
           subtitle: `${p.name} added to catalog`,
           date: p.createdAt
       });
    });

    recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
    recentActivity = recentActivity.slice(0, 10);

    res.json({
      overview: {
        totalBusinesses,
        totalProducts,
        platformViews,
        platformLeads,
        avgProductsPerBusiness: totalBusinesses > 0 ? (totalProducts / totalBusinesses).toFixed(1) : "0"
      },
      growthChart,
      trafficChart,
      leaderboard,
      recentActivity
    });

  } catch (err) {
    console.error("Platform Stats Error:", err.message);
    res.status(500).json({ error: "Failed to load platform stats" });
  }
});

export default router;
