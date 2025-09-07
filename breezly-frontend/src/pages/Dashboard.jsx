// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MoodTracker from "./MoodTracker.jsx";
export default function Dashboard() {
  const [tip, setTip] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/tips/daily", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setTip(res.data.tip);
      setName(res.data.user);
    })
    .catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <div style={{
      background: "linear-gradient(to bottom right, #EEE8AA, #F08080)",

      height: "100vh",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#191970", }}>
        🍒 Hello, {name}!🍒 
      </h1>
      <div style={{
        marginTop: "20px",
        padding: "20px",
        background: "rgba(255, 192, 203, 0.2)",
        border: "2px solid #CD853F",
        borderRadius: "15px",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FF6347" }}>Your Daily Wellness Tip🌈</h2>
        <p style={{ fontSize: "1.2rem", marginTop: "10px",color: "#C71585", textShadow: "0 0 8px #C71585" }}>{tip}</p>
      </div>
      <div style={{
        marginTop: "40px",
        padding: "20px",
        background: "rgba(255, 160, 122, 0.15)",  // light coral transparent
        border: "2px solid #ff7f50",  // coral border
        borderRadius: "15px",
        maxWidth: "400px",
        width: "100%"
      }}>
        <MoodTracker />
      </div>
      <button
        onClick={() => navigate("/mood-chart")}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          backgroundColor: "#006400",  // coral
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 0 10px #004d00"
        }}
      >
        View Weekly Mood Chart
      </button>
    </div>
  );
}
