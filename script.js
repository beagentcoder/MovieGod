const pageContent = document.getElementById("page-content"); // body content
// const apikey = "a0060c55"; /// Storing the API key in a variable for easy use
const apikey="bffa573a";    //secondary key for API

var favMovies = localStorage.getItem("favMovies") // retrieving data from localStorage if available otherwise initialize empty array
  ? JSON.parse(localStorage.getItem("favMovies"))
  : [];

const favoritePage = document.getElementById("fav-click"); // capturing the click event on favorite Tab
favoritePage.addEventListener("click", () => {
  pageContent.innerHTML = ``;
  showFavoritePage();
});

document.addEventListener("DOMContentLoaded", displayHomePage);

function displayHomePage() {
  pageContent.innerHTML = ``;
  const ele = document.createElement("div");
  ele.id = "main-content";
  ele.innerHTML = `<div class="banner">
                <div class="image-container">
                    <img class="banner-image" src="assests/banner2.png" alt="banner image">
                </div>
                <p class="banner-text">Best Movies Recommended</p>
            </div>

            <div class="movies-container">
                <input type="text" id="search-text" placeholder="Enter keywords to Search Movies">
                <div class="list-container">
                    <ul id="movie-list" class="movie-list">

                    </ul>
                </div>
            </div>`;
  pageContent.appendChild(ele);

  const searchText = document.getElementById("search-text");
  searchText.addEventListener("input", handleInput);
}

async function handleInput(event) {
  const userInput = event.target.value;
  const movieList = document.getElementById("movie-list");

  movieList.innerHTML = ``; //clear existing list

  if (userInput) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${userInput}&apikey=${apikey}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const moviesArray = data.Search;
      // console.log(moviesArray);
      moviesArray.forEach((movie) => {
        const list = document.createElement("li");
        list.className = "movie-item";

        var imdbId = movie.imdbID;
        var movieName = movie.Title;
        var movieYear = movie.Year;

        const span = document.createElement("span");
        span.className = "movie-name";
        span.textContent = `${movie.Title} - ${movie.Year}`;

        const button = document.createElement("button");
        button.className = "button-align";
        button.innerHTML = '<i class="fa-regular fa-star"></i>';

        span.appendChild(button);
        list.appendChild(span);

        button.addEventListener("click", (e) => {
          e.stopPropagation();
          addToFavorites(movie);
        });

        movieList.appendChild(list);

        // list.innerHTML = `<span class=movie-name>${movieName}   - ${movieYear}   <button id="fav-add" class="button-align")><i class="fa-regular fa-star "></i></button></span>`;
        // movieList.appendChild(list);

        // const favBtn = document.getElementById("fav-add");

        // favBtn.addEventListener("click", (e)=> {
        //     e.stopPropagation();
        //     addToFavorites(movieName, movieYear)

        // });

        //   This approach is causing Errors Due to the special characters in the Movie Name ......BE SURE to Avoid it next Time

        list.addEventListener("click", () =>
          displayMovieDetails(movieName, movieYear, imdbId, event)
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}

function addToFavorites(movie) {
  console.log(movie);

  // Check if the movie is already in the favMovies array
  if (!favMovies.some((favMovie) => favMovie.imdbID === movie.imdbID)) {
    // alert("Movie Added Successfully :) <3");
    customAlert(` ${movie.Title} Added Successfully To Favorite :) <3`);

    favMovies.push(movie); //Adding Movie to favMovies array
    localStorage.setItem("favMovies", JSON.stringify(favMovies)); // Storing the movie in localStorage so that it is not deleted even after browser is closed
    console.log(`Added to favorites: ${movie.Title}`);
  } else {
    // alert("Movie Already Added !!!! :(");
    customAlert(`" ${movie.Title}" Already Added To Favorites`)
  }
}

async function displayMovieDetails(name, year, imdbId, inputEvent) {
  pageContent.innerHTML = ``;

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&t=${name}&y=${year}&apikey=${apikey}` //Dynamically fetching data for displayMovieDetails
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const movie = await response.json();

    const detailsEl = document.createElement("div");
    detailsEl.id = "movie-container";
    detailsEl.innerHTML = `
                <div class="movie-card">
                    <img class="movie-image" src="${movie.Poster}"
                        alt="Movie image">
                    <div class="movie-info">
                        <p class="display-movie-name playwrite-ng-modern-googlefont">${movie.Title}</p>
                        <p class="display-movie-year playwrite-ng-modern-googlefont">${movie.Genre}</p>
                        <p class="movie-realeased-year playwrite-ng-modern-googlefont">Released Date: ${movie.Released}</p>
                        <p class="movie-runtime playwrite-ng-modern-googlefont">Runtime: ${movie.Runtime}</p>
                        <p class="movie-language playwrite-ng-modern-googlefont">Language: ${movie.Language}</p>
                        <p class="movie-rating playwrite-ng-modern-googlefont">IMDB Rating: ${movie.imdbRating}</p>
                    </div>
                    <div class="fav-icon-container" id="fav-btn">
                        
                    </div>
                </div>
                <div class="movie-plot">
                <h2>Plot:</h2>
                <p>${movie.Plot}</p>
                <h2>Actors: </h2>
                <p> ${movie.Actors}</p>
                </div>
         
            
           `;

    const button = document.createElement("div");
    button.classList.add("fav-icon-container");
    button.id = "fav-btn";
    button.innerHTML = `<button ><i class="fa-regular fa-star "></i></button>
                        <p>Favourite</p>`;
    const backButton = document.createElement("button");
    backButton.classList.add("back-button");
    backButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      addToFavorites(movie);
    });

    backButton.addEventListener("click", (e) => {
      e.stopPropagation();
      displayHomePage();
      handleInput(inputEvent);
    });
    detailsEl.appendChild(button);
    pageContent.appendChild(backButton);

    pageContent.appendChild(detailsEl);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

function showFavoritePage() {
   pageContent.innerHTML=``
  const displayEle = document.createElement("div");
  displayEle.id = "main-content";
  displayEle.innerHTML = `<div class="banner">
                <div class="image-container">
                    <img class="banner-image" src="assests/banner2.png" alt="banner image">
                </div>
                <p class="banner-text">Favorite Movies</p>
            </div>
            <div class="list-container">
                    <ul id="movie-list" class="movie-list">

                    </ul>
                </div>`;
  pageContent.appendChild(displayEle);
  loadFavoriteItms();
}

function loadFavoriteItms() {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = ``; //clear existing list

  if (favMovies.length > 0) {
    favMovies.forEach((movie) => {
      const list = document.createElement("li");
      list.className = "movie-item";

      const span = document.createElement("span");
      span.className = "movie-name";
      span.textContent = `${movie.Title} - ${movie.Year}`;

      const button = document.createElement("button");
      button.className = "button-align";
      button.innerHTML = '<i class="fa-regular fa-star"></i>';

      span.appendChild(button);
      list.appendChild(span);

      button.addEventListener("click", (e) => {
        e.stopPropagation();
        removeFavorite(movie);
      });
      list.addEventListener("click", () =>
        displayMovieDetails(movie.Title, movie.Year, movie.imdbID, 0)
      );
      movieList.appendChild(list);
    });
  } else {
    console.log("No Favorite Movies Found");
    const list = document.createElement("li");
    list.className = "movie-item";
    list.innerHTML = `<span class=movie-name>No Favorite Movies Found</span>`;
    movieList.appendChild(list);
  }
  const backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;

  backButton.addEventListener("click", (e) => {
    e.stopPropagation();
    displayHomePage();
    handleInput(0);
  });

  pageContent.appendChild(backButton);
}

function removeFavorite(movie){
  customAlert(`"${movie.Title}" removed from Favorites`)
  // alert(`${movie.Title} removed from Favorites`);
  favMovies = favMovies.filter((favMovie) => favMovie.imdbID!== movie.imdbID);
  localStorage.setItem('favMovies', JSON.stringify(favMovies));
  showFavoritePage();

}


function customAlert(message) {
  const alertBox = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  
  alertMessage.textContent = message;
  alertBox.classList.add('show');

  setTimeout(() => {
      alertBox.classList.remove('show');
  }, 3000); // 3000 milliseconds = 3 seconds
}