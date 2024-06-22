// watchlist.js
const watchlistSection = document.getElementById("watchlist-section");

async function loadWatchlist() {
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
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
      );
      const movie = await response.json();
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
          movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"
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

  movieElement
    .querySelector(".remove-from-watchlist")
    .addEventListener("click", removeFromWatchlist);
}

function removeFromWatchlist(event) {
  const imdbID = event.target.getAttribute("data-imdbid");
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  watchlist = watchlist.filter((id) => id !== imdbID);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  event.target.closest(".movie-item").remove();

  if (watchlist.length === 0) {
    watchlistSection.innerHTML =
      "<p>Your watchlist is empty. Go to the search page to add movies!</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadWatchlist);
