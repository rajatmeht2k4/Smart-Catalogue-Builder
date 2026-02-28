import express from "express";
import { Parser } from "json2csv";
import Product from "../models/Product.js";

const router = express.Router();

// EXPORT ALL PRODUCTS TO CSV
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().lean();

    const fields = ["name", "price", "category", "description", "imageUrl"];
    const parser = new Parser({ fields });
    const csv = parser.parse(products);

    res.header("Content-Type", "text/csv");
    res.attachment("catalogue.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
