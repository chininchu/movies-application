"use-strict";
import "../css/movies.css";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const movieList = document.getElementById("movie-list");

function showLoadingIndicator() {
  movieList.innerHTML = `<div class="loading">Loading...</div>`;
}

// Test

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
    const response = await fetch(
      `/api/search?s=${encodeURIComponent(searchTerm)}`
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
  const imdbID = event.target.getAttribute("data-imdbid");
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (!watchlist.includes(imdbID)) {
    watchlist.push(imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    event.target.textContent = "Added to Watchlist";
    event.target.disabled = true;
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
