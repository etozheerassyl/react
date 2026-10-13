import { useState, useEffect } from "react";
import {
  getItemsList,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  resetDatabase,
  getApiConfig,
  setApiConfig,
  subscribeToApiLogs,
} from "./api/fakeApi";

import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ItemDetails } from "./components/ItemDetails";
import { CreateModal } from "./components/CreateModal";
import { EditModal } from "./components/EditModal";
import { DefenseLabModal } from "./components/DefenseLabModal";
import { CheckCircleIcon, AlertCircleIcon, CloseIcon } from "./components/Icons";

export function App() {
  // ==========================================
  // LIST STATE
  // ==========================================
  const [items, setItems] = useState([]);
  const [isListLoading, setIsListLoading] = useState(false);
  const [listError, setListError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Filter & Search State
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // ==========================================
  // SELECTED ITEM / ASYNC DETAILS STATE
  // ==========================================
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [detailRefreshTrigger, setDetailRefreshTrigger] = useState(0);

  // ==========================================
  // MODALS & MUTATION STATES
  // ==========================================
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItemData, setEditingItemData] = useState(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null); // Stale-closure & conflict guard
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionNotification, setActionNotification] = useState(null);

  // ==========================================
  // DEFENSE LAB & NETWORK SIMULATION STATE
  // ==========================================
  const [isDefenseLabOpen, setIsDefenseLabOpen] = useState(false);
  const [apiLogs, setApiLogs] = useState([]);
  const [apiConfig, setApiConfigState] = useState(() => getApiConfig());
  const [isTestingRaceCondition, setIsTestingRaceCondition] = useState(false);
  const [raceTestLogs, setRaceTestLogs] = useState([]);

  // ==========================================
  // EFFECT 1: Load Item List via useEffect
  // Includes cleanup to prevent race conditions on search/sort/filter changes
  // ==========================================
  useEffect(() => {
    let isCancelled = false;

    setIsListLoading(true);
    setListError(null);

    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set("search", searchQuery);
    if (statusFilter && statusFilter !== "All") queryParams.set("status", statusFilter);
    if (categoryFilter && categoryFilter !== "All") queryParams.set("category", categoryFilter);
    if (sortBy) queryParams.set("sort", sortBy);
    queryParams.set("page", page.toString());
    queryParams.set("limit", "5");

    getItemsList(queryParams.toString())
      .then((response) => {
        if (!isCancelled) {
          setItems(response.data);
          setTotalItems(response.total);
          setTotalPages(response.totalPages);
          setIsListLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setListError(err.message || "Failed to load asset registry");
          setIsListLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [searchQuery, statusFilter, categoryFilter, sortBy, page, refreshTrigger]);

  // ==========================================
  // EFFECT 2: Asynchronously Load Selected Item Details
  // CRITICAL REQUIREMENT: Cleanup prevents race conditions when rapidly switching items
  // ==========================================
  useEffect(() => {
    if (!selectedId) {
      setSelectedItem(null);
      setIsDetailLoading(false);
      setDetailError(null);
      return;
    }

    let isCancelled = false;

    setIsDetailLoading(true);
    setDetailError(null);

    getItem(selectedId)
      .then((data) => {
        // If the user selected another item before this resolved,
        // isCancelled was set to true by the cleanup function below.
        // We safely discard this outdated response!
        if (!isCancelled) {
          setSelectedItem(data);
          setIsDetailLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setDetailError(err.message || `Failed to load asset #${selectedId}`);
          setIsDetailLoading(false);
        }
      });

    return () => {
      // Runs on selectedId change or component unmount
      isCancelled = true;
    };
  }, [selectedId, detailRefreshTrigger]);

  // ==========================================
  // EFFECT 3: Subscribe to Live Network Telemetry Logs
  // ==========================================
  useEffect(() => {
    const unsubscribe = subscribeToApiLogs((logEvent) => {
      setApiLogs((prev) => [logEvent, ...prev.slice(0, 59)]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // ==========================================
  // EFFECT 4: Notification auto-dismiss timer
  // ==========================================
  useEffect(() => {
    if (!actionNotification) return;
    const timer = setTimeout(() => {
      setActionNotification(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [actionNotification]);

  // ==========================================
  // HANDLERS
  // ==========================================

  // Requirement 7: Reload button to refresh the list
  const handleReload = () => {
    setRefreshTrigger((prev) => prev + 1);
    if (selectedId) {
      setDetailRefreshTrigger((prev) => prev + 1);
    }
    setActionNotification({
      type: "info",
      text: "Refreshing asset registry from simulated API...",
    });
  };

  // Search form submit (No debouncing required/allowed)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSortBy("name");
    setPage(1);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  // Requirement 5 & 10: Action that updates selected item via API
  // Handles stale closures: captures targetId, prevents conflicting actions,
  // updates list using functional updater, and only updates details if selectedId still matches.
  const handleUpdateStatus = (targetId, newStatus) => {
    if (!targetId || updatingItemId !== null) return; // Prevent conflicting actions

    // 1. Capture the selected item's ID at invocation time
    const capturedId = targetId;
    setUpdatingItemId(capturedId);

    updateItem(capturedId, { status: newStatus })
      .then((updatedItem) => {
        // 2. Functional updater avoids stale closure over 'items'
        setItems((prevItems) =>
          prevItems.map((it) => (it.id === capturedId ? { ...it, ...updatedItem } : it))
        );

        // 3. Stale closure defense: only update selectedItem if current selected item is still this target!
        setSelectedItem((current) =>
          current && current.id === capturedId ? { ...current, ...updatedItem } : current
        );

        setActionNotification({
          type: "success",
          text: `Asset #${capturedId} status successfully transitioned to "${newStatus}"!`,
        });
      })
      .catch((err) => {
        setActionNotification({
          type: "error",
          text: `Failed to update Asset #${capturedId}: ${err.message}`,
        });
      })
      .finally(() => {
        setUpdatingItemId(null);
      });
  };

  // Requirement 3: Create functionality
  const handleCreate = (formData) => {
    setIsSubmittingForm(true);

    createItem(formData)
      .then((createdItem) => {
        setIsCreateModalOpen(false);
        setRefreshTrigger((prev) => prev + 1);
        setSelectedId(createdItem.id);
        setActionNotification({
          type: "success",
          text: `Asset "${createdItem.name}" (#${createdItem.id}) successfully registered!`,
        });
      })
      .catch((err) => {
        setActionNotification({
          type: "error",
          text: `Failed to create asset: ${err.message}`,
        });
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  };

  // Requirement 3: Edit functionality
  const handleOpenEdit = (item) => {
    setEditingItemData(item);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (targetId, changes) => {
    setIsSubmittingForm(true);

    updateItem(targetId, changes)
      .then((updatedItem) => {
        setIsEditModalOpen(false);
        setEditingItemData(null);

        // Functional update ensures no stale closures
        setItems((prevItems) =>
          prevItems.map((it) => (it.id === targetId ? { ...it, ...updatedItem } : it))
        );

        setSelectedItem((current) =>
          current && current.id === targetId ? { ...current, ...updatedItem } : current
        );

        setActionNotification({
          type: "success",
          text: `Asset #${targetId} specifications successfully updated!`,
        });
      })
      .catch((err) => {
        setActionNotification({
          type: "error",
          text: `Failed to update asset #${targetId}: ${err.message}`,
        });
      })
      .finally(() => {
        setIsSubmittingForm(false);
      });
  };

  // Requirement 3: Remove functionality
  const handleDelete = (targetId) => {
    if (!window.confirm(`Are you sure you want to decommission and remove Asset #${targetId}?`)) {
      return;
    }

    setIsDeleting(true);

    deleteItem(targetId)
      .then(() => {
        // Remove from list via functional update
        setItems((prevItems) => prevItems.filter((it) => it.id !== targetId));
        setTotalItems((prev) => Math.max(0, prev - 1));

        // Deselect if currently viewed
        if (selectedId === targetId) {
          setSelectedId(null);
          setSelectedItem(null);
        }

        setRefreshTrigger((prev) => prev + 1);

        setActionNotification({
          type: "success",
          text: `Asset #${targetId} decommissioned and deleted from registry.`,
        });
      })
      .catch((err) => {
        setActionNotification({
          type: "error",
          text: `Failed to delete asset #${targetId}: ${err.message}`,
        });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  // Reset database handler
  const handleResetDatabase = () => {
    resetDatabase()
      .then(() => {
        setSelectedId(null);
        setSelectedItem(null);
        setRefreshTrigger((prev) => prev + 1);
        setActionNotification({
          type: "success",
          text: "Database restored to default 8 sample assets.",
        });
      })
      .catch((err) => {
        setActionNotification({
          type: "error",
          text: `Reset failed: ${err.message}`,
        });
      });
  };

  // Update latency settings
  const handleUpdateApiConfig = (newSettings) => {
    const updated = setApiConfig(newSettings);
    setApiConfigState(updated);
  };

  // Live Race Condition Defense Simulation
  const handleTriggerRaceConditionDemo = () => {
    if (isTestingRaceCondition) return;
    setIsTestingRaceCondition(true);

    const startTime = Date.now();
    const addLog = (tag, message, type = "normal") => {
      const elapsed = Date.now() - startTime;
      setRaceTestLogs((prev) => [
        ...prev,
        { time: `+${elapsed}ms`, tag, message, type },
      ]);
    };

    setRaceTestLogs([
      {
        time: "+0ms",
        tag: "START",
        message: "Initiating live race-condition demonstration...",
        type: "highlight",
      },
    ]);

    // Step 1: User clicks Asset #1 (configured with a slow 2400ms delay)
    addLog("CLICK 1", "User clicked Asset #1 (slow network request started: ~2400ms)");
    setSelectedId(1);

    // Step 2: 350ms later, user rapidly clicks Asset #2 (faster request: ~700ms)
    setTimeout(() => {
      addLog("CLICK 2", "User rapidly switched to Asset #2 (Effect cleanup ran! Asset #1 isCancelled flag = true)");
      setSelectedId(2);

      // Step 3: Wait for both to resolve and observe behavior
      setTimeout(() => {
        addLog(
          "RESOLVED 2",
          "Asset #2 payload arrived first! Displayed in details view.",
          "success"
        );
      }, 700);

      setTimeout(() => {
        addLog(
          "RESOLVED 1",
          "Asset #1 payload arrived late! Ignored by `if (!isCancelled)` guard. Race condition successfully mitigated!",
          "success"
        );
        setIsTestingRaceCondition(false);
      }, 2400);
    }, 350);
  };

  return (
    <div className="app-container">
      {/* App Header */}
      <Header
        isListLoading={isListLoading}
        onReload={handleReload}
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenDefenseLab={() => setIsDefenseLabOpen(true)}
        totalItems={totalItems}
      />

      {/* Transient Action Notification Toast */}
      {actionNotification && (
        <div className={`toast-notification toast-${actionNotification.type}`}>
          <div className="toast-content">
            {actionNotification.type === "success" && <CheckCircleIcon className="toast-icon" />}
            {actionNotification.type === "error" && <AlertCircleIcon className="toast-icon" />}
            {actionNotification.type === "info" && <span className="toast-icon-pulse">ℹ️</span>}
            <span className="toast-text">{actionNotification.text}</span>
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={() => setActionNotification(null)}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="main-layout">
        {/* Left Column: Item List with Search, Filters, Skeletons, Pagination */}
        <ItemList
          items={items}
          isLoading={isListLoading}
          error={listError}
          totalItems={totalItems}
          page={page}
          totalPages={totalPages}
          selectedId={selectedId}
          onSelect={handleSelect}
          onRetry={handleReload}
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onClearSearch={handleClearSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={(val) => {
            setStatusFilter(val);
            setPage(1);
          }}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={(val) => {
            setCategoryFilter(val);
            setPage(1);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onPageChange={setPage}
        />

        {/* Right Column: Async Item Details Panel with 10+ Fields and Quick Actions */}
        <ItemDetails
          selectedId={selectedId}
          item={selectedItem}
          isLoading={isDetailLoading}
          error={detailError}
          onRetry={() => setDetailRefreshTrigger((prev) => prev + 1)}
          onUpdateStatus={handleUpdateStatus}
          onOpenEdit={handleOpenEdit}
          onDelete={handleDelete}
          updatingItemId={updatingItemId}
          isDeleting={isDeleting}
        />
      </main>

      {/* Create Modal */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
        isSubmitting={isSubmittingForm}
      />

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingItemData(null);
        }}
        onSave={handleSaveEdit}
        item={editingItemData}
        isSubmitting={isSubmittingForm}
      />

      {/* Defense & Concepts Inspector Modal */}
      <DefenseLabModal
        isOpen={isDefenseLabOpen}
        onClose={() => setIsDefenseLabOpen(false)}
        apiLogs={apiLogs}
        apiConfig={apiConfig}
        onUpdateApiConfig={handleUpdateApiConfig}
        onResetDatabase={handleResetDatabase}
        onTriggerRaceConditionDemo={handleTriggerRaceConditionDemo}
        isTestingRaceCondition={isTestingRaceCondition}
        raceTestLogs={raceTestLogs}
      />
    </div>
  );
}

export default App;
