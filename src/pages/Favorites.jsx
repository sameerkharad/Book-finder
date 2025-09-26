import React, { useState, useEffect } from "react";  // ✅ Added useState & useEffect
import useLocalStorage from "../hooks/useLocalStorage";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

export default function Favorites() {
  const [favorites, setFavorites] = useLocalStorage("bf_favs", []);

  // Remove book from favorites
  const remove = (doc) => {
    setFavorites(favorites.filter((f) => f.key !== doc.key));
  };

  // Open book details (simple alert for now)
  const handleOpen = (doc) => {
    alert(
      `📖 ${doc.title}\nBy: ${doc.author_name?.join(", ") || "Unknown"}\nFirst Published: ${doc.first_publish_year || "—"}`
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 px-2 sm:px-4 py-8 space-y-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-500 font-serif">⭐ Your Favorite Books</h2>
          <p className="text-gray-600 mt-2 font-serif">
            All the books you’ve saved in one place.
          </p>
        </header>

        {/* Empty state */}
        {favorites.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg">No favorites yet ❤️</p>
            <p className="text-sm">
              Go to <span className="font-semibold">Book Finder</span> and add some!
            </p>
          </div>
        )}

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {favorites.map((doc) => (
            <BookCard
              key={doc.key}
              doc={doc}
              isFav={true}
              onOpen={handleOpen}
              onToggleFav={remove}
            />
          ))}
        </div>
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
