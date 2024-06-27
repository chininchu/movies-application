const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api/search", async (req, res) => {
  try {
    const { s } = req.query;
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${s}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.get("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching movie data" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/watchlist", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "watchlist.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
