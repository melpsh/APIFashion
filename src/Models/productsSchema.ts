import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  productName: String,
  description: String,
  price: Number,
  category: String,
  imgUrl: String,
  create_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

export default mongoose.model("products", productsSchema);
