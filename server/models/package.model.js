import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  trips: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true }
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Package = mongoose.model("Package", packageSchema);
