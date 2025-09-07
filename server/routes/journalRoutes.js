import express from "express";
import mongoose from "mongoose"; 
import JournalEntry from "../models/JournalEntry.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { thoughts, worries, events, aspirations } = req.body;
    console.log("req.user in route:", req.user);
    const newEntry = new JournalEntry({
      userId: new mongoose.Types.ObjectId(req.user.id || req.user._id),
      thoughts,
      worries,
      events,
      aspirations
    });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Error saving journal entry:", err);
    res.status(500).json({ error: "Failed to create entry", details: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ userId: req.user.id }).sort({ creatAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error("Error fetching journal entry:", err);
    res.status(500).json({ error: "Failed to fetch entries", details: err.message });
  }
});

export default router;
