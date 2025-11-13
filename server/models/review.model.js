import mongoose from "mongoose";

/**
 * Schema for user reviews submitted through the landing page
 */
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export const ReviewSchema = mongoose.model("Review", reviewSchema);
