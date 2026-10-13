import {
  ShieldIcon,
  ActivityIcon,
  EditIcon,
  TrashIcon,
  SpinnerIcon,
  AlertCircleIcon,
  RefreshIcon,
  ZapIcon,
  TerminalIcon,
} from "./Icons";

export function ItemDetails({
  selectedId,
  item,
  isLoading,
  error,
  onRetry,
  onUpdateStatus,
  onOpenEdit,
  onDelete,
  updatingItemId,
  isDeleting,
}) {
  // 1. EMPTY STATE (No item selected)
  if (!selectedId) {
    return (
      <aside className="item-details-panel details-empty">
        <div className="empty-details-content">
          <div className="radar-animation-box">
            <ShieldIcon className="radar-icon" />
          </div>
          <h3>Registry Asset Telemetry</h3>
          <p>
            Select any asset from the registry on the left to initiate an asynchronous telemetry request and load full operational specifications.
          </p>
          <div className="empty-details-hints">
            <span className="hint-pill">⚡ Asynchronously Fetched</span>
            <span className="hint-pill">🛡️ Race-Condition Protected</span>
            <span className="hint-pill">🔒 Stale-Closure Guarded</span>
          </div>
        </div>
      </aside>
    );
  }

  // 2. LOADING STATE
  if (isLoading) {
    return (
      <aside className="item-details-panel details-loading">
        <div className="details-loading-header">
          <SpinnerIcon className="details-spinner spin" />
          <div>
            <h4>Asynchronously Querying API...</h4>
            <p className="loading-subtext">Fetching specifications for Asset #{selectedId}</p>
          </div>
        </div>
        <div className="skeleton-details-body">
          <div className="skeleton-shimmer skeleton-line skeleton-title"></div>
          <div className="skeleton-shimmer skeleton-line skeleton-desc"></div>
          <div className="skeleton-details-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-shimmer skeleton-spec-card"></div>
            ))}
          </div>
          <div className="skeleton-shimmer skeleton-code-box"></div>
        </div>
      </aside>
    );
  }

  // 3. ERROR STATE
  if (error) {
    return (
      <aside className="item-details-panel details-error">
        <div className="state-box error-box">
          <div className="state-icon-circle error-circle">
            <AlertCircleIcon className="state-icon" />
          </div>
          <h4 className="state-title">Telemetry Request Failed</h4>
          <p className="state-message">
            Could not retrieve data for asset #{selectedId}: {error}
          </p>
          <button type="button" className="btn btn-secondary" onClick={onRetry}>
            <RefreshIcon className="btn-icon" />
            <span>Retry Loading Details</span>
          </button>
        </div>
      </aside>
    );
  }

  // If item is not yet resolved but not loading/error
  if (!item) return null;

  const isCurrentItemUpdating = updatingItemId === item.id;
  const health = typeof item.systemHealth === "number" ? item.systemHealth : 100;
  const formattedBudget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(item.budget || 0);

  // Status transitions
  const statusCycle = ["Active", "In Maintenance", "Deploying", "Standby", "Decommissioned"];
  const currentStatusIndex = statusCycle.indexOf(item.status);
  const nextStatus = statusCycle[(currentStatusIndex + 1) % statusCycle.length];

  return (
    <aside className="item-details-panel details-loaded">
      {/* Header with Title and Primary Controls */}
      <div className="details-header">
        <div className="details-id-row">
          <span className="details-id-badge">SPEC // #{String(item.id).padStart(2, "0")}</span>
          <span className="details-category-badge">{item.category}</span>
          <span className="details-clearance-badge">{item.securityClearance}</span>
        </div>

        <h2 className="details-name">{item.name}</h2>
        <p className="details-description">{item.description}</p>
      </div>

      {/* Quick Action Bar (Requirement 5: Update selected item through API) */}
      <div className="details-action-bar">
        <div className="status-action-group">
          <span className="action-group-label">OPERATIONAL STATUS:</span>
          <div className="status-change-buttons">
            <button
              type="button"
              className="btn btn-status-cycle"
              disabled={isCurrentItemUpdating || isDeleting}
              onClick={() => onUpdateStatus(item.id, nextStatus)}
              title={`Cycle status from ${item.status} to ${nextStatus}`}
            >
              {isCurrentItemUpdating ? (
                <SpinnerIcon className="btn-icon spin" />
              ) : (
                <ZapIcon className="btn-icon" />
              )}
              <span>
                {isCurrentItemUpdating ? "Updating..." : `Set to: ${nextStatus}`}
              </span>
            </button>

            <select
              className="details-status-select"
              value={item.status}
              disabled={isCurrentItemUpdating || isDeleting}
              onChange={(e) => onUpdateStatus(item.id, e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="In Maintenance">In Maintenance</option>
              <option value="Deploying">Deploying</option>
              <option value="Standby">Standby</option>
              <option value="Decommissioned">Decommissioned</option>
            </select>
          </div>
        </div>

        <div className="edit-delete-group">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onOpenEdit(item)}
            disabled={isCurrentItemUpdating || isDeleting}
            title="Edit asset fields"
          >
            <EditIcon className="btn-icon" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(item.id)}
            disabled={isCurrentItemUpdating || isDeleting}
            title="Remove asset from database"
          >
            {isDeleting ? <SpinnerIcon className="btn-icon spin" /> : <TrashIcon className="btn-icon" />}
            <span>{isDeleting ? "Deleting..." : "Remove"}</span>
          </button>
        </div>
      </div>

      {/* Meaningful Fields Grid (Requirement 1: At least 7 meaningful fields) */}
      <div className="details-spec-grid">
        {/* Field 1: Status */}
        <div className="spec-card">
          <span className="spec-label">Current Status</span>
          <span className={`spec-value spec-status-pill status-${item.status?.toLowerCase().replace(/\s+/g, "-")}`}>
            {item.status}
          </span>
        </div>

        {/* Field 2: Priority */}
        <div className="spec-card">
          <span className="spec-label">Operational Priority</span>
          <span className="spec-value spec-priority">{item.priority}</span>
        </div>

        {/* Field 3: Assigned Operative */}
        <div className="spec-card">
          <span className="spec-label">Assigned Operative</span>
          <span className="spec-value">{item.assignedTo || "Unassigned"}</span>
        </div>

        {/* Field 4: Budget Allocation */}
        <div className="spec-card">
          <span className="spec-label">Budget Allocation</span>
          <span className="spec-value spec-budget">{formattedBudget}</span>
        </div>

        {/* Field 5: System Health */}
        <div className="spec-card spec-card-health">
          <div className="spec-health-top">
            <span className="spec-label">System Health</span>
            <span className="spec-health-pct">{health}%</span>
          </div>
          <div className="health-bar-track">
            <div
              className={`health-bar-fill ${health < 60 ? "health-low" : health < 85 ? "health-mid" : "health-high"}`}
              style={{ width: `${health}%` }}
            />
          </div>
        </div>

        {/* Field 6: Security Clearance */}
        <div className="spec-card">
          <span className="spec-label">Security Clearance</span>
          <span className="spec-value">{item.securityClearance}</span>
        </div>

        {/* Field 7: Deployment Location */}
        <div className="spec-card">
          <span className="spec-label">Location / Sector</span>
          <span className="spec-value">{item.location}</span>
        </div>

        {/* Field 8: Last Inspection Date */}
        <div className="spec-card">
          <span className="spec-label">Last Inspection</span>
          <span className="spec-value">{item.lastInspection}</span>
        </div>
      </div>

      {/* Field 9: Technical Specifications (Extended details) */}
      <div className="spec-box-container">
        <div className="spec-box-header">
          <TerminalIcon className="spec-box-icon" />
          <span>TECHNICAL SPECIFICATIONS & ARCHITECTURE</span>
        </div>
        <pre className="spec-code-block">{item.specifications}</pre>
      </div>

      {/* Field 10: Operational & Maintenance Guidance */}
      <div className="maintenance-box">
        <div className="maintenance-title">OPERATIONAL LOGS & MAINTENANCE GUIDANCE</div>
        <p className="maintenance-text">{item.maintenanceNotes}</p>
      </div>
    </aside>
  );
}
