import express from "express";
import { getAllDestinations } from "../controllers/destination.controller.js";

const router = express.Router();

router.get("/", getAllDestinations);

export default router;
