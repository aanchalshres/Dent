// src/routes/payment.js
import express from "express";
import { PaymentSchema } from "../models/payment.model.js";
import { BookingSchema } from "../models/booking.model.js";

const router = express.Router();

// ✅ Success URL handler
router.get("/success", async (req, res) => {
  const { transaction_uuid, userId, total_amount, product_ids, booking_id } = req.query;

  console.log(booking_id)

  if (!transaction_uuid || !userId) {
    return res.status(400).send("Missing transaction UUID or userId");
  }


  const payment = await PaymentSchema.insertOne({
    userId,
    transaction_uuid,
    amount: total_amount,
    product_code: [],
    status: "SUCCESS",
    verifiedAt: new Date(),
  });

  const cleanId = booking_id.split("?")[0];
  if(booking_id) {
    await BookingSchema.findByIdAndUpdate(
      cleanId,
      {
        status: "confirmed",
        payment: payment._id,
      },
    );
  }

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

router.get("/all", async (req, res) => {
  try {
    const transactions = await PaymentSchema.find({}).sort({
      createdAt: -1,
    });
    return res.json(transactions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

export default router;
