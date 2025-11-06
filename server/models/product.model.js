import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema({
  name: String,
  title: String,
  category: String,
  price: Number,
  description: String,
  material: String,
  category: String,
  image: String,
});

export const ProductSchema = mongoose.model("Product", productModelSchema);
