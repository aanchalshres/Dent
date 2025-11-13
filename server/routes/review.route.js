import express from "express";
import { addReview, listReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/add", addReview); // POST /api/reviews
router.get("/", listReviews); // GET /api/reviews

export default router;
