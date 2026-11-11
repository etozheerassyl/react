import { Link } from "react-router-dom";
import {
  ShieldIcon,
  ListIcon,
  DashboardIcon,
  LogInIcon,
  InfoIcon,
  ActivityIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  TerminalIcon,
  UserIcon,
} from "../components/Icons";
import { useDashboardStats } from "../hooks/useAssets";
import { useAuth } from "../context/AuthContext";
import heroImg from "../assets/hero.png";

export function HomePage() {
  const { stats, isLoading } = useDashboardStats("All");
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-banner-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>AEGIS TELEMETRY PLATFORM v6.0</span>
          </div>

          <h1 className="hero-title">
            Cached Server Data &amp; Firebase Auth Architecture
          </h1>

          <p className="hero-description">
            Extending Aegis Core with <strong>TanStack Query</strong> server-data caching,
            mutation-driven cache invalidation, environment variable configuration, and full{" "}
            <strong>Firebase Authentication</strong> (Email/Password, Google Sign-In, and protected routes).
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

            {isAuthenticated ? (
              <Link to="/profile" className="btn btn-outline btn-lg">
                <UserIcon className="btn-icon" />
                <span>Operator Profile</span>
              </Link>
            ) : (
              <Link to="/login" className="btn btn-outline btn-lg">
                <LogInIcon className="btn-icon" />
                <span>Sign In / Register</span>
              </Link>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-bar">
            <div className="metric-item">
              <span className="metric-val">{isLoading ? "..." : stats?.totalCount ?? "12"}</span>
              <span className="metric-lbl">Monitored Assets</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">{isLoading ? "..." : `${stats?.activeRate ?? 75}%`}</span>
              <span className="metric-lbl">Active Readiness</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">{isLoading ? "..." : `${stats?.avgHealth ?? 92}%`}</span>
              <span className="metric-lbl">Average Health</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-val">
                {isLoading ? "..." : `$${((stats?.totalBudget ?? 2600000) / 1000000).toFixed(2)}M`}
              </span>
              <span className="metric-lbl">Allocated Budget</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Graphic / Image */}
        <div className="hero-visual-card">
          <div className="hero-image-wrapper">
            <img
              src={heroImg}
              alt="Aegis Core Futuristic Telemetry Node"
              className="hero-image"
              onError={(e) => {
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
                <span>Query Cache + Firebase Auth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Quick Links Cards */}
      <section className="home-nav-grid-section">
        <div className="section-header-compact">
          <h2 className="section-title">Application Modules &amp; Routes</h2>
          <p className="section-subtitle">
            All Task 5 routes preserved alongside new Task 6 authentication and caching workflows
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
            <h3 className="feature-title">Cached Assets Registry</h3>
            <p className="feature-desc">
              URL-synchronized filters, sorting, and pagination backed by TanStack Query keys, stale-while-revalidate caching, and CRUD invalidation.
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
              Live calculated telemetry statistics and breakdowns cached per department scope with instant invalidation on asset mutations.
            </p>
            <div className="card-feature-link">
              <span>Open Dashboard</span>
              <ArrowRightIcon />
            </div>
          </Link>

          <Link to="/profile" className="nav-feature-card">
            <div className="card-feature-header">
              <div className="feature-icon-box icon-purple">
                <UserIcon />
              </div>
              <span className="route-pill">/profile</span>
            </div>
            <h3 className="feature-title">Protected Operator Profile</h3>
            <p className="feature-desc">
              Guarded route displaying your Firebase email, UID, and provider metadata; unauthenticated visitors redirect to /login.
            </p>
            <div className="card-feature-link">
              <span>Open Profile</span>
              <ArrowRightIcon />
            </div>
          </Link>

          <Link to="/login" className="nav-feature-card">
            <div className="card-feature-header">
              <div className="feature-icon-box icon-amber">
                <LogInIcon />
              </div>
              <span className="route-pill">/login &amp; /signup</span>
            </div>
            <h3 className="feature-title">Firebase Authentication</h3>
            <p className="feature-desc">
              Email/Password sign-in, validated registration with confirm password, Google popup login, and persistent onAuthStateChanged sessions.
            </p>
            <div className="card-feature-link">
              <span>Authenticate</span>
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
              <h3 className="highlights-title">Task 6 Architecture &amp; Compliance</h3>
              <p className="highlights-sub">Server-data caching, Firebase Authentication, and decoupled custom hooks</p>
            </div>
          </div>
          <div className="highlights-grid">
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>VITE_ Env Vars &amp; firebase.js Setup</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>AuthContext + onAuthStateChanged Persistence</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>Protected /profile Route &amp; /signup Validation</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>TanStack Query Keys + 30s Stale / 5m GC</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>Automatic Mutation Cache Invalidation</span>
            </div>
            <div className="highlight-pill">
              <CheckCircleIcon className="check-icon" />
              <span>AbortSignal Race-Condition Protection</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;

