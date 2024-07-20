import { API_KEY } from './config.js';

const url = 'https://api.themoviedb.org/3/movie/popular';
const headers = {
    'Authorization': `Bearer ${API_KEY}`,
}

const searchBar = document.querySelector('input');
const searchInput = searchBar.value;



const genres = [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      },
      {
        id: 16,
        name: "Animation"
      },
      {
        id: 35,
        name: "Comedy"
      },
      {
        id: 80,
        name: "Crime"
      },
      {
        id: 99,
        name: "Documentary"
      },
      {
        id: 18,
        name: "Drama"
      },
      {
        id: 10751,
        name: "Family"
      },
      {
        id: 14,
        name: "Fantasy"
      },
      {
        id: 36,
        name: "History"
      },
      {
        id: 27,
        name: "Horror"
      },
      {
        id: 10402,
        name: "Music"
      },
      {
        id: 9648,
        name: "Mystery"
      },
      {
        id: 10749,
        name: "Romance"
      },
      {
        id: 878,
        name: "Science Fiction"
      },
      {
        id: 10770,
        name: "TV Movie"
      },
      {
        id: 53,
        name: "Thriller"
      },
      {
        id: 10752,
        name: "War"
      },
      {
        id: 37,
        name: "Western"
      }
    ];

const template = document.getElementById('movie-card');
const resultDiv = document.getElementById('grid-search-results');


// Popular Movies List
fetch(url, { headers })
    .then((response) => {
        if(!response.ok) throw new Error ('Sorry. Someting went wrong.');
        return response.json()})
    
    .then((data => {
        console.log(data);
        data.results.forEach(movie => {
            const templateDiv = document.createElement('div');
            templateDiv.classList.add('bg-gray-800', 'rounded-lg', 'overflow-hidden', 'shadow-lg');
            const poster = document.createElement('img');
            const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            poster.src = imgUrl;
            poster.classList.add('movie-poster');
            
            const titleDiv = document.createElement('div');
            titleDiv.classList.add('p-4');
            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.original_title.toUpperCase();
            movieTitle.classList.add('text-xl', 'font-semibold', 'mb-2', 'mt-1', 'ml-1', 'text-center', 'truncate')
            
            const descriptionP = document.createElement('p');
            descriptionP.classList.add('text-gray-400', 'mb-4', 'text-center');
            const genreId = movie.genre_ids[0];
            const genre = genres.find(x => x.id === genreId);
            descriptionP.textContent = movie.release_date.slice(0,4) + " | " + genre.name;

            const diaryBtn = document.createElement('button');
            diaryBtn.classList.add('gradient-border', 'w-full');
            const btnSpan = document.createElement('span');
            btnSpan.classList.add('flex', 'items-center', 'justify-center', 'gradient-border-span');
            btnSpan.innerHTML = "<i class='fas fa-bookmark mr-2'></i>Add to Diary";

            template.appendChild(templateDiv);
            templateDiv.appendChild(poster);
            templateDiv.appendChild(movieTitle);
            poster.alt = movieTitle;
            templateDiv.appendChild(descriptionP);
            templateDiv.appendChild(diaryBtn);
            diaryBtn.appendChild(btnSpan);
            
            


            //console.log(movie.original_title.toUpperCase());
            //console.log(movie.release_date.slice(0,4));
            //console.log(genre.name);
            //console.log(imgUrl);    
        });
        
        }))
    .catch(error => console.error(error));

//search-function
/*    fetch(searchUrl, { headers })
    .then((response) => {
        if(!response.ok) throw new Error ('Sorry. Someting went wrong.');
        return response.json()})
    
    .then(data => data.results)
    .catch(error => { console.error(error);
return[] });*/

searchBar.addEventListener('input', debounce(handleSearch, 500));

async function handleSearch(event) {
    const query = event.target.value;
    console.log(query);
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    if (query.length === 0) {
        resultDiv.innerHTML ='';
        return;
    }

    try{
        const response = await fetch(searchUrl, { headers});
        const data = await response.json();
        console.log(data);
        displayResults(data);
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}

function displayResults(data) {
    resultDiv.innerHTML = '';

    if (data.results && data.results.length > 0) {
        data.results.forEach(movie => {
            const templateDiv = document.createElement('div');
            templateDiv.classList.add('bg-gray-800', 'rounded-lg', 'overflow-hidden', 'shadow-lg');
            const poster = document.createElement('img');
            const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            poster.src = imgUrl;
            poster.classList.add('movie-poster');
            const titleDiv = document.createElement('div');
            titleDiv.classList.add('p-4');
            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.original_title.toUpperCase();
            movieTitle.classList.add('text-xl', 'font-semibold', 'mb-2', 'mt-1', 'ml-1', 'text-center', 'truncate')
            
            const descriptionP = document.createElement('p');
            descriptionP.classList.add('text-gray-400', 'mb-4', 'text-center');
            const genreId = movie.genre_ids[0];
            const genre = genres.find(x => x.id === genreId);
            descriptionP.textContent = movie.release_date.slice(0,4) + " | " + genre.name;
            
            resultDiv.appendChild(templateDiv);
            templateDiv.appendChild(poster);
            templateDiv.appendChild(movieTitle);
            poster.alt = movieTitle;
            templateDiv.appendChild(descriptionP);
            templateDiv.appendChild(diaryBtn);
            diaryBtn.appendChild(btnSpan);
            
        });
    } else {
        resultDiv.textContent = "No results found.";
    }
}

 // Utility function to debounce the search input
 function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

























/*function updateResultDiv(movies) {
    resultDiv.innerHTML = ''; // Clear existing content
    data.results.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('bg-gray-800', 'rounded-lg', 'overflow-hidden', 'shadow-lg');
        const genreId = movie.genre_ids[0];
            const genre = genres.find(x => x.id === genreId);
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title.toUpperCase()}">
            <h3 class="text-xl font-semibold mb-2 text-center truncate">${movie.original_title.toUpperCase()}</h3>
            <p class="text-gray-400 mb-4 text-center">${movie.release_date.slice(0,4)} | ${genre.name}</p>
        `;
        resultDiv.appendChild(movieElement);
    });
}


searchBar.addEventListener('input', (event) => {
    const query = event.target.value.trim(); 
    
    if (query.length > 2) { 
        fetchMovies(query)
            .then    
            (movies => {
                 updateResultDiv(movies); 
            })
        .catch(error => {
            console.error(error);
 } );
}
 
 else{
    resultDiv.innerHTML = ''; //Clear the grid if query is too short
 } 
    });*/
    

