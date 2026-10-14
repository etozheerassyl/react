import React from 'react';
import { AlertOctagon, RotateCw, CheckCircle2 } from 'lucide-react';

/**
 * ErrorState Component
 * 
 * Fulfills the "Error State" requirement when an asynchronous request fails
 * (e.g. simulated network failure during defense demonstration).
 */
export default function ErrorState({ error, onRetry, onDisableSimulatedError }) {
  return (
    <div className="state-box error" role="alert" aria-live="assertive">
      <div className="state-icon-circle">
        <AlertOctagon size={32} />
      </div>
      <h3 className="state-title" style={{ color: '#fda4af' }}>
        Network / Server Error
      </h3>
      <p className="state-desc" style={{ color: '#cbd5e1' }}>
        {error || 'An unexpected error occurred while communicating with the simulated cinema API.'}
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {onRetry && (
          <button
            type="button"
            className="btn-primary"
            onClick={onRetry}
            id="btn-error-retry"
          >
            <RotateCw size={16} />
            <span>Retry Connection</span>
          </button>
        )}

        {onDisableSimulatedError && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onDisableSimulatedError}
            id="btn-error-turn-off"
          >
            <CheckCircle2 size={16} color="#10b981" />
            <span>Turn Off Simulated Error</span>
          </button>
        )}
      </div>
    </div>
  );
}
