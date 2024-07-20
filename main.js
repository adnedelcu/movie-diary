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


fetch(url, { headers })
    .then(response => response.json())
    .then((data => {
        console.log(data);
        data.results.forEach(movie => {
            console.log(movie.original_title.toUpperCase());
            console.log(movie.release_date.slice(0,4));
            const genreId = movie.genre_ids[0];
            const genre = genres.find(x => x.id === genreId);
            console.log(genre.name);
            const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
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