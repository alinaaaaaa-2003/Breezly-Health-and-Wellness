import express from "express";
import tips from "../data/tips.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/daily",  verifyToken, (req, res) => {
  const today = new Date().toDateString();
  const tipIndex = today.length % tips.length; // pseudo-random but fixed for the day
  const dailyTip = tips[tipIndex];

  res.json({
    user: req.user.name, // comes from JWT payload
    tip: dailyTip
  });
});

export default router;
