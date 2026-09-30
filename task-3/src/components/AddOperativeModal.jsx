import React, { useState } from "react";
import { X, UserPlus, Zap, Crosshair, Shield } from "lucide-react";
import { ROLES, RANKS, STATUSES } from "../data/initialOperatives";

export function AddOperativeModal({ isOpen, onClose, onAddOperative }) {
  const [callsign, setCallsign] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Infiltrator");
  const [rank, setRank] = useState("A-Tier");
  const [status, setStatus] = useState("Available");
  const [specialty, setSpecialty] = useState("");
  const [energy, setEnergy] = useState(85);
  const [accentColor, setAccentColor] = useState("#00f0ff");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  console.log("%c[RENDER] <AddOperativeModal />", "color: #06b6d4; font-weight: bold;");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!callsign.trim() || !name.trim() || !specialty.trim()) {
      setErrorMessage("Please fill in Callsign, Full Name, and Specialty.");
      return;
    }

    const newOperative = {
      id: `op-${callsign.toLowerCase().replace(/[^a-z0-9]/g, "")}-${Date.now().toString().slice(-4)}`,
      callsign: callsign.toUpperCase().trim(),
      name: name.trim(),
      role,
      rank,
      status,
      energy: Number(energy),
      missions: Math.floor(Math.random() * 25) + 5,
      specialty: specialty.trim(),
      accentColor,
      avatarIcon: "Cpu",
      keyVersion: 0,
    };

    onAddOperative(newOperative);
    onClose();
  };

  const colorPresets = [
    { label: "Cyan", color: "#00f0ff" },
    { label: "Purple", color: "#a855f7" },
    { label: "Emerald", color: "#10b981" },
    { label: "Amber", color: "#f59e0b" },
    { label: "Crimson", color: "#ef4444" },
    { label: "Pink", color: "#ec4899" },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <UserPlus size={20} className="modal-title-icon" />
            <div>
              <h2 className="modal-title">RECRUIT NEW OPERATIVE</h2>
              <p className="modal-subtitle">Provision agent credentials into active grid</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {errorMessage && (
            <div className="modal-alert-error">
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="form-row two-cols">
            <div className="form-field">
              <label>CALLSIGN *</label>
              <input
                type="text"
                className="cyber-input"
                placeholder="e.g. PHANTOM"
                value={callsign}
                onChange={(e) => {
                  setCallsign(e.target.value);
                  setErrorMessage("");
                }}
                required
              />
            </div>

            <div className="form-field">
              <label>FULL IDENTITY *</label>
              <input
                type="text"
                className="cyber-input"
                placeholder="e.g. Rachel Cross"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMessage("");
                }}
                required
              />
            </div>
          </div>

          <div className="form-row three-cols">
            <div className="form-field">
              <label>ROLE</label>
              <select
                className="cyber-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {ROLES.filter((r) => r !== "All").map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>RANK TIER</label>
              <select
                className="cyber-select"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              >
                {RANKS.map((rk) => (
                  <option key={rk} value={rk}>
                    {rk}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>INITIAL STATUS</label>
              <select
                className="cyber-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUSES.filter((s) => s !== "All").map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label>SPECIALTY / AUGMENTATION *</label>
            <input
              type="text"
              className="cyber-input"
              placeholder="e.g. Sub-orbital Infiltration & Nanite Shielding"
              value={specialty}
              onChange={(e) => {
                setSpecialty(e.target.value);
                setErrorMessage("");
              }}
              required
            />
          </div>

          <div className="form-field">
            <div className="slider-label-row">
              <label>CORE ENERGY RESERVES</label>
              <span className="slider-val">{energy}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="cyber-slider"
            />
          </div>

          <div className="form-field">
            <label>NEON SIGNATURE ACCENT</label>
            <div className="color-swatches">
              {colorPresets.map((preset) => (
                <button
                  key={preset.color}
                  type="button"
                  className={`color-swatch-btn ${accentColor === preset.color ? "selected" : ""}`}
                  style={{ backgroundColor: preset.color }}
                  onClick={() => setAccentColor(preset.color)}
                  title={preset.label}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cyber-btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="cyber-btn btn-primary">
              <UserPlus size={16} />
              <span>Deploy Operative</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
