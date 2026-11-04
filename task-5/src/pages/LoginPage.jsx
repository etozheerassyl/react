import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
  LogOutIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  TerminalIcon,
  ArrowRightIcon,
} from "../components/Icons";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clearance, setClearance] = useState("Class 5 - Restricted");
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setStatusMessage({ type: "error", text: "Please enter an Operative ID or username." });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    // Simulate authentication delay
    setTimeout(() => {
      login({
        username: username.trim(),
        role: "Senior Systems Operator",
        clearance,
      });
      setIsLoading(false);
      setStatusMessage({ type: "success", text: "Terminal credentials verified. Session established." });
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    }, 600);
  };

  const fillDemoUser = (demoName, demoClearance, role) => {
    setUsername(demoName);
    setPassword("••••••••••••");
    setClearance(demoClearance);
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-header-section">
          <div className="login-shield-badge">
            <ShieldIcon className="login-shield-icon" />
          </div>
          <h1 className="login-title">Aegis Terminal Gateway</h1>
          <p className="login-subtitle">
            Restricted Subsystem Access — Authentication &amp; Clearance Verification
          </p>
        </div>

        {isAuthenticated ? (
          <div className="logged-in-profile-panel">
            <div className="auth-status-pill">
              <CheckCircleIcon />
              <span>TERMINAL SESSION ACTIVE</span>
            </div>

            <div className="user-profile-details">
              <div className="profile-row">
                <span className="profile-label">Operative:</span>
                <span className="profile-val">{user.username}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Role:</span>
                <span className="profile-val">{user.role}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Clearance:</span>
                <span className="profile-val clearance-high">{user.clearance}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Session ID:</span>
                <span className="profile-val token-hash">{user.token}</span>
              </div>
            </div>

            <div className="logged-in-actions">
              <Link to="/dashboard" className="btn btn-primary btn-block">
                <span>Proceed to Operations Dashboard</span>
                <ArrowRightIcon />
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger btn-block"
                onClick={logout}
              >
                <LogOutIcon />
                <span>Disconnect Terminal Session</span>
              </button>
            </div>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            {statusMessage && (
              <div className={`login-alert alert-${statusMessage.type}`}>
                {statusMessage.type === "success" ? <CheckCircleIcon /> : <AlertCircleIcon />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Username Input */}
            <div className="form-group">
              <label htmlFor="login-username" className="form-label">
                <UserIcon className="form-label-icon" />
                <span>Operative Identifier</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="login-username"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Cmdr. Yerassyl or Holden"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="login-password" className="form-label">
                <LockIcon className="form-label-icon" />
                <span>Security Passkey</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter access passphrase"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Clearance Selector */}
            <div className="form-group">
              <label htmlFor="login-clearance" className="form-label">
                <ShieldIcon className="form-label-icon" />
                <span>Clearance Level</span>
              </label>
              <select
                id="login-clearance"
                className="form-control form-select"
                value={clearance}
                onChange={(e) => setClearance(e.target.value)}
              >
                <option value="Class 5 - Restricted">Class 5 - Restricted (Full System Root)</option>
                <option value="Class 4 - Top Secret">Class 4 - Top Secret (Defense &amp; Swarm)</option>
                <option value="Class 3 - Confidential">Class 3 - Confidential (Communications)</option>
                <option value="Class 2 - Internal">Class 2 - Internal (Infrastructure)</option>
                <option value="Class 1 - Public">Class 1 - Public (Read-Only Observer)</option>
              </select>
            </div>

            {/* Remember Checkbox */}
            <div className="form-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberTerminal}
                  onChange={(e) => setRememberTerminal(e.target.checked)}
                />
                <span>Preserve terminal session in local encrypted cache</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-block btn-login-submit"
              disabled={isLoading}
            >
              <LogInIcon />
              <span>{isLoading ? "Authenticating Session..." : "Initialize Terminal Session"}</span>
            </button>

            {/* Quick Demo Fill Buttons */}
            <div className="quick-demo-section">
              <div className="quick-demo-header">
                <span>QUICK DEMO PROFILES</span>
              </div>
              <div className="demo-btn-group">
                <button
                  type="button"
                  className="demo-btn"
                  onClick={() => fillDemoUser("Cmdr. Yerassyl", "Class 5 - Restricted", "Lead Systems Architect")}
                >
                  👤 Yerassyl (Class 5)
                </button>
                <button
                  type="button"
                  className="demo-btn"
                  onClick={() => fillDemoUser("Dr. Elena Rostova", "Class 4 - Top Secret", "Energy Director")}
                >
                  ⚡ Dr. Rostova (Class 4)
                </button>
                <button
                  type="button"
                  className="demo-btn"
                  onClick={() => fillDemoUser("Guest Operative", "Class 2 - Internal", "Guest Observer")}
                >
                  🔍 Guest (Class 2)
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="login-security-notice">
          <TerminalIcon className="notice-icon" />
          <span>
            Notice: All queries and mutations are logged and synchronized across the Aegis telemetry network.
          </span>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;

