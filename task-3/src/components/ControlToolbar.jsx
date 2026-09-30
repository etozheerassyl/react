import React from "react";
import { Search, ArrowUpDown, Filter, RotateCcw, ArrowDownUp, Check } from "lucide-react";
import { ROLES, STATUSES } from "../data/initialOperatives";

export function ControlToolbar({
  searchQuery,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  sortCriteria,
  onSortCriteriaChange,
  isReversed,
  onToggleReverse,
  onClearFilters,
  resultCount,
  totalCount,
}) {
  console.log("%c[RENDER] <ControlToolbar />", "color: #f59e0b; font-weight: bold;");

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedRole !== "All" ||
    selectedStatus !== "All" ||
    sortCriteria !== "default" ||
    isReversed;

  return (
    <div className="control-toolbar">
      {/* Top row: Search, Sort and Reverse */}
      <div className="toolbar-top-row">
        {/* Search Bar */}
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by operative callsign, name or specialty..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="sort-group">
          <div className="sort-label">
            <ArrowUpDown size={14} />
            <span>Sort by:</span>
          </div>
          <select
            className="cyber-select"
            value={sortCriteria}
            onChange={(e) => onSortCriteriaChange(e.target.value)}
          >
            <option value="default">Default Order</option>
            <option value="rank">Rank (S &gt; A &gt; B)</option>
            <option value="energy-desc">Energy: High to Low</option>
            <option value="energy-asc">Energy: Low to High</option>
            <option value="missions-desc">Missions Completed</option>
          </select>
        </div>

        {/* Reverse Order Button */}
        <button
          type="button"
          className={`cyber-btn btn-toggle ${isReversed ? "active-reverse" : ""}`}
          onClick={onToggleReverse}
          title="Reverses the current list display. Notice local state stays with the operative when using stable keys!"
        >
          <ArrowDownUp size={16} />
          <span>{isReversed ? "Reversed (Active)" : "Reverse List"}</span>
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            className="cyber-btn btn-ghost"
            onClick={onClearFilters}
            title="Reset all filters and sort orders"
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Filter Pills Row: Role & Status */}
      <div className="toolbar-filters-row">
        {/* Roles */}
        <div className="filter-group">
          <span className="filter-group-title">Role:</span>
          <div className="pill-group">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                className={`filter-pill ${selectedRole === role ? "active" : ""}`}
                onClick={() => onRoleChange(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Statuses */}
        <div className="filter-group">
          <span className="filter-group-title">Status:</span>
          <div className="pill-group">
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                className={`filter-pill status-pill ${
                  selectedStatus === status ? "active" : ""
                } ${status.toLowerCase().replace(" ", "-")}`}
                onClick={() => onStatusChange(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="filter-results-badge">
          Showing <strong>{resultCount}</strong> of <strong>{totalCount}</strong> units
        </div>
      </div>
    </div>
  );
}
