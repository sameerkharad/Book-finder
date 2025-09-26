import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import useDebounce from "../hooks/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import Footer from "../components/Footer";

const LIMIT = 20;

export default function Home() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("bf_favs", []);
  const [error, setError] = useState(null);

  // Fetch books when debounced query or page changes
  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      setLoading(true);
      setError(null);

      const offset = (page - 1) * LIMIT;
      const searchQuery = debouncedQuery.trim()
        ? `title=${encodeURIComponent(debouncedQuery)}`
        : "subject=fiction"; // default fallback

      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?${searchQuery}&limit=${LIMIT}&offset=${offset}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBooks(data.docs || []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
    return () => controller.abort();
  }, [debouncedQuery, page]);

  // Toggle favorite books
  const toggleFav = (doc) => {
    const minimal = {
      key: doc.key,
      title: doc.title,
      author_name: doc.author_name,
      cover_i: doc.cover_i,
      first_publish_year: doc.first_publish_year,
    };
    const exists = favorites.find((f) => f.key === doc.key);
    setFavorites(
      exists
        ? favorites.filter((f) => f.key !== doc.key)
        : [minimal, ...favorites]
    );
  };

  // Show book details (can replace with modal later)
  const handleOpen = (doc) => {
    alert(
      `📖 ${doc.title}\nBy: ${doc.author_name?.join(", ") || "Unknown"}\nFirst Published: ${doc.first_publish_year || "—"
      }`
    );
  };
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="w-full px-2 sm:px-4 md:px-8 flex-1 space-y-8 mt-6">

        {/* Header and Search Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 w-full">

          {/* Left: Header */}
          <div className="text-center md:text-left md:flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl  font-serif text-yellow-500">
              Book Finder.
            </h1>
            <p className="mt-2 text-gray-600 text-sm sm:text-base font-serif md:text-lg ">
              Discover amazing books. Search by{" "}
              <span className="font-semibold">title</span>,{" "}
              <span className="font-semibold">author</span>, or{" "}
              <span className="font-semibold">subject</span>.
            </p>
          </div>

          {/* Right: Search Bar */}
          <div className="w-full md:w-1/2">
            <div className="   p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-2 transition ">
              <span className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, author, or subject"
                className="flex-1 w-full sm:w-auto px-3 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
              <button
                onClick={() => setPage(1)}
                className="w-full sm:w-auto px-4 py-2 bg-black text-yellow-500 rounded-lg hover:bg-slate-900 transition font-serif"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Section title and description */}
        <div className="text-center mx-auto mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-yellow-500 bg-clip-text font-serif">
            {debouncedQuery.trim()
              ? `Showing results for "${debouncedQuery}"`
              : " Popular Fiction Books"}
          </h2>
          <p className="text-gray-700 mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-serif">
            {debouncedQuery.trim()
              ? "Here are the books matching your search query. Browse through the list and find your next read!"
              : "Explore some of the most popular fiction books. Click on a book to see details, add to favorites, or open it on OpenLibrary."}
          </p>
        </div>


        {/* Loading/Error */}
        {loading && (
  <div className="flex justify-center items-center space-x-2 py-6">
    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
  </div>
)}
        {error && <div className="text-center text-red-600">Error: {error}</div>}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {books.map((doc) => (
            <BookCard
              key={doc.key}
              doc={doc}
              isFav={favorites.some((f) => f.key === doc.key)}
              onOpen={handleOpen}
              onToggleFav={toggleFav}
            />
          ))}
        </div>

        {/* Pagination */}
        {books.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              className="px-4 py-2 bg-black rounded-3xl hover:bg-slate-900 text-yellow-500 flex items-center gap-2"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>

            <button
              className="px-4 py-2 bg-yellow-500 text-black rounded-3xl hover:bg-yellow-700 flex items-center gap-2"
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
{showTopBtn && (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="fixed bottom-8 right-8 bg-black text-yellow-500 p-3 rounded-full shadow-lg hover:bg-slate-900 transition flex items-center justify-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  </button>
)}

    </div>
  );

}
