import { Link } from "react-router-dom";
import { ActivityIcon, MapPinIcon, UserIcon, ArrowRightIcon } from "./Icons";

export function ItemCard({ item }) {
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
  const healthClass =
    health >= 90 ? "health-optimal" : health >= 70 ? "health-nominal" : "health-critical";

  return (
    <article className="item-card">
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

      <div className="card-main-info">
        <h3 className="card-title">
          <Link to={`/items/${item.id}`} className="card-title-link">
            {item.name}
          </Link>
        </h3>
        <p className="card-description">{item.description}</p>
      </div>

      <div className="card-meta-grid">
        <div className="meta-item">
          <UserIcon className="meta-icon" />
          <span className="meta-label">Lead:</span>
          <span className="meta-val">{item.assignedTo}</span>
        </div>
        <div className="meta-item">
          <MapPinIcon className="meta-icon" />
          <span className="meta-label">Sector:</span>
          <span className="meta-val">{item.location}</span>
        </div>
      </div>

      <div className="card-health-container">
        <div className="health-header">
          <span className="health-label">
            <ActivityIcon className="health-icon" /> System Health
          </span>
          <span className={`health-value ${healthClass}`}>{health}%</span>
        </div>
        <div className="health-track">
          <div
            className={`health-bar ${healthClass}`}
            style={{ width: `${Math.min(100, Math.max(0, health))}%` }}
          ></div>
        </div>
      </div>

      <div className="card-footer-row">
        <div className="card-budget">
          <span className="budget-label">Allocation</span>
          <span className="budget-amount">
            ${Number(item.budget || 0).toLocaleString()}
          </span>
        </div>

        <Link to={`/items/${item.id}`} className="btn btn-secondary btn-card-details">
          <span>Inspect Spec</span>
          <ArrowRightIcon className="btn-icon-right" />
        </Link>
      </div>
    </article>
  );
}

