/*const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7fea685b587487f0586b1c99519ab7fb&page=1";
const IMG_PATH = 'https.//image.tmbd.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=7fea685b587487f0586b1c99519ab7fb&query=";
const getMovies = async(url) => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
}
getMovies(APILINK);
*/
const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7fea685b587487f0586b1c99519ab7fb&page=1";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=7fea685b587487f0586b1c99519ab7fb&query=";

const moviesContainer = document.getElementById("movies-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Function to display movie data in HTML
function displayMovies(movies) {
    moviesContainer.innerHTML = ""; // Clear previous results

    if (movies.length === 0) {
        const noResultsElement = document.createElement("p");
        noResultsElement.innerText = "No movies found.";
        moviesContainer.appendChild(noResultsElement);
        return;
    }

    movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.classList.add("movie-list-item")
        movieElement.classList.add("movie-list-container")
        movieElement.classList.add("movie-list")

        const titleElement = document.createElement("h2");
        titleElement.innerText = movie.title;
        titleElement.classList.add("movie-list-item-title")

        const imageElement = document.createElement("img");
        imageElement.src = IMG_PATH + movie.poster_path;
        imageElement.alt = movie.title;
        imageElement.classList.add("movie-list-image")

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = movie.overview;
        descriptionElement.classList.add("movie-list-item-text")


        const ratingElement = document.createElement("p");
        ratingElement.innerText = "Rating: " + movie.vote_average;
        const buttonElement = document.createElement("button");
        buttonElement.innerText = "Watch Now";
        buttonElement.classList.add("movie-list-item-btn");



        movieElement.appendChild(titleElement);
        movieElement.appendChild(imageElement);
        movieElement.appendChild(descriptionElement);
        movieElement.appendChild(ratingElement);
        movieElement.appendChild(buttonElement);

        moviesContainer.appendChild(movieElement);

    });
}






// Function to fetch and display movies
async function fetchAndDisplayMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.log(error);
    }
}

// Function to handle search form submission
function handleSearch(event) {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    if (searchQuery !== "") {
        const encodedQuery = encodeURIComponent(searchQuery);
        const searchURL = SEARCHAPI + encodedQuery;
        fetchAndDisplayMovies(searchURL);
    }
}

// Attach event listener to the search form
searchForm.addEventListener("submit", handleSearch);

// Fetch popular movies on page load
fetchAndDisplayMovies(APILINK);