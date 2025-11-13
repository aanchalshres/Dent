import { ReviewSchema } from "../models/review.model.js";

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    // Basic validation
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = new ReviewSchema({
      name,
      email,
      rating,
      message,
      submittedAt: new Date(),
    });

    await newReview.save();
    return res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Get all reviews (sorted by newest first)
export const listReviews = async (req, res) => {
  try {
    const reviews = await ReviewSchema.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      total: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
