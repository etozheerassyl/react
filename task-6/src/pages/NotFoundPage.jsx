import { Link, useLocation } from "react-router-dom";
import {
  ShieldIcon,
  HomeIcon,
  ListIcon,
  ArrowRightIcon,
  TerminalIcon,
  AlertCircleIcon,
} from "../components/Icons";

export function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="not-found-page-container">
      <div className="not-found-card">
        <div className="not-found-glitch-badge">
          <span className="glitch-text">404</span>
          <div className="glitch-radar">
            <AlertCircleIcon className="radar-warning-icon" />
          </div>
        </div>

        <h1 className="not-found-title">Sector Not Found: Route Unmapped</h1>

        <div className="invalid-path-banner">
          <TerminalIcon className="banner-term-icon" />
          <span>Unresolved Route Path: <code>{location.pathname}</code></span>
        </div>

        <p className="not-found-description">
          The requested coordinate or navigational endpoint does not exist within the Aegis Core routing manifest.
          Please verify the URL or return to a verified sector below.
        </p>

        <div className="not-found-actions-row">
          <Link to="/" className="btn btn-primary btn-lg">
            <HomeIcon />
            <span>Return to Home Sector</span>
          </Link>

          <Link to="/items" className="btn btn-secondary btn-lg">
            <ListIcon />
            <span>Browse Assets Registry</span>
          </Link>

          <Link to="/dashboard" className="btn btn-outline btn-lg">
            <span>Operations Dashboard</span>
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="not-found-hint">
          <ShieldIcon className="hint-shield-icon" />
          <span>Aegis Quantum Routing Engine — React Router v7 Catch-All (<code>*</code>) Route Handler</span>
        </div>
      </div>
    </div>
  );
}
export default NotFoundPage;

