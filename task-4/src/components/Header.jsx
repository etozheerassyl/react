import { RefreshIcon, PlusIcon, TerminalIcon, SpinnerIcon, ShieldIcon } from "./Icons";

export function Header({
  isListLoading,
  onReload,
  onOpenCreate,
  onOpenDefenseLab,
  totalItems,
}) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-logo-icon">
          <ShieldIcon className="icon-shield" />
        </div>
        <div>
          <div className="brand-badge-row">
            <span className="brand-title">AEGIS // OPERATIONAL REGISTRY</span>
            <span className="status-indicator">
              <span className="pulse-dot"></span>
              LIVE API
            </span>
          </div>
          <p className="brand-subtitle">
            Simulated Asynchronous React Engine • Async Effects, Race Condition & Stale Closure Defense
          </p>
        </div>
      </div>

      <div className="header-actions">
        <div className="telemetry-badge">
          <span className="telemetry-label">ASSETS:</span>
          <span className="telemetry-value">{totalItems}</span>
        </div>

        <button
          type="button"
          className="btn btn-secondary reload-btn"
          onClick={onReload}
          disabled={isListLoading}
          title="Reload items list via useEffect"
        >
          {isListLoading ? (
            <SpinnerIcon className="btn-icon spin" />
          ) : (
            <RefreshIcon className="btn-icon" />
          )}
          <span>{isListLoading ? "Fetching..." : "Reload List"}</span>
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onOpenCreate}
        >
          <PlusIcon className="btn-icon" />
          <span>New Asset</span>
        </button>

        <button
          type="button"
          className="btn btn-defense"
          onClick={onOpenDefenseLab}
          title="Open Concepts & Async Defense Inspector"
        >
          <TerminalIcon className="btn-icon" />
          <span>Defense Lab</span>
        </button>
      </div>
    </header>
  );
}
