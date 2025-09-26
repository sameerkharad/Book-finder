// BookCard.jsx
export default function BookCard({ doc, isFav, onOpen, onToggleFav }) {
  const coverUrl = doc.cover_i
    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="bg-white shadow-md border border-gray-100 rounded-2xl overflow-hidden flex flex-col 
                    transition transform hover:scale-105 hover:shadow-xl hover:border-indigo-200">
      {/* Cover */}
      <img
        src={coverUrl}
        alt={doc.title}
        className="w-full h-56 object-cover transition duration-300 hover:opacity-90"
      />

      {/* Details */}
      <div className="p-4 flex flex-col flex-1 bg-gradient-to-br from-white via-gray-50 to-indigo-50">
  <h3 className="font-medium text-lg text-gray-800 line-clamp-2 font-serif">
    {doc.title || "Untitled"}
  </h3>
  <p className="text-sm text-gray-600 mt-1">
    <span className="font-medium font-serif">By:</span>{" "}
    {doc.author_name?.join(", ") || "Unknown"}
  </p>
  <p className="text-sm text-gray-500">
    <span className="font-medium font-serif">First published:</span>{" "}
    {doc.first_publish_year || "—"}
  </p>
  {doc.publisher && (
    <p className="text-sm text-gray-500">
      <span className="font-medium font-serif">Publisher:</span>{" "}
      {doc.publisher.slice(0, 2).join(", ")}
    </p>
  )}
  {doc.language && (
    <p className="text-sm text-gray-500">
      <span className="font-medium font-serif">Language:</span>{" "}
      {doc.language.join(", ")}
    </p>
  )}

  {/* Actions */}
  <div className="mt-auto flex flex-wrap gap-2 pt-3">
    <button
      onClick={() => onOpen(doc)}
      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-100 text-Slate-800 rounded-full shadow-sm hover:bg-indigo-200 hover:shadow-md transition transform hover:-translate-y-0.5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H3m0 0l4-4m-4 4l4 4m7-8h6m0 0l-3-3m3 3l-3 3"
        />
      </svg>
      Details
    </button>

    <button
      onClick={() => onToggleFav(doc)}
      className={`px-3 py-1.5 text-sm rounded-full transition ${
        isFav
          ? "bg-pink-400 hover:bg-pink-600 text-black"
          : "bg-slate-400 hover:bg-slate-600 text-white"
      }`}
    >
      {isFav ? "❤️ Unfavorite" : "🤍 Favorite"}
    </button>

    <a
      href={`https://openlibrary.org${doc.key}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1 px-3 py-1.5 text-sm  text-black rounded-full shadow-md bg-green-200 hover:bg-green-300 hover:shadow-lg transition transform hover:-translate-y-0.5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
      Open
    </a>
  </div>
</div>

    </div>
  );
}
