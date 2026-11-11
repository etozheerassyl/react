import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldIcon,
  UserIcon,
  MailIcon,
  KeyIcon,
  LogOutIcon,
  CheckCircleIcon,
  CopyIcon,
  ListIcon,
  DashboardIcon,
  CalendarIcon,
  AlertCircleIcon,
} from "../components/Icons";
import { useAuth } from "../context/AuthContext";

export function ProfilePage() {
  const { user, logout, authActionLoading, authError } = useAuth();
  const navigate = useNavigate();
  const [copiedUid, setCopiedUid] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      // Error tracked in AuthContext
    }
  };

  const handleCopyUid = async () => {
    if (!user?.uid) return;
    try {
      await navigator.clipboard.writeText(user.uid);
      setCopiedUid(true);
      setTimeout(() => setCopiedUid(false), 2000);
    } catch {
      // Ignore clipboard failures in restricted contexts
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card-shell">
        <div className="profile-banner-header">
          <div className="profile-identity-block">
            <div className="profile-avatar-lg">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Operator Avatar"}
                  className="profile-avatar-img"
                />
              ) : (
                <UserIcon className="profile-avatar-icon" />
              )}
            </div>

            <div>
              <div className="auth-status-pill">
                <CheckCircleIcon />
                <span>PROTECTED ROUTE // AUTHENTICATED</span>
              </div>
              <h1 className="profile-heading">
                {user?.displayName || "Authenticated Operator"}
              </h1>
              <p className="profile-subheading">{user?.email}</p>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleLogout}
            disabled={authActionLoading}
          >
            <LogOutIcon />
            <span>{authActionLoading ? "Signing Out..." : "Logout"}</span>
          </button>
        </div>

        {authError && (
          <div className="login-alert alert-error" role="alert">
            <AlertCircleIcon />
            <span>{authError}</span>
          </div>
        )}

        <div className="profile-specs-grid">
          <div className="spec-card">
            <div className="spec-icon-wrap icon-status">
              <MailIcon />
            </div>
            <div className="spec-body">
              <span className="spec-label">Account Email</span>
              <span className="spec-value profile-mono-val">{user?.email}</span>
              <span className="spec-sub">
                {user?.emailVerified ? "Verified Identity" : "Email / Password Credential"}
              </span>
            </div>
          </div>

          <div className="spec-card">
            <div className="spec-icon-wrap icon-security">
              <KeyIcon />
            </div>
            <div className="spec-body">
              <span className="spec-label">Firebase UID</span>
              <div className="uid-copy-row">
                <code className="uid-code-pill">{user?.uid}</code>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={handleCopyUid}
                  title="Copy Firebase UID"
                >
                  <CopyIcon />
                  <span>{copiedUid ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <span className="spec-sub">Unique Firebase Authentication Identifier</span>
            </div>
          </div>

          <div className="spec-card">
            <div className="spec-icon-wrap icon-lead">
              <ShieldIcon />
            </div>
            <div className="spec-body">
              <span className="spec-label">Authentication Provider</span>
              <span className="spec-value">{user?.providerId || "password"}</span>
              <span className="spec-sub">Session persisted via onAuthStateChanged</span>
            </div>
          </div>

          <div className="spec-card">
            <div className="spec-icon-wrap icon-date">
              <CalendarIcon />
            </div>
            <div className="spec-body">
              <span className="spec-label">Last Sign-In</span>
              <span className="spec-value">
                {user?.lastSignInTime
                  ? new Date(user.lastSignInTime).toLocaleString()
                  : "Current Session"}
              </span>
              <span className="spec-sub">
                Created:{" "}
                {user?.creationTime
                  ? new Date(user.creationTime).toLocaleDateString()
                  : "Active"}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-footer-actions">
          <Link to="/items" className="btn btn-primary">
            <ListIcon />
            <span>Open Assets Registry</span>
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            <DashboardIcon />
            <span>Operations Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;

