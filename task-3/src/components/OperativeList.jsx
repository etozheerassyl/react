import React from "react";
import { OperativeCard } from "./OperativeCard";
import { AlertCircle, PlusCircle } from "lucide-react";

export function OperativeList({
  operatives,
  keyMode,
  onStatusChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  onResetKey,
  onOpenAddModal,
  onClearFilters,
}) {
  console.log(
    `%c[RENDER] <OperativeList /> rendering ${operatives.length} items with keyMode='${keyMode}'`,
    "color: #a78bfa; font-weight: bold;"
  );

  if (operatives.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrap">
          <AlertCircle size={48} className="empty-icon" />
        </div>
        <h3 className="empty-title">NO OPERATIVES DETECTED</h3>
        <p className="empty-desc">
          No units match your active filter criteria or search query. Modify your search
          parameters or deploy a new operative to the grid.
        </p>
        <div className="empty-actions">
          <button
            type="button"
            className="cyber-btn btn-secondary"
            onClick={onClearFilters}
          >
            Clear Active Filters
          </button>
          <button
            type="button"
            className="cyber-btn btn-primary"
            onClick={onOpenAddModal}
          >
            <PlusCircle size={16} />
            <span>Recruit Operative</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="operatives-grid">
      {operatives.map((item, index) => {
        // Here we demonstrate stable key vs index key!
        // When keyMode === "stable", key is `${item.id}-${item.keyVersion}`.
        // If keyVersion changes, React unmounts and remounts that specific item (intentional state reset).
        // If keyMode === "index", key is `index`. Reordering will visibly misassign state!
        const componentKey =
          keyMode === "stable" ? `${item.id}-${item.keyVersion}` : index;

        return (
          <OperativeCard
            key={componentKey}
            item={item}
            index={index}
            isFirst={index === 0}
            isLast={index === operatives.length - 1}
            keyMode={keyMode}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onResetKey={onResetKey}
          />
        );
      })}
    </div>
  );
}
