import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    thoughts: {
      type: String
    },
    worries: {
      type: String
    },
    events: {
      type: String
    },
    aspirations: {
      type: String
    },
  },
  { timestamps: true }
);

export default mongoose.model("JournalEntry", journalEntrySchema);
