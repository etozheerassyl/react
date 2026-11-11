import { API_CONFIG, DATA_KEY, getApiConfig, setApiConfig } from "./settings.js";
import { initialDataSample } from "./initialData.js";

const apiListeners = new Set();
let requestIdCounter = 1;

function notifyListeners(event) {
  for (const listener of apiListeners) {
    try {
      listener(event);
    } catch {
      // ignore listener errors
    }
  }
}

export function subscribeToApiLogs(callback) {
  apiListeners.add(callback);
  return () => {
    apiListeners.delete(callback);
  };
}

export { getApiConfig, setApiConfig };

function fakeRequest(operationName, operation, options = {}) {
  const currentConfig = getApiConfig();
  const {
    minDelay = currentConfig.minDelay,
    maxDelay = currentConfig.maxDelay,
    errorChance = currentConfig.errorChance,
    explicitDelay,
    signal,
  } = options;

  const reqId = requestIdCounter++;
  const delayMS =
    typeof explicitDelay === "number"
      ? explicitDelay
      : Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  const startTime = Date.now();
  notifyListeners({
    id: reqId,
    type: "request_start",
    operation: operationName,
    delay: delayMS,
    startTime,
    timestamp: new Date().toLocaleTimeString(),
  });

  return new Promise((resolve, reject) => {
    let timerId = null;

    const onAbort = () => {
      clearTimeout(timerId);
      const abortError = new DOMException("Request was aborted", "AbortError");
      notifyListeners({
        id: reqId,
        type: "request_aborted",
        operation: operationName,
        delay: delayMS,
        duration: Date.now() - startTime,
        error: "Request aborted by client",
        timestamp: new Date().toLocaleTimeString(),
      });
      reject(abortError);
    };

    if (signal?.aborted) {
      onAbort();
      return;
    }

    if (signal) {
      signal.addEventListener("abort", onAbort, { once: true });
    }

    timerId = setTimeout(() => {
      if (signal) {
        signal.removeEventListener("abort", onAbort);
      }

      const willFail = Math.random() < errorChance;
      if (willFail) {
        const error = new Error("Simulated server Error (500)");
        notifyListeners({
          id: reqId,
          type: "request_failed",
          operation: operationName,
          delay: delayMS,
          duration: Date.now() - startTime,
          error: error.message,
          timestamp: new Date().toLocaleTimeString(),
        });
        reject(error);
        return;
      }

      try {
        const result = operation();
        notifyListeners({
          id: reqId,
          type: "request_success",
          operation: operationName,
          delay: delayMS,
          duration: Date.now() - startTime,
          timestamp: new Date().toLocaleTimeString(),
        });
        resolve(result);
      } catch (error) {
        notifyListeners({
          id: reqId,
          type: "request_failed",
          operation: operationName,
          delay: delayMS,
          duration: Date.now() - startTime,
          error: error.message,
          timestamp: new Date().toLocaleTimeString(),
        });
        reject(error);
      }
    }, delayMS);
  });
}

function initializeDatabase() {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (!raw) {
      localStorage.setItem(DATA_KEY, JSON.stringify(initialDataSample));
      return;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < 8 || !parsed[0].category) {
      localStorage.setItem(DATA_KEY, JSON.stringify(initialDataSample));
    }
  } catch {
    localStorage.setItem(DATA_KEY, JSON.stringify(initialDataSample));
  }
}

function readData() {
  initializeDatabase();
  try {
    return JSON.parse(localStorage.getItem(DATA_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeData(items) {
  try {
    localStorage.setItem(DATA_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
  }
}

export async function resetDatabase() {
  return fakeRequest("POST /system/reset", () => {
    localStorage.setItem(DATA_KEY, JSON.stringify(initialDataSample));
    return initialDataSample;
  }, { minDelay: 200, maxDelay: 400, errorChance: 0 });
}

export async function getAllItems(requestOptions = {}) {
  return fakeRequest("GET /items/all", () => {
    return readData();
  }, requestOptions);
}

export async function getItemsList(query = "", requestOptions = {}) {
  return fakeRequest(`GET /items${query ? `?${query}` : ""}`, () => {
    const params = new URLSearchParams(query);
    const search = params.get("search")?.trim().toLowerCase();
    const status = params.get("status");
    const category = params.get("category");
    const priority = params.get("priority");
    const sort = params.get("sort") || "name";
    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.max(1, Number(params.get("limit")) || 6);

    let items = readData();

    // 1. Search filter across multiple fields
    if (search) {
      items = items.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(search)) ||
          (item.description && item.description.toLowerCase().includes(search)) ||
          (item.category && item.category.toLowerCase().includes(search)) ||
          (item.assignedTo && item.assignedTo.toLowerCase().includes(search)) ||
          (item.location && item.location.toLowerCase().includes(search)) ||
          (item.specifications && item.specifications.toLowerCase().includes(search))
      );
    }

    // 2. Status filter
    if (status && status !== "All") {
      items = items.filter(
        (item) => item.status && item.status.toLowerCase() === status.toLowerCase()
      );
    }

    // 3. Category filter
    if (category && category !== "All") {
      items = items.filter(
        (item) => item.category && item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // 4. Priority filter
    if (priority && priority !== "All") {
      items = items.filter(
        (item) => item.priority && item.priority.toLowerCase() === priority.toLowerCase()
      );
    }

    // 5. Sorting
    items = [...items].sort((a, b) => {
      switch (sort) {
        case "name-desc":
          return (b.name || "").localeCompare(a.name || "");
        case "health-desc":
          return (b.systemHealth || 0) - (a.systemHealth || 0);
        case "health-asc":
          return (a.systemHealth || 0) - (b.systemHealth || 0);
        case "budget-desc":
          return (b.budget || 0) - (a.budget || 0);
        case "budget-asc":
          return (a.budget || 0) - (b.budget || 0);
        case "priority": {
          const priorityWeight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        }
        case "id-desc":
          return b.id - a.id;
        case "id-asc":
          return a.id - b.id;
        case "name":
        default:
          return (a.name || "").localeCompare(b.name || "");
      }
    });

    // 6. Pagination
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const data = items.slice(start, start + limit);

    return {
      data,
      total,
      page: safePage,
      limit,
      totalPages,
    };
  }, requestOptions);
}

export async function getItemById(id, requestOptions = {}) {
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return fakeRequest(`GET /items/${id}`, () => {
      throw new Error(`Invalid asset identifier "${id}". Expected integer ID.`);
    }, requestOptions);
  }

  return fakeRequest(`GET /items/${numericId}`, () => {
    const items = readData();
    const item = items.find((it) => it.id === numericId);

    if (!item) {
      throw new Error(`Asset #${numericId} was not found in the Aegis registry database.`);
    }

    return { ...item };
  }, requestOptions);
}

// Alias for compatibility
export const getItem = getItemById;

export async function createItem(data, requestOptions = {}) {
  return fakeRequest("POST /items", () => {
    const items = readData();
    const nextId =
      items.length > 0 ? Math.max(...items.map((it) => it.id)) + 1 : 1;

    const newItem = {
      id: nextId,
      name: data.name?.trim() || `Operational Asset #${nextId}`,
      category: data.category || "Defense & Security",
      status: data.status || "Active",
      priority: data.priority || "Medium",
      assignedTo: data.assignedTo?.trim() || "Unassigned Operative",
      budget: Number(data.budget) || 120000,
      description: data.description?.trim() || "Operational asset deployed into system registry.",
      securityClearance: data.securityClearance || "Class 3 - Confidential",
      systemHealth: typeof data.systemHealth === "number" ? data.systemHealth : 95,
      location: data.location?.trim() || "Sector 01 — Central Citadel",
      lastInspection: data.lastInspection || new Date().toISOString().split("T")[0],
      specifications: data.specifications?.trim() || "Standard Telemetry & Computational Node v2.1",
      maintenanceNotes: data.maintenanceNotes?.trim() || "Newly registered asset. System initialization logged.",
    };

    writeData([...items, newItem]);
    return newItem;
  }, requestOptions);
}

export async function updateItem(id, changes, requestOptions = {}) {
  const numericId = Number(id);
  return fakeRequest(`PATCH /items/${numericId}`, () => {
    const items = readData();
    const exists = items.some((it) => it.id === numericId);

    if (!exists) {
      throw new Error(`Asset #${numericId} not found`);
    }

    const updatedItems = items.map((it) =>
      it.id === numericId
        ? {
            ...it,
            ...changes,
            id: numericId, // protect id
          }
        : it
    );

    writeData(updatedItems);
    return updatedItems.find((it) => it.id === numericId);
  }, requestOptions);
}

export async function deleteItem(id, requestOptions = {}) {
  const numericId = Number(id);
  return fakeRequest(`DELETE /items/${numericId}`, () => {
    const items = readData();
    const exists = items.some((it) => it.id === numericId);

    if (!exists) {
      throw new Error(`Asset #${numericId} not found`);
    }

    const updatedItems = items.filter((it) => it.id !== numericId);
    writeData(updatedItems);

    return {
      success: true,
      id: numericId,
    };
  }, requestOptions);
}

export async function getDashboardStats(filterCategory = "All", requestOptions = {}) {
  return fakeRequest(`GET /dashboard/stats?category=${filterCategory}`, () => {
    let allItems = readData();

    // If an interactive category filter is applied
    const filteredItems =
      filterCategory && filterCategory !== "All"
        ? allItems.filter((i) => i.category === filterCategory)
        : allItems;

    const totalCount = filteredItems.length;
    const activeCount = filteredItems.filter((i) => i.status === "Active").length;
    const maintenanceCount = filteredItems.filter((i) => i.status === "In Maintenance").length;
    const deployingCount = filteredItems.filter((i) => i.status === "Deploying").length;
    const standbyCount = filteredItems.filter((i) => i.status === "Standby").length;
    const decommissionedCount = filteredItems.filter((i) => i.status === "Decommissioned").length;

    const totalBudget = filteredItems.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
    const avgHealth =
      totalCount > 0
        ? Math.round(filteredItems.reduce((acc, curr) => acc + (Number(curr.systemHealth) || 0), 0) / totalCount)
        : 0;

    const criticalCount = filteredItems.filter((i) => i.priority === "Critical").length;
    const highCount = filteredItems.filter((i) => i.priority === "High").length;
    const mediumCount = filteredItems.filter((i) => i.priority === "Medium").length;
    const lowCount = filteredItems.filter((i) => i.priority === "Low").length;

    // Breakdown 1: Category breakdown (counts and total budget per category)
    const categoryMap = {};
    allItems.forEach((item) => {
      const cat = item.category || "Unassigned";
      if (!categoryMap[cat]) {
        categoryMap[cat] = { count: 0, budget: 0, activeCount: 0 };
      }
      categoryMap[cat].count += 1;
      categoryMap[cat].budget += Number(item.budget) || 0;
      if (item.status === "Active") categoryMap[cat].activeCount += 1;
    });

    const categoryBreakdown = Object.entries(categoryMap).map(([cat, stats]) => ({
      category: cat,
      count: stats.count,
      budget: stats.budget,
      activeCount: stats.activeCount,
      percentage: Math.round((stats.count / allItems.length) * 100),
    }));

    // Breakdown 2: Status breakdown
    const statusBreakdown = [
      { status: "Active", count: activeCount, color: "#10b981", percent: totalCount ? Math.round((activeCount / totalCount) * 100) : 0 },
      { status: "In Maintenance", count: maintenanceCount, color: "#f59e0b", percent: totalCount ? Math.round((maintenanceCount / totalCount) * 100) : 0 },
      { status: "Deploying", count: deployingCount, color: "#06b6d4", percent: totalCount ? Math.round((deployingCount / totalCount) * 100) : 0 },
      { status: "Standby", count: standbyCount, color: "#8b5cf6", percent: totalCount ? Math.round((standbyCount / totalCount) * 100) : 0 },
      { status: "Decommissioned", count: decommissionedCount, color: "#ef4444", percent: totalCount ? Math.round((decommissionedCount / totalCount) * 100) : 0 },
    ];

    // Breakdown 3: Health tiers
    const healthTiers = [
      { tier: "Optimal (90-100%)", count: filteredItems.filter((i) => i.systemHealth >= 90).length, color: "#10b981" },
      { tier: "Nominal (70-89%)", count: filteredItems.filter((i) => i.systemHealth >= 70 && i.systemHealth < 90).length, color: "#38bdf8" },
      { tier: "Degraded (<70%)", count: filteredItems.filter((i) => i.systemHealth < 70).length, color: "#ef4444" },
    ];

    // Top critical assets
    const topCriticalAssets = filteredItems
      .filter((i) => i.priority === "Critical" || i.priority === "High")
      .slice(0, 5);

    return {
      totalCount,
      activeCount,
      activeRate: totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0,
      totalBudget,
      avgHealth,
      criticalCount,
      highCount,
      mediumCount,
      lowCount,
      categoryBreakdown,
      statusBreakdown,
      healthTiers,
      topCriticalAssets,
      allCategories: Array.from(new Set(allItems.map((i) => i.category))),
    };
  }, requestOptions);
}

