const checking=document.getElementById('page-content')

const fav=document.getElementById('favclick')

// fav.addEventListener('click',()=>{
//     fav.innerHTML = ``
// })

function displayHomePage(){
    const ele=document.createElement('div')
    ele.innerHTML = `<div class="banner">
                <div class="image-container">
                    <img class="banner-image" src="assests/banner2.png" alt="banner image">
                </div>
                <p class="banner-text">Best Movies Recommended</p>
            </div>

            <div class="movies-container">
                <input type="text" class="search-text" placeholder="Enter keywords to Search Movies">
                <div class="list-container">
                    <ul class="movie-list">

                    </ul>
                </div>
            </div>`
        checking.appendChild(ele)
}

document.addEventListener('DOMContentLoaded',displayHomePage)

// displayHomePage()