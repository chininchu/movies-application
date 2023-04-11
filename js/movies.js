// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': MOVIE_KEY;
//         'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
//     }
// };

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=id', {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': MOVIE_KEY,
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err =>{
        console.error(err);
    });