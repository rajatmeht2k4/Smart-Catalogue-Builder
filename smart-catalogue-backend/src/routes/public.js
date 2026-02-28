import express from "express";
import Shop from "../models/Shop.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/catalogue/:slug", async (req, res) => {
  const shop = await Shop.findOne({ slug: req.params.slug });

  if (!shop) {
    return res.status(404).json({ error: "Shop not found" });
  }

  const products = await Product.find({ shopId: shop._id });

  res.json({
    _id: shop._id,
    shopName: shop.shopName,
    whatsappNumber: shop.whatsappNumber,
    products,
  });
});

export default router;
