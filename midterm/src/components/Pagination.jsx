import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination Component
 * 
 * Reusable pagination bar supporting previous/next navigation,
 * dynamic numeric page buttons, and status summary.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  limit
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalItems);

  // Generate page numbers array with intelligent trimming
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;

    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="pagination-wrapper" aria-label="Archive pagination">
      {/* Pagination Summary */}
      <div className="pagination-summary">
        Showing <strong>{startItem}</strong>–<strong>{endItem}</strong> of <strong>{totalItems}</strong> archival masterworks
      </div>

      {/* Pages Navigation Buttons */}
      <div className="pagination-pages">
        {/* Previous Page */}
        <button
          type="button"
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous Page"
          id="btn-pagination-prev"
        >
          <ChevronLeft size={16} />
        </button>

        {/* First Page button if trimmed */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              type="button"
              className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span style={{ padding: '0 4px', color: 'var(--text-dim)' }}>…</span>}
          </>
        )}

        {/* Visible Page Numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Last Page button if trimmed */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span style={{ padding: '0 4px', color: 'var(--text-dim)' }}>…</span>
            )}
            <button
              type="button"
              className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Page */}
        <button
          type="button"
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next Page"
          id="btn-pagination-next"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
