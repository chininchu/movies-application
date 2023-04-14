// $(document).ready(function () {

setTimeout(function () {
    $('#loading').hide()
    myMovies()
}, 2000)
// addMovies()
setTimeout(() =>
    $("#addBtn").click(function (event) {
        event.preventDefault();
        let title = event.target.title
        addMovies(title)
        myMovies()
    }), 1500)

setTimeout(() =>
    $(".deleteBtn").click(function (event) {
        event.preventDefault();
        let id = event.target.id
        deleteMovies(id)
        myMovies()
    }), 1500)

setTimeout(() =>
    $(".editBtn").click(function (event) {
        event.preventDefault();
        let id = event.target.id
        editPost(id)
        myMovies()
    }), 1500)


// Currently working on implementing the Grid system

function myMovies() {
    let html = ''
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movieData => {
            movieData.map(data => {

                html += `<div class="d-flex" style="height: 200px;">`
                html += `<div>`
                html += `<span class="w-25 "> ${data.id} </span>`
                html += `<h3 class="w-25 "> ${data.title} </h3>`
                html += `<h6 class="w-25 "> ${data.rating} </h6>`
                html += `<h6 class="w-25 "> ${data.genre} </h6>`
                // html += `<h6 class="w-25 "> ${data.imgUrl} </h6>`
                html += `</div>`
                html += ` <form class="" id="editForm">`
                html += ` <label  class="" for="edittitle"></label>`
                html += ` <input  class="" name="edittile" id="edittitle" type="text" placeholder="title">`
                html += ` <label  class="" for="editgenre"></label>`
                html += ` <input  class="" name="editgenre" id="editgenre" type="text" placeholder="genre">`
                html += ` <label  class="" for="editrating"></label>`
                html += ` <input  class="" name="editrating" id="editrating" type="text" placeholder="rating">`
                html += ` <label  class="" for="editimage"></label>`
                html += ` <input  class="" name="editimage" id="editimage" type="text" placeholder="image here">`
                html += `  <button  id="${data.id}" type="button" class="editBtn btn-primary">Edit</button>`
                html += `  <button id="${data.id}" type="button" class="deleteBtn btn-primary ">Delete</button>`
                html += ` </form>`
                html += `</div>`


            })
            $('.movie-title').html(html)
        })
        .catch(error => console.log(error))

}


function postMovies() {
    fetch('http://localhost:3000/movies', {
        // establish the method, GET is the default method.
        method: 'POST',
        headers: {
            // the server needs to know what format we are sending data in.
            'Content-Type': 'application/json'
        },
        // convert JS object to JSON object
        body: JSON.stringify({
            title: $('#title').val(),
            genre: $('#genre').val(),
            rating: $('#rating').val(),
            imgUrl: $('#image').val()

        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

function deleteMovies(id) {
    console.log('test')
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE',

    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

    myMovies();
}


function editPost(title) {
    return fetch(`http://localhost:3000/movies/${title}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: $('#edittitle').val(),
            genre: $('#editgenre').val(),
            rating: $('#editrating').val(),
            imgUrl: $('#editimage').val(),
        })
    })
        .then(resp => resp.json())
        .then(data => data)
        .catch(error => console.error(error))
}

function addMovies(title) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '571ce49e3dmshaa6ff679663cc54p110312jsn3dd08de4fc0e',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    fetch(`https://online-movie-database.p.rapidapi.com/title/find?q=${title}`, options)
        .then(response => response.json())
        .then(response => {
            const movies = response.results;
            movies.map(movie => {
                // const movieTitle= movie[0].title
                // console.log(movieTitle)
                console.log(movie.image)
            })
            // fetch('http://localhost:3000/movies', {
            //     // establish the method, GET is the default method.
            //     method: 'POST',
            //     headers: {
            //         // the server needs to know what format we are sending data n.
            //         'Content-Type': 'application/json'
            //     },
            //     // convert JS object to JSON object
            //     body: JSON.stringify({
            //         title: 'results[0].title',
            //         genre: $('#genre').val(),
            //         rating: $('#rating').val(),
            //         imgUrl: 'results[0].image.url'
            //
            //     })
            //
            // })
        })
}

addMovies('shrek')




