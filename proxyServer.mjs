// proxyServer.mjs
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3001; // Different port to avoid conflict

const API_URL = "https://api.football-data.org/v4";
const API_KEY = "e8c64df2efee4593872589a0e13bf03a"; // Replace with your actual API key

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/api/:league/matches", async (req, res) => {
  const { league } = req.params;
  const { status } = req.query;
  try {
    const response = await fetch(
      `${API_URL}/competitions/${league}/matches?status=${status}`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
