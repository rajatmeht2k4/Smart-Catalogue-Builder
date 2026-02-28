import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  name: String,
  price: Number,
  category: String,
  description: String,
  imageUrl: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
