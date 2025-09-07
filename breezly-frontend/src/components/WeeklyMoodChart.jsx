import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const moodOrder = ["sad", "anxious", "neutral", "calm", "happy"];

export default function WeeklyMoodChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/mood/week", {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      const moods = res.data;

      const labels = [];
      const dataValues = [];

      function isSameDate(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
      }

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString(undefined, { weekday: "short" }));

        const moodEntry = moods.find(m => isSameDate(new Date(m.date), date));

        let moodVal = 3; // default to neutral
        if (moodEntry) {
          moodVal = moodOrder.indexOf(moodEntry.mood) + 1;
        }
        dataValues.push(moodVal);
      }

      setChartData({
        labels,
        datasets: [
          {
            label: "Mood (1=Sad, 5=Happy)",
            data: dataValues,
            backgroundColor: "#FFD700",  // Yellow/gold bars
          }
        ]
      });
    }).catch(err => {
      console.error("Failed to load mood data:", err);
    });
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              min: 1,
              max: 5,
              ticks: {
                stepSize: 1,
                callback: val => {
                  const moodLabels = ["Sad", "Anxious", "Neutral", "Calm", "Happy"];
                  return moodLabels[val - 1] || "";
                }
              }
            }
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Your Mood Over the Past Week",
              font: {
                weight: "bold",
                size: 18
              },
              color: "#FFD700"  // Yellow/gold title text
            }
          }
        }}
      />
    </div>
  );
}
