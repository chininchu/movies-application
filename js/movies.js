// Handles movie searches and adding search results to the watchlist.
"use strict";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const movieList = document.getElementById("movie-list");

// Replace the current results while the Netlify Function is working.
function showLoadingIndicator() {
  movieList.innerHTML = `<div class="loading">Loading...</div>`;
}

function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector(".loading");
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

async function searchMovies() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") return;

  showLoadingIndicator();

  try {
    // The serverless function keeps the OMDb API key out of browser code.
    const response = await fetch(
      `/.netlify/functions/omdb?s=${encodeURIComponent(searchTerm)}`,
    );
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      movieList.innerHTML =
        '<div class="no-movies">No movies found. Please try another search.</div>';
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    movieList.innerHTML = `<div class="no-movies">An error occurred while searching for movies. Please try again later.</div>`;
  }

  hideLoadingIndicator();
}

function displayMovies(movies) {
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");
    movieItem.innerHTML = `
            <img src="${
              movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"
            }" alt="${movie.Title}" class="movie-img">
            <div class="movie-info">
                <h2>${movie.Title}</h2>
                <p>Year: ${movie.Year}</p>
                <button class="add-to-watchlist" data-imdbid="${
                  movie.imdbID
                }">Add to Watchlist</button>
            </div>
        `;
    movieList.appendChild(movieItem);
  });

  document.querySelectorAll(".add-to-watchlist").forEach((button) => {
    button.addEventListener("click", addToWatchlist);
  });
}

function addToWatchlist(event) {
  const imdbID = event.currentTarget.dataset.imdbid;
  // Only IMDb IDs are stored so complete movie details can be fetched later.
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (!watchlist.includes(imdbID)) {
    watchlist.push(imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    event.currentTarget.textContent = "Added to Watchlist";
    event.currentTarget.disabled = true;
  } else {
    alert("This movie is already in your watchlist.");
  }
}

searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchMovies();
  }
});
