import express from "express";
import Mood from "../models/Mood.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

// Submit today's mood (upsert)
router.post("/",  verifyToken, async (req, res) => {
  const userId = req.user.id;      // user ID from authMiddleware
  const { mood } = req.body;

  // Normalize today's date to midnight (start of day)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // Find mood for today for this user
    const existingMood = await Mood.findOne({ userId, date: today });

    if (existingMood) {
      existingMood.mood = mood;   // update mood
      await existingMood.save();
      return res.json({ message: "Mood updated" });
    }

    // If not existing, create new mood entry
    const newMood = new Mood({ userId: userId, date: today, mood });
    await newMood.save();
    res.status(201).json({ message: "Mood recorded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get moods for last 7 days for user
router.get("/week",  verifyToken, async (req, res) => {
  const userId = req.user.id;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 6);

  try {
    // Query moods for user between weekAgo and today
    const moods = await Mood.find({
      userId: userId,
      date: { $gte: weekAgo, $lte: today }
    }).sort({ date: 1 });

    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
