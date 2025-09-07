import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import tipsRoute from "./routes/tips.js";
import moodRoute from "./routes/mood.js";
import journalRoutes from "./routes/journalRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/tips", tipsRoute);
app.use("/api/mood", moodRoute);
app.use("/api/journal", journalRoutes);

app.get("/", (req, res) => {
  res.send("Breezly backend is working!");
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
  });
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
