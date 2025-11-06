import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  transaction_uuid: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  totalAmount: { type: Number },
  productCodes: { type: [String], required: true }, // <-- a
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },
  cart: { type: Array, default: [] },
  verifiedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const PaymentSchema = mongoose.model("Payment", paymentSchema);
