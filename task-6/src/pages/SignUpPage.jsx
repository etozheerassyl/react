import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldIcon,
  LockIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  UserPlusIcon,
  AlertCircleIcon,
  TerminalIcon,
  GoogleIcon,
  SpinnerIcon,
} from "../components/Icons";
import { useAuth } from "../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpPage() {
  const {
    isAuthenticated,
    authActionLoading,
    authError,
    isFirebaseConfigured,
    signup,
    loginWithGoogle,
    clearAuthError,
  } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    clearAuthError();
  }, [clearAuthError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const activeError = validationError || authError;

  const validateForm = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return "Email address is required.";
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return "Please enter a valid email address (e.g. name@domain.com).";
    }
    if (!password) {
      return "Password is required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!confirmPassword) {
      return "Please confirm your password.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearAuthError();
    const errorMsg = validateForm();
    if (errorMsg) {
      setValidationError(errorMsg);
      return;
    }

    setValidationError("");
    try {
      await signup(email.trim(), password);
      navigate("/profile", { replace: true });
    } catch {
      // Error is stored in AuthContext authError
    }
  };

  const handleGoogleSignUp = async () => {
    setValidationError("");
    clearAuthError();
    try {
      await loginWithGoogle();
      navigate("/profile", { replace: true });
    } catch {
      // Error is stored in AuthContext authError
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-header-section">
          <div className="login-shield-badge">
            <UserPlusIcon className="login-shield-icon" />
          </div>
          <h1 className="login-title">Create Aegis Account</h1>
          <p className="login-subtitle">
            Register a new operator profile with Firebase Authentication
          </p>
        </div>

        {!isFirebaseConfigured && (
          <div className="login-alert alert-warning">
            <AlertCircleIcon />
            <span>
              Firebase environment variables are not configured yet. Add your <code>VITE_FIREBASE_*</code> keys in <code>.env.local</code> to enable registration.
            </span>
          </div>
        )}

        <div className="auth-form-stack">
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {activeError && (
              <div className="login-alert alert-error" role="alert">
                <AlertCircleIcon />
                <span>{activeError}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">
                <MailIcon className="form-label-icon" />
                <span>Email Address</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="signup-email"
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
              <label htmlFor="signup-password" className="form-label">
                <LockIcon className="form-label-icon" />
                <span>Password (min. 6 characters)</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationError) setValidationError("");
                  }}
                  autoComplete="new-password"
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

            <div className="form-group">
              <label htmlFor="signup-confirm-password" className="form-label">
                <ShieldIcon className="form-label-icon" />
                <span>Confirm Password</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (validationError) setValidationError("");
                  }}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="btn-toggle-password"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlusIcon />
                  <span>Create Account</span>
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
            onClick={handleGoogleSignUp}
            disabled={authActionLoading}
          >
            <GoogleIcon />
            <span>Sign up with Google</span>
          </button>

          <div className="auth-switch-footer">
            <span>Already have an account?</span>
            <Link to="/login" className="auth-switch-link">
              Sign In
            </Link>
          </div>
        </div>

        <div className="login-security-notice">
          <TerminalIcon className="notice-icon" />
          <span>
            New accounts are provisioned in Firebase Authentication and automatically redirected to your protected profile.
          </span>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage;

