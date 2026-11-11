# Aegis Core — Server Data, Caching & Firebase Authentication (Task 6)

> React Router v7 application extending Task 5 with **TanStack Query** server-data caching, mutation-driven cache invalidation, `VITE_` environment variables, and **Firebase Authentication** (Email/Password, Google Sign-In, persistent sessions, and protected routes).

---

## Live Demo & Repository

- **GitHub Repository:** [https://github.com/etozheerassyl/react/tree/main/task-6](https://github.com/etozheerassyl/react/tree/main/task-6)
- **Deployed Application:** [https://etozheerassyl.github.io/react/task-6/](https://etozheerassyl.github.io/react/task-6/)
- **Environment Template:** [.env.example](./.env.example)

> **Deployment Note:** Ensure your `VITE_FIREBASE_*` environment variables are provided at build time (locally via `.env.local` or via CI/hosting environment variables) and that your deployment domain (e.g., `etozheerassyl.github.io` or `*.vercel.app`) is added under **Firebase Console → Authentication → Settings → Authorized domains**.

---

## Server Data Caching & Invalidation Strategy

Server data fetching and caching are implemented with **TanStack Query (`@tanstack/react-query`)** in [`src/services/queryClient.js`](./src/services/queryClient.js), [`src/services/queryKeys.js`](./src/services/queryKeys.js), and [`src/hooks/useAssets.js`](./src/hooks/useAssets.js). UI components never access `localStorage` or call API functions directly.

### 1. Hierarchical Query Keys
Every cached resource uses a deterministic, normalized query key so equivalent queries share cache entries and invalidation can target exact scopes:
- `["assets", "list", { search, status, category, priority, sort, page, limit }]` — paginated & filtered asset registry queries (`useItemsList`)
- `["assets", "detail", id]` — individual asset detail queries (`useItemDetail`)
- `["assets", "dashboard", category]` — aggregated dashboard metrics per department filter (`useDashboardStats`)

### 2. Expiration & Revalidation Policy
- **Fresh Window (`staleTime: 30s`):** Cached responses remain fresh for **30 seconds**. Navigating back to previously visited pages, filter combinations, asset details, or dashboard categories serves data instantaneously from memory without firing redundant API requests.
- **Stale-While-Revalidate (`refetchOnWindowFocus: true`, `refetchOnReconnect: true`):** Once a cache entry passes 30 seconds, it is marked **stale**; cached data still renders immediately while TanStack Query revalidates in the background on mount, window focus, or network reconnection.
- **Cache Expiration / Eviction (`gcTime: 5m`):** Inactive cache entries with no active observers expire and are garbage-collected from memory after **5 minutes**.
- **Failure Handling:** Transient API errors retry once (`retry: 1`), while invalid ID or `not found` errors fail fast (`retry: false`) to render recovery UI immediately.

### 3. When Cached Data Is Invalidated
Cache invalidation is triggered automatically in mutation `onSuccess` callbacks whenever server data changes:
- **Create Asset (`useCreateAssetMutation` → `createItem`):** Invalidates `["assets"]` (`assetKeys.all`), forcing all cached registry lists and dashboard statistics to refetch updated totals.
- **Update Asset (`useUpdateAssetMutation` → `updateItem`):** Writes the updated record straight into `["assets", "detail", id]` via `queryClient.setQueryData` for instant UI reflection, and invalidates `["assets", "list"]` and `["assets", "dashboard"]` so lists and analytics stay synchronized.
- **Delete Asset (`useDeleteAssetMutation` → `deleteItem`):** Removes the deleted item entry via `queryClient.removeQueries` on `["assets", "detail", id]`, and invalidates `["assets", "list"]` and `["assets", "dashboard"]`.
- **Reset Database (`useNetworkLab` → `resetDatabase`) & Manual Invalidation:** Invalidates `["assets"]` (`assetKeys.all`) so all views re-sync with the restored seed dataset.

### 4. Outdated Request & Race-Condition Prevention
All query hooks forward TanStack Query's `AbortSignal` (`({ signal }) => ...`) into `src/services/service.js`. When filters, pagination, or `/items/:id` routes change rapidly before an earlier slow request finishes, the superseded in-flight request is aborted and results remain isolated by `queryKey`, preventing outdated responses from overwriting newer state.

---

## Firebase Authentication & Protected Routing

- **Initialization (`src/firebase.js`):** Reads `VITE_FIREBASE_*` environment variables via `import.meta.env`, initializes Firebase (`initializeApp`, `getAuth`, `GoogleAuthProvider`), and enables `browserLocalPersistence` so sessions persist across page refreshes.
- **Auth Service (`src/services/authService.js`):** Wraps `onAuthStateChanged`, `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signInWithPopup`, and `signOut`, mapping Firebase error codes into readable messages.
- **Context & Hook (`src/context/AuthContext.jsx` / `src/hooks/useAuth.jsx`):** Provides `AuthProvider` and `useAuth` exposing `user`, `isAuthenticated`, `authLoading`, `authActionLoading`, `authError`, `signup`, `login`, `loginWithGoogle`, `logout`, and `clearAuthError`.
- **Routes:**
  - `/login` — Email/Password login and **Continue with Google** popup sign-in, with redirect back to the originally requested protected page.
  - `/signup` — Email, password, and confirm-password form with client-side validation (email format, minimum 6-character password, password match) and Google sign-up.
  - `/profile` — Protected by `<ProtectedRoute>`, displaying the authenticated user's **Email** and **Firebase UID** (plus provider and sign-in timestamps) and a **Logout** button. Unauthenticated visitors are redirected to `/login` once `authLoading` resolves.
  - **Dynamic `NavBar`:** Displays **Login / Signup** when signed out, and **Profile / Logout** when signed in.

---

## Application Routes (Task 5 + Task 6)

| Route | View | Description | Access |
|---|---|---|---|
| `/` | `HomePage` | Hero banner, cached fleet metrics, module links | Public |
| `/items` | `ItemsPage` | Reusable `ItemCard` grid, search, 3 filters, sorting, pagination, `useSearchParams` URL sync, Create modal | Public |
| `/items/:id` | `ItemDetailPage` | 10+ asset specifications, Back/All Items links, Cycle Status, Edit modal, Delete, invalid-ID handling | Public |
| `/dashboard` | `DashboardPage` | 5 live statistics, 3 breakdowns, interactive department chip filter, critical items table | Public |
| `/about` | `AboutPage` | Developer profile, caching & auth architecture breakdown, route sitemap | Public |
| `/login` | `LoginPage` | Firebase Email/Password & Google Sign-In | Public |
| `/signup` | `SignUpPage` | Account registration with password confirmation & validation | Public |
| `/profile` | `ProfilePage` | Displays user Email, Firebase UID, provider metadata & Logout | Protected |
| `*` | `NotFoundPage` | Custom 404 route recovery view | Public |

---

## Folder Structure

```text
task 6/
├── .env.example                 # Template for VITE_FIREBASE_* environment variables
├── .env.local                   # Local Firebase credentials (excluded from git via .gitignore)
├── .gitignore                   # Ignores node_modules, dist, .env.local, *.local
├── public/
│   ├── 404.html                 # GitHub Pages HashRouter fallback redirect
│   ├── _redirects               # Netlify SPA redirect rule
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                  # Static images (hero.png, react.svg, vite.svg)
│   ├── components/              # Reusable UI components (NavBar, RootLayout, ProtectedRoute, modals, ItemCard)
│   ├── context/
│   │   └── AuthContext.jsx      # AuthContext, AuthProvider & useAuth backed by Firebase onAuthStateChanged
│   ├── hooks/
│   │   ├── useAssets.js         # TanStack Query hooks & CRUD mutations with cache invalidation
│   │   ├── useAuth.jsx          # Re-exports AuthProvider & useAuth
│   │   └── useNetworkLab.js     # Hook for API logs, latency config, cache snapshot & DB reset
│   ├── pages/                   # Lazy-loaded route pages (Home, Items, ItemDetail, Dashboard, About, Login, SignUp, Profile, 404)
│   ├── services/
│   │   ├── authService.js       # Firebase Auth SDK wrappers & error mapping
│   │   ├── initialData.js       # 12 initial telemetry asset records
│   │   ├── queryClient.js       # QueryClient (staleTime: 30s, gcTime: 5m) & cache snapshot helpers
│   │   ├── queryKeys.js         # Normalized hierarchical query key factory
│   │   ├── service.js           # Simulated async API with AbortSignal & telemetry logging
│   │   └── settings.js          # Simulated API latency, failure rate & storage key config
│   ├── styles/                  # Modular dark cyber stylesheet architecture
│   ├── App.jsx                  # QueryClientProvider, HashRouter, AuthProvider & Suspense routes
│   ├── firebase.js              # Firebase app/auth/GoogleProvider initialization from VITE_ env vars
│   └── main.jsx                 # React 19 entry point
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## Environment Setup & Local Development

### 1. Prerequisites
- Node.js `v18+` and `npm`
- A Firebase project in [Firebase Console](https://console.firebase.google.com/) with:
  - **Authentication → Sign-in method → Email/Password** enabled
  - **Authentication → Sign-in method → Google** enabled
  - Your local and deployed hostnames added under **Authentication → Settings → Authorized domains**

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and fill in your Firebase Web App credentials:

```bash
cp .env.example .env.local
```

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

> `.env.local` is listed in `.gitignore` and must never be committed to version control.

### 3. Install & Run Locally
```bash
npm install
npm run dev
```

### 4. Production Build & Preview
```bash
npm run build
npm run preview
```

### 5. Deploying (Vercel / Netlify / GitHub Pages)
- **Vercel / Netlify:** Connect the repository, set Root Directory to `task-6` (if monorepo), add all six `VITE_FIREBASE_*` environment variables in Project Settings, set Build Command to `npm run build` and Output Directory to `dist`.
- **GitHub Pages:** Provide the `VITE_FIREBASE_*` variables as GitHub Actions secrets/variables in the workflow build step, and authorize `etozheerassyl.github.io` in Firebase Authentication Authorized Domains.

