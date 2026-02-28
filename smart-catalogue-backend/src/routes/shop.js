import express from "express";
import Shop from "../models/Shop.js";
import auth from "../middleware/auth.js";
import slugify from "slugify";

const router = express.Router();

// Create shop
router.post("/", auth, async (req, res) => {
  try {
    const { shopName, whatsappNumber } = req.body;

    const baseSlug = slugify(shopName, { lower: true, strict: true });

    // check existing slug
    let slug = baseSlug;
    let count = 1;
    while (await Shop.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const shop = await Shop.create({
      userId: req.userId,
      shopName,
      slug,
      whatsappNumber,
    });

    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get my shops
router.get("/my", auth, async (req, res) => {
  const shops = await Shop.find({ userId: req.userId });
  res.json(shops);
});


// Get shop by slug (PUBLIC)
router.get("/slug/:slug", async (req, res) => {
  const shop = await Shop.findOne({ slug: req.params.slug });
  if (!shop) return res.status(404).json({ error: "Shop not found" });
  res.json(shop);
});


export default router;
