import { API_CONFIG, DATA_KEY, getApiConfig, setApiConfig } from "./settings.js";
import { initialDataSample } from "./initial-data-sample.js";

// Optional listeners for live request visualization in Defense Lab
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
    setTimeout(() => {
      const willFail = Math.random() < errorChance;
      if (willFail) {
        const error = new Error("Simulated server Error");
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
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].category) {
      // Upgrade or reset to rich data sample if older version format was present
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

// Reset database to initial sample data
export async function resetDatabase() {
  return fakeRequest("POST /system/reset", () => {
    localStorage.setItem(DATA_KEY, JSON.stringify(initialDataSample));
    return initialDataSample;
  }, { minDelay: 300, maxDelay: 600, errorChance: 0 });
}

export async function getItemsList(query = "", requestOptions = {}) {
  return fakeRequest(`GET /items${query ? `?${query}` : ""}`, () => {
    const params = new URLSearchParams(query);
    const search = params.get("search")?.trim().toLowerCase();
    const status = params.get("status");
    const category = params.get("category");
    const sort = params.get("sort") || "name";
    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.max(1, Number(params.get("limit")) || 6);

    let items = readData();

    // Search filter across name, description, assignedTo, location, specifications
    if (search) {
      items = items.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(search)) ||
          (item.description && item.description.toLowerCase().includes(search)) ||
          (item.category && item.category.toLowerCase().includes(search)) ||
          (item.assignedTo && item.assignedTo.toLowerCase().includes(search)) ||
          (item.location && item.location.toLowerCase().includes(search))
      );
    }

    // Status filter
    if (status && status !== "All") {
      items = items.filter(
        (item) => item.status && item.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Category filter
    if (category && category !== "All") {
      items = items.filter(
        (item) => item.category && item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sorting
    items = [...items].sort((a, b) => {
      switch (sort) {
        case "name-desc":
          return (b.name || "").localeCompare(a.name || "");
        case "health-desc":
          return (b.systemHealth || 0) - (a.systemHealth || 0);
        case "budget-desc":
          return (b.budget || 0) - (a.budget || 0);
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

    // Pagination
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

export async function getItem(id, requestOptions = {}) {
  const numericId = Number(id);
  return fakeRequest(`GET /items/${numericId}`, () => {
    const items = readData();
    const item = items.find((it) => it.id === numericId);

    if (!item) {
      throw new Error(`Item with ID #${numericId} not found`);
    }

    return { ...item };
  }, requestOptions);
}

export async function createItem(data, requestOptions = {}) {
  return fakeRequest("POST /items", () => {
    const items = readData();

    const nextId =
      items.length > 0 ? Math.max(...items.map((it) => it.id)) + 1 : 1;

    const newItem = {
      id: nextId,
      name: data.name || `System Asset #${nextId}`,
      category: data.category || "Infrastructure",
      status: data.status || "Active",
      priority: data.priority || "Medium",
      assignedTo: data.assignedTo || "Unassigned Operative",
      budget: Number(data.budget) || 75000,
      description: data.description || "Operational asset deployed into system registry.",
      securityClearance: data.securityClearance || "Class 2 - Internal",
      systemHealth: typeof data.systemHealth === "number" ? data.systemHealth : 100,
      location: data.location || "Sector 01 — Central Citadel",
      lastInspection: data.lastInspection || new Date().toISOString().split("T")[0],
      specifications: data.specifications || "Standard Telemetry & Computational Node v2.1",
      maintenanceNotes: data.maintenanceNotes || "Newly registered asset. System initialization logged.",
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
      throw new Error(`Item with ID #${numericId} not found`);
    }

    const updatedItems = items.map((it) =>
      it.id === numericId
        ? {
            ...it,
            ...changes,
            id: numericId, // protect id from being overwritten
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
      throw new Error(`Item with ID #${numericId} not found`);
    }

    const updatedItems = items.filter((it) => it.id !== numericId);
    writeData(updatedItems);

    return {
      success: true,
      id: numericId,
    };
  }, requestOptions);
}
