import React, { useState } from "react";
import axios from "axios";

const moods = ["happy", "sad", "anxious", "calm", "neutral"];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!selectedMood) {
      alert("Please select a mood");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/mood",
        { mood: selectedMood },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Mood saved successfully!");
    } catch (error) {
      setMessage("Error saving mood.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2
        style={{
          color: "#4169E1", // royal blue
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        Select your mood for today
      </h2>
      <select
        value={selectedMood}
        onChange={(e) => setSelectedMood(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "1.1rem",
          borderRadius: "8px",
          border: "2px solid #1E90FF", // royal blue border
          backgroundColor: "#E6F0FA", // light blue background
          color: "#4169E1", // royal blue text
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="" style={{ color: "#A9A9A9" }}>
          -- Select Mood --
        </option>
        {moods.map((mood) => (
          <option key={mood} value={mood} style={{ color: "#4169E1" }}>
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </option>
        ))}
      </select>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          backgroundColor: "#1E90FF", // royal blue
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 0 10px #1E90FF",
        }}
      >
        Save Mood
      </button>
      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "#4169E1" }}>
          {message}
        </p>
      )}
    </div>
  );
}
