import express from "express";
import xlsx from "xlsx";
import csv from "csvtojson";
import fs from "fs";
import Product from "../models/Product.js";
import excelUpload from "../middleware/excelUpload.js";

const router = express.Router();

router.post("/products", excelUpload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    let products = [];

    if (filePath.endsWith(".csv")) {
      products = await csv().fromFile(filePath);
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      products = xlsx.utils.sheet_to_json(sheet);
    }

    const formatted = products.map((row) => ({
      name: row.name || row.Name || "",
      price: Number(row.price || row.Price || 0),
      category: row.category || row.Category || "",
      description: row.description || row.Description || "",
    }));

    const saved = await Product.insertMany(formatted);

    fs.unlinkSync(filePath); // delete uploaded file after import

    res.json({
      message: "Products imported successfully",
      inserted: saved.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
