const express = require("express");
const app = express();

app.use(express.json());

app.post("/testpost", (req, res) => {
  console.log("✅ POST /testpost hit!");
  res.send("Test POST route works!");
});

app.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
