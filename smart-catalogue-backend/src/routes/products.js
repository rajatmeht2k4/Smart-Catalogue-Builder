import express from "express";
import Product from "../models/Product.js";
import axios from "axios";
import FormData from "form-data";

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

export default router;