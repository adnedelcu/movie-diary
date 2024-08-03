# 🎬 Movie Diary using TMDB API 📖

Welcome to the Movie Diary project! This application allows you to create a personal movie diary using the TMDB API. The project consists of a Homepage to display popular movies and a Journal Page to manage your favorite movies and personal notes.

## 🧑‍💻 Project Details

-   **Project Name:** ALTschool | Movie Diary
-   **Project Status:** In Progress (since 18.07.2024)
-   **Project Description:** Create a personal movie diary using the TMDB API. (Group Project)
-   **Project Github Link:** [:\ALTschool](https://github.com/adnedelcu/movie-diary)
-   **Project Duration:** 10 Days
-   **Project Objective Url:** [Movie diary or Pokedex](https://learn.wbscodingschool.com/courses/full-stack-web-app/lessons/%f0%9f%9b%a0%ef%b8%8f-movie-diary-or-pokedex/)

## 📁 Project Structure

```
movie-diary/
├── .gitignore
├── config.js.example
├── index.html
├── journal.html
├── journal.js
├── LICENSE
├── main.js
├── README.md
├── shared.js
├── style.css
└── tailwind.config.js
```

## 🛠️ Setup and Installation

1. Clone the repository:
    ```
    git clone https://github.com/adnedelcu/movie-diary.git
    ```
2. Navigate to the project directory:
    ```
    cd movie-diary
    ```
3. Copy `config.js.example` to `config.js` and add your TMDB API key:

    ```
    cp config.js.example config.js
    ```

    Then edit `config.js` and replace `'SAMPLE_API_KEY'` with your actual TMDB API key.

4. Open `index.html` in your browser to view the project.

## 🖥️ Components and Functionality

### HTML Structure (`index.html` and `journal.html`)

Both pages include:

-   Navbar for navigation
-   Header section
-   Search container with dropdown menu
-   Grid for displaying movies
-   Movie card structure

Additional elements in `journal.html`:

-   Container for displaying favorite movies
-   Structure for adding personal notes to each movie

### CSS Styling (`style.css` and Tailwind)

-   Utilizes TailwindCSS for responsive design
-   Custom styles in `style.css` for additional formatting
-   Includes animations for enhanced user experience
-   Responsive grid layout for movie display
-   Custom styling for movie cards, buttons, and modal

### JavaScript Functionality

#### Main Script (`main.js`)

-   Fetches and displays popular movies
-   Handles user interactions (e.g., adding movies to favorites)
-   Implements search functionality
-   Manages pagination for movie listings

#### Journal Script (`journal.js`)

-   Manages favorite movies using `localStorage`
-   Handles adding and removing movies from favorites
-   Manages personal notes for each movie

#### Shared Functions (`shared.js`)

-   Contains utility functions used across the application
-   Manages journal operations (add, remove, update)
-   Handles note management
-   Creates movie card elements

## 🚀 Features

-   Display popular movies from TMDB API
-   Search functionality for finding specific movies
-   Add movies to personal journal
-   Add and manage notes for each movie in the journal
-   Responsive design for various screen sizes
-   Pagination for browsing through movie listings

## 🎨 UI/UX Guidelines

-   Use a dark theme for better visibility of movie posters
-   Implement gradient effects for buttons and titles
-   Ensure responsive design for all screen sizes
-   Use animations sparingly to enhance user experience without overwhelming
-   Maintain consistent styling across all pages

## 🧑‍💻 Development Guidelines

-   Follow ES6+ JavaScript standards
-   Use modular JavaScript for better code organization
-   Implement error handling for API requests
-   Optimize images and API calls for performance
-   Follow accessibility best practices

## 📚 Useful Resources

-   [GitHub Repository Structure](https://guides.github.com/introduction/flow/)
-   [TMDB API Documentation](https://developers.themoviedb.org/3/getting-started/introduction)
-   [Javascript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   [TailwindCSS Documentation](https://tailwindcss.com/docs)
-   [Node.js Documentation](https://nodejs.org/en/)
-   [NPM Documentation](https://www.npmjs.com/)

## 🤝 Contributors

-   [Alex](https://github.com/adnedelcu)
-   [Lisa](https://github.com/orangethief)
-   [Tima](https://github.com/timataliatov)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
