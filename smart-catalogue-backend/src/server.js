import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import productRoutes from "./routes/products.js";


import shopRoutes from "./routes/business.js";
import analyticsRoutes from "./routes/analytics.js";

import superadminAnalytics from "./routes/superadmin/analytics.js";
import superadminBusinesses from "./routes/superadmin/businesses.js";
import superadminSystem from "./routes/superadmin/system.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));  
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB();

app.use("/api/business", shopRoutes);
app.use("/api/products", productRoutes);
app.use("/api/analytics", analyticsRoutes);

// Mount Superadmin Routes
app.use("/api/founder/stats", superadminAnalytics);
app.use("/api/founder/businesses", superadminBusinesses);
app.use("/api/founder/system", superadminSystem);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

