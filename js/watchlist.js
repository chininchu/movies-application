// Loads saved movie details and handles watchlist removal.
"use strict";

const watchlistSection = document.getElementById("watchlist-section");

async function loadWatchlist() {
  // localStorage persists the watchlist for this browser between visits.
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (watchlist.length === 0) {
    watchlistSection.innerHTML =
      "<p>Your watchlist is empty. Go to the search page to add movies!</p>";
    return;
  }

  watchlistSection.innerHTML =
    '<div class="loading">Loading your watchlist...</div>';

  try {
    for (const imdbID of watchlist) {
      // Fetch each saved movie's current details from the serverless function.
      const response = await fetch(
        `/.netlify/functions/omdb?i=${encodeURIComponent(imdbID)}`,
      );
      if (!response.ok) {
        throw new Error(`Movie service returned HTTP ${response.status}`);
      }
      const movie = await response.json();
      if (movie.error || movie.Response === "False") {
        throw new Error(
          movie.error || movie.Error || "Movie details unavailable",
        );
      }
      displayMovie(movie);
    }
  } catch (error) {
    console.error("Error loading watchlist:", error);
    watchlistSection.innerHTML =
      "<p>An error occurred while loading your watchlist. Please try again later.</p>";
  }

  document.querySelector(".loading")?.remove();
}

function displayMovie(movie) {
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-item");
  movieElement.innerHTML = `
        <img src="${
          movie.Poster !== "N/A" ? movie.Poster : "placeholder.svg"
        }" alt="${movie.Title}" class="movie-img">
        <div class="movie-info">
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <p>Director: ${movie.Director}</p>
            <button class="remove-from-watchlist" data-imdbid="${
              movie.imdbID
            }">Remove from Watchlist</button>
        </div>
    `;
  watchlistSection.appendChild(movieElement);
  const poster = movieElement.querySelector(".movie-img");
  poster.addEventListener(
    "error",
    () => {
      poster.src = "placeholder.svg";
    },
    { once: true },
  );

  movieElement
    .querySelector(".remove-from-watchlist")
    .addEventListener("click", removeFromWatchlist);
}

function removeFromWatchlist(event) {
  const imdbID = event.target.dataset.imdbid;
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  // Update storage first so the UI and saved data stay in sync.
  watchlist = watchlist.filter((id) => id !== imdbID);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  event.target.closest(".movie-item").remove();

  if (watchlist.length === 0) {
    watchlistSection.innerHTML =
      "<p>Your watchlist is empty. Go to the search page to add movies!</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadWatchlist);
