import express from "express";

const router = express.Router();

router.get("/whatsapp", (req, res) => {
  const publicUrl = "http://localhost:4000/api/public/catalogue";
  const message = encodeURIComponent(
    `Check out our product catalogue here: ${publicUrl}`
  );

  const whatsappUrl = `https://wa.me/?text=${message}`;

  res.json({
    url: publicUrl,
    whatsappShareLink: whatsappUrl,
  });
});

export default router;
