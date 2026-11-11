import { Link } from "react-router-dom";
import {
  TerminalIcon,
  UserIcon,
  ListIcon,
  DashboardIcon,
} from "../components/Icons";

export function AboutPage() {
  return (
    <div className="about-page-container">
      {/* Header */}
      <div className="page-header-box">
        <div className="badge-tag">SYSTEM SPECIFICATION &amp; ATTRIBUTION</div>
        <h1 className="page-title">About the Architecture &amp; Developer</h1>
        <p className="page-subtitle">
          In-depth technical review of TanStack Query server-data caching, invalidation, environment variables, and Firebase Authentication.
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
              Engineering reactive web applications with React 19, React Router v7, TanStack Query caching,
              and Firebase Authentication. Designed with clean separation between UI components, custom hooks,
              auth context, and service layers.
            </p>
          </div>

          <div className="dev-details-list">
            <div className="dev-detail-item">
              <span className="detail-label">Project:</span>
              <span className="detail-val">Task 6 — Server Data, Caching &amp; Firebase Auth</span>
            </div>
            <div className="dev-detail-item">
              <span className="detail-label">Course:</span>
              <span className="detail-val">React Advanced Engineering</span>
            </div>
            <div className="dev-detail-item">
              <span className="detail-label">Frameworks:</span>
              <span className="detail-val">React 19, Router v7, TanStack Query, Firebase</span>
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
            <span className="skill-pill">TanStack Query</span>
            <span className="skill-pill">Cache Invalidation</span>
            <span className="skill-pill">Firebase Auth</span>
            <span className="skill-pill">Google Sign-In</span>
            <span className="skill-pill">ProtectedRoute</span>
            <span className="skill-pill">VITE_ Env Vars</span>
            <span className="skill-pill">AbortSignal</span>
            <span className="skill-pill">Custom Hooks</span>
          </div>

          <div className="profile-quick-actions">
            <Link to="/items" className="btn btn-primary btn-block">
              <ListIcon />
              <span>Browse Cached Registry</span>
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
            <h3>Caching, Authentication &amp; Architecture</h3>
          </div>

          <div className="arch-features-list">
            <div className="arch-feature-item">
              <div className="feature-marker">01</div>
              <div className="feature-text">
                <h4>TanStack Query Keys &amp; Expiration</h4>
                <p>
                  All asset queries use deterministic hierarchical keys (<code>["assets", "list", filters]</code>,{" "}
                  <code>["assets", "detail", id]</code>, <code>["assets", "dashboard", category]</code>) with a{" "}
                  <strong>30s staleTime</strong> fresh window and <strong>5m gcTime</strong> cache expiration.
                </p>
              </div>
            </div>

            <div className="arch-feature-item">
              <div className="feature-marker">02</div>
              <div className="feature-text">
                <h4>Mutation-Driven Cache Invalidation</h4>
                <p>
                  Creating, updating, or deleting assets via <code>useCreateAssetMutation</code>,{" "}
                  <code>useUpdateAssetMutation</code>, and <code>useDeleteAssetMutation</code> updates or removes
                  affected detail entries and invalidates list &amp; dashboard caches immediately.
                </p>
              </div>
            </div>

            <div className="arch-feature-item">
              <div className="feature-marker">03</div>
              <div className="feature-text">
                <h4>Outdated Request &amp; Race Condition Defense</h4>
                <p>
                  Every query forwards TanStack Query&apos;s <code>AbortSignal</code> into{" "}
                  <code>services/service.js</code>, cancelling superseded requests when URL params or detail IDs
                  change rapidly so late responses never overwrite newer results.
                </p>
              </div>
            </div>

            <div className="arch-feature-item">
              <div className="feature-marker">04</div>
              <div className="feature-text">
                <h4>Firebase Authentication &amp; Protected Routes</h4>
                <p>
                  <code>src/firebase.js</code> initializes Firebase from <code>VITE_FIREBASE_*</code> env variables
                  with <code>browserLocalPersistence</code>. <code>AuthContext</code> tracks sessions via{" "}
                  <code>onAuthStateChanged</code>, supporting Email/Password, Google Sign-In, <code>/signup</code>{" "}
                  validation, and <code>&lt;ProtectedRoute&gt;</code> guarding <code>/profile</code>.
                </p>
              </div>
            </div>

            <div className="arch-feature-item">
              <div className="feature-marker">05</div>
              <div className="feature-text">
                <h4>Strict Layer Separation</h4>
                <p>
                  UI pages and components never access <code>localStorage</code> or call API primitives directly—all
                  data access, caching, and auth logic are encapsulated inside <code>services/</code>,{" "}
                  <code>context/</code>, and <code>hooks/</code>.
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
                <span className="route-name">Cached Registry</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/items/:id</span>
                <span className="route-name">Asset Detail</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/dashboard</span>
                <span className="route-name">Analytics</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/login</span>
                <span className="route-name">Sign In + Google</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/signup</span>
                <span className="route-name">Registration</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/profile</span>
                <span className="route-name">Protected Profile</span>
              </div>
              <div className="sitemap-node">
                <span className="route-path">/about</span>
                <span className="route-name">Architecture</span>
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

