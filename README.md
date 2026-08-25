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

2. Create `movies-application/.env` with your local OMDb key:

   ```text
   OMDB_API_KEY=your_omdb_api_key
   ```

   This file is ignored by Git. Do not put the key in `index.html` or either browser script.

3. Start the local Netlify development server:

   ```bash
   cd movies-application && npx --yes netlify-cli dev --port 8080 --no-open
   ```

4. Open `http://localhost:8080` in a browser.

## Deploy to Netlify

1. Create or open the Netlify site connected to this repository.
2. Set the site's **Base directory** to `movies-application`.
3. Add `OMDB_API_KEY` under **Project configuration > Environment variables** for the deploy context you use, such as Production.
4. Trigger a deploy. Netlify reads `netlify.toml`, publishes this directory, and discovers `netlify/functions/omdb.js` automatically.

The production site must be opened through its Netlify URL. Opening `index.html` directly with a `file://` URL bypasses Netlify Functions, so `/.netlify/functions/omdb` cannot work.

## Project Structure

```text
index.html                 Movie search page
watchlist.html             Saved movies page
css/movies.css              Application styles
js/movies.js                Search and add-to-watchlist logic
js/watchlist.js             Watchlist loading and removal logic
netlify/functions/omdb.js   OMDb API serverless proxy
```
