import React from 'react';
import { Search, X, SlidersHorizontal, Award, RotateCcw } from 'lucide-react';

const GENRES = [
  'All',
  'Drama',
  'Crime',
  'Mystery',
  'Sci-Fi',
  'Thriller',
  'Comedy',
  'Romance',
  'War',
  'Animation',
  'Adventure',
  'History',
  'Documentary',
  'Biography',
];

const DECADES = [
  'All',
  '1920s',
  '1930s',
  '1940s',
  '1950s',
  '1960s',
  '1970s',
  '1980s',
  '1990s',
  '2000s',
  '2010s',
  '2020s',
];

const RATINGS = [
  { label: 'All Ratings', value: 0 },
  { label: '8.0+ Exceptional', value: 8.0 },
  { label: '8.3+ Masterwork', value: 8.3 },
  { label: '8.5+ Monumental', value: 8.5 },
  { label: '8.8+ Pinnacle', value: 8.8 },
];

const SORT_OPTIONS = [
  { label: 'Rating: Highest First', value: 'rating-desc' },
  { label: 'Rating: Lowest First', value: 'rating-asc' },
  { label: 'Year: Newest First', value: 'year-desc' },
  { label: 'Year: Oldest First', value: 'year-asc' },
  { label: 'Title: A to Z', value: 'title-asc' },
  { label: 'Title: Z to A', value: 'title-desc' },
  { label: 'Runtime: Longest First', value: 'runtime-desc' },
  { label: 'Runtime: Shortest First', value: 'runtime-asc' },
];

/**
 * FilterBar Component
 * 
 * Provides controlled UI inputs for searching, filtering by genre, decade,
 * rating, awards, and sorting.
 */
export default function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  hasActiveFilters,
  limit,
  onLimitChange
}) {
  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="filter-wrapper" role="search" aria-label="Film Search and Filtering">
      {/* Search Input Bar */}
      <div className="filter-top-row">
        <div className="search-box">
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            id="film-search-input"
            type="text"
            className="search-input"
            placeholder="Search by film title, director, cast, country, or synopsis..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
          />
          {filters.search && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => handleInputChange('search', '')}
              aria-label="Clear search text"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Controls Grid */}
      <div className="filter-controls-grid">
        {/* Genre Filter */}
        <div className="filter-field">
          <label htmlFor="filter-genre" className="filter-label">Genre</label>
          <select
            id="filter-genre"
            className="custom-select"
            value={filters.genre}
            onChange={(e) => handleInputChange('genre', e.target.value)}
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Decade Filter */}
        <div className="filter-field">
          <label htmlFor="filter-decade" className="filter-label">Decade</label>
          <select
            id="filter-decade"
            className="custom-select"
            value={filters.decade}
            onChange={(e) => handleInputChange('decade', e.target.value)}
          >
            {DECADES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Minimum Rating */}
        <div className="filter-field">
          <label htmlFor="filter-rating" className="filter-label">Min Rating</label>
          <select
            id="filter-rating"
            className="custom-select"
            value={filters.minRating}
            onChange={(e) => handleInputChange('minRating', Number(e.target.value))}
          >
            {RATINGS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="filter-field">
          <label htmlFor="filter-sort" className="filter-label">Sort Order</label>
          <select
            id="filter-sort"
            className="custom-select"
            value={filters.sortBy}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Items Per Page */}
        <div className="filter-field">
          <label htmlFor="filter-limit" className="filter-label">Per Page</label>
          <select
            id="filter-limit"
            className="custom-select"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            <option value={6}>6 films</option>
            <option value={9}>9 films</option>
            <option value={12}>12 films</option>
            <option value={18}>18 films</option>
          </select>
        </div>

        {/* Award Winners Toggle Checkbox */}
        <div className="filter-field">
          <label className="filter-label">Laureates</label>
          <label className={`award-checkbox-label ${filters.awardOnly ? 'active' : ''}`}>
            <input
              id="filter-award-only"
              type="checkbox"
              checked={filters.awardOnly}
              onChange={(e) => handleInputChange('awardOnly', e.target.checked)}
            />
            <Award size={15} color={filters.awardOnly ? '#f59e0b' : '#94a3b8'} />
            <span className="award-checkbox-text">Award Winners</span>
          </label>
        </div>

        {/* Reset All Filters Button */}
        {hasActiveFilters && (
          <div className="filter-field">
            <span className="filter-label">&nbsp;</span>
            <button
              type="button"
              className="btn-reset-filters"
              onClick={onResetFilters}
              id="btn-clear-all-filters"
            >
              <RotateCcw size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
