# Aegis Core — Installable Offline-First PWA (Task 7)

> React 19 + React Router v7 + TanStack Query + Firebase Authentication application converted into an installable, offline-capable **Progressive Web App (PWA)** with a hand-written Service Worker, multi-strategy runtime caching, dedicated `/offline` mode, and mobile-first responsiveness down to `320px`.

---

## Live Demo & Repository

- **GitHub Repository:** [https://github.com/etozheerassyl/react/tree/main/task-7](https://github.com/etozheerassyl/react/tree/main/task-7)
- **Deployed Application:** [https://etozheerassyl.github.io/react/task-7/](https://etozheerassyl.github.io/react/task-7/)
- **Environment Template:** [.env.example](./.env.example)

---

## 1. PWA Manifest & Installation

- **Manifest ([`public/manifest.json`](./public/manifest.json)):** Configured with `name`, `short_name`, `start_url: "./#/"`, `scope: "./"`, `display: "standalone"`, `theme_color: "#0a0d14"`, `background_color: "#0a0d14"`, and app shortcuts for Registry and Dashboard.
- **Icons (`public/icons/`):** Provides `192×192` and `512×512` PNG icons (both `"any"` and `"maskable"`), `apple-touch-icon.png` (`180×180`), `favicon-32.png`, and vector `icon.svg`.
- **HTML Metadata ([`index.html`](./index.html)):** Links `./manifest.json`, mobile/Apple web-app meta tags, theme color, and touch icons.
- **Install Prompt (`src/pwa/PwaContext.jsx`):** Captures `beforeinstallprompt` and `appinstalled` events to offer an in-app **Install App** button in the navbar, hero section, and `/offline` center.

---

## 2. Service Worker Lifecycle & Update Mechanism

Implemented manually without Workbox in [`sw/service-worker.js`](./sw/service-worker.js) and injected at build time by [`sw/vite-plugin-service-worker.js`](./sw/vite-plugin-service-worker.js):

- **`install`:** Opens a content-hashed versioned precache (`aegis-core-precache-<BUILD_VERSION>`) and pre-caches the entire application shell (`index.html`, `offline.html`, `manifest.json`, icons, and all built JS/CSS assets) using `{ cache: "reload" }`. Intentionally avoids automatic `skipWaiting()` when replacing an active controller so updates wait cleanly for user confirmation.
- **`activate`:** Deletes all outdated `aegis-core-*` cache buckets that do not match the active build/runtime versions, calls `self.clients.claim()`, and broadcasts `SW_ACTIVATED`.
- **Update Notification & Activation (`src/components/PwaBanners.jsx`):** When a waiting Service Worker is detected (`registration.waiting` or `updatefound`), `UpdateNotificationBanner` displays a prompt with **Activate & Reload** (sends `SKIP_WAITING` and reloads once `controllerchange` fires — no manual storage clearing required). A **Simulate SW Update** control is also available in the footer and Cache & Net Lab for immediate testing.

---

## 3. Runtime Caching Strategies & Privacy Boundaries

1. **Cache-First (`aegis-core-static-v1`):**
   - Applies to static assets (images, icons, and font binaries).
   - Enforces cache-growth limits: max **80 entries** (LRU trimming) and **30-day** TTL expiration via `X-Aegis-Cached-At`.
2. **Network-First (`aegis-core-api-v1`):**
   - Applies to public REST endpoints (`api/assets.json` and `api/assets/:id.json`) published by [`api/vite-plugin-public-api.js`](./api/vite-plugin-public-api.js).
   - Waits up to **4s** for live network responses; on failure or timeout, falls back to the cached response and stamps `X-Aegis-Source: sw-cache`.
   - Enforces cache-growth limits: max **60 entries** and **7-day** TTL expiration.
   - Listed registry items also prefetch their detail JSON endpoints in the background when online so previously viewed list records stay accessible offline.
3. **Stale-While-Revalidate:** Used for Google Fonts stylesheets (`fonts.googleapis.com`).
4. **Private / Auth Exclusion (`isPrivateRequest`):**
   - Non-`GET` requests, `Authorization` headers, `cache: "no-store"` requests, connectivity probes (`__probe` / `version.json`), Google profile avatars, and Firebase Auth / Google identity hosts (`identitytoolkit.googleapis.com`, `securetoken.googleapis.com`, `apis.google.com`, `accounts.google.com`, `*.firebaseapp.com`, etc.) bypass the Service Worker cache completely.
5. **Cached Data Visibility & Graceful Errors:**
   - `CachedDataBanner` (`src/components/PwaBanners.jsx`) clearly informs users whenever responses come from `aegis-core-api-v1` or offline memory cache, with timestamp and **Try Live Fetch** button.
   - `OfflineResourceFallback` and `RouteErrorBoundary` catch uncached offline requests cleanly without crashing the app.

---

## 4. Dedicated `/offline` Page & Connectivity Handling

- **Dedicated Route (`/offline` — [`src/pages/OfflinePage.jsx`](./src/pages/OfflinePage.jsx)):** Always accessible offline via the precached shell; shows live connection state (**ONLINE — CONNECTION RESTORED** / **OFFLINE — DISCONNECTED**), a **Retry Connection** button powered by an actual network probe (`fetch("version.json?__probe=...", { cache: "no-store" })`, not just `navigator.onLine`), links to offline-accessible cached routes, and live Service Worker cache bucket inspection.
- **Document Navigation Fallback ([`public/offline.html`](./public/offline.html)):** Precached standalone HTML fallback served by the Service Worker whenever an uncached document navigation fails offline, complete with styling, connectivity badge, and **Retry Connection**.
- **Global Online/Offline Indicator:** Live clickable badge in `NavBar` plus `OfflineConnectivityBar` banner. Automatically invalidates and revalidates TanStack Query asset caches when connectivity returns.

---

## 5. Mobile Adaptation (320px+, Portrait & Landscape)

Implemented in [`src/styles/pwa-mobile.css`](./src/styles/pwa-mobile.css) and component templates:
- Zero horizontal overflow verified down to **`320×568` (portrait)** and **`568×320` (landscape)** across all routes.
- Responsive hamburger drawer with backdrop, Escape-key closing, route-change auto-close, and landscape scroll support.
- Touch-friendly `>= 44px` interactive targets and `16px` mobile inputs to avoid iOS zoom-on-focus.
- Stacked mobile card transformation for Dashboard critical-assets table (`<= 680px`), responsive ItemCard & detail grids, full-width mobile form/action rows, and wrapped specification blocks.

---

## 6. Preserved Features from Previous Homeworks

All Task 5 & Task 6 capabilities remain fully functional:
- **React Router v7 (`HashRouter`):** `/`, `/items`, `/items/:id`, `/dashboard`, `/about`, `/offline`, `/login`, `/signup`, protected `/profile`, and `*` 404 recovery.
- **TanStack Query Caching & CRUD:** URL-synced search/filter/sort/pagination (`useSearchParams`), `30s` `staleTime`, `5m` `gcTime`, `AbortSignal` race-condition protection, local change-set persistence for Create / Edit / Cycle Status / Delete / Reset Database with automatic cache invalidation, plus the interactive **Cache & Net Lab** modal.
- **Firebase Authentication:** `VITE_FIREBASE_*` configuration, Email/Password sign-in & sign-up validation, Google Sign-In popup, `browserLocalPersistence`, and `<ProtectedRoute>` guarding `/profile`.

---

## Local Development & Build

```bash
cp .env.example .env.local   # Add VITE_FIREBASE_* keys if testing Firebase Auth
npm install
npm run dev                  # Local dev server (serves public API + version.json)
npm run build                # Builds app + static API + dist/sw.js precache manifest
npm run preview              # Preview production PWA locally (Service Worker active)
```
