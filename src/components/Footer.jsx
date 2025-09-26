import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-black py-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-yellow-500 font-serif">Book Finder</h3>
          <p className="text-white text-sm mt-1 font-serif ">
            Discover and explore your favorite books.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-yellow-500">
          <a href="/" className="hover:text-slate-400 transition">Home</a>
          <a href="/favorites" className="hover:text-slate-400 transition">Favorites</a>
          <a href="https://openlibrary.org" target="_blank" rel="noreferrer" className="hover:text-slate-400 transition">OpenLibrary</a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="mt-6 text-center text-white text-xs">
        &copy; {new Date().getFullYear()} Book Finder. All rights reserved.
      </div>
    </footer>
  );
}
