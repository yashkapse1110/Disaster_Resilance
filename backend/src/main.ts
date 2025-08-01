import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import alertRoutes from "./routes/alertRoutes";
import reportRoutes from "./routes/reportRoutes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
const app = express();

dotenv.config();
// Middleware
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Serve static files from the uploads directory
app.use(cors({
  origin: ["http://localhost:5173"], // frontend dev server
  credentials: true 
})); // Apply CORS middleware with the configuration
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", reportRoutes);
app.use("/api/alerts", alertRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
