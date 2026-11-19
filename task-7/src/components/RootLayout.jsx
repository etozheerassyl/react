import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { DefenseLabModal } from "./DefenseLabModal";
import {
  UpdateNotificationBanner,
  OfflineConnectivityBar,
} from "./PwaBanners";
import { useNetworkLab } from "../hooks/useNetworkLab";
import { usePwa } from "../pwa/PwaContext";
import {
  ShieldIcon,
  TerminalIcon,
  ActivityIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  DatabaseIcon,
  WifiIcon,
  WifiOffIcon,
  RefreshIcon,
} from "./Icons";

export function RootLayout() {
  const location = useLocation();
  const [isDefenseLabOpen, setIsDefenseLabOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    isOnline,
    swState,
    swVersion,
    simulateUpdateBanner,
    checkForUpdate,
  } = usePwa();

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

  const handleCheckUpdate = async () => {
    const found = await checkForUpdate();
    if (found) {
      showToast("success", "A waiting Service Worker update was detected! Use the banner above to activate it.");
    } else {
      showToast("success", `Service Worker is up to date${swVersion ? ` (v${swVersion})` : ""}.`);
    }
  };

  // Human-readable breadcrumbs based on pathname
  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="aegis-app-wrapper">
      <NavBar onOpenDefenseLab={() => setIsDefenseLabOpen(true)} />
      <UpdateNotificationBanner />
      <OfflineConnectivityBar />

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
            <Link to="/offline" className={`meta-pill ${isOnline ? "meta-pill-online" : "meta-pill-offline"}`}>
              {isOnline ? <WifiIcon className="meta-pill-icon" /> : <WifiOffIcon className="meta-pill-icon" />}
              <span>
                SW: {swState === "active" ? `Active${swVersion ? ` (${swVersion})` : ""}` : swState}
              </span>
            </Link>
            <span className="meta-pill">
              <DatabaseIcon className="meta-pill-icon" />
              <span>Cache Entries: {cacheEntries.length} ({cachePolicy.staleTimeMs / 1000}s)</span>
            </span>
            <span className="meta-pill meta-pill-latency">
              <ActivityIcon className="meta-pill-icon" />
              <span>Latency: {apiConfig.minDelay}-{apiConfig.maxDelay}ms</span>
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
              Installable, offline-capable telemetry and asset intelligence PWA built with React 19, React Router, TanStack Query, Firebase Authentication, and a hand-written Service Worker.
            </p>
            <div className="footer-chips">
              <span className="chip">Installable PWA</span>
              <span className="chip">Service Worker</span>
              <span className="chip">Offline Ready</span>
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
              <li><Link to="/offline">Offline &amp; SW Status (/offline)</Link></li>
              <li><Link to="/about">Architecture &amp; Developer</Link></li>
              <li><Link to="/profile">Operator Profile (Protected)</Link></li>
              <li><Link to="/login">Sign In (/login)</Link></li>
              <li><Link to="/signup">Create Account (/signup)</Link></li>
            </ul>
          </div>

          <div className="footer-system-column">
            <h4 className="footer-heading">PWA, CACHE &amp; SYSTEM CONTROLS</h4>
            <p className="footer-system-text">
              Versioned precache stores the app shell &amp; <code>/offline</code> page; runtime caches apply Cache-First for static assets and Network-First for public API data with entry &amp; TTL limits.
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
                className="btn btn-sm btn-secondary"
                onClick={handleCheckUpdate}
              >
                <RefreshIcon />
                <span>Check SW Update</span>
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={simulateUpdateBanner}
                title="Preview the new application version update notification banner"
              >
                <span>Simulate SW Update</span>
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
            <span>© 2026 Aegis Core Telemetry PWA — Developed by Yerassyl</span>
            <span>Coursework: Installable Progressive Web App &amp; Mobile Adaptation</span>
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
