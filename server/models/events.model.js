import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    day: {
      type: Number,
      required: [true, "Event day is required"],
      min: 1,
      max: 31,
    },
    month: {
      type: Number,
      required: [true, "Event month is required"],
      min: 1,
      max: 12,
    },
    location: {
      type: String, // Optional: e.g., "Bhaktapur", "Kathmandu"
    },
    category: {
      type: String, // Optional: e.g., "Festival", "Cultural"
      default: "General",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export const EventSchema = mongoose.model("Event", eventSchema);
