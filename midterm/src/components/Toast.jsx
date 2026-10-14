import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast Notification Component
 * 
 * Provides temporary feedback alerts for user actions (film added, reset, favorites, errors).
 */
export default function Toast({ message, type = 'success', onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const iconMap = {
    success: <CheckCircle2 size={18} className="toast-icon" />,
    error: <AlertCircle size={18} className="toast-icon" />,
    info: <Info size={18} className="toast-icon" />,
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast ${type}`}>
        {iconMap[type] || iconMap.success}
        <span>{message}</span>
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 0 }}
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
