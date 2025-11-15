import express from "express";
import { Package } from "../models/package.model.js";
import { TripSchema as Trip } from "../models/trip.model.js";
import { BookingSchema as Booking } from "../models/booking.model.js"

const router = express.Router();


// CREATE PACKAGE - ADMIN ONLY
router.post("/add", async (req, res) => {
  try {
    const { title, description, price, trips } = req.body;

    // Validate trip ids
    const foundTrips = await Trip.find({ _id: { $in: trips } });
    if (foundTrips.length !== trips.length) {
      return res.status(400).json({ error: "One or more trip IDs invalid" });
    }

    const newPackage = new Package({
      title,
      description,
      price,
      trips,
    });

    await newPackage.save();
    res.json({ message: "Package created", package: newPackage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ALL PACKAGES
router.get("/all", async (req, res) => {
  const packages = await Package.find().populate("trips");
  res.json(packages);
});

// DELETE PACKAGE - ADMIN ONLY
router.delete("/:id", async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: "Package deleted" });
});

router.post("/book", async (req, res) => {
  try {
    const { packageId } = req.body;
    const userId = req.body.userId;

    const pkg = await Package.findById(packageId);
    if (!pkg)
      return res.status(404).json({ error: "Package not found" });

    console.log(userId)
    const booking = new Booking({
      package: pkg.id,
      user: userId,
      totalPrice: pkg.price,
    });

    await booking.save();

    res.json({
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({})
    .populate("user")
    .populate("package").sort({ createdAt: -1 });
    res.json(bookings)
  }catch(err){
    res.status(500).json({ error: "Server error" })
  }
})

router.get("/my-bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.header("x-user-id") })
      .populate("package")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ============================================================
   CANCEL BOOKING
=============================================================== */
router.delete("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ============================================================
   COMPLETE BOOKING (ADMIN OR USER)
=============================================================== */
router.patch("/booking/complete/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "confirmed";
    await booking.save();

    res.json({ message: "Booking completed", booking });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
