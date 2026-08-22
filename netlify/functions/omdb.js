exports.handler = async function (event) {
  const search = event.queryStringParameters.s;
  const imdbID = event.queryStringParameters.i;
  
  // Gets your key safely from Netlify's backend environment
  const API_KEY = process.env.OMDB_API_KEY;

  let url = `https://www.omdbapi.com/?apikey=${API_KEY}`;
  if (search) url += `&s=${encodeURIComponent(search)}`;
  if (imdbID) url += `&i=${encodeURIComponent(imdbID)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: "Failed to fetch data from OMDb API." }) 
    };
  }
};

