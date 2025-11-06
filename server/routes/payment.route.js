// src/routes/payment.js
import express from "express";
import { PaymentSchema } from "../models/payment.model.js";

const router = express.Router();

// ✅ Success URL handler
router.get("/success", async (req, res) => {
  const { transaction_uuid, userId, total_amount, product_ids } = req.query;

  if (!transaction_uuid || !userId) {
    return res.status(400).send("Missing transaction UUID or userId");
  }

  await PaymentSchema.insertOne({
    userId,
    transaction_uuid,
    amount: total_amount,
    product_code: [],
    status: "SUCCESS",
    verifiedAt: new Date(),
  });

  console.log("✅ Payment saved:", transaction_uuid);
  return res.send(`
      <h2>✅ Payment Successful!</h2>
      <p>Transaction ID: ${transaction_uuid}</p>
      <p>Amount: रु${total_amount}</p>
    `);
});

// ❌ Failure URL handler
router.get("/failure", async (req, res) => {
  res.send("<h2>❌ Payment failed or canceled.</h2>");
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const payments = await PaymentSchema.find({ userId }).sort({
      createdAt: -1,
    });
    return res.json(payments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch payments" });
  }
});

export default router;
