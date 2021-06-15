document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    getMovieList();
});



async function sendRequest(url, method, data) {
    const options = { method };
    const server = 'https://dcitmovieapi.herokuapp.com';
    if (data) {
        options.body = JSON.stringify(data);
        options.headers = { 'Content-Type': 'application/json' };
    }
    let response = await fetch(server + url, options);
    return response.json();
}



function displayMovieList(movies) {
    let html = '';
    for (let log of movies) {
        html += `<a href="#" 
    id="${log.id}" 
    onclick="getMovie('${log.id}')"
    class="collection-item">${log.title}</a>`;
    }
    document.querySelector('#movieList').innerHTML = html
}

async function getMovieList() {
    const logs = await sendRequest('/api/movies', 'GET');
    displayMovieList(logs);
}

function displayMovie(movie) {
    let html = '';

    html += `<div class="col">
<img src="${movie.poster_url}">
</div>
<div class="col">
<p> Release Date : ${movie.release_date}</p>
<p> Studio : ${movie.studio}</p>
<p> Gross : ${movie.gross} </p
</div>`;

    document.querySelector('#movieDetail').innerHTML = html;
    document.querySelector('#movieTitle').innerHTML = movie.title;
}

async function getMovie(id) {
    const movie = await sendRequest('/api/movies/' + id, 'GET');
    displayMovie(movie);
}