$(document).ready(function (){
    setTimeout(function () {
        $('#loading').hide()
    }, 2000);
    // $('.loading').hide()
    $("#addBtn").click(function (event){
        event.preventDefault();
        // const formData = new FormData(form);
        // const data = Object.fromEntries(formData);
        postMovies()
    })
})



// function myMovies() {
//     let html=''
//     fetch('http://localhost:3000/movies')
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .then(data => function (data) {
//                 // ITIERATE THROUGH MOVIES ARRAY AND DISPLAY EACH MOVIE WITH ALL PROPERTIES
//                 for (let i = 0; i < data.length; i++) {
//                     // TITLE
//                     html += '<h1>' + data[i].title + '</h1>'
//                     // IMAGE
//                     html += '<h1>' + data[i].imgUrl + '</h1>'
//                     // GENRE
//                     html += '<h1>' + data[i].genre + '</h1>'
//                     // RATINGS
//                     html += '<h1>' + data[i].rating + '</h1>'
//                 }
//                 $('.movie-title').html(html)
//             }
//         ).catch(error => console.error(error))
// }
//
// myMovies()


// function getMovieId(data){
//     fetch('http://localhost:3000/movies', {
//         // establish the method, GET is the default method.
//     })
//         .then(resp => resp.json())
//         .then(data => {return data.length-1 })
//         .catch(error => console.log(error));
// }




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
            imgUrl: $('#image').val(),

        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}






