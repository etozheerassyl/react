/* eslint-disable no-restricted-globals */
/**
 * AEGIS CORE — Service Worker
 * ---------------------------------------------------------------------------
 * Hand-written service worker (no Workbox). At build time
 * sw/vite-plugin-service-worker.js injects BUILD_VERSION and the precache
 * manifest and writes the result to dist/sw.js.
 *
 * Lifecycle
 *   install  -> pre-cache the application shell into a *versioned* cache
 *               (no skipWaiting: an update waits until the user clicks "Update")
 *   activate -> delete outdated aegis-core-* caches, claim open clients
 *   message  -> SKIP_WAITING (activate the waiting update), GET_STATUS
 *   fetch    -> route every GET request to a caching strategy (below)
 *
 * Strategies
 *   App shell (JS/CSS/HTML/icons)  : precache, cache-first (versioned per build)
 *   Navigations                    : precached shell -> network -> offline.html
 *   Public API list/details        : NETWORK-FIRST (4s timeout) -> cached copy
 *   Images / icons / fonts         : CACHE-FIRST with expiration + max entries
 *   Google Fonts stylesheet        : stale-while-revalidate
 *   Auth / tokens / private data   : never intercepted, never cached
 */

const BUILD_VERSION = "__BUILD_VERSION__";
const BUILD_TIME = "__BUILD_TIME__";
const PRECACHE_MANIFEST = self.__PRECACHE_MANIFEST__;

const CACHE_PREFIX = "aegis-core";
// Runtime caches have their own version: bump it only if the cached data format changes,
// so offline API data survives normal app deploys.
const RUNTIME_VERSION = "v1";

const CACHE_NAMES = {
  precache: `${CACHE_PREFIX}-precache-${BUILD_VERSION}`,
  api: `${CACHE_PREFIX}-api-${RUNTIME_VERSION}`,
  static: `${CACHE_PREFIX}-static-${RUNTIME_VERSION}`,
  pages: `${CACHE_PREFIX}-pages-${RUNTIME_VERSION}`,
};

// Cache-growth limits (expiration + max number of entries per runtime cache)
const POLICIES = {
  api: { maxEntries: 60, maxAgeSeconds: 7 * 24 * 60 * 60, networkTimeoutMs: 4000 },
  static: { maxEntries: 80, maxAgeSeconds: 30 * 24 * 60 * 60 },
  pages: { maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60, networkTimeoutMs: 5000 },
};

const CACHED_AT_HEADER = "X-Aegis-Cached-At";
const SOURCE_HEADER = "X-Aegis-Source";

const SCOPE_URL = new URL(self.registration.scope);
const SHELL_URL = new URL("index.html", SCOPE_URL).href;
const OFFLINE_URL = new URL("offline.html", SCOPE_URL).href;
const API_PREFIX = new URL("api/", SCOPE_URL).pathname;
const PRECACHE_URLS = new Set(PRECACHE_MANIFEST.map((path) => new URL(path, SCOPE_URL).href));

// Hosts used by Firebase Authentication / Google identity. Requests to them carry
// credentials or tokens and must never be stored in a shared cache.
const PRIVATE_HOSTS = [
  "identitytoolkit.googleapis.com",
  "securetoken.googleapis.com",
  "firebaseinstallations.googleapis.com",
  "firestore.googleapis.com",
  "www.googleapis.com",
  "apis.google.com",
  "accounts.google.com",
  "oauth2.googleapis.com",
];

/* ------------------------------------------------------------------------ */
/* Lifecycle                                                                 */
/* ------------------------------------------------------------------------ */

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAMES.precache);
      // cache: "reload" bypasses the HTTP cache so a new SW never stores stale shell files
      await cache.addAll(
        [...PRECACHE_URLS].map((url) => new Request(url, { cache: "reload" }))
      );
    })()
  );
  // Intentionally NOT calling self.skipWaiting(): when an older version controls the page,
  // this worker stays "waiting" and the UI offers an "Update now" button (SKIP_WAITING).
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set(Object.values(CACHE_NAMES));
      const existing = await caches.keys();
      await Promise.all(
        existing
          .filter((name) => name.startsWith(CACHE_PREFIX) && !keep.has(name))
          .map((name) => caches.delete(name))
      );

      await self.clients.claim();

      const windows = await self.clients.matchAll({ type: "window" });
      windows.forEach((client) =>
        client.postMessage({ type: "SW_ACTIVATED", version: BUILD_VERSION })
      );
    })()
  );
});

self.addEventListener("message", (event) => {
  const type = event.data?.type;

  if (type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  if (type === "GET_STATUS") {
    const reply = (payload) => {
      if (event.ports?.[0]) event.ports[0].postMessage(payload);
      else event.source?.postMessage(payload);
    };
    event.waitUntil(getStatus().then(reply));
  }
});

async function getStatus() {
  const names = await caches.keys();
  const ours = names.filter((name) => name.startsWith(CACHE_PREFIX));
  const cachesInfo = await Promise.all(
    ours.map(async (name) => {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      return { name, entries: keys.length };
    })
  );
  return {
    type: "SW_STATUS",
    version: BUILD_VERSION,
    builtAt: BUILD_TIME,
    precacheSize: PRECACHE_URLS.size,
    caches: cachesInfo,
    policies: POLICIES,
  };
}

/* ------------------------------------------------------------------------ */
/* Fetch routing                                                             */
/* ------------------------------------------------------------------------ */

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only GET requests are cacheable. POST/PUT/DELETE (e.g. Firebase sign-in,
  // token refresh) always go straight to the network.
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  // Never cache authentication responses, tokens or private user data.
  if (isPrivateRequest(request, url)) return;

  // Connectivity probes must reach the real network.
  if (url.searchParams.has("__probe") || url.href === new URL("version.json", SCOPE_URL).href) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request, url));
    return;
  }

  if (isInScope(url) && url.pathname.startsWith(API_PREFIX)) {
    event.respondWith(networkFirst(request, CACHE_NAMES.api, POLICIES.api));
    return;
  }

  if (PRECACHE_URLS.has(`${url.origin}${url.pathname}`)) {
    event.respondWith(precacheFirst(request));
    return;
  }

  if (url.hostname === "fonts.googleapis.com") {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAMES.static, POLICIES.static));
    return;
  }

  if (isStaticAsset(request, url)) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.static, POLICIES.static));
  }
  // Anything else: default browser networking (not cached by the SW).
});

function isInScope(url) {
  return url.href.startsWith(SCOPE_URL.href);
}

function isPrivateRequest(request, url) {
  if (request.headers.has("Authorization")) return true;
  if (request.cache === "no-store") return true;
  if (PRIVATE_HOSTS.includes(url.hostname)) return true;
  if (url.hostname.endsWith(".firebaseapp.com") || url.hostname.endsWith(".web.app")) return true;
  // Google profile photos are private user data
  if (url.hostname.endsWith("googleusercontent.com")) return true;
  if (url.pathname.includes("/__/auth/")) return true;
  return false;
}

function isStaticAsset(request, url) {
  if (request.destination === "image" || request.destination === "font") return true;
  if (url.hostname === "fonts.gstatic.com") return true;
  return /\.(png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf)$/i.test(url.pathname);
}

/* ------------------------------------------------------------------------ */
/* Strategies                                                                */
/* ------------------------------------------------------------------------ */

/** Precached shell files: versioned cache first, network as a safety net. */
async function precacheFirst(request) {
  const cache = await caches.open(CACHE_NAMES.precache);
  const cached = await cache.match(request, { ignoreSearch: true, ignoreVary: true });
  if (cached) return cached;
  try {
    return await fetch(request);
  } catch {
    return Response.error();
  }
}

/**
 * Navigations. The SPA uses HashRouter, so every route is served by index.html:
 *   - scope root / index.html -> precached app shell (works fully offline)
 *   - other in-scope documents -> network-first, then cached copy, then offline.html
 */
async function handleNavigation(request, url) {
  const cleanHref = `${url.origin}${url.pathname}`;
  const bareScope = SCOPE_URL.href.endsWith("/")
    ? SCOPE_URL.href.slice(0, -1)
    : SCOPE_URL.href;
  const isShell =
    cleanHref === SCOPE_URL.href ||
    cleanHref === bareScope ||
    cleanHref === SHELL_URL;

  if (isShell) {
    const precache = await caches.open(CACHE_NAMES.precache);
    const shell = await precache.match(SHELL_URL);
    if (shell) return shell;
    try {
      return await fetch(request);
    } catch {
      return offlineFallback();
    }
  }

  try {
    const response = await fetchWithTimeout(request, POLICIES.pages.networkTimeoutMs);
    if (response.ok && isInScope(url)) {
      putWithExpiration(CACHE_NAMES.pages, request, response.clone(), POLICIES.pages);
    }
    return response;
  } catch {
    const cached = await matchFresh(CACHE_NAMES.pages, request, POLICIES.pages);
    return cached || offlineFallback();
  }
}

async function offlineFallback() {
  const precache = await caches.open(CACHE_NAMES.precache);
  const offline = await precache.match(OFFLINE_URL);
  return (
    offline ||
    new Response("<h1>Offline</h1><p>Check your connection and try again.</p>", {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  );
}

/**
 * NETWORK-FIRST (public API list + details).
 * Fresh data whenever the network answers within the timeout; otherwise the last
 * cached response is returned and flagged with X-Aegis-Source: sw-cache so the UI
 * can tell the user they are looking at cached data.
 */
async function networkFirst(request, cacheName, policy) {
  const networkRequest = new Request(request, { cache: "no-cache" });
  const networkPromise = fetch(networkRequest).then(async (response) => {
    if (isCacheable(response)) {
      await putWithExpiration(cacheName, request, response.clone(), policy);
    }
    return response;
  });

  try {
    return await withTimeout(networkPromise, policy.networkTimeoutMs);
  } catch {
    // Keep the slow request alive so the cache is still refreshed when it finishes.
    networkPromise.catch(() => {});
    const cached = await matchFresh(cacheName, request, policy);
    if (cached) return withHeaders(cached, { [SOURCE_HEADER]: "sw-cache" });

    return new Response(
      JSON.stringify({
        error: "offline",
        message: "No network connection and no cached copy of this resource is available yet.",
      }),
      {
        status: 503,
        statusText: "Offline",
        headers: { "Content-Type": "application/json", [SOURCE_HEADER]: "offline" },
      }
    );
  }
}

/** CACHE-FIRST (images, icons, fonts). */
async function cacheFirst(request, cacheName, policy) {
  const cached = await matchFresh(cacheName, request, policy);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (isCacheable(response, { allowOpaque: true })) {
      await putWithExpiration(cacheName, request, response.clone(), policy);
    }
    return response;
  } catch {
    if (request.destination === "image") return placeholderImage();
    return Response.error();
  }
}

/** STALE-WHILE-REVALIDATE (Google Fonts stylesheet). */
async function staleWhileRevalidate(request, cacheName, policy) {
  const cached = await matchFresh(cacheName, request, policy);
  const revalidate = fetch(request)
    .then(async (response) => {
      if (isCacheable(response, { allowOpaque: true })) {
        await putWithExpiration(cacheName, request, response.clone(), policy);
      }
      return response;
    })
    .catch(() => null);

  if (cached) return cached;
  return (
    (await revalidate) ||
    new Response("", { status: 200, headers: { "Content-Type": "text/css; charset=utf-8" } })
  );
}

/* ------------------------------------------------------------------------ */
/* Cache helpers: expiration + max entries                                   */
/* ------------------------------------------------------------------------ */

function isCacheable(response, { allowOpaque = false } = {}) {
  if (!response) return false;
  if (response.type === "opaque") return allowOpaque;
  if (!response.ok) return false;
  const cacheControl = response.headers.get("Cache-Control") || "";
  if (/no-store|private/i.test(cacheControl)) return false;
  return true;
}

/** Stores a response stamped with its cache time and trims the cache to maxEntries. */
async function putWithExpiration(cacheName, request, response, policy) {
  try {
    const cache = await caches.open(cacheName);
    let stamped = response;

    if (response.type !== "opaque") {
      const headers = new Headers(response.headers);
      headers.set(CACHED_AT_HEADER, String(Date.now()));
      stamped = new Response(await response.blob(), {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    // delete + put moves the entry to the end of the key list (LRU-style ordering)
    await cache.delete(request);
    await cache.put(request, stamped);
    await trimCache(cache, policy.maxEntries);
  } catch {
    // Quota errors etc. must never break the response flow.
  }
}

async function trimCache(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  await Promise.all(keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key)));
}

/** Returns a cached response unless it is older than policy.maxAgeSeconds. */
async function matchFresh(cacheName, request, policy) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreVary: true });
  if (!cached) return null;

  const cachedAt = Number(cached.headers.get(CACHED_AT_HEADER));
  if (cachedAt && Date.now() - cachedAt > policy.maxAgeSeconds * 1000) {
    await cache.delete(request);
    return null;
  }
  return cached;
}

async function withHeaders(response, extraHeaders) {
  const headers = new Headers(response.headers);
  Object.entries(extraHeaders).forEach(([key, value]) => headers.set(key, value));
  return new Response(await response.blob(), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("network-timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

function fetchWithTimeout(request, ms) {
  return withTimeout(fetch(request), ms);
}

function placeholderImage() {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
    '<rect width="400" height="300" fill="#0f1523"/>' +
    '<text x="200" y="155" fill="#64748b" font-family="sans-serif" font-size="16" text-anchor="middle">' +
    "Image unavailable offline</text></svg>";
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
}

