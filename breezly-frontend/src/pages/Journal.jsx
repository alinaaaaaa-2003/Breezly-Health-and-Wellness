import React, { useState, useEffect } from "react";
import axios from "axios";
import HTMLFlipBook from "react-pageflip";
import "./journal.css";

export default function Journal() {
  const [form, setForm] = useState({ thoughts: "", worries: "", events: "", aspirations: "" });
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your journal.");
      setLoading(false);
      return;
    }

    axios
      .get("/api/journal", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setEntries(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load journal entries.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to add journal entries.");
      return;
    }

    try {
      await axios.post("/api/journal", form, { headers: { Authorization: `Bearer ${token}` } });
      setForm({ thoughts: "", worries: "", events: "", aspirations: "" });
      setError(null);
      alert("Entry saved! Refresh page to see in FlipBook.");
    } catch (err) {
      console.error("Error saving entry", err);
      setError("Failed to save entry.");
    }
  };

  if (loading) return <p className="text-pink-200 text-center mt-20">Loading your journal...</p>;
  if (error) return <p className="text-red-400 text-center mt-20">{error}</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-maroon-900 to-maroon-700 min-h-screen text-white">
      <h2 className="text-4xl font-bold mb-4 text-pink-300 text-center cursive-font">My Personal Journal</h2>

      <form onSubmit={handleSubmit} className="bg-paper p-6 rounded-lg shadow-lg border border-pink-400 mb-10">
        <textarea name="thoughts" placeholder="Your thoughts..." value={form.thoughts} onChange={handleChange} className="journal-input" autoComplete="off"/>
        <textarea name="worries" placeholder="Your worries..." value={form.worries} onChange={handleChange} className="journal-input" autoComplete="off"/>
        <textarea name="events" placeholder="What happened today?" value={form.events} onChange={handleChange} className="journal-input" autoComplete="off"/>
        <textarea name="aspirations" placeholder="Aspirations for tomorrow..." value={form.aspirations} onChange={handleChange} className="journal-input" autoComplete="off"/>
        <button type="submit" className="bg-pink-500 text-white font-bold px-4 py-2 rounded hover:bg-pink-600 shadow">Save Entry</button>
      </form>

      {entries.length === 0 && <p className="text-pink-200 text-center mt-10">No journal entries yet. Write your first one!</p>}

      {entries.length > 0 && (
        <div className="flex justify-center">
          <HTMLFlipBook width={400} height={500} className="shadow-lg">
            <div className="cover-page page">
              <h1 className="text-4xl font-bold cursive-font text-pink-700">My Diary</h1>
              <p className="text-pink-800 cursive-font mt-4 text-center">
                A safe space for my thoughts, feelings, and dreams.
              </p>
            </div>

            {entries.map((entry) => (
              <div key={entry._id} className="flipbook-page page">
                <h4 className="font-bold text-lg cursive-font">{new Date(entry.date).toLocaleDateString()}</h4>
                {entry.thoughts && <p><strong>Thoughts:</strong> {entry.thoughts}</p>}
                {entry.worries && <p><strong>Worries:</strong> {entry.worries}</p>}
                {entry.events && <p><strong>Events:</strong> {entry.events}</p>}
                {entry.aspirations && <p><strong>Aspirations:</strong> {entry.aspirations}</p>}
              </div>
            ))}

            <div className="closing-page page">
              <h2 className="text-2xl font-bold cursive-font text-pink-700">Keep Going 🌟</h2>
              <p className="text-pink-800 cursive-font mt-4 text-center italic">
                "Every day may not be good, but there is something good in every day."
              </p>
            </div>
          </HTMLFlipBook>
        </div>
      )}
    </div>
  );
}
