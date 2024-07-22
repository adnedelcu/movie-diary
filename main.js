import { API_KEY } from './config.js';

const searchParams = new URLSearchParams(window.location.search);

let maxPages = 1;
const currentPage = parseInt(searchParams.get('page') || '1');

const url = `https://api.themoviedb.org/3/movie/popular?page=${currentPage}`;
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

const currentPageEl = document.getElementById('currentPage');
const maxPagesEl = document.getElementById('maxPages');
currentPageEl.innerText = currentPage;

// Popular Movies List
fetch(url, { headers })
    .then((response) => {
        if(!response.ok) throw new Error ('Sorry. Someting went wrong.');
        return response.json()})

    .then((data => {
        console.log(data);
        maxPages = data.total_pages;
        updatePagination();
        data.results.forEach(movie => {
            const templateDiv = document.createElement('div');
            templateDiv.classList.add('bg-gray-800', 'rounded-lg', 'overflow-hidden', 'shadow-lg');
            const poster = document.createElement('img');
            const imgUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://i.pinimg.com/originals/cd/23/c7/cd23c7a8d049049fd1b0ef281f0300cb.jpg";
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
            descriptionP.textContent = (movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown Year') + " | " + (genre?.name || 'Unknown Genre');

            const diaryBtn = document.createElement('button');
            diaryBtn.classList.add('gradient-border', 'w-full');
            const btnSpan = document.createElement('span');
            btnSpan.classList.add('flex', 'items-center', 'justify-center', 'gradient-border-span');
            btnSpan.innerHTML = "<i class='fas fa-bookmark mr-2'></i>Add to Diary";

            template.appendChild(templateDiv);
            templateDiv.appendChild(poster);
            templateDiv.appendChild(movieTitle);
            poster.alt = movie.original_title;
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


searchBar.addEventListener('input', debounce(handleSearch, 700));

async function handleSearch(event) {
    const query = event.target.value.trim();
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
            const imgUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://i.pinimg.com/originals/cd/23/c7/cd23c7a8d049049fd1b0ef281f0300cb.jpg";
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
            descriptionP.textContent = (movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown Year') + " | " + (genre?.name || 'Unknown Genre');

            const diaryBtn = document.createElement('button');
            diaryBtn.classList.add('gradient-border', 'w-full');
            const btnSpan = document.createElement('span');
            btnSpan.classList.add('flex', 'items-center', 'justify-center', 'gradient-border-span');
            btnSpan.innerHTML = "<i class='fas fa-bookmark mr-2'></i>Add to Diary";


            templateDiv.appendChild(poster);
            templateDiv.appendChild(movieTitle);
            poster.alt = movieTitle.original_title;
            templateDiv.appendChild(descriptionP);
            templateDiv.appendChild(diaryBtn);
            diaryBtn.appendChild(btnSpan);
            resultDiv.appendChild(templateDiv);

        });
    }
    else {
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

function updatePagination() {
    maxPagesEl.innerText = maxPages;
    const navEl = document.getElementById('pagination');

    const firstPageEl = document.createElement('a');
    firstPageEl.classList.add('relative', 'inline-flex', 'items-center', 'rounded-l-md', 'px-2', 'py-2', 'text-gray-400', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 'focus:z-20', 'focus:outline-offset-0');
    firstPageEl.innerHTML = '<span class="sr-only">First</span>&lt;&lt;';
    // firstPageEl.href = 'nohref';
    if (currentPage > 1) {
        firstPageEl.href = `${window.location.origin}${window.location.pathname}?page=1`;
    }
    navEl.appendChild(firstPageEl);

    const prevPageEl = document.createElement('a');
    prevPageEl.classList.add('relative', 'inline-flex', 'items-center', 'px-2', 'py-2', 'text-gray-400', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 'focus:z-20', 'focus:outline-offset-0');
    prevPageEl.innerHTML = '<span class="sr-only">Previous</span>&lt;';
    // prevPageEl.href = 'nohref';
    if (currentPage > 1) {
        prevPageEl.href = `${window.location.origin}${window.location.pathname}?page=${currentPage-1}`;
    }

    navEl.appendChild(prevPageEl);

    const pageEl = document.createElement('a');
    pageEl.classList.add('relative', 'z-10', 'inline-flex', 'items-center', 'bg-indigo-600', 'px-4', 'py-2', 'text-sm', 'font-semibold', 'text-white', 'focus:z-20', 'focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-indigo-600');
    pageEl.ariaCurrent = 'page';
    pageEl.innerHTML = currentPage;
    navEl.appendChild(pageEl);

    const nextPageEl = document.createElement('a');
    nextPageEl.classList.add('relative', 'inline-flex', 'items-center', 'px-2', 'py-2', 'text-gray-400', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 'focus:z-20', 'focus:outline-offset-0');
    nextPageEl.innerHTML = '<span class="sr-only">Next</span>&gt;';
    // nextPageEl.href = 'nohref';
    if (currentPage < maxPages) {
        nextPageEl.href = `${window.location.origin}${window.location.pathname}?page=${currentPage+1}`;
    }

    navEl.appendChild(nextPageEl);

    const lastPageEl = document.createElement('a');
    lastPageEl.classList.add('relative', 'inline-flex', 'items-center', 'rounded-r-md', 'px-2', 'py-2', 'text-gray-400', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-gray-50', 'focus:z-20', 'focus:outline-offset-0');
    lastPageEl.innerHTML = '<span class="sr-only">Last</span>&gt;&gt;';
    // lastPageEl.href = 'nohref';
    if (currentPage < maxPages) {
        lastPageEl.href = `${window.location.origin}${window.location.pathname}?page=${maxPages}`;
    }

    navEl.appendChild(lastPageEl);
}

