import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePwa } from "../pwa/PwaContext";
import {
  WifiIcon,
  WifiOffIcon,
  RefreshIcon,
  SpinnerIcon,
  DatabaseIcon,
  ShieldIcon,
  ListIcon,
  DashboardIcon,
  HomeIcon,
  InfoIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ZapIcon,
  DownloadIcon,
} from "../components/Icons";

export function OfflinePage() {
  const navigate = useNavigate();
  const {
    isOnline,
    isCheckingConnection,
    lastCheckedAt,
    checkConnection,
    swState,
    swStatus,
    swVersion,
    swCaches,
    refreshSwStatus,
    canInstall,
    isInstalled,
    promptInstall,
  } = usePwa();

  const [probeMessage, setProbeMessage] = useState(null);

  useEffect(() => {
    refreshSwStatus();
  }, [refreshSwStatus]);

  const handleRetryConnection = async () => {
    setProbeMessage(null);
    const connected = await checkConnection();
    await refreshSwStatus();
    if (connected) {
      setProbeMessage(
        "Connection verified via live network probe. Normal functionality and fresh API sync have been restored."
      );
    } else {
      setProbeMessage(
        `No reachable internet connection detected at ${new Date().toLocaleTimeString()}. Cached pages and public API snapshots remain available below.`
      );
    }
  };

  const formattedCheckedAt = lastCheckedAt
    ? new Date(lastCheckedAt).toLocaleTimeString()
    : "Not probed yet";

  return (
    <div className="offline-page-container">
      {/* Main Hero / Status Card */}
      <section className={`offline-status-hero ${isOnline ? "status-online" : "status-offline"}`}>
        <div className="offline-hero-icon-wrap" aria-hidden="true">
          {isOnline ? (
            <WifiIcon className="offline-hero-icon" />
          ) : (
            <WifiOffIcon className="offline-hero-icon" />
          )}
        </div>

        <div className={`offline-state-pill ${isOnline ? "online" : "offline"}`} role="status" aria-live="polite">
          <span className="status-dot-pulse"></span>
          <span>
            {isOnline
              ? "ONLINE — CONNECTION RESTORED"
              : "OFFLINE — DISCONNECTED"}
          </span>
        </div>

        <h1 className="offline-hero-title">
          {isOnline
            ? "Network Connection Active"
            : "You Are Currently Offline"}
        </h1>

        <p className="offline-hero-desc">
          {isOnline
            ? "Your device has an active connection to the Aegis Core host. Service Worker precache and runtime caches stay active to accelerate page loads and safeguard offline access."
            : "Aegis Core cannot reach the network right now. Because the application shell and previously fetched public telemetry records are cached locally, you can continue browsing visited pages and cached API data without losing work."}
        </p>

        {probeMessage && (
          <div className={`offline-probe-alert ${isOnline ? "probe-ok" : "probe-fail"}`}>
            {isOnline ? <CheckCircleIcon /> : <WifiOffIcon />}
            <span>{probeMessage}</span>
          </div>
        )}

        <div className="offline-hero-actions">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleRetryConnection}
            disabled={isCheckingConnection}
          >
            {isCheckingConnection ? (
              <SpinnerIcon className="spin" />
            ) : (
              <RefreshIcon />
            )}
            <span>
              {isCheckingConnection ? "Probing Network..." : "Retry Connection"}
            </span>
          </button>

          {isOnline && (
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => navigate(-1)}
            >
              <span>Return to Previous Page</span>
            </button>
          )}

          <Link to="/items" className="btn btn-outline btn-lg">
            <ListIcon />
            <span>Open Cached Registry</span>
          </Link>

          {canInstall && !isInstalled && (
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={promptInstall}
            >
              <DownloadIcon />
              <span>Install PWA</span>
            </button>
          )}
        </div>

        <div className="offline-probe-meta">
          <span>Last network probe: <strong>{formattedCheckedAt}</strong></span>
          <span>•</span>
          <span>SW Lifecycle: <strong>{swState.toUpperCase()}</strong></span>
          {swVersion && (
            <>
              <span>•</span>
              <span>Build: <code>{swVersion}</code></span>
            </>
          )}
        </div>
      </section>

      {/* Offline-Accessible Cached Pages */}
      <section className="offline-routes-section">
        <div className="section-header-compact">
          <div>
            <h2 className="section-title">Offline-Ready Application Routes</h2>
            <p className="section-subtitle">
              The precached application shell lets you navigate directly to previously visited views and cached public API endpoints.
            </p>
          </div>
        </div>

        <div className="offline-routes-grid">
          <Link to="/" className="offline-route-card">
            <div className="offline-route-top">
              <HomeIcon className="offline-route-icon" />
              <span className="route-pill">/</span>
            </div>
            <h3>Home Overview</h3>
            <p>Precached app shell &amp; cached fleet summary metrics.</p>
            <span className="offline-route-cta">
              Open Home <ArrowRightIcon />
            </span>
          </Link>

          <Link to="/items" className="offline-route-card">
            <div className="offline-route-top">
              <ListIcon className="offline-route-icon" />
              <span className="route-pill">/items</span>
            </div>
            <h3>Assets Registry</h3>
            <p>Browse cached public API list items &amp; filter offline.</p>
            <span className="offline-route-cta">
              Open Registry <ArrowRightIcon />
            </span>
          </Link>

          <Link to="/dashboard" className="offline-route-card">
            <div className="offline-route-top">
              <DashboardIcon className="offline-route-icon" />
              <span className="route-pill">/dashboard</span>
            </div>
            <h3>Operations Dashboard</h3>
            <p>Inspect computed breakdowns from cached telemetry data.</p>
            <span className="offline-route-cta">
              Open Dashboard <ArrowRightIcon />
            </span>
          </Link>

          <Link to="/about" className="offline-route-card">
            <div className="offline-route-top">
              <InfoIcon className="offline-route-icon" />
              <span className="route-pill">/about</span>
            </div>
            <h3>Architecture Specs</h3>
            <p>View PWA, caching &amp; Firebase Auth documentation.</p>
            <span className="offline-route-cta">
              Open About <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </section>

      {/* Service Worker Cache Storage & Strategy Telemetry */}
      <section className="offline-telemetry-grid">
        <div className="offline-info-card">
          <div className="card-section-title">
            <DatabaseIcon className="section-icon" />
            <h3>Service Worker Cache Storage</h3>
          </div>

          <div className="sw-cache-list">
            {swCaches.length > 0 ? (
              swCaches.map((cache) => (
                <div key={cache.name} className="sw-cache-item">
                  <div>
                    <code className="sw-cache-name">{cache.name}</code>
                    <span className="sw-cache-desc">
                      {cache.name.includes("precache")
                        ? "Versioned App Shell (JS/CSS/HTML/Icons/Offline)"
                        : cache.name.includes("api")
                        ? "Public API Runtime Cache (Network-First)"
                        : cache.name.includes("static")
                        ? "Static Media & Fonts Cache (Cache-First)"
                        : "Document Navigation Cache"}
                    </span>
                  </div>
                  <span className="sw-cache-count">{cache.entries} entries</span>
                </div>
              ))
            ) : (
              <p className="sw-empty-note">
                {swState === "unsupported"
                  ? "Service Workers are not supported in this browser context."
                  : "Service Worker cache inventory will appear once active (built preview / production deploy)."}
              </p>
            )}
          </div>

          <div className="sw-status-actions">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={refreshSwStatus}
            >
              <RefreshIcon />
              <span>Refresh Cache Inventory</span>
            </button>
            {swStatus?.precacheSize ? (
              <span className="sw-precache-badge">
                Precached Shell Files: <strong>{swStatus.precacheSize}</strong>
              </span>
            ) : null}
          </div>
        </div>

        <div className="offline-info-card">
          <div className="card-section-title">
            <ShieldIcon className="section-icon" />
            <h3>Caching Policies &amp; Security</h3>
          </div>

          <ul className="pwa-policy-list">
            <li>
              <ZapIcon className="policy-icon" />
              <div>
                <strong>Cache-First (Static Assets)</strong>
                <p>
                  Images, icons, and font binaries use cache-first lookup with a{" "}
                  <code>30d</code> TTL and <code>80</code>-entry limit.
                </p>
              </div>
            </li>
            <li>
              <DatabaseIcon className="policy-icon" />
              <div>
                <strong>Network-First (Public API Data)</strong>
                <p>
                  <code>api/assets.json</code> and <code>api/assets/:id.json</code>{" "}
                  prefer live network (4s timeout), falling back to{" "}
                  <code>aegis-core-api-v1</code> (max <code>60</code> entries,{" "}
                  <code>7d</code> TTL).
                </p>
              </div>
            </li>
            <li>
              <ShieldIcon className="policy-icon" />
              <div>
                <strong>Auth &amp; Private Data Excluded</strong>
                <p>
                  Firebase Auth endpoints, OAuth tokens, <code>Authorization</code>{" "}
                  headers, and <code>no-store</code> responses are strictly bypassed
                  and never written to shared runtime caches.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default OfflinePage;
