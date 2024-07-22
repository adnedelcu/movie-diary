import { updateMovie } from "./journal.js";

export function addToJournal(movie) {
    const journal = getJournal();
    if (isInJournal(movie)) {
        return;
    }

    const entry = {
        ...movie,
        notes: [],
    }

    journal.push(entry);
    updateJournal(journal);
}

export function removeFromJournal(movie) {
    const journal = getJournal();
    if (!isInJournal(movie)) {
        return;
    }

    journal.splice(journal.findIndex(entry => entry.id === movie.id), 1);
    updateJournal(journal);
}

export function isInJournal(movie) {
    const journal = getJournal();

    return journal.some(entry => movie.id === entry.id);
}

export function getJournal() {
    return JSON.parse(localStorage.getItem('journal') || '[]');
}

export function updateJournal(journal) {
    localStorage.setItem('journal', JSON.stringify(journal));
}

export function createNote(note, movie) {
  const noteEntry = document.createElement('li');
  noteEntry.innerText = note.note;
  const removeNoteBtn = document.createElement('button');
  removeNoteBtn.type = 'button';
  removeNoteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  removeNoteBtn.addEventListener('click', () => {
      movie.notes.splice(movie.notes.findIndex(noteEntry => noteEntry.uuid === note.uuid), 1);
      noteEntry.remove();
      updateMovie(movie);
  });
  noteEntry.appendChild(removeNoteBtn);

  return noteEntry
}

export function showNotes(movie) {
    const modal = document.getElementById('modal');

    const title = document.getElementById('movieTitle');
    title.innerText = movie.original_title;

    const notesList = document.getElementById('movieNotes');
    notesList.innerHTML = '';
    for (const note of movie.notes) {
        const noteEntry = createNote(note, movie);
        notesList.appendChild(noteEntry);
    }

    const addNoteInput = document.getElementById('new-note');
    addNoteInput.value = '';
    const addNoteBtn = document.getElementById('addNote');
    addNoteBtn.addEventListener('click', () => {
        const note = addNoteInput.value.trim();
        if (!note) {
            return;
        }
        const newNote = {
            uuid: crypto.randomUUID(),
            note: note,
            created_at: Date(),
        };
        movie.notes.push(newNote);
        updateMovie(movie);

        const noteEntry = createNote(newNote, movie);
        notesList.appendChild(noteEntry);
        addNoteInput.value = '';
    });

    modal.classList.remove("closing");
    modal.showModal();
    modal.classList.add("showing");

    const closeModalTop = document.getElementById('closeModalTop');
    const closeModalBottom = document.getElementById('closeModalBottom');

    closeModalTop.addEventListener("click", closeModal);
    closeModalBottom.addEventListener("click", closeModal);

    function closeModal() {
        modal.classList.remove("showing");
        modal.classList.add("closing");
        modal.addEventListener(
            "animationend",
            () => {
              modal.close();
              modal.classList.remove("closing");
            },
            { once: true }
        );
    }
}

export const genres = [
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

export const createMovieCard = (movie, isDiary = false) => {
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

    templateDiv.appendChild(poster);
    templateDiv.appendChild(movieTitle);
    poster.alt = movie.original_title;
    templateDiv.appendChild(descriptionP);

    if (isInJournal(movie)) {
        if (isDiary) {
            const showNotesBtn = document.createElement('button');
            showNotesBtn.type = 'button';
            showNotesBtn.classList.add('bg-blue-400', 'h-10', 'w-full', 'rounded-lg', 'hover:bg-blue-700');
            const notesSpan = document.createElement('span');
            notesSpan.classList.add('flex', 'items-center', 'justify-center');
            notesSpan.innerHTML = '<i class="fas fa-note mr-2"></i>Show notes';
            showNotesBtn.appendChild(notesSpan);

            showNotesBtn.addEventListener('click', () => {
                showNotes(movie);
            });

            const removeFromDiaryBtn = document.createElement('button');
            removeFromDiaryBtn.classList.add('bg-red-500', 'h-10', 'w-full', 'rounded-lg', 'hover:bg-red-700');
            const btnSpan = document.createElement('span');
            btnSpan.classList.add('flex', 'items-center', 'justify-center');
            btnSpan.innerHTML = "<i class='fas fa-xmark mr-2'></i>Remove to Diary";
            removeFromDiaryBtn.appendChild(btnSpan);

            removeFromDiaryBtn.addEventListener('click', () => {
                removeFromJournal(movie);
                templateDiv.remove();
            });
            templateDiv.appendChild(showNotesBtn);
            templateDiv.appendChild(removeFromDiaryBtn);
        }
    } else {
        const diaryBtn = document.createElement('button');
        diaryBtn.classList.add('gradient-border', 'w-full');
        const btnSpan = document.createElement('span');
        btnSpan.classList.add('flex', 'items-center', 'justify-center', 'gradient-border-span');
        btnSpan.innerHTML = "<i class='fas fa-bookmark mr-2'></i>Add to Diary";
        diaryBtn.appendChild(btnSpan);

        diaryBtn.addEventListener('click', () => {
            addToJournal(movie);
            diaryBtn.remove();
        });
        templateDiv.appendChild(diaryBtn);
    }

    return templateDiv;
};
