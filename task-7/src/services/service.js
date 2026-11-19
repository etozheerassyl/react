import { getApiConfig, setApiConfig, LOCAL_CHANGES_KEY } from "./settings.js";

/**
 * AEGIS CORE // API SERVICE LAYER
 * ---------------------------------------------------------------------------
 * Reads come from the public read-only REST API over HTTP:
 *   GET api/assets.json      (list)
 *   GET api/assets/:id.json  (details)
 * so the service worker can cache them (network-first) and serve them offline.
 *
 * Writes (create / update / delete) cannot be sent to a static public API, so
 * they are stored as a small local change-set in localStorage and merged on
 * top of the fetched data. "Reset Database" clears that change-set.
 *
 * Every response carries `meta.source`:
 *   "network" -> fresh response from the API
 *   "cache"   -> served by the service worker cache (offline / slow network)
 *   "local"   -> record that only exists in the local change-set
 */

const apiListeners = new Set();
let requestIdCounter = 1;

export class OfflineError extends Error {
  constructor(message = "You are offline and this data has not been cached yet.") {
    super(message);
    this.name = "OfflineError";
    this.isOffline = true;
  }
}

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

/**
 * Wraps an async operation with the configurable latency / failure simulation
 * used by the Defense Lab, plus AbortSignal support and telemetry logging.
 */
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

  const logFailure = (error) => {
    const aborted = error?.name === "AbortError";
    notifyListeners({
      id: reqId,
      type: aborted ? "request_aborted" : "request_failed",
      operation: operationName,
      delay: delayMS,
      duration: Date.now() - startTime,
      error: aborted ? "Request aborted by client" : error?.message,
      offline: Boolean(error?.isOffline),
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  return new Promise((resolve, reject) => {
    let timerId = null;
    let settled = false;

    const onAbort = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timerId);
      const abortError = new DOMException("Request was aborted", "AbortError");
      logFailure(abortError);
      reject(abortError);
    };

    if (signal?.aborted) {
      onAbort();
      return;
    }

    if (signal) {
      signal.addEventListener("abort", onAbort, { once: true });
    }

    timerId = setTimeout(async () => {
      const willFail = Math.random() < errorChance;
      if (willFail) {
        settled = true;
        signal?.removeEventListener("abort", onAbort);
        const error = new Error("Simulated server Error (500)");
        logFailure(error);
        reject(error);
        return;
      }

      try {
        const result = await operation(signal);
        if (settled) return;
        settled = true;
        signal?.removeEventListener("abort", onAbort);
        notifyListeners({
          id: reqId,
          type: "request_success",
          operation: operationName,
          delay: delayMS,
          duration: Date.now() - startTime,
          source: result?.meta?.source || "local",
          timestamp: new Date().toLocaleTimeString(),
        });
        resolve(result);
      } catch (error) {
        if (settled) return;
        settled = true;
        signal?.removeEventListener("abort", onAbort);
        logFailure(error);
        reject(error);
      }
    }, delayMS);
  });
}

/* -------------------------------------------------------------------------- */
/* HTTP client for the public API                                              */
/* -------------------------------------------------------------------------- */

function apiUrl(path) {
  return new URL(`api/${path}`, document.baseURI).href;
}

/**
 * GET a JSON endpoint. Returns { body, meta } or { notFound: true }.
 * Throws OfflineError when neither the network nor the SW cache can answer.
 */
async function fetchJson(path, signal) {
  let response;
  try {
    response = await fetch(apiUrl(path), {
      signal,
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new OfflineError();
  }

  const swSource = response.headers.get("X-Aegis-Source");
  if (response.status === 503 && swSource === "offline") {
    throw new OfflineError();
  }
  if (response.status === 404) {
    return { notFound: true };
  }
  if (!response.ok) {
    throw new Error(`Registry API responded with HTTP ${response.status}.`);
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error("Registry API returned an invalid JSON payload.");
  }

  const cachedAt = Number(response.headers.get("X-Aegis-Cached-At")) || null;
  return {
    body,
    meta: {
      source: swSource === "sw-cache" ? "cache" : "network",
      cachedAt: swSource === "sw-cache" ? cachedAt : null,
      receivedAt: Date.now(),
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Local change-set (offline-safe writes merged over API data)                 */
/* -------------------------------------------------------------------------- */

function emptyChanges() {
  return { created: [], updated: {}, deleted: [] };
}

function readChanges() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_CHANGES_KEY) || "null");
    if (!parsed || typeof parsed !== "object") return emptyChanges();
    return {
      created: Array.isArray(parsed.created) ? parsed.created : [],
      updated: parsed.updated && typeof parsed.updated === "object" ? parsed.updated : {},
      deleted: Array.isArray(parsed.deleted) ? parsed.deleted : [],
    };
  } catch {
    return emptyChanges();
  }
}

function writeChanges(changes) {
  try {
    localStorage.setItem(LOCAL_CHANGES_KEY, JSON.stringify(changes));
  } catch (err) {
    console.error("Failed to write local registry changes:", err);
  }
}

function applyChanges(remoteItems, changes = readChanges()) {
  const deleted = new Set(changes.deleted);
  const merged = remoteItems
    .filter((item) => !deleted.has(item.id))
    .map((item) => (changes.updated[item.id] ? { ...item, ...changes.updated[item.id], id: item.id } : item));
  return [...merged, ...changes.created.filter((item) => !deleted.has(item.id))];
}

const prefetchedIds = new Set();

function prefetchItemDetails(items) {
  if (typeof navigator !== "undefined" && !navigator.onLine) return;
  const localIds = new Set(readChanges().created.map((it) => it.id));
  for (const item of items) {
    if (!item || localIds.has(item.id) || prefetchedIds.has(item.id)) continue;
    prefetchedIds.add(item.id);
    fetch(apiUrl(`assets/${item.id}.json`), {
      headers: { Accept: "application/json" },
    }).catch(() => {
      prefetchedIds.delete(item.id);
    });
  }
}

async function fetchCatalog(signal) {
  const result = await fetchJson("assets.json", signal);
  if (result.notFound) throw new Error("Registry list endpoint is unavailable.");
  const remote = Array.isArray(result.body?.data) ? result.body.data : [];
  return { items: applyChanges(remote), meta: result.meta };
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

export async function resetDatabase() {
  return fakeRequest(
    "POST /system/reset",
    () => {
      writeChanges(emptyChanges());
      return { success: true };
    },
    { minDelay: 200, maxDelay: 400, errorChance: 0 }
  );
}

export async function getAllItems(requestOptions = {}) {
  return fakeRequest(
    "GET /api/assets.json",
    async (signal) => {
      const { items } = await fetchCatalog(signal);
      return items;
    },
    requestOptions
  );
}

export async function getItemsList(query = "", requestOptions = {}) {
  return fakeRequest(`GET /api/assets.json${query ? `?${query}` : ""}`, async (signal) => {
    const params = new URLSearchParams(query);
    const search = params.get("search")?.trim().toLowerCase();
    const status = params.get("status");
    const category = params.get("category");
    const priority = params.get("priority");
    const sort = params.get("sort") || "name";
    const page = Math.max(1, Number(params.get("page")) || 1);
    const limit = Math.max(1, Number(params.get("limit")) || 6);

    const catalog = await fetchCatalog(signal);
    let items = catalog.items;

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

    if (catalog.meta?.source === "network") {
      prefetchItemDetails(data);
    }

    return {
      data,
      total,
      page: safePage,
      limit,
      totalPages,
      meta: catalog.meta,
    };
  }, requestOptions);
}

/** Resolves a single record: local change-set first, then GET api/assets/:id.json */
async function resolveItem(numericId, signal) {
  const changes = readChanges();
  if (changes.deleted.includes(numericId)) {
    throw new Error(`Asset #${numericId} was not found in the Aegis registry database.`);
  }

  const localItem = changes.created.find((it) => it.id === numericId);
  if (localItem) {
    return { item: { ...localItem }, meta: { source: "local", cachedAt: null, receivedAt: Date.now() } };
  }

  const result = await fetchJson(`assets/${numericId}.json`, signal);
  if (result.notFound || !result.body?.data) {
    throw new Error(`Asset #${numericId} was not found in the Aegis registry database.`);
  }

  const patch = changes.updated[numericId];
  return {
    item: patch ? { ...result.body.data, ...patch, id: numericId } : { ...result.body.data },
    meta: result.meta,
  };
}

/** Returns { item, meta } */
export async function getItemById(id, requestOptions = {}) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return fakeRequest(`GET /api/assets/${id}.json`, () => {
      throw new Error(`Invalid asset identifier "${id}". Expected integer ID.`);
    }, requestOptions);
  }

  return fakeRequest(
    `GET /api/assets/${numericId}.json`,
    (signal) => resolveItem(numericId, signal),
    requestOptions
  );
}

// Alias for compatibility
export const getItem = getItemById;

export async function createItem(data, requestOptions = {}) {
  return fakeRequest("POST /items (local change-set)", async (signal) => {
    const { items } = await fetchCatalog(signal);
    const changes = readChanges();
    const knownIds = [...items.map((it) => it.id), ...changes.deleted];
    const nextId = knownIds.length > 0 ? Math.max(...knownIds) + 1 : 1;

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

    writeChanges({ ...changes, created: [...changes.created, newItem] });
    return newItem;
  }, requestOptions);
}

export async function updateItem(id, changesToApply, requestOptions = {}) {
  const numericId = Number(id);
  return fakeRequest(`PATCH /items/${numericId} (local change-set)`, async (signal) => {
    const { item: current } = await resolveItem(numericId, signal).catch((error) => {
      if (error?.isOffline) throw error;
      throw new Error(`Asset #${numericId} not found`);
    });

    const { id: _ignored, ...safeChanges } = changesToApply || {};
    const updated = { ...current, ...safeChanges, id: numericId };
    const changes = readChanges();

    if (changes.created.some((it) => it.id === numericId)) {
      changes.created = changes.created.map((it) => (it.id === numericId ? updated : it));
    } else {
      changes.updated = {
        ...changes.updated,
        [numericId]: { ...(changes.updated[numericId] || {}), ...safeChanges },
      };
    }

    writeChanges(changes);
    return updated;
  }, requestOptions);
}

export async function deleteItem(id, requestOptions = {}) {
  const numericId = Number(id);
  return fakeRequest(`DELETE /items/${numericId} (local change-set)`, async (signal) => {
    const changes = readChanges();
    const isLocal = changes.created.some((it) => it.id === numericId);

    if (isLocal) {
      changes.created = changes.created.filter((it) => it.id !== numericId);
    } else {
      // Make sure the record exists (network or SW cache) before tombstoning it
      await resolveItem(numericId, signal).catch((error) => {
        if (error?.isOffline) throw error;
        throw new Error(`Asset #${numericId} not found`);
      });
      const { [numericId]: _removed, ...restUpdated } = changes.updated;
      changes.updated = restUpdated;
      changes.deleted = [...new Set([...changes.deleted, numericId])];
    }

    writeChanges(changes);
    return {
      success: true,
      id: numericId,
    };
  }, requestOptions);
}

export async function getDashboardStats(filterCategory = "All", requestOptions = {}) {
  return fakeRequest(`GET /api/assets.json → stats?category=${filterCategory}`, async (signal) => {
    const catalog = await fetchCatalog(signal);
    const allItems = catalog.items;

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
      meta: catalog.meta,
    };
  }, requestOptions);
}

