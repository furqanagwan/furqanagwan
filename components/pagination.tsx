"use client";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (n: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  setPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav
      className="flex flex-wrap justify-center mt-4 gap-2"
      aria-label="pagination"
    >
      <button
        className="px-3 py-1 rounded border bg-background disabled:opacity-40"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          key={idx + 1}
          className={`px-3 py-1 rounded border
                ${
                  page === idx + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-background"
                }
              `}
          onClick={() => setPage(idx + 1)}
          aria-current={page === idx + 1 ? "page" : undefined}
        >
          {idx + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border bg-background disabled:opacity-40"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </nav>
  );
}
