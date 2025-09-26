import React from "react";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search by title, author or subject",
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto bg-white shadow-md rounded-2xl px-4 py-3 border border-gray-200"
    >
      <input
        className="flex-1 w-full sm:w-auto px-4 py-2 text-gray-700 rounded-xl focus:outline-none focus:ring-2  transition-all duration-200 font-serif"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search books"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-5 py-2  font-medium rounded-xl shadow-md  transition-all duration-200"
      >
        Search
      </button>
    </form>
  );
}
