import express from "express";
import QRCode from "qrcode";

const router = express.Router();

router.get("/catalogue.png", async (req, res) => {
  try {
    const publicUrl = "http://localhost:4000/api/public/catalogue";

    res.setHeader("Content-Type", "image/png");
    QRCode.toFileStream(res, publicUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
