import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const db = mongoose.connection.db;

    // Drop the index on journalentries
    await db.collection("journalentries").dropIndex("userId_1_day_1");
    console.log("Index dropped successfully");

    process.exit(0);
  } catch (err) {
    console.error("Error dropping index:", err);
    process.exit(1);
  }
};

run();
