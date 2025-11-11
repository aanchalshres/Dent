import "dotenv/config";
import express from "express";
import { connectDB } from "./lib/connection.js";
import destinationRoutes from "./routes/destination.route.js";
import eventRoutes from "./routes/events.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import utilRoutes from "./lib/multer.js";
import paymentRoutes from "./routes/payment.route.js";
import tripRoutes from "./routes/trip.route.js";
import "./seed.js"

const app = express();

app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // allow all methods
  })
);

// middleware for request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// connection database
connectDB();

// routes
app.use("/api/destination", destinationRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/util", utilRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/trip", tripRoutes);

app.use(express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
