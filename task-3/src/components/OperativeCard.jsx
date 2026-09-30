import React, { useState } from "react";
import {
  Shield,
  Zap,
  Trash2,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Cpu,
  FileEdit,
  KeyRound,
  Crosshair,
  Radio,
  Sliders
} from "lucide-react";
import { LOADOUT_OPTIONS, STATUSES } from "../data/initialOperatives";

export function OperativeCard({
  item,
  index,
  isFirst,
  isLast,
  keyMode,
  onStatusChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  onResetKey,
}) {
  // ==========================================
  // ITEM LOCAL STATE (Belongs solely to child)
  // ==========================================
  const [tacticalNotes, setTacticalNotes] = useState("");
  const [overclockBoost, setOverclockBoost] = useState(0);
  const [selectedLoadout, setSelectedLoadout] = useState(LOADOUT_OPTIONS[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [localActionCount, setLocalActionCount] = useState(0);

  // Investigation of component re-renders in console
  console.log(
    `%c[CHILD RENDER] <OperativeCard /> ID: ${item.id} [${item.callsign}]`,
    `color: ${item.accentColor || "#00f0ff"}; font-weight: bold; background: #131b2e; padding: 2px 6px; border-radius: 4px;`,
    {
      parentStatus: item.status,
      localNotesLength: tacticalNotes.length,
      overclockBoost,
      selectedLoadout,
      keyMode,
      keyVersion: item.keyVersion,
    }
  );

  // Status badge styling helper
  const getStatusClass = (status) => {
    switch (status) {
      case "Available":
        return "status-badge available";
      case "On Mission":
        return "status-badge on-mission";
      case "Resting":
        return "status-badge resting";
      case "Compromised":
        return "status-badge compromised";
      default:
        return "status-badge";
    }
  };

  // Rank badge styling helper
  const getRankClass = (rank) => {
    switch (rank) {
      case "S-Tier":
        return "rank-badge rank-s";
      case "A-Tier":
        return "rank-badge rank-a";
      case "B-Tier":
        return "rank-badge rank-b";
      default:
        return "rank-badge";
    }
  };

  // Internal local state reset handler
  const handleResetLocalState = () => {
    setTacticalNotes("");
    setOverclockBoost(0);
    setSelectedLoadout(LOADOUT_OPTIONS[0]);
    setLocalActionCount((prev) => prev + 1);
  };

  // Local overclock incrementer
  const handleOverclockIncrement = () => {
    setOverclockBoost((prev) => (prev < 5 ? prev + 1 : 0));
    setLocalActionCount((prev) => prev + 1);
  };

  // Effective energy with local overclock calculation
  const calculatedEnergy = Math.min(100, item.energy + overclockBoost * 2);

  return (
    <div
      className={`operative-card ${item.status === "Compromised" ? "border-alert" : ""}`}
      style={{ "--accent": item.accentColor }}
    >
      {/* Card Header */}
      <div className="card-top-bar">
        <div className="card-identity">
          <div className="avatar-chip">
            <Cpu size={18} style={{ color: item.accentColor }} />
            <span className="card-index-indicator">#{index + 1}</span>
          </div>
          <div>
            <div className="card-callsign-row">
              <h3 className="card-callsign">{item.callsign}</h3>
              <span className={getRankClass(item.rank)}>{item.rank}</span>
              <span className="role-tag">{item.role}</span>
            </div>
            <div className="card-real-name">{item.name}</div>
          </div>
        </div>

        {/* Card Reordering & Delete Controls */}
        <div className="card-header-actions">
          <div className="reorder-btn-group" title="Reorder operative in the list (parent state)">
            <button
              type="button"
              className="icon-action-btn"
              disabled={isFirst}
              onClick={() => onMoveUp(item.id)}
              title="Move Up"
            >
              <ChevronUp size={16} />
            </button>
            <button
              type="button"
              className="icon-action-btn"
              disabled={isLast}
              onClick={() => onMoveDown(item.id)}
              title="Move Down"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          <button
            type="button"
            className="icon-action-btn delete-btn"
            onClick={() => onDelete(item.id)}
            title="Discharge / Remove Operative from roster"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Specialty & Parent Status Row */}
      <div className="card-status-row">
        <div className="specialty-text" title={item.specialty}>
          <Crosshair size={13} />
          <span>{item.specialty}</span>
        </div>

        {/* Parent Status Changer (Edit item status) */}
        <div className="status-selector-wrapper">
          <select
            className={`status-inline-select ${item.status.toLowerCase().replace(" ", "-")}`}
            value={item.status}
            onChange={(e) => onStatusChange(item.id, e.target.value)}
            title="Change parent item status"
          >
            {STATUSES.filter((s) => s !== "All").map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Power Bar */}
      <div className="card-energy-section">
        <div className="energy-labels">
          <span className="energy-title">
            <Zap size={13} /> Core Energy Level
          </span>
          <span className="energy-val">
            {calculatedEnergy}%
            {overclockBoost > 0 && (
              <span className="boost-indicator"> (+{overclockBoost * 2}% Boost)</span>
            )}
          </span>
        </div>
        <div className="energy-track">
          <div
            className="energy-fill"
            style={{
              width: `${calculatedEnergy}%`,
              backgroundColor:
                calculatedEnergy < 35
                  ? "#ef4444"
                  : calculatedEnergy < 70
                  ? "#f59e0b"
                  : item.accentColor,
            }}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* LOCAL STATE DEMO SECTION (Tactical Notes & Overclock)    */}
      {/* ======================================================== */}
      <div className="local-state-box">
        <div className="local-state-header">
          <div className="local-state-title">
            <FileEdit size={14} />
            <span>Local Operative State</span>
            <span className="local-state-pill">Child State Only</span>
          </div>

          <div className="local-state-actions">
            {/* Direct Local Reset */}
            <button
              type="button"
              className="text-btn"
              onClick={handleResetLocalState}
              title="Reset child local state back to initial values via setState"
            >
              <RotateCcw size={12} />
              <span>Reset State</span>
            </button>

            {/* Key-based Intentional Reset (Unmounts and remounts component!) */}
            <button
              type="button"
              className="text-btn key-reset-btn"
              onClick={() => onResetKey(item.id)}
              title="Force React component remount by updating its key in the parent. This triggers reconciliation unmount/mount and resets state!"
            >
              <KeyRound size={12} />
              <span>Key Reset (v{item.keyVersion})</span>
            </button>
          </div>
        </div>

        {/* Local Notes Input */}
        <div className="notes-field">
          <input
            type="text"
            className="local-input"
            placeholder="Type tactical notes (preserved on reorder / filter)..."
            value={tacticalNotes}
            onChange={(e) => {
              setTacticalNotes(e.target.value);
              setLocalActionCount((c) => c + 1);
            }}
          />
        </div>

        {/* Quick controls: Local Overclock & Loadout */}
        <div className="local-controls-grid">
          <div className="control-item">
            <span className="control-label">Overclock Module:</span>
            <button
              type="button"
              className="overclock-btn"
              onClick={handleOverclockIncrement}
              title="Click to cycle local overclock level 0 to 5"
            >
              <Sparkles size={13} />
              <span>Level {overclockBoost}/5</span>
            </button>
          </div>

          <div className="control-item">
            <span className="control-label">Loadout Rig:</span>
            <select
              className="local-select"
              value={selectedLoadout}
              onChange={(e) => {
                setSelectedLoadout(e.target.value);
                setLocalActionCount((c) => c + 1);
              }}
            >
              {LOADOUT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Local state telemetry snippet */}
        <div className="local-state-indicators">
          <span className="indicator-chip">
            Notes: <strong>{tacticalNotes.trim() ? "Active" : "Empty"}</strong>
          </span>
          <span className="indicator-chip">
            Edits: <strong>{localActionCount}</strong>
          </span>
          <span className="indicator-chip key-badge">
            Key: <code>{keyMode === "stable" ? `${item.id}-${item.keyVersion}` : `idx_${index}`}</code>
          </span>
        </div>
      </div>

      {/* Expandable Technical Details */}
      <div className="card-footer">
        <button
          type="button"
          className="expand-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Sliders size={13} />
          <span>{isExpanded ? "Collapse Intel" : "Inspect Unit Intel"}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Conditional Rendering: Expanded Intel */}
      {isExpanded && (
        <div className="card-expanded-intel">
          <div className="intel-row">
            <span className="intel-label">Total Missions:</span>
            <span className="intel-val">{item.missions} Successful Sorties</span>
          </div>
          <div className="intel-row">
            <span className="intel-label">Identity Hash:</span>
            <span className="intel-val mono">{item.id}</span>
          </div>
          <div className="intel-row">
            <span className="intel-label">Reconciliation Note:</span>
            <span className="intel-val text-muted">
              {keyMode === "stable"
                ? "State is tied to item.id. Reordering or filtering preserves this card's local inputs."
                : "WARNING: Using array index as key. Reordering will cause input values to bleed into adjacent cards!"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
