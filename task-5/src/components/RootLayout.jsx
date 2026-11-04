import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { DefenseLabModal } from "./DefenseLabModal";
import {
  subscribeToApiLogs,
  getApiConfig,
  setApiConfig,
  resetDatabase,
} from "../services/service";
import {
  ShieldIcon,
  TerminalIcon,
  ActivityIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "./Icons";

export function RootLayout() {
  const location = useLocation();
  const [isDefenseLabOpen, setIsDefenseLabOpen] = useState(false);
  const [apiLogs, setApiLogs] = useState([]);
  const [apiConfig, setApiConfigState] = useState(() => getApiConfig());
  const [toast, setToast] = useState(null);

  // Subscribe to live simulated API telemetry logs
  useEffect(() => {
    const unsubscribe = subscribeToApiLogs((logEvent) => {
      setApiLogs((prev) => [logEvent, ...prev.slice(0, 49)]);
    });
    return unsubscribe;
  }, []);

  const handleUpdateConfig = (newCfg) => {
    const updated = setApiConfig(newCfg);
    setApiConfigState(updated);
  };

  const handleResetDb = async () => {
    try {
      await resetDatabase();
      setToast({ type: "success", message: "Database reset to initial sample telemetry." });
      setTimeout(() => setToast(null), 4000);
    } catch {
      setToast({ type: "error", message: "Failed to reset database." });
      setTimeout(() => setToast(null), 4000);
    }
  };

  // Human-readable breadcrumbs based on pathname
  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="aegis-app-wrapper">
      <NavBar onOpenDefenseLab={() => setIsDefenseLabOpen(true)} />

      {/* Global Toast Notification */}
      {toast && (
        <div className={`global-toast-banner toast-${toast.type}`}>
          {toast.type === "success" ? <CheckCircleIcon /> : <AlertCircleIcon />}
          <span>{toast.message}</span>
          <button type="button" className="toast-dismiss" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* Breadcrumb & Subsystem Status Banner */}
      <div className="sub-header-bar">
        <div className="sub-header-container">
          <nav className="breadcrumbs-nav" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-item">CORE</Link>
            {pathParts.map((part, index) => {
              const url = `/${pathParts.slice(0, index + 1).join("/")}`;
              const isLast = index === pathParts.length - 1;
              const formattedName =
                part === "items" ? "REGISTRY" : part.toUpperCase();

              return (
                <span key={url} className="breadcrumb-segment">
                  <span className="breadcrumb-separator">/</span>
                  {isLast ? (
                    <span className="breadcrumb-current">{formattedName}</span>
                  ) : (
                    <Link to={url} className="breadcrumb-item">{formattedName}</Link>
                  )}
                </span>
              );
            })}
          </nav>

          <div className="sub-header-meta">
            <span className="meta-pill">
              <ActivityIcon className="meta-pill-icon" />
              <span>Simulated Latency: {apiConfig.minDelay}-{apiConfig.maxDelay}ms</span>
            </span>
            <span className="meta-pill meta-pill-latency">
              <span>Fail Rate: {Math.round(apiConfig.errorChance * 100)}%</span>
            </span>
          </div>
        </div>
      </div>

      {/* Nested Route Output */}
      <main className="main-content-area">
        <Outlet />
      </main>

      {/* Interactive Footer */}
      <footer className="aegis-footer">
        <div className="footer-container">
          <div className="footer-brand-column">
            <div className="footer-logo">
              <ShieldIcon className="footer-logo-icon" />
              <span>AEGIS CORE</span>
            </div>
            <p className="footer-desc">
              Next-generation telemetry and asset intelligence architecture built with React Router, nested routes, dynamic URLs, and lazy loading.
            </p>
            <div className="footer-chips">
              <span className="chip">React 19</span>
              <span className="chip">React Router v7</span>
              <span className="chip">Vite 6</span>
              <span className="chip">Suspense & Lazy</span>
            </div>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-heading">NAVIGATION ROUTES</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/items">Assets Registry</Link></li>
              <li><Link to="/dashboard">Operations Dashboard</Link></li>
              <li><Link to="/about">Architecture & Developer</Link></li>
              <li><Link to="/login">Terminal Authentication</Link></li>
              <li><Link to="/not-found-example">404 Error Simulation</Link></li>
            </ul>
          </div>

          <div className="footer-system-column">
            <h4 className="footer-heading">SYSTEM HEALTH & CONTROLS</h4>
            <p className="footer-system-text">
              All data synchronized via URL parameters with `useSearchParams`. Asynchronous queries protected against race conditions and stale closures.
            </p>
            <div className="footer-btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsDefenseLabOpen(true)}
              >
                <TerminalIcon />
                <span>Open Network Lab</span>
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={handleResetDb}
              >
                Reset Database
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-bottom-container">
            <span>© 2026 Aegis Core Telemetry Platform — Developed by Yerassyl</span>
            <span>Coursework: Routing & Application Architecture</span>
          </div>
        </div>
      </footer>

      {/* Defense & Network Simulation Modal */}
      <DefenseLabModal
        isOpen={isDefenseLabOpen}
        onClose={() => setIsDefenseLabOpen(false)}
        apiLogs={apiLogs}
        apiConfig={apiConfig}
        onUpdateApiConfig={handleUpdateConfig}
        onResetDatabase={handleResetDb}
      />
    </div>
  );
}

