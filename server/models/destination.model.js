import mongoose from "mongoose";

/**
 * schema to list all the destinations with it's appropriate fun-facts
 */
const destinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Text content is required"],
    },
    funFacts: {
      type: [String], // Array of strings
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const DestinationSchema = mongoose.model(
  "Destination",
  destinationSchema
);
