import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },   // 👈 MUST exist
    whatsappNumber: { type: String, required: true },
    
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Shop", shopSchema);
