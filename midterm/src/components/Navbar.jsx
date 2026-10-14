import React from 'react';
import { Film, Plus, RotateCcw, AlertTriangle, Heart } from 'lucide-react';

/**
 * Navbar Component
 * 
 * Top navigation bar featuring CineVault branding, quick stats,
 * and controls for adding movies, toggling simulated error (for defense testing),
 * and resetting the database.
 */
export default function Navbar({
  onOpenAddModal,
  favoritesCount,
  onShowFavoritesOnly,
  isFavoritesFilterActive,
  isSimulatedError,
  onToggleSimulatedError,
  onResetDatabase,
  isResetting
}) {
  return (
    <header className="site-header" role="banner">
      <div className="container nav-wrapper">
        {/* Brand Logo & Title */}
        <div 
          className="brand-logo" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          aria-label="CineVault Home"
        >
          <div className="brand-icon-box">
            <Film size={22} strokeWidth={2.2} />
          </div>
          <div className="brand-title-group">
            <h1>CINEVAULT</h1>
            <span className="brand-tagline">Curated International Cinema</span>
          </div>
        </div>

        {/* Global Action Controls */}
        <nav className="nav-actions" aria-label="Global Controls">
          {/* Favorites Filter Quick Toggle */}
          <button
            type="button"
            className={`defense-badge-btn ${isFavoritesFilterActive ? 'danger' : ''}`}
            onClick={onShowFavoritesOnly}
            title="Toggle between all films and saved favorites"
            id="btn-favorites-filter"
          >
            <Heart size={14} fill={isFavoritesFilterActive ? '#f43f5e' : 'none'} />
            <span>Saved ({favoritesCount})</span>
          </button>

          {/* Defense Tool: Toggle Simulated 500 API Error */}
          <button
            type="button"
            className={`defense-badge-btn ${isSimulatedError ? 'danger' : ''}`}
            onClick={onToggleSimulatedError}
            title="Defense feature: Simulates a network/server failure to demonstrate React error handling"
            id="btn-toggle-simulated-error"
          >
            <AlertTriangle size={14} />
            <span>{isSimulatedError ? 'API Error: ON' : 'Simulate Error'}</span>
          </button>

          {/* Reset Database to Seed 105 Films */}
          <button
            type="button"
            className="defense-badge-btn"
            onClick={onResetDatabase}
            disabled={isResetting}
            title="Restore original 105 curated films seed data"
            id="btn-reset-db"
          >
            <RotateCcw size={14} className={isResetting ? 'spin' : ''} />
            <span>{isResetting ? 'Resetting...' : 'Reset Seed'}</span>
          </button>

          {/* Open Add Film Modal */}
          <button
            type="button"
            className="btn-primary"
            onClick={onOpenAddModal}
            id="btn-open-add-movie"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Submit Film</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
