import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Clerk userId
      required: true,
    },
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    tagline: String,
    brandColor: String,
    templateId: {
      type: String,
      default: "freshmart",
    },
    whatsapp: String,
    totalViews: { type: Number, default: 0 },
    totalClicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Business", businessSchema);  