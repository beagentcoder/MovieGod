const pageContent = document.getElementById("page-content");
const apikey ='a0060c55'
const fav = document.getElementById("fav-click");
var favMovies = []; // Declare the favMovies array to store favorite movies

// fav.addEventListener('click',()=>{
//     fav.innerHTML = ``
// })
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
          consoleItemClicked(movie);
        });

        movieList.appendChild(list);

        // list.innerHTML = `<span class=movie-name>${movieName}   - ${movieYear}   <button id="fav-add" class="button-align")><i class="fa-regular fa-star "></i></button></span>`;
        // movieList.appendChild(list);

        // const favBtn = document.getElementById("fav-add");

        // favBtn.addEventListener("click", (e)=> {
        //     e.stopPropagation();
        //     consoleItemClicked(movieName, movieYear)

        // });

        //   This approach is causing Errors Due to the special characters in the Movie Name ......BE SURE to Avoid it next Time

        list.addEventListener("click", () =>
          displayMovieDetails(movieName, movieYear, imdbId)
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}

function consoleItemClicked(movie) {
  console.log(movie);

  // Check if the movie is already in the favMovies array
  if (!favMovies.some((favMovie) => favMovie.imdbID === movie.imdbID)) {
    alert("Movie Added Successfully :) <3");
    favMovies.push(movie); //Adding Movie to favMovies array
    console.log(`Added to favorites: ${movie.Title}`);
  } else {
    alert("Movie already added !!!! :(");
  }

}

async function displayMovieDetails(name, year, imdbId) {
  pageContent.innerHTML = ``;
  console.log("in the displayMovieDetails function");

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&t=${name}&y=${year}&apikey=${apikey}`   //Dynamically fetching data for displayMovieDetails
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
                        <p class="movie-name playwrite-ng-modern-googlefont">${movie.Title}</p>
                        <p class="movie-year playwrite-ng-modern-googlefont">${movie.Year}</p>
                        <p class="movie-realeased-year playwrite-ng-modern-googlefont">Released Year: ${movie.Released}</p>
                        <p class="movie-runtime playwrite-ng-modern-googlefont">Runtime: ${movie.Runtime}</p>
                        <p class="movie-language playwrite-ng-modern-googlefont">Language: ${movie.Language}</p>
                        <p class="movie-rating playwrite-ng-modern-googlefont">IMDB Rating: ${movie.imdbRating}</p>
                    </div>
                    <div class="fav-icon-container">
                        <button class=""><i class="fa-regular fa-star "></i></button>
                        <p>Favourite</p>
                    </div>
                </div>
                <div class="movie-plot">
                <h2>Plot:</h2>
                <p>${movie.Plot}</p>
                <h2>Actors: </h2>
                <p> ${movie.Actors}</p>
                </div>
         
            
           `;

        const backButton = document.createElement('button');
        backButton.classList.add('back-button');
        backButton.innerHTML= `<i class="fa-solid fa-arrow-left"></i>`
        backButton.addEventListener('click',(e) =>{
            e.stopPropagation();
            displayHomePage();
        } );

        pageContent.appendChild(backButton)
        pageContent.appendChild(detailsEl);

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);

  }

  
}


// displayMovieDetails("Spider-Man: No Way Home", 2021, "tt10872600")