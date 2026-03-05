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
  },
  { timestamps: true }
);

export default mongoose.model("Business", businessSchema);  