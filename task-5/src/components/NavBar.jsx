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
  TerminalIcon,
} from "./Icons";
import { useAuth } from "../hooks/useAuth";

export function NavBar({ onOpenDefenseLab }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
              <span className="brand-subtitle">Telemetry Intelligence</span>
            </div>
          </Link>
          <div className="system-live-badge">
            <span className="live-dot pulse"></span>
            <span className="live-text">TELEMETRY ONLINE</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
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

          <div className="navbar-mobile-auth">
            {isAuthenticated ? (
              <div className="user-profile-mobile">
                <span className="user-name">{user?.username}</span>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/login" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                <LogInIcon className="nav-icon" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </nav>

        {/* Right Section: Defense Lab & Auth Profile */}
        <div className="navbar-actions">
          {onOpenDefenseLab && (
            <button
              type="button"
              className="btn btn-sm btn-defense-lab"
              onClick={onOpenDefenseLab}
              title="Open simulated network & effects inspector"
            >
              <TerminalIcon className="btn-icon" />
              <span className="lab-btn-text">Network Lab</span>
            </button>
          )}

          {isAuthenticated ? (
            <div className="user-badge-container">
              <div className="user-avatar">
                <UserIcon />
              </div>
              <div className="user-meta">
                <span className="user-handle">{user?.username}</span>
                <span className="user-clearance">{user?.clearance || "Class 5"}</span>
              </div>
              <button
                type="button"
                className="btn-icon-logout"
                onClick={handleLogout}
                title="Sign out of Aegis Terminal"
              >
                <LogOutIcon />
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `btn btn-sm btn-primary-login ${isActive ? "active" : ""}`}>
              <LogInIcon className="btn-icon" />
              <span>Operator Login</span>
            </NavLink>
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

