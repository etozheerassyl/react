import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ShieldIcon,
  LockIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
  LogOutIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  TerminalIcon,
  ArrowRightIcon,
  GoogleIcon,
  UserIcon,
  SpinnerIcon,
} from "../components/Icons";
import { useAuth } from "../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const {
    user,
    isAuthenticated,
    authActionLoading,
    authError,
    isFirebaseConfigured,
    login,
    loginWithGoogle,
    logout,
    clearAuthError,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTarget = location.state?.from?.pathname || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  const activeError = validationError || authError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    clearAuthError();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    try {
      await login(trimmedEmail, password);
      navigate(redirectTarget, { replace: true });
    } catch {
      // Error is stored in AuthContext authError
    }
  };

  const handleGoogleSignIn = async () => {
    setValidationError("");
    clearAuthError();
    try {
      await loginWithGoogle();
      navigate(redirectTarget, { replace: true });
    } catch {
      // Error is stored in AuthContext authError
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Error is stored in AuthContext authError
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-header-section">
          <div className="login-shield-badge">
            <ShieldIcon className="login-shield-icon" />
          </div>
          <h1 className="login-title">Aegis Firebase Gateway</h1>
          <p className="login-subtitle">
            Sign in with Email &amp; Password or Google Authentication
          </p>
        </div>

        {!isFirebaseConfigured && (
          <div className="login-alert alert-warning">
            <AlertCircleIcon />
            <span>
              Firebase environment variables are not configured yet. Add your <code>VITE_FIREBASE_*</code> keys in <code>.env.local</code> to enable live sign-in.
            </span>
          </div>
        )}

        {isAuthenticated ? (
          <div className="logged-in-profile-panel">
            <div className="auth-status-pill">
              <CheckCircleIcon />
              <span>FIREBASE SESSION ACTIVE</span>
            </div>

            <div className="user-profile-details">
              <div className="profile-row">
                <span className="profile-label">Email:</span>
                <span className="profile-val">{user.email}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Firebase UID:</span>
                <span className="profile-val token-hash">{user.uid}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Provider:</span>
                <span className="profile-val clearance-high">{user.providerId}</span>
              </div>
            </div>

            <div className="logged-in-actions">
              <Link to="/profile" className="btn btn-primary btn-block">
                <UserIcon />
                <span>Open Protected Profile</span>
                <ArrowRightIcon />
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger btn-block"
                onClick={handleLogout}
                disabled={authActionLoading}
              >
                <LogOutIcon />
                <span>{authActionLoading ? "Signing Out..." : "Sign Out"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-form-stack">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {activeError && (
                <div className="login-alert alert-error" role="alert">
                  <AlertCircleIcon />
                  <span>{activeError}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="login-email" className="form-label">
                  <MailIcon className="form-label-icon" />
                  <span>Email Address</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="login-email"
                    type="email"
                    className="form-control"
                    placeholder="operator@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationError) setValidationError("");
                    }}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="login-password" className="form-label">
                  <LockIcon className="form-label-icon" />
                  <span>Password</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (validationError) setValidationError("");
                    }}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    title={showPassword ? "Hide password" : "Show password"}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block btn-login-submit"
                disabled={authActionLoading}
              >
                {authActionLoading ? (
                  <>
                    <SpinnerIcon className="spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogInIcon />
                    <span>Sign In with Email</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="btn btn-google btn-block"
              onClick={handleGoogleSignIn}
              disabled={authActionLoading}
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <div className="auth-switch-footer">
              <span>Need an operator account?</span>
              <Link to="/signup" className="auth-switch-link">
                Create Account
              </Link>
            </div>
          </div>
        )}

        <div className="login-security-notice">
          <TerminalIcon className="notice-icon" />
          <span>
            Authenticated via Firebase Auth with persistent local browser sessions across page reloads.
          </span>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;

