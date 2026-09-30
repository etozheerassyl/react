import React, { useState } from "react";
import { INITIAL_OPERATIVES } from "./data/initialOperatives";
import { Header } from "./components/Header";
import { StatsBar } from "./components/StatsBar";
import { ControlToolbar } from "./components/ControlToolbar";
import { OperativeList } from "./components/OperativeList";
import { AddOperativeModal } from "./components/AddOperativeModal";
import { DefenseGuideModal } from "./components/DefenseGuideModal";
import "./App.css";

export default function App() {
  // ==========================================
  // PARENT APPLICATION STATE (useState only)
  // ==========================================
  const [operatives, setOperatives] = useState(INITIAL_OPERATIVES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortCriteria, setSortCriteria] = useState("default");
  const [isReversed, setIsReversed] = useState(false);
  const [keyMode, setKeyMode] = useState("stable"); // "stable" | "index"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDefenseModalOpen, setIsDefenseModalOpen] = useState(false);

  // Investigation of component re-renders (in Console)
  console.log(
    "%c[PARENT RENDER] <App /> Root Dashboard",
    "background: #0284c7; color: #ffffff; font-weight: bold; padding: 3px 8px; border-radius: 4px;",
    {
      totalOperatives: operatives.length,
      filters: { searchQuery, selectedRole, selectedStatus, sortCriteria, isReversed, keyMode },
    }
  );

  // ==========================================
  // HANDLERS FOR ITEM OPERATIONS (Parent State)
  // ==========================================

  // 1. Edit / Change item status
  const handleStatusChange = (id, newStatus) => {
    console.log(`[ACTION] Status updated for ID=${id} -> ${newStatus}`);
    setOperatives((prev) =>
      prev.map((op) => (op.id === id ? { ...op, status: newStatus } : op))
    );
  };

  // 2. Remove / Discharge item
  const handleDelete = (id) => {
    console.log(`[ACTION] Removed operative ID=${id}`);
    setOperatives((prev) => prev.filter((op) => op.id !== id));
  };

  // 3. Reorder: Move item up in the list
  const handleMoveUp = (id) => {
    setOperatives((prev) => {
      const idx = prev.findIndex((op) => op.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      const temp = copy[idx - 1];
      copy[idx - 1] = copy[idx];
      copy[idx] = temp;
      console.log(`[ACTION] Reordered ID=${id} UP to index ${idx - 1}`);
      return copy;
    });
  };

  // 4. Reorder: Move item down in the list
  const handleMoveDown = (id) => {
    setOperatives((prev) => {
      const idx = prev.findIndex((op) => op.id === id);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[idx + 1];
      copy[idx + 1] = copy[idx];
      copy[idx] = temp;
      console.log(`[ACTION] Reordered ID=${id} DOWN to index ${idx + 1}`);
      return copy;
    });
  };

  // 5. Intentional State Reset via Key version increment
  const handleResetKey = (id) => {
    console.log(`[RECONCILIATION] Intentional key reset triggered for ID=${id}`);
    setOperatives((prev) =>
      prev.map((op) =>
        op.id === id ? { ...op, keyVersion: (op.keyVersion || 0) + 1 } : op
      )
    );
  };

  // 6. Add new operative
  const handleAddOperative = (newOp) => {
    console.log(`[ACTION] Added new operative:`, newOp);
    setOperatives((prev) => [newOp, ...prev]);
  };

  // 7. Reset all to initial mock dataset
  const handleResetAll = () => {
    console.log("[ACTION] Reset all operatives to initial data");
    setOperatives(INITIAL_OPERATIVES);
    setSearchQuery("");
    setSelectedRole("All");
    setSelectedStatus("All");
    setSortCriteria("default");
    setIsReversed(false);
  };

  // 8. Clear only filters and sort
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedRole("All");
    setSelectedStatus("All");
    setSortCriteria("default");
    setIsReversed(false);
  };

  // ==========================================
  // DERIVED STATE DURING RENDER (No useEffect!)
  // ==========================================

  // Step 1: Filter by search query, role, and status
  const filteredOperatives = operatives.filter((op) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      op.callsign.toLowerCase().includes(q) ||
      op.name.toLowerCase().includes(q) ||
      op.specialty.toLowerCase().includes(q);

    const matchesRole = selectedRole === "All" || op.role === selectedRole;
    const matchesStatus = selectedStatus === "All" || op.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Step 2: Sort
  const rankWeight = { "S-Tier": 3, "A-Tier": 2, "B-Tier": 1 };
  const sortedOperatives = [...filteredOperatives].sort((a, b) => {
    if (sortCriteria === "rank") {
      return (rankWeight[b.rank] || 0) - (rankWeight[a.rank] || 0);
    }
    if (sortCriteria === "energy-desc") {
      return b.energy - a.energy;
    }
    if (sortCriteria === "energy-asc") {
      return a.energy - b.energy;
    }
    if (sortCriteria === "missions-desc") {
      return b.missions - a.missions;
    }
    return 0; // default preserving array order
  });

  // Step 3: Reverse list if requested
  const displayedOperatives = isReversed
    ? [...sortedOperatives].reverse()
    : sortedOperatives;

  return (
    <div className="cyber-app-shell">
      {/* Background ambient lighting */}
      <div className="bg-glow top-left" />
      <div className="bg-glow bottom-right" />
      <div className="bg-grid-pattern" />

      <div className="app-container">
        {/* Header */}
        <Header
          totalCount={operatives.length}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onResetAll={handleResetAll}
          onOpenDefenseGuide={() => setIsDefenseModalOpen(true)}
          keyMode={keyMode}
          onToggleKeyMode={setKeyMode}
        />

        {/* Live System Stats */}
        <StatsBar operatives={operatives} />

        {/* Quick Instructions Callout for Teacher & Defense */}
        <div className="defense-quick-banner">
          <div className="banner-pulse" />
          <div className="banner-content">
            <span className="banner-tag">DEFENSE READY</span>
            <span className="banner-text">
              Try entering notes into <strong>GHOST</strong>, then click <strong>"Reverse List"</strong> or sort.
              Notice local state stays preserved! Click <strong>"Key Reset"</strong> on any card to see intentional component remount and state wipe via React Reconciliation.
            </span>
          </div>
          <button
            type="button"
            className="banner-guide-btn"
            onClick={() => setIsDefenseModalOpen(true)}
          >
            Review Theory Guide →
          </button>
        </div>

        {/* Control Toolbar: Search, Filters, Sorting, Reverse */}
        <ControlToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortCriteria={sortCriteria}
          onSortCriteriaChange={setSortCriteria}
          isReversed={isReversed}
          onToggleReverse={() => setIsReversed((prev) => !prev)}
          onClearFilters={handleClearFilters}
          resultCount={displayedOperatives.length}
          totalCount={operatives.length}
        />

        {/* List of Operative Cards */}
        <OperativeList
          operatives={displayedOperatives}
          keyMode={keyMode}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onResetKey={handleResetKey}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Modals */}
      <AddOperativeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddOperative={handleAddOperative}
      />

      <DefenseGuideModal
        isOpen={isDefenseModalOpen}
        onClose={() => setIsDefenseModalOpen(false)}
      />
    </div>
  );
}
