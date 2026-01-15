import { useMemo } from "react";

type PaginationBarProps = {
  page: number; // 1-based
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;

  // opcional
  onItemsPerPageChange?: (n: number) => void;
  itemsPerPageOptions?: number[];
  maxVisiblePages?: number; // ej 5, 7
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function PaginationBar({
  page,
  totalItems,
  itemsPerPage,
  onPageChange,
  maxVisiblePages = 5,
  className = "",
}: PaginationBarProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safePage = clamp(page, 1, totalPages);

  const pages = useMemo(() => {
    // devuelve algo como: [1, "…", 4, 5, 6, "…", 12]
    const windowSize = Math.max(3, maxVisiblePages);
    if (totalPages <= windowSize) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const side = Math.floor((windowSize - 1) / 2);
    let start = safePage - side;
    let end = safePage + side;

    if (start < 2) {
      start = 2;
      end = start + (windowSize - 3);
    }
    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = end - (windowSize - 3);
    }

    const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const result: (number | "…")[] = [1];
    if (start > 2) result.push("…");
    result.push(...middle);
    if (end < totalPages - 1) result.push("…");
    result.push(totalPages);

    return result;
  }, [totalPages, safePage, maxVisiblePages]);

  const startItem = totalItems === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const endItem = Math.min(totalItems, safePage * itemsPerPage);

  const go = (p: number) => onPageChange(clamp(p, 1, totalPages));

  return (
    <div className={`flex gap-2 sm:flex-col sm:items-left ${className}`}>
      {/* info */}
      <div className="text-xs text-gray-500">
        Mostrando <span className="font-medium text-gray-700">{startItem}</span>
        –<span className="font-medium text-gray-700">{endItem}</span> de{" "}
        <span className="font-medium text-gray-700">{totalItems}</span>
      </div>

      {/* controls */}
      <div className="inline-flex items-center gap-1">
        <button
          onClick={() => go(safePage - 1)}
          disabled={safePage === 1}
          className="px-2 py-1 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {pages.map((p, idx) =>
          p === "…" ? (
            <span
              key={`dots-${idx}`}
              className="px-2 py-1 text-sm text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => go(p)}
              className={`min-w-[36px] px-2 py-1 text-sm rounded-md border ${
                p === safePage
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => go(safePage + 1)}
          disabled={safePage === totalPages}
          className="px-2 py-1 text-sm rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
