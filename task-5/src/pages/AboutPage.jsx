import { Link } from "react-router-dom";
import {
  ShieldIcon,
  CheckCircleIcon,
  TerminalIcon,
  ActivityIcon,
  ZapIcon,
  UserIcon,
  ListIcon,
  DashboardIcon,
  ArrowRightIcon,
} from "../components/Icons";

export function AboutPage() {
  return (
    <div className="about-page-container">
      {/* Header */}
      <div className="page-header-box">
        <div className="badge-tag">SYSTEM SPECIFICATION &amp; ATTRIBUTION</div>
        <h1 className="page-title">About the Architecture &amp; Developer</h1>
        <p className="page-subtitle">
          In-depth technical review of modern routing patterns, dynamic parameters, code splitting, and application architecture.
        </p>
      </div>

      <div className="about-grid-layout">
        {/* Left Column: Developer Profile */}
        <section className="about-column-card dev-profile-card">
          <div className="dev-header">
            <div className="dev-avatar-wrapper">
              <div className="dev-avatar">
                <UserIcon className="dev-avatar-icon" />
              </div>
              <span className="dev-online-dot"></span>
            </div>
            <div>
              <h2 className="dev-name">Yerassyl</h2>
              <p className="dev-title">Frontend Engineer &amp; React Architect</p>
              <span className="dev-badge">Lead Author &amp; Developer</span>
            </div>
          </div>

          <div className="dev-bio">
            <p>
              Engineering sophisticated, reactive web applications with React 19, modern routing paradigms,
              and robust asynchronous data synchronization. Focused on scalable UI state management,
              deep URL parameter synchronization, and rock-solid defense against race conditions and stale closures.
            </p>
          </div>

          <div className="dev-details-list">
            <div className="dev-detail-item">
              <span className="detail-label">Project:</span>
              <span className="detail-val">Task 5 — Routing &amp; Application Architecture</span>
            </div>
            <div className="dev-detail-item">
              <span className="detail-label">Course:</span>
              <span className="detail-val">React Advanced Engineering</span>
            </div>
            <div className="dev-detail-item">
              <span className="detail-label">Frameworks:</span>
              <span className="detail-val">React 19, React Router v7, Vite 6</span>
            </div>
            <div className="dev-detail-item">
              <span className="detail-label">GitHub Repo:</span>
              <a
                href="https://github.com/etozheerassyl/react"
                target="_blank"
                rel="noreferrer"
                className="detail-val-link"
              >
                github.com/etozheerassyl/react
              </a>
            </div>
          </div>

          <div className="dev-skills-wrap">
            <span className="skill-pill">React Router</span>
            <span className="skill-pill">Nested Outlets</span>
            <span className="skill-pill">useSearchParams</span>
            <span className="skill-pill">useParams</span>
            <span className="skill-pill">React.lazy</span>
            <span className="skill-pill">Suspense</span>
            <span className="skill-pill">Race-Condition Defense</span>
            <span className="skill-pill">Decoupled Services</span>
          </div>

          <div className="profile-quick-actions">
            <Link to="/items" className="btn btn-primary btn-block">
              <ListIcon />
              <span>Browse Asset Registry</span>
            </Link>
            <Link to="/dashboard" className="btn btn-outline btn-block">
              <DashboardIcon />
              <span>View Analytics Dashboard</span>
            </Link>
          </div>
        </section>

        {/* Right Column: Architectural Highlights */}
        <section className="about-column-card arch-breakdown-card">
          <div className="card-section-title">
            <TerminalIcon className="section-icon" />
            <h3>Routing &amp; Architecture Implementation</h3>
          </div>

          <div className="arch-features-list">
            <div className="arch-feature-item">
              <div className="feature-marker">01</div>
              <div className="feature-text">
                <h4>Nested Layout Architecture</h4>
                <p>
                  <code>RootLayout</code> serves as the parent route wrapper, housing the responsive <code>NavBar</code>,
                  sub-system status banner, and global footer. The <code>&lt;Outlet /&gt;</code> component dynamically renders
                  child views (Home, Registry, Details, Dashboard, Login, 404) without re-mounting shared layout elements.
                </p>
              </div>
            </div>

            <div className="arch-feature-item">
              <div className="feature-marker">02</div>
              <div className="feature-text">
                <h4>URL State Synchronization (<code>useSearchParams</code>)</h4>
                <p>
                  Search filters (query, category, status, priority, sorting, pagination) are synchronized
                  bidirectionally with the URL search parameters. Refreshing the browser or sharing a deep URL preserves
                  exact filter state without manual persistence boilerplate.
                </p>
              </div>
            </div>

            <div className="arch-feature-item">
              <div className="feature-marker">03</div>
              <div className="feature-text">
                <h4>Dynamic Parameterized Routing (<code>useParams</code>)</h4>
                <p>
                  Individual asset telemetry specifications are loaded through dynamic route <code>/items/:id</code>.
                  Invalid IDs or non-existent records trigger friendly recovery interfaces with direct navigation back to the registry.
                </p>
              </div>
            </div>

            <div className="arch-feature-item">
              <div className="feature-marker">04</div>
              <div className="feature-text">
                <h4>Route Code-Splitting with <code>React.lazy</code> &amp; <code>Suspense</code></h4>
                <p>
                  All page components are split into distinct lazy chunks. Heavy dashboard calculations and deep detail views
                  load asynchronously on demand, reducing initial payload and presenting an animated cyber radar fallback indicator.
                </p>
              </div>
            </div>

            <div className="arch-feature-item">
              <div className="feature-marker">05</div>
              <div className="feature-text">
                <h4>Decoupled Data Services (<code>services/service.js</code>)</h4>
                <p>
                  UI components never access raw storage or simulated network primitives directly. All API queries,
                  mutations, latency delays, and error simulations are cleanly encapsulated within <code>src/services/service.js</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Route Map */}
          <div className="route-map-box">
            <h4 className="map-title">APPLICATION ROUTE SITEMAP</h4>
            <div className="sitemap-grid">
              <div className="sitemap-node">
                <span className="route-path">/</span>
                <span className="route-name">Home Overview</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/items</span>
                <span className="route-name">Assets Registry</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/items/:id</span>
                <span className="route-name">Telemetry Detail</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/dashboard</span>
                <span className="route-name">Operations Dashboard</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/about</span>
                <span className="route-name">Architecture &amp; Bio</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/login</span>
                <span className="route-name">Operator Auth</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">*</span>
                <span className="route-name">404 Recovery</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default AboutPage;

