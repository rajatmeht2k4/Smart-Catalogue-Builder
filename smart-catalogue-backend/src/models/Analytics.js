import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    type: { type: String, enum: ["view", "whatsapp"], required: true }, // 👈 IMPORTANT
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // optional
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
