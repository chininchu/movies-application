const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api/search", async (req, res) => {
  try {
    console.log("Received search request:", req.query);
    const { s } = req.query;
    if (!process.env.OMDB_API_KEY) {
      throw new Error("OMDB API key is not set");
    }
    const apiUrl = `http://www.omdbapi.com/?apikey=${
      process.env.OMDB_API_KEY
    }&s=${encodeURIComponent(s)}`;
    console.log("Sending request to OMDB API:", apiUrl);
    const response = await axios.get(apiUrl);
    console.log("Received response from OMDB API:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error in /api/search:", error);
    res.status(500).json({
      error: "An error occurred while fetching data",
      details: error.message,
    });
  }
});

app.get("/api/movie/:imdbID", async (req, res) => {
  try {
    const { imdbID } = req.params;
    if (!process.env.OMDB_API_KEY) {
      throw new Error("OMDB API key is not set");
    }
    const apiUrl = `http://www.omdbapi.com/?apikey=${
      process.env.OMDB_API_KEY
    }&i=${encodeURIComponent(imdbID)}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error in /api/movie/:imdbID:", error);
    res.status(500).json({
      error: "An error occurred while fetching movie data",
      details: error.message,
    });
  }
});

// Updated endpoint for random movies
app.get("/api/random-movies", async (req, res) => {
  try {
    if (!process.env.OMDB_API_KEY) {
      throw new Error("OMDB API key is not set");
    }

    // Generate a random search term (you can modify this list as needed)
    const randomSearchTerms = [
      "action",
      "comedy",
      "drama",
      "thriller",
      "sci-fi",
      "romance",
    ];
    const randomTerm =
      randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];

    const apiUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${randomTerm}&type=movie`;
    const response = await axios.get(apiUrl);

    if (response.data.Response === "True") {
      // Randomly select up to 8 movies from the results
      const randomMovies = response.data.Search.sort(
        () => 0.5 - Math.random()
      ).slice(0, 8);
      res.json(randomMovies);
    } else {
      res.status(404).json({ error: "No random movies found" });
    }
  } catch (error) {
    console.error("Error in /api/random-movies:", error);
    res.status(500).json({
      error: "An error occurred while fetching random movies",
      details: error.message,
    });
  }
});

// Handle any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `OMDB API key is ${process.env.OMDB_API_KEY ? "set" : "not set"}`
  );
  console.log(`Node environment: ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
