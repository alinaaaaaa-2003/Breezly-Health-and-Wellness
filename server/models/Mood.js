import mongoose from "mongoose";

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  mood: { type: String, enum: ['happy', 'calm', 'neutral', 'anxious', 'sad'], required: true },
});

const Mood = mongoose.model("Mood", MoodSchema);
export default Mood;
