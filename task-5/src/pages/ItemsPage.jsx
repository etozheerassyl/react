import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ItemCard } from "../components/ItemCard";
import { CreateModal } from "../components/CreateModal";
import {
  getItemsList,
  createItem,
} from "../services/service";
import {
  SearchIcon,
  PlusIcon,
  RefreshIcon,
  AlertCircleIcon,
  SpinnerIcon,
  CheckCircleIcon,
  TerminalIcon,
} from "../components/Icons";

export function ItemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read filter/search state directly from URLSearchParams
  const searchQuery = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "All";
  const categoryFilter = searchParams.get("category") || "All";
  const priorityFilter = searchParams.get("priority") || "All";
  const sortBy = searchParams.get("sort") || "name";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 6);

  // Local state for immediate text input before submit or on clear
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Synchronize local input if URL search changes externally (e.g. Back/Forward)
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Data fetching state
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Create Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [notification, setNotification] = useState(null);

  // 2. Fetch Items whenever searchParams or refreshTrigger changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    // Build query string matching current URL params
    const query = searchParams.toString();

    getItemsList(query)
      .then((response) => {
        if (!isCancelled) {
          setItems(response.data);
          setTotalItems(response.total);
          setTotalPages(response.totalPages);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err.message || "Failed to load telemetry assets.");
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [searchParams, refreshTrigger]);

  // Helper to update specific search param while resetting page to 1
  const updateParam = (key, value, resetPage = true) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!value || value === "All" || (key === "page" && Number(value) === 1)) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    if (resetPage && key !== "page") {
      nextParams.delete("page");
    }
    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam("search", searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    updateParam("search", "");
  };

  const handleResetAllFilters = () => {
    setSearchInput("");
    setSearchParams(new URLSearchParams());
  };

  const handleCreateAsset = async (formData) => {
    setIsSubmittingCreate(true);
    try {
      const created = await createItem(formData);
      setIsCreateModalOpen(false);
      setNotification({
        type: "success",
        text: `Asset #${created.id} "${created.name}" created successfully.`,
      });
      setRefreshTrigger((prev) => prev + 1);
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      setNotification({
        type: "error",
        text: err.message || "Failed to create asset.",
      });
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  return (
    <div className="items-page-container">
      {/* Header Bar */}
      <div className="items-header-bar">
        <div>
          <div className="badge-tag">CENTRAL REGISTRY</div>
          <h1 className="page-title">Operational Telemetry Assets</h1>
          <p className="page-subtitle">
            Synchronized with URL search parameters (<code>useSearchParams</code>) for direct linking, persistence, and shareability.
          </p>
        </div>

        <div className="items-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setRefreshTrigger((prev) => prev + 1)}
            disabled={isLoading}
            title="Refresh assets list from API"
          >
            <RefreshIcon className={isLoading ? "spin" : ""} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <PlusIcon />
            <span>Deploy New Asset</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`notification-banner banner-${notification.type}`}>
          {notification.type === "success" ? <CheckCircleIcon /> : <AlertCircleIcon />}
          <span>{notification.text}</span>
          <button type="button" className="close-banner" onClick={() => setNotification(null)}>✕</button>
        </div>
      )}

      {/* Filter and Search Control Panel */}
      <div className="filter-controls-card">
        {/* Search Row */}
        <form className="search-row-form" onSubmit={handleSearchSubmit}>
          <div className="search-field-wrap">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by asset name, sector, specifications, or lead..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClearSearch}
                title="Clear search input"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary search-submit-btn">
            <span>Filter</span>
          </button>
        </form>

        {/* Filter Dropdowns Grid */}
        <div className="filter-dropdowns-grid">
          {/* Status Filter */}
          <div className="control-group">
            <label htmlFor="filter-status" className="control-label">Status</label>
            <select
              id="filter-status"
              className="control-select"
              value={statusFilter}
              onChange={(e) => updateParam("status", e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="In Maintenance">In Maintenance</option>
              <option value="Deploying">Deploying</option>
              <option value="Standby">Standby</option>
              <option value="Decommissioned">Decommissioned</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="control-group">
            <label htmlFor="filter-category" className="control-label">Category</label>
            <select
              id="filter-category"
              className="control-select"
              value={categoryFilter}
              onChange={(e) => updateParam("category", e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Defense & Security">Defense &amp; Security</option>
              <option value="Power & Energy">Power &amp; Energy</option>
              <option value="Data Communications">Data Communications</option>
              <option value="Cyber Defense">Cyber Defense</option>
              <option value="AI & Robotics">AI &amp; Robotics</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="control-group">
            <label htmlFor="filter-priority" className="control-label">Priority</label>
            <select
              id="filter-priority"
              className="control-select"
              value={priorityFilter}
              onChange={(e) => updateParam("priority", e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="control-group">
            <label htmlFor="filter-sort" className="control-label">Sort Order</label>
            <select
              id="filter-sort"
              className="control-select"
              value={sortBy}
              onChange={(e) => updateParam("sort", e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="health-desc">Health (Highest First)</option>
              <option value="health-asc">Health (Lowest First)</option>
              <option value="budget-desc">Budget (Highest First)</option>
              <option value="budget-asc">Budget (Lowest First)</option>
              <option value="priority">Threat Priority</option>
              <option value="id-desc">ID (Newest First)</option>
              <option value="id-asc">ID (Oldest First)</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        <div className="active-filters-bar">
          <div className="filters-meta">
            <span className="results-count">
              Showing <strong>{items.length}</strong> of <strong>{totalItems}</strong> matching assets
            </span>
            {(searchQuery || statusFilter !== "All" || categoryFilter !== "All" || priorityFilter !== "All" || sortBy !== "name") && (
              <span className="url-sync-indicator">
                🔗 URL Parameters Active
              </span>
            )}
          </div>

          {(searchQuery || statusFilter !== "All" || categoryFilter !== "All" || priorityFilter !== "All" || sortBy !== "name") && (
            <button
              type="button"
              className="btn-clear-all"
              onClick={handleResetAllFilters}
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Listing Section */}
      <section className="items-list-section">
        {/* Loading State */}
        {isLoading && (
          <div className="items-grid-skeleton">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-skeleton">
                <div className="skeleton-row-top">
                  <div className="skeleton-pill"></div>
                  <div className="skeleton-pill"></div>
                </div>
                <div className="skeleton-title"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line-short"></div>
                <div className="skeleton-bar"></div>
                <div className="skeleton-footer"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="items-state-alert alert-error">
            <AlertCircleIcon className="alert-large-icon" />
            <div className="alert-content">
              <h3>Error Querying Telemetry Registry</h3>
              <p>{error}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setRefreshTrigger((prev) => prev + 1)}
              >
                <RefreshIcon />
                <span>Retry Request</span>
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && items.length === 0 && (
          <div className="items-state-alert alert-empty">
            <TerminalIcon className="alert-large-icon" />
            <div className="alert-content">
              <h3>No Matching Assets Found</h3>
              <p>
                No telemetry assets match the current filter criteria:
                {searchQuery && ` search: "${searchQuery}",`}
                {statusFilter !== "All" && ` status: "${statusFilter}",`}
                {categoryFilter !== "All" && ` category: "${categoryFilter}",`}
                {priorityFilter !== "All" && ` priority: "${priorityFilter}".`}
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResetAllFilters}
              >
                Clear All Search Parameters
              </button>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && !error && items.length > 0 && (
          <div className="items-cards-grid">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="pagination-wrapper">
            <button
              type="button"
              className="btn btn-secondary pagination-btn"
              disabled={page <= 1}
              onClick={() => updateParam("page", String(page - 1), false)}
            >
              Previous
            </button>

            <div className="pagination-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`page-num-btn ${p === page ? "active" : ""}`}
                  onClick={() => updateParam("page", String(p), false)}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-secondary pagination-btn"
              disabled={page >= totalPages}
              onClick={() => updateParam("page", String(page + 1), false)}
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Create Modal */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateAsset}
        isSubmitting={isSubmittingCreate}
      />
    </div>
  );
}
export default ItemsPage;

