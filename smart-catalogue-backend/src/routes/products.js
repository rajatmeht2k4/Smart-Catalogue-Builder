  import express from "express";
  import Product from "../models/Product.js";
  import upload from "../middleware/upload.js";
  import auth from "../middleware/auth.js";

  const router = express.Router();

  router.post("/", auth, upload.single("image"), async (req, res) => {
    const { name, price, category, description, shopId } = req.body;

    const product = await Product.create({
      shopId,
      name,
      price,
      category,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.json(product);
  });

  router.get("/by-shop/:shopId", async (req, res) => {
    const { shopId } = req.params;
  
    if (!shopId || shopId === "undefined") {
      return res.status(400).json({ error: "Invalid shopId" });
    }
  
    const products = await Product.find({ shopId });
    res.json(products);
  });
  

  router.delete("/:id", auth, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

  export default router;
