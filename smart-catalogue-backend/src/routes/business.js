import express from "express";
import Business from "../models/Business.js";
import Product from "../models/Product.js";
import requireAuth from "../middleware/clerkAuth.js";

const router = express.Router();

/* ------------------ CREATE BUSINESS ------------------ */
router.post("/create", requireAuth, async (req, res) => {
  try {
    const userId = req.auth.userId; // Clerk userId

    const { name, tagline, brandColor, templateId, whatsapp } = req.body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const business = await Business.create({
      userId,
      name,
      slug,
      tagline,
      brandColor,
      templateId,
      whatsapp,
    });

    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ GET MY BUSINESS (OWNER) ------------------ */
router.get("/my", requireAuth, async (req, res) => {
  try {
    const business = await Business.findOne({
      userId: req.auth.userId,
    });

    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ GET PUBLIC BY SLUG ------------------ */
router.get("/:slug", async (req, res) => {
  try {
    const business = await Business.findOne({
      slug: req.params.slug,
    });

    if (!business)
      return res.status(404).json({ error: "Not found" });

    const products = await Product.find({
      businessId: business._id,
    });

    res.json({ business, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ UPDATE TEMPLATE ------------------ */
router.put("/update-template", requireAuth, async (req, res) => {
  try {
    const business = await Business.findOne({
      userId: req.auth.userId,
    });

    if (!business)
      return res.status(404).json({ error: "Business not found" });

    business.templateId = req.body.templateId;
    await business.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ------------------ UPDATE BUSINESS PROFILE ------------------ */
router.put("/update", requireAuth, async (req, res) => {
  try {
    const { name, tagline, whatsapp, brandColor } = req.body;

    const business = await Business.findOne({ userId: req.auth.userId });
    if (!business) return res.status(404).json({ error: "Business not found" });

    if (name) {
      business.name = name;
      business.slug = name.toLowerCase().replace(/\s+/g, "-");
    }
    if (tagline !== undefined) business.tagline = tagline;
    if (whatsapp !== undefined) business.whatsapp = whatsapp;
    if (brandColor !== undefined) business.brandColor = brandColor;

    await business.save();
    res.json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;