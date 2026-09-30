import React from "react";
import { Users, Radio, BatteryCharging, AlertTriangle, ShieldCheck } from "lucide-react";

export function StatsBar({ operatives }) {
  console.log("%c[RENDER] <StatsBar />", "color: #34d399; font-weight: bold;");

  const total = operatives.length;
  const available = operatives.filter((op) => op.status === "Available").length;
  const onMission = operatives.filter((op) => op.status === "On Mission").length;
  const compromised = operatives.filter((op) => op.status === "Compromised").length;
  
  const avgEnergy = total > 0
    ? Math.round(operatives.reduce((acc, curr) => acc + curr.energy, 0) / total)
    : 0;

  return (
    <div className="stats-bar-grid">
      <div className="stat-card">
        <div className="stat-icon-box cyan">
          <Users size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-label">TOTAL OPERATIVES</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-subtext">Active in roster</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box emerald">
          <ShieldCheck size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-label">READY / AVAILABLE</span>
          <span className="stat-value">{available}</span>
        </div>
        <div className="stat-subtext">Ready for dispatch</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box purple">
          <Radio size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-label">ON DEPLOYMENT</span>
          <span className="stat-value">{onMission}</span>
        </div>
        <div className="stat-subtext">Field active units</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box amber">
          <BatteryCharging size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-label">AVG POWER RESERVES</span>
          <span className="stat-value">{avgEnergy}%</span>
        </div>
        <div className="stat-subtext">Across all units</div>
      </div>

      {compromised > 0 && (
        <div className="stat-card alert-card">
          <div className="stat-icon-box red">
            <AlertTriangle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">ALERT UNITS</span>
            <span className="stat-value">{compromised}</span>
          </div>
          <div className="stat-subtext">Require immediate purge</div>
        </div>
      )}
    </div>
  );
}
