// Define an array to store movies
let movies = [];
let movieId = 1;

// Select DOM elements
const movieForm = document.getElementById("movieForm");
const titleInput = document.getElementById("title");
const directorInput = document.getElementById("director");
const genreInput = document.getElementById("genre");
const releaseDateInput = document.getElementById("releaseDate");
const movieTable = document.getElementById("movieTable").getElementsByTagName("tbody")[0];
const clearAllButton = document.getElementById("clearAllButton");

// Add Event Listener to Movie Form (Add Movie)
movieForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get values from form inputs
  const title = titleInput.value;
  const director = directorInput.value;
  const genre = genreInput.value;
  const releaseDate = releaseDateInput.value;

  // Create movie object and add to the movies array
  const movie = {
    id: movieId++,
    title,
    director,
    genre,
    releaseDate,
  };

  movies.push(movie);

  // Add movie to table
  addMovieToTable(movie);

  // Clear form inputs
  movieForm.reset();
});

// Add Movie to Table
function addMovieToTable(movie) {
  const row = movieTable.insertRow();
  row.setAttribute("data-id", movie.id);

  row.innerHTML = `
    <td>${movie.id}</td>
    <td>${movie.title}</td>
    <td>${movie.director}</td>
    <td>${movie.genre}</td>
    <td>${movie.releaseDate}</td>
    <td>
      <button onclick="editMovie(${movie.id})">Edit</button>
      <button onclick="deleteMovie(${movie.id})">Delete</button>
    </td>
  `;
}

// Edit Movie
function editMovie(id) {
  const movie = movies.find((movie) => movie.id === id);

  // Populate form with movie data for editing
  titleInput.value = movie.title;
  directorInput.value = movie.director;
  genreInput.value = movie.genre;
  releaseDateInput.value = movie.releaseDate;

  // Remove movie from list and table
  deleteMovie(id);
}

// Delete Movie
function deleteMovie(id) {
  // Remove movie from array
  movies = movies.filter((movie) => movie.id !== id);

  // Remove movie from table
  const row = document.querySelector(`[data-id="${id}"]`);
  row.remove();

  // Re-number the movies and update the table
  reNumberMovies();
}

// Re-number Movies after deletion
function reNumberMovies() {
  // Update the numbering in the table by re-rendering the list
  let currentId = 1;
  
  // Iterate over the movies array and reassign IDs
  movies.forEach((movie) => {
    movie.id = currentId; // Assign sequential ID starting from 1
    currentId++;
  });

  // Clear the table
  movieTable.innerHTML = "";

  // Re-render all movies with updated numbers
  movies.forEach((movie) => {
    addMovieToTable(movie); // Add each movie back to the table
  });
}

// Clear All Movies
clearAllButton.addEventListener("click", () => {
  // Clear movie array
  movies = [];

  // Remove all rows from the table
  movieTable.innerHTML = "";
});
