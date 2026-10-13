import { ActivityIcon } from "./Icons";

export function ItemCard({ item, isSelected, onSelect }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "badge-status-active";
      case "in maintenance":
        return "badge-status-maintenance";
      case "deploying":
        return "badge-status-deploying";
      case "standby":
        return "badge-status-standby";
      case "decommissioned":
      default:
        return "badge-status-decommissioned";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "badge-priority-critical";
      case "high":
        return "badge-priority-high";
      case "medium":
        return "badge-priority-medium";
      case "low":
      default:
        return "badge-priority-low";
    }
  };

  const health = typeof item.systemHealth === "number" ? item.systemHealth : 100;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`item-card ${isSelected ? "item-card-selected" : ""}`}
      onClick={() => onSelect(item.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(item.id);
        }
      }}
    >
      <div className="card-top-row">
        <div className="card-id-category">
          <span className="card-id">#{String(item.id).padStart(2, "0")}</span>
          <span className="card-category">{item.category}</span>
        </div>
        <div className="card-badges">
          <span className={`status-pill ${getStatusColor(item.status)}`}>
            {item.status}
          </span>
          <span className={`priority-pill ${getPriorityColor(item.priority)}`}>
            {item.priority}
          </span>
        </div>
      </div>

      <h3 className="card-title">{item.name}</h3>
      <p className="card-desc">{item.description}</p>

      <div className="card-meta-row">
        <div className="card-operative">
          <span className="meta-label">Lead:</span>
          <span className="meta-val">{item.assignedTo || "Unassigned"}</span>
        </div>
        <div className="card-health">
          <div className="health-header">
            <ActivityIcon className="health-icon" />
            <span className="health-text">{health}%</span>
          </div>
          <div className="health-bar-track">
            <div
              className={`health-bar-fill ${health < 60 ? "health-low" : health < 85 ? "health-mid" : "health-high"}`}
              style={{ width: `${health}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
