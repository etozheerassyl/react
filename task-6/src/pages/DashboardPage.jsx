import { useState } from "react";
import { Link } from "react-router-dom";
import { useDashboardStats } from "../hooks/useAssets";
import {
  ShieldIcon,
  ActivityIcon,
  DollarIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  ListIcon,
  RefreshIcon,
  ArrowRightIcon,
  TerminalIcon,
} from "../components/Icons";

export function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { stats, isLoading, isFetching, error, refetch } = useDashboardStats(selectedCategory);

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header-bar">
        <div>
          <div className="badge-tag">CACHED TELEMETRY ANALYTICS</div>
          <h1 className="page-title">Operations Command Dashboard</h1>
          <p className="page-subtitle">
            Real-time computed metrics, multi-tiered distributions, and interactive department filters cached per scope via TanStack Query.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Recalculate stats from API"
          >
            <RefreshIcon className={isFetching ? "spin" : ""} />
            <span>{isFetching ? "Syncing..." : "Recalculate"}</span>
          </button>

          <Link to="/items" className="btn btn-primary">
            <ListIcon />
            <span>View All Registry Items</span>
          </Link>
        </div>
      </div>

      {/* Interactive Filter Affecting Statistics */}
      <div className="dashboard-filter-card">
        <div className="filter-intro">
          <TerminalIcon className="filter-icon" />
          <div>
            <span className="filter-title">Interactive Scope Filter</span>
            <span className="filter-desc">
              Filtering updates all 5 statistics, budget totals, and breakdowns (cached per department key).
            </span>
          </div>
        </div>

        <div className="filter-buttons-wrap">
          {[
            "All",
            "Defense & Security",
            "Power & Energy",
            "Data Communications",
            "Cyber Defense",
            "AI & Robotics",
            "Infrastructure",
          ].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "All" ? "🌐 Entire Fleet (All)" : cat}
            </button>
          ))}
        </div>

        {selectedCategory !== "All" && (
          <div className="active-filter-alert">
            <span>Filtered Scope: <strong>{selectedCategory}</strong></span>
            <button
              type="button"
              className="btn-text-reset"
              onClick={() => setSelectedCategory("All")}
            >
              Reset to Full Fleet
            </button>
          </div>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="dashboard-loading-skeleton">
          <div className="stats-cards-skeleton">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="stat-card-skeleton"></div>
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="items-state-alert alert-error">
          <AlertCircleIcon className="alert-large-icon" />
          <div className="alert-content">
            <h3>Failed to Compute Telemetry Statistics</h3>
            <p>{error}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => refetch()}
            >
              <RefreshIcon />
              <span>Retry Query</span>
            </button>
          </div>
        </div>
      )}

      {/* Success: Statistics & Breakdowns */}
      {!isLoading && !error && stats && (
        <>
          <section className="stats-metric-cards-grid">
            <div className="stat-metric-card">
              <div className="stat-card-top">
                <span className="stat-card-label">1. MONITORED ASSETS</span>
                <div className="stat-icon-wrap icon-cyan">
                  <ShieldIcon />
                </div>
              </div>
              <div className="stat-card-main">
                <span className="stat-big-number">{stats.totalCount}</span>
                <span className="stat-delta positive">
                  {selectedCategory === "All" ? "100% of Registry" : `Filtered by ${selectedCategory}`}
                </span>
              </div>
              <p className="stat-footnote">Active telemetry nodes registered</p>
            </div>

            <div className="stat-metric-card">
              <div className="stat-card-top">
                <span className="stat-card-label">2. OPERATIONAL READINESS</span>
                <div className="stat-icon-wrap icon-emerald">
                  <CheckCircleIcon />
                </div>
              </div>
              <div className="stat-card-main">
                <span className="stat-big-number">{stats.activeRate}%</span>
                <span className="stat-delta">
                  {stats.activeCount} Units Online
                </span>
              </div>
              <p className="stat-footnote">Percentage of assets currently Active</p>
            </div>

            <div className="stat-metric-card">
              <div className="stat-card-top">
                <span className="stat-card-label">3. TOTAL BUDGET COMMITTED</span>
                <div className="stat-icon-wrap icon-amber">
                  <DollarIcon />
                </div>
              </div>
              <div className="stat-card-main">
                <span className="stat-big-number">
                  ${(stats.totalBudget / 1000).toLocaleString()}k
                </span>
                <span className="stat-delta">
                  Avg ${(stats.totalCount ? Math.round(stats.totalBudget / stats.totalCount / 1000) : 0)}k / Unit
                </span>
              </div>
              <p className="stat-footnote">Aggregated fiscal allocation</p>
            </div>

            <div className="stat-metric-card">
              <div className="stat-card-top">
                <span className="stat-card-label">4. FLEET HEALTH INDEX</span>
                <div className="stat-icon-wrap icon-purple">
                  <ActivityIcon />
                </div>
              </div>
              <div className="stat-card-main">
                <span className="stat-big-number">{stats.avgHealth}%</span>
                <span className={`stat-delta ${stats.avgHealth >= 90 ? "positive" : "warning"}`}>
                  {stats.avgHealth >= 90 ? "Optimal Tier" : "Maintenance Needed"}
                </span>
              </div>
              <p className="stat-footnote">Calculated average hardware health</p>
            </div>

            <div className="stat-metric-card">
              <div className="stat-card-top">
                <span className="stat-card-label">5. HIGH-PRIORITY THREATS</span>
                <div className="stat-icon-wrap icon-red">
                  <AlertCircleIcon />
                </div>
              </div>
              <div className="stat-card-main">
                <span className="stat-big-number">{stats.criticalCount}</span>
                <span className="stat-delta danger">
                  {stats.criticalCount > 0 ? "Immediate SLA" : "Clear"}
                </span>
              </div>
              <p className="stat-footnote">Critical urgency operational assets</p>
            </div>
          </section>

          <section className="breakdowns-two-column-grid">
            <div className="breakdown-card">
              <div className="breakdown-header">
                <div>
                  <h3 className="breakdown-title">Breakdown 1: Department Distribution</h3>
                  <p className="breakdown-sub">
                    Asset allocation per category. Click any department to filter the registry!
                  </p>
                </div>
              </div>

              <div className="category-bars-list">
                {stats.categoryBreakdown.map((cat) => (
                  <Link
                    key={cat.category}
                    to={`/items?category=${encodeURIComponent(cat.category)}`}
                    className="category-bar-row interactive-link-row"
                    title={`Filter registry by ${cat.category}`}
                  >
                    <div className="cat-info-top">
                      <span className="cat-name">{cat.category}</span>
                      <div className="cat-meta-vals">
                        <span className="cat-count">{cat.count} assets</span>
                        <span className="cat-budget">${(cat.budget / 1000).toLocaleString()}k</span>
                        <ArrowRightIcon className="cat-arrow-icon" />
                      </div>
                    </div>
                    <div className="cat-progress-track">
                      <div
                        className="cat-progress-fill"
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="breakdown-card">
              <div className="breakdown-header">
                <div>
                  <h3 className="breakdown-title">Breakdown 2: Operational Status Distribution</h3>
                  <p className="breakdown-sub">
                    Subsystem readiness distribution. Click any status to filter the registry!
                  </p>
                </div>
              </div>

              <div className="status-bars-list">
                {stats.statusBreakdown.map((st) => (
                  <Link
                    key={st.status}
                    to={`/items?status=${encodeURIComponent(st.status)}`}
                    className="status-bar-row interactive-link-row"
                    title={`Filter registry by status: ${st.status}`}
                  >
                    <div className="status-info-top">
                      <div className="status-label-with-dot">
                        <span className="status-dot" style={{ backgroundColor: st.color }}></span>
                        <span className="status-title-text">{st.status}</span>
                      </div>
                      <div className="status-meta-vals">
                        <span className="status-count-val">{st.count} assets</span>
                        <span className="status-percent-val">{st.percent}%</span>
                        <ArrowRightIcon className="cat-arrow-icon" />
                      </div>
                    </div>
                    <div className="status-progress-track">
                      <div
                        className="status-progress-fill"
                        style={{ width: `${st.percent}%`, backgroundColor: st.color }}
                      ></div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="health-tiers-mini-box">
                <span className="mini-box-title">System Health Tiers:</span>
                <div className="health-tiers-pills">
                  {stats.healthTiers.map((ht) => (
                    <div key={ht.tier} className="health-tier-pill">
                      <span className="ht-dot" style={{ backgroundColor: ht.color }}></span>
                      <span className="ht-name">{ht.tier}:</span>
                      <span className="ht-count">{ht.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="critical-assets-section">
            <div className="section-header-compact">
              <div>
                <h3 className="section-title">Critical &amp; High Priority Assets Requiring Attention</h3>
                <p className="section-subtitle">
                  Direct links to inspect individual telemetry specifications via parameterized route (<code>/items/:id</code>)
                </p>
              </div>
              <Link to="/items?priority=Critical" className="btn btn-sm btn-outline">
                <span>View All Critical Items</span>
                <ArrowRightIcon />
              </Link>
            </div>

            <div className="critical-items-table-wrapper">
              <table className="critical-items-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Asset Name</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Assigned Lead</th>
                    <th>Health</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topCriticalAssets.map((asset) => (
                    <tr key={asset.id}>
                      <td className="cell-id">#{String(asset.id).padStart(2, "0")}</td>
                      <td className="cell-name">
                        <Link to={`/items/${asset.id}`} className="table-item-link">
                          {asset.name}
                        </Link>
                      </td>
                      <td className="cell-category">{asset.category}</td>
                      <td>
                        <span className={`status-pill badge-status-${asset.status.toLowerCase().replace(/\s+/g, "-")}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td>
                        <span className={`priority-pill badge-priority-${asset.priority.toLowerCase()}`}>
                          {asset.priority}
                        </span>
                      </td>
                      <td className="cell-lead">{asset.assignedTo}</td>
                      <td className="cell-health">
                        <span className={asset.systemHealth >= 90 ? "health-optimal" : "health-nominal"}>
                          {asset.systemHealth}%
                        </span>
                      </td>
                      <td>
                        <Link to={`/items/${asset.id}`} className="btn btn-sm btn-secondary">
                          <span>Inspect</span>
                          <ArrowRightIcon />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
export default DashboardPage;

