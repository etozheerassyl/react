import React from 'react';

/**
 * LoadingSkeleton Component
 * 
 * Renders shimmering placeholder cards during asynchronous data fetching
 * to deliver an ultra-responsive perceived performance.
 */
export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="movies-grid" aria-label="Loading archival records" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}
