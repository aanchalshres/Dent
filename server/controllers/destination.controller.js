import { asyncHandler } from "../lib/async-handler.js";
import { DestinationSchema } from "../models/destination.model.js";

/**
 * Note: Returns all the destinations present in the base
 */
export const getAllDestinations = asyncHandler(async (req, res) => {
  const destinations = await DestinationSchema.find();
  res.status(200).json(destinations);
});
