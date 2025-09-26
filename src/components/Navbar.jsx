import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Branding */}
        <Link to="/" className="font-medium text-xl text-yellow-500 font-serif">
          BookFinder.
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/"
            className="px-4 py-2 text-yellow-500 font-semibold rounded hover:text-yellow-600 hover:bg-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="px-4 py-2 text-yellow-500 font-semibold rounded hover:text-yellow-600 hover:bg-gray-900 transition-colors"
          >
            Favorites
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-yellow-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2">
          <Link
            to="/"
            className="px-4 py-2 text-yellow-500 font-semibold rounded hover:text-yellow-600 hover:bg-gray-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="px-4 py-2 text-yellow-500 font-semibold rounded hover:text-yellow-600 hover:bg-gray-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
}
