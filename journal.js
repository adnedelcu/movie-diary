import { isInJournal, getJournal, updateJournal, createMovieCard } from './shared.js';

const movieGrid = document.getElementById('movie-grid');
const journal = getJournal();

for (const movie of journal) {
    const div = createMovieCard(movie, true);

    movieGrid.appendChild(div);
}
