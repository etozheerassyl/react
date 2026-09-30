import React from "react";
import { Shield, UserPlus, BookOpen, RefreshCw, Terminal, Layers } from "lucide-react";

export function Header({
  totalCount,
  onOpenAddModal,
  onResetAll,
  onOpenDefenseGuide,
  keyMode,
  onToggleKeyMode,
}) {
  // Investigate parent/header re-render
  console.log("%c[RENDER] <Header />", "color: #38bdf8; font-weight: bold;");

  return (
    <header className="cyber-header">
      <div className="header-brand">
        <div className="brand-icon-wrapper">
          <Shield className="brand-icon" size={28} />
          <div className="brand-glow" />
        </div>
        <div className="brand-text">
          <div className="brand-badge">AETHER PROTOCOL v3.4 // ACTIVE</div>
          <h1 className="brand-title">CYBER-GRID OPERATIVES</h1>
          <p className="brand-subtitle">
            Tactical Operations Command & State Reconciliation Deck
          </p>
        </div>
      </div>

      <div className="header-actions">
        {/* Key Strategy Toggle for Defense Demonstration */}
        <div className="key-strategy-selector" title="Switch keys between stable ID and Array Index to demonstrate state preservation vs state corruption">
          <div className="selector-label">
            <Layers size={14} />
            <span>Key Mode:</span>
          </div>
          <button
            type="button"
            className={`strategy-btn ${keyMode === "stable" ? "active-stable" : ""}`}
            onClick={() => onToggleKeyMode("stable")}
          >
            Stable ID <span className="tag-recommended">Optimal</span>
          </button>
          <button
            type="button"
            className={`strategy-btn ${keyMode === "index" ? "active-index" : ""}`}
            onClick={() => onToggleKeyMode("index")}
          >
            Index (Buggy)
          </button>
        </div>

        {/* Defense Guide Modal Trigger */}
        <button
          type="button"
          className="cyber-btn btn-secondary"
          onClick={onOpenDefenseGuide}
          title="Open interactive explanation of reconciliation, keys and state preservation for defense"
        >
          <BookOpen size={16} />
          <span>Defense Guide</span>
        </button>

        {/* Reset State to Default */}
        <button
          type="button"
          className="cyber-btn btn-outline"
          onClick={onResetAll}
          title="Reset roster to original operatives dataset"
        >
          <RefreshCw size={16} />
          <span>Reset Roster</span>
        </button>

        {/* Add Operative CTA */}
        <button
          type="button"
          className="cyber-btn btn-primary"
          onClick={onOpenAddModal}
        >
          <UserPlus size={16} />
          <span>Recruit Operative</span>
        </button>
      </div>
    </header>
  );
}
