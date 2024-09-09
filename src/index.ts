import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect";
import urlRoutes from "./routes/urlRoutes";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
