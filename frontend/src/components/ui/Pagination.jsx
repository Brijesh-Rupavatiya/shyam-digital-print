export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
      {/* PREVIOUS */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded-xl bg-white/10 text-white disabled:opacity-40 hover:bg-white/20 transition"
      >
        Previous
      </button>

      {/* PAGES */}
      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-xl transition

          ${
            currentPage === page
              ? "bg-indigo-600 text-white"
              : "bg-white/10 text-white hover:bg-white/20"
          }
          `}
        >
          {page}
        </button>
      ))}

      {/* NEXT */}
      <button
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-xl bg-white/10 text-white disabled:opacity-40 hover:bg-white/20 transition"
      >
        Next
      </button>
    </div>
  );
}
