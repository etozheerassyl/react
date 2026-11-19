import { Link } from "react-router-dom";
import { usePwa } from "../pwa/PwaContext";
import {
  DatabaseIcon,
  RefreshIcon,
  SpinnerIcon,
  WifiOffIcon,
  ZapIcon,
  ArrowRightIcon,
} from "./Icons";

export function UpdateNotificationBanner() {
  const {
    updateAvailable,
    isApplyingUpdate,
    applyUpdate,
    dismissUpdate,
  } = usePwa();

  if (!updateAvailable) return null;

  return (
    <div className="pwa-banner pwa-banner-update" role="status" aria-live="polite">
      <div className="pwa-banner-inner">
        <div className="pwa-banner-content">
          <ZapIcon className="pwa-banner-icon" />
          <div className="pwa-banner-text">
            <strong>New Application Version Available</strong>
            <span>
              A new version of Aegis Core is ready. Activate it now to load the latest
              application shell without clearing browser storage.
            </span>
          </div>
        </div>

        <div className="pwa-banner-actions">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={applyUpdate}
            disabled={isApplyingUpdate}
          >
            {isApplyingUpdate ? (
              <SpinnerIcon className="spin" />
            ) : (
              <RefreshIcon />
            )}
            <span>{isApplyingUpdate ? "Activating..." : "Activate & Reload"}</span>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={dismissUpdate}
            disabled={isApplyingUpdate}
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}

export function OfflineConnectivityBar() {
  const { isOnline, isCheckingConnection, checkConnection } = usePwa();

  if (isOnline) return null;

  return (
    <div className="pwa-banner pwa-banner-offline" role="status" aria-live="polite">
      <div className="pwa-banner-inner">
        <div className="pwa-banner-content">
          <WifiOffIcon className="pwa-banner-icon" />
          <div className="pwa-banner-text">
            <strong>Offline Mode Active</strong>
            <span>
              Serving precached application shell and previously cached public API data.
            </span>
          </div>
        </div>

        <div className="pwa-banner-actions">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={checkConnection}
            disabled={isCheckingConnection}
          >
            {isCheckingConnection ? (
              <SpinnerIcon className="spin" />
            ) : (
              <RefreshIcon />
            )}
            <span>{isCheckingConnection ? "Checking..." : "Retry Connection"}</span>
          </button>
          <Link to="/offline" className="btn btn-sm btn-outline">
            <span>Offline Center</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CachedDataBanner({
  dataSource,
  cachedAt,
  dataUpdatedAt,
  onRetry,
  isFetching = false,
}) {
  const { isOnline } = usePwa();

  if (dataSource !== "cache" && isOnline) return null;

  const ts = cachedAt || dataUpdatedAt;
  const formattedTime = ts ? new Date(ts).toLocaleTimeString() : null;

  return (
    <div className="cached-data-banner" role="status" aria-live="polite">
      <div className="cached-data-info">
        <DatabaseIcon className="cached-data-icon" />
        <div>
          <strong>Viewing Cached Data</strong>
          <p>
            {dataSource === "cache"
              ? "This telemetry response was served from the Service Worker runtime cache (aegis-core-api-v1)."
              : "Network offline — displaying previously cached telemetry data from memory/cache."}
            {formattedTime ? ` Snapshot timestamp: ${formattedTime}.` : ""}
          </p>
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={onRetry}
          disabled={isFetching}
        >
          <RefreshIcon className={isFetching ? "spin" : ""} />
          <span>{isFetching ? "Syncing..." : "Try Live Fetch"}</span>
        </button>
      )}
    </div>
  );
}

export function OfflineResourceFallback({
  resourceName = "telemetry data",
  onRetry,
  isFetching = false,
}) {
  const { isCheckingConnection, checkConnection } = usePwa();

  const handleRetry = async () => {
    const ok = await checkConnection();
    if (ok && onRetry) {
      onRetry();
    } else if (onRetry) {
      onRetry();
    }
  };

  return (
    <div className="items-state-alert alert-offline">
      <WifiOffIcon className="alert-large-icon offline-icon-accent" />
      <div className="alert-content">
        <h3>Offline — Resource Not Cached Yet</h3>
        <p>
          Unable to load {resourceName} because you are currently offline and this
          specific endpoint has not been cached in <code>aegis-core-api-v1</code> yet.
          Reconnect or visit previously opened views.
        </p>
        <div className="offline-fallback-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRetry}
            disabled={isCheckingConnection || isFetching}
          >
            <RefreshIcon className={isCheckingConnection || isFetching ? "spin" : ""} />
            <span>{isCheckingConnection ? "Checking Connection..." : "Retry Connection"}</span>
          </button>
          <Link to="/offline" className="btn btn-outline">
            <span>Go to /offline Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
