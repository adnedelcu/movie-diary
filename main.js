import { API_KEY } from './config.js';

const url = 'https://api.themoviedb.org/3/movie/popular';
const headers = {
    'Authorization': `Bearer ${API_KEY}`,
}

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
            
            


            console.log(movie.original_title.toUpperCase());
            console.log(movie.release_date.slice(0,4));
            console.log(genre.name);
            console.log(imgUrl);    
        });
        
        }))
    .catch(error => console.error(error));


    
/*console.log(data.results[0].original_title.toUpperCase());
        console.log(data.results[0].release_date.slice(0,4));
        const genreId = data.results[0].genre_ids[0];
        const genre = genres.find(x => x.id === genreId);
        console.log(genre.name);
        const imgUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
        console.log(imgUrl);*/