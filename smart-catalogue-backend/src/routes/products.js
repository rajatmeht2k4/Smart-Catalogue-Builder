import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/bulk-create", async (req, res) => {
  try {
    const { businessId, products } = req.body;

    const formatted = products.map((p) => ({
      businessId,
      name: p.name,
      price: p.price,
      image: p.image,
    }));

    await Product.insertMany(formatted);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;