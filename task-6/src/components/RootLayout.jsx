import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { DefenseLabModal } from "./DefenseLabModal";
import { useNetworkLab } from "../hooks/useNetworkLab";
import {
  ShieldIcon,
  TerminalIcon,
  ActivityIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  DatabaseIcon,
} from "./Icons";

export function RootLayout() {
  const location = useLocation();
  const [isDefenseLabOpen, setIsDefenseLabOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    apiLogs,
    apiConfig,
    cacheEntries,
    cachePolicy,
    updateApiConfig,
    resetDatabase,
    invalidateCache,
  } = useNetworkLab();

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleResetDb = async () => {
    try {
      await resetDatabase();
      showToast("success", "Database reset and all TanStack Query caches invalidated.");
    } catch {
      showToast("error", "Failed to reset database.");
    }
  };

  const handleInvalidateCache = async () => {
    await invalidateCache();
    showToast("success", "All cached asset queries invalidated and queued for revalidation.");
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
              <DatabaseIcon className="meta-pill-icon" />
              <span>Cache Entries: {cacheEntries.length} (staleTime: {cachePolicy.staleTimeMs / 1000}s)</span>
            </span>
            <span className="meta-pill">
              <ActivityIcon className="meta-pill-icon" />
              <span>Latency: {apiConfig.minDelay}-{apiConfig.maxDelay}ms</span>
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
              Telemetry and asset intelligence architecture built with React Router, TanStack Query server-data caching, environment variables, and Firebase Authentication.
            </p>
            <div className="footer-chips">
              <span className="chip">React 19</span>
              <span className="chip">React Router v7</span>
              <span className="chip">TanStack Query</span>
              <span className="chip">Firebase Auth</span>
            </div>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-heading">NAVIGATION ROUTES</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/items">Assets Registry</Link></li>
              <li><Link to="/dashboard">Operations Dashboard</Link></li>
              <li><Link to="/about">Architecture &amp; Developer</Link></li>
              <li><Link to="/profile">Operator Profile (Protected)</Link></li>
              <li><Link to="/login">Sign In (/login)</Link></li>
              <li><Link to="/signup">Create Account (/signup)</Link></li>
            </ul>
          </div>

          <div className="footer-system-column">
            <h4 className="footer-heading">CACHE &amp; SYSTEM CONTROLS</h4>
            <p className="footer-system-text">
              Server queries are cached by deterministic query keys with a 30s stale window, 5m garbage-collection expiration, automatic AbortSignal cancellation, and mutation-driven invalidation.
            </p>
            <div className="footer-btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsDefenseLabOpen(true)}
              >
                <TerminalIcon />
                <span>Open Cache &amp; Net Lab</span>
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
            <span>Coursework: Server Data, Caching &amp; Firebase Authentication</span>
          </div>
        </div>
      </footer>

      {/* Defense, Cache & Network Simulation Modal */}
      <DefenseLabModal
        isOpen={isDefenseLabOpen}
        onClose={() => setIsDefenseLabOpen(false)}
        apiLogs={apiLogs}
        apiConfig={apiConfig}
        cacheEntries={cacheEntries}
        cachePolicy={cachePolicy}
        onUpdateApiConfig={updateApiConfig}
        onResetDatabase={handleResetDb}
        onInvalidateCache={handleInvalidateCache}
      />
    </div>
  );
}

