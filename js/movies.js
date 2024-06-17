setTimeout(function () {
  $("#loading").hide();
  myMovies();
}, 1500);

setTimeout(() => {
  $("#addBtn").click(function (event) {
    console.log("click");
    event.preventDefault();
    let titleinput = document.getElementById("title").value;
    addMovies(titleinput);
    myMovies();
    setTimeout(function () {
      location.reload();
    }, 2000);
  });
}, 2000);

setTimeout(
  () =>
    $(".deleteBtn").click(function (event) {
      console.log("click on delete btn");
      // event.preventDefault();
      let id = event.target.id;
      deleteMovies(id);
      location.reload();
    }),
  2000
);

setTimeout(() => {
  console.log("editBtn");
  $(".editBtn").click(function (event) {
    // event.preventDefault();
    let id = event.target.id;
    editMovies(id);
    setTimeout(function () {
      location.reload();
    }, 2000);
  });
}, 2000);

function myMovies() {
  let html = "";
  fetch("http://localhost:3000/movies")
    .then((response) => response.json())
    .then((movieData) => {
      movieData.map((data) => {
        html += `<div class="d-flex">`;
        html += `<div>`;
        html += `<p className='movie-para'><img src="${data.imgUrl}" id='movieimg' alt="poster">`;
        html += `<span class="w-25 "> ${data.id} </span>`;
        html += `<h3 class="w-25 "> ${data.title} </h3> </p>`;
        html += `<h6 class="w-25 "> ${data.rating} </h6>`;
        html += `<h6 class="w-25 "> ${data.genre} </h6>`;
        html += `</div>`;
        html += ` <form class="editForm">`;
        html += ` <label for="edittitle"></label>`;
        html += ` <input  name="edittile" class="edittitle" type="text" placeholder="title">`;
        html += ` <label  for="editgenre"></label>`;
        html += ` <input  name="editgenre" class="editgenre" type="text" placeholder="genre">`;
        html += ` <label  for="editrating"></label>`;
        html += ` <input  name="editrating" class="editrating" type="text" placeholder="rating">`;
        html += `  <button id="${data.id}" type="button" class="editBtn primary">Edit</button>`;
        html += `  <button id="${data.id}" type="button" class="deleteBtn primary ">Delete</button>`;
        html += ` </form>`;
        html += `</div>`;
      });
      $(".movie-title").html(html);
    })
    .catch((error) => console.log(error));
}

function deleteMovies(id) {
  console.log("test");
  fetch(`http://localhost:3000/movies/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

function editMovies(id) {
  fetch(`http://localhost:3000/movies/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: $(".edittitle").val(),
      genre: $(".editgenre").val(),
      rating: $(".editrating").val(),
    }),
  })
    .then((resp) => resp.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

function addMovies(title) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "571ce49e3dmshaa6ff679663cc54p110312jsn3dd08de4fc0e",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };
  fetch(
    `https://online-movie-database.p.rapidapi.com/title/find?q=${title}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let movieTitle = response.results[0].title;
      let movieImage = response.results[0].image.url;
      fetch("http://localhost:3000/movies", {
        // establish the method, GET is the default method.
        method: "POST",
        headers: {
          // the server needs to know what format we are sending data n.
          "Content-Type": "application/json",
        },
        // convert JS object to JSON object
        body: JSON.stringify({
          title: movieTitle,
          genre: $("#genre").val(),
          rating: $("#rating").val(),
          imgUrl: movieImage,
        }),
      }).then((response) => myMovies());
    });
}
