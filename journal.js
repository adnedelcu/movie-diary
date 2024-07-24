// import necessary functions from shared module
import { isInJournal, getJournal, updateJournal, createMovieCard } from './shared.js';

// get reference to the movie grid container
const movieGrid = document.getElementById('movie-grid');

// retrieve the current journal data
const journal = getJournal();

// iterate through each movie in the journal
for (const movie of journal) {
    // create a movie card element for the current movie
    // the second parameter 'true' likely indicates this is for the journal view
    const div = createMovieCard(movie, true);

    // append the movie card to the grid
    movieGrid.appendChild(div);
}
