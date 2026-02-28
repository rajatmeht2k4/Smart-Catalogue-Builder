import express from "express";
import auth from "../middleware/auth.js";
import Analytics from "../models/Analytics.js";
import Shop from "../models/Shop.js"; // ✅ MISSING IMPORT FIXED

const router = express.Router();

// Product-wise analytics
router.get("/products/:shopId", auth, async (req, res) => {
  const data = await Analytics.aggregate([
    { $match: { shopId: req.params.shopId, type: "whatsapp" } },
    { $group: { _id: "$productId", count: { $sum: 1 } } },
  ]);

  res.json(data);
});

// Daily views
router.get("/daily/:shopId", auth, async (req, res) => {
  const data = await Analytics.aggregate([
    { $match: { shopId: req.params.shopId, type: "view" } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(data);
});

// ✅ Log shop view (counter in Shop)
router.post("/view/:shopId", async (req, res) => {
  try {
    await Shop.findByIdAndUpdate(req.params.shopId, {
      $inc: { views: 1 },
    });

    await Analytics.create({
      shopId: req.params.shopId,
      type: "view",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Summary
router.get("/summary/:shopId", async (req, res) => {
  const shop = await Shop.findById(req.params.shopId);

  const whatsapp = await Analytics.countDocuments({
    shopId: req.params.shopId,
    type: "whatsapp",
  });

  res.json({
    views: shop?.views || 0,
    whatsapp,
  });
});

// ✅ Log WhatsApp click (event-based)
router.post("/whatsapp/:shopId", async (req, res) => {
  try {
    await Analytics.create({
      shopId: req.params.shopId,
      type: "whatsapp",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message }); // ✅ FIXED
  }
});

export default router;
