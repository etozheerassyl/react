import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useItemDetail,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} from "../hooks/useAssets";
import { EditModal } from "../components/EditModal";
import {
  ArrowLeftIcon,
  ListIcon,
  ShieldIcon,
  ActivityIcon,
  DollarIcon,
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  EditIcon,
  TrashIcon,
  RefreshIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ZapIcon,
  TerminalIcon,
  SpinnerIcon,
} from "../components/Icons";

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { item, isLoading, isMissing, error, refetch } = useItemDetail(id);
  const updateAssetMutation = useUpdateAssetMutation();
  const deleteAssetMutation = useDeleteAssetMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const isUpdating = updateAssetMutation.isPending;
  const isDeleting = deleteAssetMutation.isPending;

  // Quick cycle status transition
  const handleCycleStatus = async () => {
    if (!item || isUpdating) return;

    const statusCycle = ["Active", "In Maintenance", "Deploying", "Standby", "Decommissioned"];
    const currentIndex = statusCycle.indexOf(item.status);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];

    try {
      await updateAssetMutation.mutateAsync({
        id: item.id,
        changes: { status: nextStatus },
      });
      setNotification({
        type: "success",
        text: `Asset status transitioned to "${nextStatus}" and list caches invalidated.`,
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: err.message || "Failed to update status.",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Matches EditModal signature: onSave(item.id, formData)
  const handleSaveEdit = async (targetId, formData) => {
    try {
      await updateAssetMutation.mutateAsync({
        id: targetId,
        changes: formData,
      });
      setIsEditModalOpen(false);
      setNotification({
        type: "success",
        text: "Asset specifications updated and cached queries invalidated.",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({
        type: "error",
        text: err.message || "Failed to update asset specifications.",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDelete = async () => {
    if (!item) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently decommission Asset #${item.id} (${item.name})?`
    );
    if (!confirmDelete) return;

    try {
      await deleteAssetMutation.mutateAsync(item.id);
      navigate("/items");
    } catch (err) {
      setNotification({
        type: "error",
        text: err.message || "Failed to decommission asset.",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

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

  return (
    <div className="item-detail-page-container">
      {/* Navigation Links Bar: Back and All Items */}
      <div className="detail-nav-actions-bar">
        <div className="nav-links-left">
          <button
            type="button"
            className="btn btn-secondary btn-nav-back"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon />
            <span>Back</span>
          </button>

          <Link to="/items" className="btn btn-outline btn-all-items">
            <ListIcon />
            <span>All Items</span>
          </Link>
        </div>

        <div className="nav-links-right">
          <span className="current-id-pill">
            Target Route: <code>/items/{id}</code>
          </span>
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

      {/* 1. LOADING STATE */}
      {isLoading && (
        <div className="detail-loading-panel">
          <div className="skeleton-loading-header">
            <SpinnerIcon className="spin skeleton-spinner" />
            <div>
              <h3>Querying Asset Telemetry...</h3>
              <p>Fetching specifications for Route /items/{id} from API</p>
            </div>
          </div>
          <div className="detail-skeleton-grid">
            <div className="skeleton-line-long"></div>
            <div className="skeleton-line-med"></div>
            <div className="skeleton-spec-boxes">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton-box"></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MISSING ITEM / INVALID ID STATE */}
      {!isLoading && isMissing && (
        <div className="items-state-alert alert-missing">
          <AlertCircleIcon className="alert-large-icon" />
          <div className="alert-content">
            <h2>Asset #{id} Not Found</h2>
            <p>
              The requested identifier <code>{id}</code> does not correspond to an active operational asset in the Aegis registry database.
            </p>
            <div className="missing-actions">
              <Link to="/items" className="btn btn-primary">
                <ListIcon />
                <span>Return to All Items</span>
              </Link>
              <Link to="/" className="btn btn-outline">
                <span>Go to Home</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. ERROR STATE */}
      {!isLoading && !isMissing && error && (
        <div className="items-state-alert alert-error">
          <AlertCircleIcon className="alert-large-icon" />
          <div className="alert-content">
            <h2>Error Loading Asset</h2>
            <p>{error}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => refetch()}
            >
              <RefreshIcon />
              <span>Retry Fetch</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. SUCCESS STATE: 10 MEANINGFUL DETAILS */}
      {!isLoading && !isMissing && !error && item && (
        <article className="item-detail-card">
          {/* Header Banner */}
          <header className="detail-card-header">
            <div className="detail-header-left">
              <div className="detail-id-tag">
                <span>ASSET ID #{String(item.id).padStart(2, "0")}</span>
                <span className="detail-category-badge">{item.category}</span>
              </div>
              <h1 className="detail-asset-name">{item.name}</h1>
              <p className="detail-asset-desc">{item.description}</p>
            </div>

            <div className="detail-header-badges">
              <div className="badge-item">
                <span className="badge-meta-label">Status</span>
                <span className={`status-pill pill-lg ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <div className="badge-item">
                <span className="badge-meta-label">Priority</span>
                <span className={`priority-pill pill-lg ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
            </div>
          </header>

          {/* Quick Actions Bar */}
          <div className="detail-action-buttons-row">
            <button
              type="button"
              className="btn btn-secondary btn-action"
              onClick={handleCycleStatus}
              disabled={isUpdating}
              title="Cycle status: Active -> Maintenance -> Deploying -> Standby -> Decommissioned"
            >
              <RefreshIcon className={isUpdating ? "spin" : ""} />
              <span>Cycle Status ({item.status})</span>
            </button>

            <button
              type="button"
              className="btn btn-outline btn-action"
              onClick={() => setIsEditModalOpen(true)}
              disabled={isUpdating}
            >
              <EditIcon />
              <span>Edit Specifications</span>
            </button>

            <button
              type="button"
              className="btn btn-outline-danger btn-action"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <TrashIcon />
              <span>{isDeleting ? "Decommissioning..." : "Decommission Asset"}</span>
            </button>
          </div>

          {/* 10 Meaningful Details Grid */}
          <div className="specifications-grid">
            <div className="spec-card">
              <div className="spec-icon-wrap icon-status">
                <ZapIcon />
              </div>
              <div className="spec-body">
                <span className="spec-label">1. Operational Status</span>
                <span className="spec-value">{item.status}</span>
                <span className="spec-sub">Subsystem State</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-wrap icon-priority">
                <AlertCircleIcon />
              </div>
              <div className="spec-body">
                <span className="spec-label">2. Response Priority</span>
                <span className="spec-value">{item.priority}</span>
                <span className="spec-sub">SLA Dispatch Tier</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-wrap icon-lead">
                <UserIcon />
              </div>
              <div className="spec-body">
                <span className="spec-label">3. Officer in Charge</span>
                <span className="spec-value">{item.assignedTo}</span>
                <span className="spec-sub">Responsible Director</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-wrap icon-budget">
                <DollarIcon />
              </div>
              <div className="spec-body">
                <span className="spec-label">4. Budget Allocation</span>
                <span className="spec-value">${Number(item.budget || 0).toLocaleString()}</span>
                <span className="spec-sub">Fiscal Allocation</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-wrap icon-health">
                <ActivityIcon />
              </div>
              <div className="spec-body">
                <span className="spec-label">5. System Health Rating</span>
                <span className="spec-value">{item.systemHealth}%</span>
                <div className="spec-health-bar">
                  <div
                    className="spec-health-fill"
                    style={{ width: `${item.systemHealth}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-wrap icon-security">
                <ShieldIcon />
              </div>
              <div className="spec-body">
                <span className="spec-label">6. Security Clearance</span>
                <span className="spec-value">{item.securityClearance}</span>
                <span className="spec-sub">Access Control Level</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-wrap icon-location">
                <MapPinIcon />
              </div>
              <div className="spec-body">
                <span className="spec-label">7. Physical Deployment</span>
                <span className="spec-value">{item.location}</span>
                <span className="spec-sub">Sector Zone</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-wrap icon-date">
                <CalendarIcon />
              </div>
              <div className="spec-body">
                <span className="spec-label">8. Last Certified Inspection</span>
                <span className="spec-value">{item.lastInspection}</span>
                <span className="spec-sub">Telemetry Audit</span>
              </div>
            </div>
          </div>

          {/* Deep Specifications & Directives */}
          <div className="detail-deep-specs">
            <div className="deep-spec-card">
              <div className="deep-spec-header">
                <TerminalIcon className="deep-icon" />
                <h3>9. Technical Specifications &amp; Telemetry Matrix</h3>
              </div>
              <div className="code-spec-box">
                <code>{item.specifications}</code>
              </div>
            </div>

            <div className="deep-spec-card">
              <div className="deep-spec-header">
                <ShieldIcon className="deep-icon" />
                <h3>10. Operational Directives &amp; Maintenance Logs</h3>
              </div>
              <p className="maintenance-notes-text">
                {item.maintenanceNotes || "No incident reports logged. Operating within nominal thresholds."}
              </p>
            </div>
          </div>
        </article>
      )}

      {/* Edit Modal */}
      {item && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          item={item}
          isSubmitting={isUpdating}
        />
      )}
    </div>
  );
}
export default ItemDetailPage;

