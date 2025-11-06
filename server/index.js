import "dotenv/config";
import express from "express";
import { connectDB } from "./lib/connection.js";
import destinationRoutes from "./routes/destination.route.js";
import eventRoutes from "./routes/events.route.js";

const app = express();

// middleware for request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

// connection database
connectDB();

// routes
app.use("/api/destination", destinationRoutes);
app.use("/api/event", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
