import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

/**
 * EmptyState Component
 * 
 * Fulfills the "Empty State" requirement when no films match current
 * search filters or criteria.
 */
export default function EmptyState({ onResetFilters }) {
  return (
    <div className="state-box" role="status" aria-live="polite">
      <div className="state-icon-circle">
        <SearchX size={32} />
      </div>
      <h3 className="state-title">No Archival Matches Found</h3>
      <p className="state-desc">
        We couldn't locate any cinema masterworks matching your active search criteria,
        genre filter, or decade selection.
      </p>
      {onResetFilters && (
        <button
          type="button"
          className="btn-primary"
          onClick={onResetFilters}
          id="btn-empty-state-reset"
        >
          <RotateCcw size={16} />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
}
