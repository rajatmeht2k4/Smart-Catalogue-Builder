import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);