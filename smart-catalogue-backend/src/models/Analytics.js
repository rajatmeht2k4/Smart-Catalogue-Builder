import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    type: { 
      type: String, 
      enum: ["page_view", "whatsapp_click", "product_click"], 
      required: true 
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // optional, for product_click
    deviceType: { 
      type: String, 
      enum: ["mobile", "desktop", "tablet", "unknown"], 
      default: "unknown" 
    },
    source: { 
      type: String, 
      enum: ["direct", "social", "referral", "other"], 
      default: "direct" 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
