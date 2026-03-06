import express from "express";
import Product from "../models/Product.js";
import Business from "../models/Business.js";
import requireAuth from "../middleware/clerkAuth.js";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

/* ------------------ GET MY PRODUCTS ------------------ */
router.get("/my", requireAuth, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.auth.userId });
    if (!business) return res.status(404).json({ error: "Business not found" });

    const products = await Product.find({ businessId: business._id }).sort({ order: 1, createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ CREATE SINGLE PRODUCT ------------------ */
router.post("/create", requireAuth, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.auth.userId });
    if (!business) return res.status(404).json({ error: "Business not found" });

    const { name, price, sku, image } = req.body;
    const product = await Product.create({
      businessId: business._id,
      name,
      price,
      sku,
      image,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ UPDATE PRODUCT ------------------ */
router.put("/update/:id", requireAuth, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.auth.userId });
    if (!business) return res.status(404).json({ error: "Business not found" });

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, businessId: business._id },
      { $set: req.body },
      { new: true }
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ DELETE PRODUCT ------------------ */
router.delete("/delete/:id", requireAuth, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.auth.userId });
    if (!business) return res.status(404).json({ error: "Business not found" });

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      businessId: business._id,
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------ BULK CREATE (Onboarding) ------------------ */
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

/* ------------------ REMOVE BACKGROUND ------------------ */
router.post("/remove-bg", async (req, res) => {
  try {
    const { image } = req.body;
    
    // Extract base64 safely if it contains the data uri prefix
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file_b64", base64Data);

    const response = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": process.env.REMOVEBG_API_KEY,
      },
      maxBodyLength: Infinity,
    });

    const transparentBase64 = Buffer.from(response.data, "binary").toString("base64");
    res.json({ success: true, image: `data:image/png;base64,${transparentBase64}` });
  } catch (err) {
    console.error("RemoveBG Error:", err.response?.data?.errors || err.message);
    res.status(500).json({ error: "Failed to remove background" });
  }
});

/* ------------------ BULK UPDATE ORDER & STATUS ------------------ */
router.put("/bulk-update", requireAuth, async (req, res) => {
  try {
    const business = await Business.findOne({ userId: req.auth.userId });
    if (!business) return res.status(404).json({ error: "Business not found" });

    const { products } = req.body;
    
    // Perform multiple document updates using bulkWrite
    const bulkOps = products.map((p) => ({
      updateOne: {
        filter: { _id: p._id || p.id, businessId: business._id },
        update: { 
          $set: { 
            order: p.order,
            isActive: p.isActive !== undefined ? p.isActive : true
          } 
        }
      }
    }));

    if (bulkOps.length > 0) {
      await Product.bulkWrite(bulkOps);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;