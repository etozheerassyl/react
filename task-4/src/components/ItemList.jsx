import { ItemCard } from "./ItemCard";
import { SearchIcon, AlertCircleIcon, RefreshIcon, SpinnerIcon } from "./Icons";

export function ItemList({
  items,
  isLoading,
  error,
  totalItems,
  page,
  totalPages,
  selectedId,
  onSelect,
  onRetry,
  // search & filter controls
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  onClearSearch,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortChange,
  onPageChange,
}) {
  return (
    <section className="item-list-container">
      {/* Search and Filter Control Bar */}
      <div className="filter-panel">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, spec, sector, or lead..."
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
            />
            {searchInput && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={onClearSearch}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-secondary btn-search">
            Search
          </button>
        </form>

        <div className="filter-dropdowns-row">
          <div className="filter-group">
            <label htmlFor="status-select" className="filter-label">Status:</label>
            <select
              id="status-select"
              className="filter-select"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="In Maintenance">In Maintenance</option>
              <option value="Deploying">Deploying</option>
              <option value="Standby">Standby</option>
              <option value="Decommissioned">Decommissioned</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="category-select" className="filter-label">Category:</label>
            <select
              id="category-select"
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Defense & Security">Defense & Security</option>
              <option value="Power & Energy">Power & Energy</option>
              <option value="Data Communications">Data Communications</option>
              <option value="AI & Robotics">AI & Robotics</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-select" className="filter-label">Sort:</label>
            <select
              id="sort-select"
              className="filter-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="priority">Priority (Critical First)</option>
              <option value="health-desc">Health (Highest First)</option>
              <option value="budget-desc">Budget (Highest First)</option>
              <option value="id-desc">Newest First</option>
              <option value="id-asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main State Rendering: Loading, Error, Empty, Success */}
      <div className="cards-wrapper">
        {isLoading && (
          <div className="skeleton-grid">
            {[1, 2, 3, 4].map((sk) => (
              <div key={sk} className="skeleton-card">
                <div className="skeleton-shimmer skeleton-line skeleton-header"></div>
                <div className="skeleton-shimmer skeleton-line skeleton-title"></div>
                <div className="skeleton-shimmer skeleton-line skeleton-desc"></div>
                <div className="skeleton-shimmer skeleton-line skeleton-desc-short"></div>
                <div className="skeleton-shimmer skeleton-line skeleton-footer"></div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="state-box error-box">
            <div className="state-icon-circle error-circle">
              <AlertCircleIcon className="state-icon" />
            </div>
            <h4 className="state-title">Failed to Load Asset Registry</h4>
            <p className="state-message">{error}</p>
            <button type="button" className="btn btn-secondary" onClick={onRetry}>
              <RefreshIcon className="btn-icon" />
              <span>Retry Fetching</span>
            </button>
          </div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className="state-box empty-box">
            <div className="state-icon-circle empty-circle">
              <SearchIcon className="state-icon" />
            </div>
            <h4 className="state-title">No Matching Assets Found</h4>
            <p className="state-message">
              No registry items match the current search query or filter options.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClearSearch}
            >
              Reset Filters
            </button>
          </div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className="cards-grid">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                isSelected={selectedId === item.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-bar">
        <div className="pagination-info">
          Page <strong>{page}</strong> of <strong>{totalPages || 1}</strong> ({totalItems} total)
        </div>
        <div className="pagination-btns">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
          >
            ← Previous
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages || isLoading}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
