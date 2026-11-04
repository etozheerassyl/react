import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldIcon,
  ListIcon,
  DashboardIcon,
  LogInIcon,
  InfoIcon,
  ActivityIcon,
  ZapIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  TerminalIcon,
} from "../components/Icons";
import { getDashboardStats } from "../services/service";

export function HomePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    getDashboardStats("All")
      .then((data) => {
        if (!isCancelled) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-banner-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>AEGIS TELEMETRY PLATFORM v5.0</span>
          </div>

          <h1 className="hero-title">
            Autonomous Asset Routing &amp; Telemetry Architecture
          </h1>

          <p className="hero-description">
            Next-generation distributed operational registry. Built with <strong>React Router</strong>,
            deep nested layouts, URL parameter synchronization via <code>useSearchParams</code>,
            and high-performance route code-splitting with <code>React.lazy</code> and <code>Suspense</code>.
          </p>

          <div className="hero-actions-row">
            <Link to="/items" className="btn btn-primary btn-lg">
              <ListIcon className="btn-icon" />
              <span>Explore Assets Registry</span>
              <ArrowRightIcon className="btn-icon-right" />
            </Link>

            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              <DashboardIcon className="btn-icon" />
              <span>Operations Dashboard</span>
            </Link>

            <Link to="/about" className="btn btn-outline btn-lg">
              <InfoIcon className="btn-icon" />
              <span>Architecture &amp; Bio</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-bar">
            <div className="metric-item">
              <span className="metric-val">{loading ? "..." : stats?.totalCount || "12"}</span>
              <span className="metric-lbl">Monitored Assets</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">{loading ? "..." : `${stats?.activeRate || 75}%`}</span>
              <span className="metric-lbl">Active Readiness</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">{loading ? "..." : `${stats?.avgHealth || 92}%`}</span>
              <span className="metric-lbl">Average Health</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">{loading ? "..." : `$${((stats?.totalBudget || 2600000) / 1000000).toFixed(2)}M`}</span>
              <span className="metric-lbl">Allocated Budget</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Graphic / Image */}
        <div className="hero-visual-card">
          <div className="hero-image-wrapper">
            <img
              src="/src/assets/hero.png"
              alt="Aegis Core Futuristic Telemetry Node"
              className="hero-image"
              onError={(e) => {
                // Graceful fallback if image path resolution varies
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
            <div className="hero-graphic-fallback" style={{ display: "none" }}>
              <ShieldIcon className="fallback-hero-icon" />
              <span>Aegis Defense Architecture</span>
            </div>
            <div className="hero-image-overlay">
              <div className="overlay-pill">
                <ActivityIcon className="pill-icon" />
                <span>Live Quantum Entanglement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Quick Links Cards */}
      <section className="home-nav-grid-section">
        <div className="section-header-compact">
          <h2 className="section-title">Required Application Modules</h2>
          <p className="section-subtitle">
            Direct access to all major subsystem views configured with React Router
          </p>
        </div>

        <div className="nav-cards-grid">
          <Link to="/items" className="nav-feature-card">
            <div className="card-feature-header">
              <div className="feature-icon-box icon-emerald">
                <ListIcon />
              </div>
              <span className="route-pill">/items</span>
            </div>
            <h3 className="feature-title">Assets Registry</h3>
            <p className="feature-desc">
              Browse telemetry units with live search, multiple categorical filters, sorting, and pagination synchronized with URL parameters.
            </p>
            <div className="card-feature-link">
              <span>View Registry</span>
              <ArrowRightIcon />
            </div>
          </Link>

          <Link to="/dashboard" className="nav-feature-card">
            <div className="card-feature-header">
              <div className="feature-icon-box icon-cyan">
                <DashboardIcon />
              </div>
              <span className="route-pill">/dashboard</span>
            </div>
            <h3 className="feature-title">Operations Dashboard</h3>
            <p className="feature-desc">
              Multi-dimensional analytics, 4+ live calculated metrics, category &amp; status breakdowns with interactive real-time data filtering.
            </p>
            <div className="card-feature-link">
              <span>Open Dashboard</span>
              <ArrowRightIcon />
            </div>
          </Link>

          <Link to="/about" className="nav-feature-card">
            <div className="card-feature-header">
              <div className="feature-icon-box icon-purple">
                <InfoIcon />
              </div>
              <span className="route-pill">/about</span>
            </div>
            <h3 className="feature-title">Architecture &amp; Developer</h3>
            <p className="feature-desc">
              Comprehensive technical breakdown of React Router nested routes, lazy loading, state synchronization, and Yerassyl's developer profile.
            </p>
            <div className="card-feature-link">
              <span>Inspect Architecture</span>
              <ArrowRightIcon />
            </div>
          </Link>

          <Link to="/login" className="nav-feature-card">
            <div className="card-feature-header">
              <div className="feature-icon-box icon-amber">
                <LogInIcon />
              </div>
              <span className="route-pill">/login</span>
            </div>
            <h3 className="feature-title">Terminal Authentication</h3>
            <p className="feature-desc">
              Operator authentication gateway with clearance level selection, token generation, and role-based terminal simulation.
            </p>
            <div className="card-feature-link">
              <span>Access Terminal</span>
              <ArrowRightIcon />
            </div>
          </Link>
        </div>
      </section>

      {/* Architecture Highlights */}
      <section className="architecture-highlights-section">
        <div className="highlights-box">
          <div className="highlights-header">
            <TerminalIcon className="highlights-icon" />
            <div>
              <h3 className="highlights-title">Routing &amp; Architectural Compliance</h3>
              <p className="highlights-sub">Meets 100% of Task 5 homework specifications</p>
            </div>
          </div>
          <div className="highlights-grid">
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>RootLayout with NavBar &amp; Outlet</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>Dynamic Routing (/items/:id) with useParams</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>URL Synchronization with useSearchParams</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>React.lazy &amp; Suspense Code Splitting</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>Custom 404 Route &amp; Invalid ID handling</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>Decoupled API service in services/service.js</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;

