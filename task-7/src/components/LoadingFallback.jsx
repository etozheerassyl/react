import { SpinnerIcon, ShieldIcon } from "./Icons";

export function LoadingFallback({ message = "Loading secure subsystem module..." }) {
  return (
    <div className="lazy-fallback-container">
      <div className="lazy-spinner-box">
        <div className="radar-ping-ring"></div>
        <ShieldIcon className="fallback-shield-icon" />
      </div>
      <div className="lazy-fallback-text">
        <div className="lazy-title-row">
          <SpinnerIcon className="spin" />
          <span>INITIALIZING ROUTE</span>
        </div>
        <p className="lazy-subtext">{message}</p>
      </div>
    </div>
  );
}

