$(document).ready(function (){
    $('.loading').hide()
})


function myMovies() {
    let html=''
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => function (data) {
                // ITIERATE THROUGH MOVIES ARRAY AND DISPLAY EACH MOVIE WITH ALL PROPERTIES
                for (let i = 0; i < data.length; i++) {
                    // TITLE
                    html += '<h1>' + data[i].title + '</h1>'
                    // IMAGE
                    html += '<h1>' + data[i].imgUrl + '</h1>'
                    // GENRE
                    html += '<h1>' + data[i].genre + '</h1>'
                    // RATINGS
                    html += '<h1>' + data[i].rating + '</h1>'
                }
                $('.movie-title').html(html)
            }
        ).catch(error => console.error(error))
}

myMovies()


function addMovies(){
    fetch('http://localhost:3000/movies',{
        method:'POST'
    })
        .then(response => response.json())
        .then(data => console.log()).
        .catch(error => console.error(error));
}

function deleteMovies(){
    fetch('http://localhost:3000/movies', {
        method:'DELETE',
    })
        .then(response => response.json())
        .then(data => console.log())
        .catch(error => console.error(error));
}


function editMovies(id){
    return fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedMovies)
    })
        .then(resp => resp.json())
        .then(data => data)
        .catch(error => console.error(error));
}


