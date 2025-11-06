import { asyncHandler } from "../lib/async-handler.js";
import { EventSchema } from "../models/events.model.js";

/**
 * Note: Returns all the destinations present in the base
 */
export const getAllEvents = asyncHandler(async (req, res) => {
  const events = await EventSchema.find();
  res.status(200).json(events);
});
