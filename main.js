import { API_KEY } from './config.js';

console.log(API_KEY);

const url = 'https://api.themoviedb.org/3/movie/popular';
const headers = {
    'Authorization': `Bearer ${API_KEY}`,
}

fetch(url, { headers })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
