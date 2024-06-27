async function searchMovies() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") return;

  showLoadingIndicator();

  try {
    const response = await fetch(
      `/api/search?s=${encodeURIComponent(searchTerm)}`
    );
    const text = await response.text(); // Get response as text
    console.log("Response Text:", text); // Log the response text

    try {
      const data = JSON.parse(text); // Parse it as JSON
      console.log("Parsed Data:", data); // Log the parsed data

      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        movieList.innerHTML =
          '<div class="no-movies">No movies found. Please try another search.</div>';
      }
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      movieList.innerHTML = `<div class="no-movies">Invalid response from server. Please try again later.</div>`;
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    movieList.innerHTML = `<div class="no-movies">An error occurred while searching for movies. Please try again later.</div>`;
  } finally {
    hideLoadingIndicator();
  }
}
