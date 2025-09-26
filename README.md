Book Finder
Book Finder is a modern React web application that helps users discover books by title, author, or subject. It integrates the OpenLibrary API to fetch book data dynamically and provides an interactive, responsive, and user-friendly interface.


Features
Search Functionality: Search books by title, author, or subject using a dynamic search bar with debouncing.
Favorites: Add or remove books from favorites. Favorites are stored in local storage for persistence.
Pagination: Browse large results with easy-to-use previous/next navigation.
Scroll-to-Top Button: Quickly navigate back to the top of the page.
Responsive Design: Fully responsive layout for mobile, tablet, and desktop.
Modern UI: Styled using TailwindCSS with a clean color scheme (black, yellow accents, serif fonts).
Loading & Error Handling: Smooth loading animation and user-friendly error messages.



Project structure

book-finder/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ BookCard.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Navbar.jsx
│  │  └─ SearchBar.jsx
│  ├─ hooks/
│  │  ├─ useDebounce.js
│  │  └─ useLocalStorage.js
│  ├─ pages/
│  │  ├─ Favorites.jsx
│  │  └─ Home.jsx
│  ├─ App.jsx
│  ├─ App.css
│  ├─ index.css
│  └─ main.jsx
├─ package.json
├─ tailwind.config.js
├─ vite.config.js
└─ README.md



Technologies Used
React – Frontend framework
Vite – Fast build tool
TailwindCSS – Styling and layout
OpenLibrary API – Fetch book data
Local Storage – Store favorites


installation
Clone the repository
git clone <repository-url>
cd book-finder

Install dependencies
npm install

Run the application
npm run dev



Usage
Search for books by typing in the search bar.
Click Search or wait for debounced results.
Click the heart icon to add/remove favorites.
Use Prev/Next buttons to navigate pages.
Scroll down and use the scroll-to-top button for easy navigation.