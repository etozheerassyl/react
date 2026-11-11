import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  ShieldIcon,
  HomeIcon,
  ListIcon,
  DashboardIcon,
  InfoIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
  UserPlusIcon,
  TerminalIcon,
  SpinnerIcon,
} from "./Icons";
import { useAuth } from "../context/AuthContext";

export function NavBar({ onOpenDefenseLab }) {
  const { user, isAuthenticated, authLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
      navigate("/login");
    } catch {
      // AuthContext records any sign-out error
    }
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <header className="aegis-navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & System Status */}
        <div className="navbar-brand-section">
          <Link to="/" className="navbar-brand-logo">
            <div className="brand-icon-wrapper">
              <ShieldIcon className="brand-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-title">AEGIS<span className="brand-accent">CORE</span></span>
              <span className="brand-subtitle">Cached Telemetry &amp; Auth</span>
            </div>
          </Link>
          <div className="system-live-badge">
            <span className="live-dot pulse"></span>
            <span className="live-text">QUERY CACHE + AUTH</span>
          </div>
        </div>

        {/* Desktop & Mobile Navigation Links */}
        <nav className={`navbar-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <NavLink to="/" end className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            <HomeIcon className="nav-icon" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/items" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            <ListIcon className="nav-icon" />
            <span>Registry</span>
          </NavLink>

          <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            <DashboardIcon className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/about" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            <InfoIcon className="nav-icon" />
            <span>About</span>
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/profile" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
              <UserIcon className="nav-icon" />
              <span>Profile</span>
            </NavLink>
          )}

          {/* Mobile Auth Section */}
          <div className="navbar-mobile-auth">
            {authLoading ? (
              <div className="auth-checking-pill">
                <SpinnerIcon className="spin" />
                <span>Checking session...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="user-profile-mobile">
                <Link to="/profile" className="user-name" onClick={() => setMobileMenuOpen(false)}>
                  {user?.email || user?.displayName}
                </Link>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                  <LogOutIcon className="nav-icon" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="mobile-auth-links-row">
                <NavLink to="/login" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                  <LogInIcon className="nav-icon" />
                  <span>Login</span>
                </NavLink>
                <NavLink to="/signup" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                  <UserPlusIcon className="nav-icon" />
                  <span>Signup</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Network & Cache Lab + Auth State Controls */}
        <div className="navbar-actions">
          {onOpenDefenseLab && (
            <button
              type="button"
              className="btn btn-sm btn-defense-lab"
              onClick={onOpenDefenseLab}
              title="Open simulated network, cache & race condition inspector"
            >
              <TerminalIcon className="btn-icon" />
              <span className="lab-btn-text">Cache &amp; Net Lab</span>
            </button>
          )}

          {authLoading ? (
            <div className="auth-checking-pill desktop-only-pill">
              <SpinnerIcon className="spin" />
              <span>Session...</span>
            </div>
          ) : isAuthenticated ? (
            <div className="user-badge-container">
              <Link to="/profile" className="user-profile-link" title="View protected Profile page">
                <div className="user-avatar">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "Profile"} className="user-avatar-img" />
                  ) : (
                    <UserIcon />
                  )}
                </div>
                <div className="user-meta">
                  <span className="user-handle">{user?.displayName || user?.email}</span>
                  <span className="user-clearance">Profile</span>
                </div>
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger btn-nav-logout"
                onClick={handleLogout}
                title="Sign out of Firebase session"
              >
                <LogOutIcon />
                <span className="logout-btn-text">Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-nav-buttons">
              <NavLink
                to="/login"
                className={({ isActive }) => `btn btn-sm btn-secondary ${isActive ? "active" : ""}`}
              >
                <LogInIcon className="btn-icon" />
                <span>Login</span>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) => `btn btn-sm btn-primary-login ${isActive ? "active" : ""}`}
              >
                <UserPlusIcon className="btn-icon" />
                <span>Signup</span>
              </NavLink>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className={`bar ${mobileMenuOpen ? "bar-1-open" : ""}`}></span>
            <span className={`bar ${mobileMenuOpen ? "bar-2-open" : ""}`}></span>
            <span className={`bar ${mobileMenuOpen ? "bar-3-open" : ""}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}

