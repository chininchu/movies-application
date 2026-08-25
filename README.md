# Movie Watchlist

A browser-based movie search and watchlist application powered by the OMDb API.

## Live Site

[Live demo](https://splendorous-wisp-6eb5b0.netlify.app)

## Features

- Search for movies by title.
- View movie posters, titles, and release years in the search results.
- Add movies to a personal watchlist.
- View saved movies with their poster, release year, and director.
- Remove movies from the watchlist.
- Keep the watchlist in the browser with `localStorage`.
- Show loading, empty, and error states during searches and watchlist loading.

## How It Works

The frontend is made with HTML, CSS, and vanilla JavaScript. Movie data comes from the OMDb API through the Netlify serverless function at `/.netlify/functions/omdb`. The API key stays on the server in the `OMDB_API_KEY` environment variable, while saved watchlist IMDb IDs are stored locally in the user's browser.

## Run Locally

1. Install the project dependencies required by Netlify CLI, if needed:

   ```bash
   npm install -g netlify-cli
   ```

2. Add an `OMDB_API_KEY` environment variable to your Netlify site or local Netlify configuration.

3. Start the local Netlify development server:

   ```bash
   npx --yes netlify-cli dev --port 8080 --no-open
   ```

4. Open `http://localhost:8080` in a browser.

## Project Structure

```text
index.html                 Movie search page
watchlist.html             Saved movies page
css/movies.css              Application styles
js/movies.js                Search and add-to-watchlist logic
js/watchlist.js             Watchlist loading and removal logic
netlify/functions/omdb.js   OMDb API serverless proxy
```
