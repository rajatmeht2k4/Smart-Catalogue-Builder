import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import productRoutes from "./routes/products.js";
import path from "path";
import { fileURLToPath } from "url";
import importRoutes from "./routes/import.js";
import exportRoutes from "./routes/export.js";
import publicRoutes from "./routes/public.js";
import qrRoutes from "./routes/qr.js";
import shareRoutes from "./routes/share.js";
import authRoutes from "./routes/auth.js";
import analyticsRoutes from "./routes/analytics.js";
import shopRoutes from "./routes/shop.js"



dotenv.config();

const app = express();   // 👈 app must be defined BEFORE app.use

app.use(cors());
app.use(express.json());

console.log("JWT SECRET loaded:", !!process.env.JWT_SECRET);


app.use("/api/auth", authRoutes);

app.use("/api/import", importRoutes);

app.use("/api/shops", shopRoutes);

app.use("/api/share", shareRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/public", publicRoutes);

app.use("/api/qr", qrRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/export", exportRoutes); 



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


connectDB();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

console.log("Mongo URI loaded:", !!process.env.MONGO_URI);

// Health check
app.get("/", (req, res) => {
  res.send("Smart Catalogue Builder API running");
});


// Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


