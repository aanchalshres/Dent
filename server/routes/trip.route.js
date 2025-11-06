import express from "express";
import { TripSchema } from "../models/trip.model.js";

const router = express.Router();

// Add trip
router.post("/add", async (req, res) => {
  try {
    const trip = new TripSchema(req.body);
    const result = await trip.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get trips for current user
router.get("/user/:userId", async (req, res) => {
  try {
    const trips = await TripSchema.find({ userId: req.params.userId });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all trips (admin only)
router.get("/all", async (req, res) => {
  try {
    const trips = await TripSchema.find({}).populate("userId", "name email");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
