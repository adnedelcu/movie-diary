import { isInJournal, getJournal, updateJournal, createMovieCard } from './shared.js';

export function updateMovie(movie) {
    const journal = getJournal();
    if (!isInJournal(movie)) {
        return;
    }

    journal.splice(journal.findIndex(entry => entry.id === movie.id), 1, movie);
    updateJournal(journal);
}

const movieGrid = document.getElementById('movie-grid');
const journal = getJournal();

for (const movie of journal) {
    const div = createMovieCard(movie, true);

    movieGrid.appendChild(div);
}
