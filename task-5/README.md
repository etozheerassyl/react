# 🚀 Task 5 — Routing & Application Architecture

> Advanced React application featuring **React Router (v7)**, deep nested routing with `RootLayout` and `<Outlet />`, bidirectional URL parameter synchronization via `useSearchParams`, dynamic route parameters with `useParams`, on-demand code splitting using `React.lazy` & `Suspense`, an interactive real-time analytics dashboard, and a fully decoupled service layer (`services/service.js`).

---

## 🌟 Live Demo & Deployment Guide

- **Live GitHub Pages Application:** [https://etozheerassyl.github.io/react/task-5/](https://etozheerassyl.github.io/react/task-5/)
- **GitHub Repository Directory:** [https://github.com/etozheerassyl/react/tree/main/task-5](https://github.com/etozheerassyl/react/tree/main/task-5)
- **Production Build:** Output generated in `/dist` via `npm run build`.
- **SPA Routing Rules Included:**
  - Configured with `HashRouter` and `404.html` fallback for zero-configuration GitHub Pages subpath routing.
  - `vercel.json` (configured with rewrites to `/index.html`)
  - `public/_redirects` (configured with `/* /index.html 200` for Netlify)

### 🚢 Deploying to Vercel (Recommended)
1. Push this project to your GitHub repository (see [Pushing to GitHub](#-pushing-to-github)).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Framework preset: **Vite** (auto-detected).
5. Click **"Deploy"**. Direct URLs, page refreshes, and browser back/forward will work out of the box!

### 🚢 Deploying to Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
2. Select your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy site"**. The included `public/_redirects` file ensures full SPA routing support.

---

## 📋 Required Routes & Architecture Overview

| Route | Page Component | Key Capabilities & Features | Lazy Loaded |
|---|---|---|:---:|
| `/` | `HomePage` | Hero banner with telemetry graphics, live metric counters, module navigation cards | ✅ Yes |
| `/about` | `AboutPage` | Yerassyl's developer profile, coursework attribution, architecture breakdown, route sitemap | ✅ Yes |
| `/items` | `ItemsPage` | Reusable `ItemCard` grid, search, 3 filters, sorting, pagination, **`useSearchParams` URL synchronization** | ✅ Yes |
| `/items/:id` | `ItemDetailPage` | Dynamic `useParams`, 10+ technical details, Back/All Items links, stale request cleanup, Quick Status Cycle | ✅ Yes |
| `/dashboard` | `DashboardPage` | **5 calculated statistics**, **2+ data breakdowns**, **interactive department filter affecting metrics**, item links | ✅ Yes |
| `/login` | `LoginPage` | Terminal authentication gateway, clearance level selector, demo profile autofill, session state | ✅ Yes |
| `*` | `NotFoundPage` | Custom cyber-glitch 404 recovery view, path inspector, return to Home & Registry links | ✅ Yes |

---

## 🏛️ Application Architecture & Folder Structure

All concerns are strictly separated into dedicated directories, and `src/App.jsx` remains focused purely on route configuration:

```
src/
├── pages/                   # Lazy-loaded page route views
│   ├── HomePage.jsx         # / - Hero, introduction, module links, metric highlights
│   ├── AboutPage.jsx        # /about - Architecture specifications & developer bio
│   ├── ItemsPage.jsx        # /items - Registry list, search, filters, useSearchParams
│   ├── ItemDetailPage.jsx   # /items/:id - Telemetry details with useParams
│   ├── DashboardPage.jsx    # /dashboard - 5 stats, 2 breakdowns, interactive filter
│   ├── LoginPage.jsx        # /login - Operator terminal authentication
│   └── NotFoundPage.jsx     # * - Custom 404 route recovery view
├── components/              # Reusable UI components
│   ├── RootLayout.jsx       # Nested route wrapper housing NavBar, Outlet & Footer
│   ├── NavBar.jsx           # Responsive navigation bar with active NavLink indicators
│   ├── ItemCard.jsx         # Reusable card component with health bar and telemetry
│   ├── CreateModal.jsx      # Modal form to register new operational assets
│   ├── EditModal.jsx        # Modal form to modify existing specifications
│   ├── DefenseLabModal.jsx  # Interactive network latency, failure & race condition lab
│   ├── LoadingFallback.jsx  # Radar scan fallback spinner for React Suspense
│   └── Icons.jsx            # Modern SVG feather icons
├── services/                # Decoupled data & API layer
│   ├── service.js           # Central API service: getItemsList, getItemById, mutations
│   ├── initialData.js       # Extended 12-item high-tech telemetry database sample
│   └── settings.js          # API latency and simulated error configuration
├── hooks/                   # Custom state hooks
│   └── useAuth.jsx          # Terminal session & authentication state provider
├── styles/                  # Modular CSS architecture
│   ├── variables.css        # Color tokens, typography, dark theme variables
│   ├── layout.css           # Header, navbar, sub-header breadcrumbs, footer
│   ├── components.css       # Buttons, badges, cards, modals, defense lab
│   ├── pages.css            # Home, about, items, details, dashboard, login, 404
│   └── index.css            # Stylesheet entry point importing all modules
├── App.jsx                  # Pure router configuration with BrowserRouter & Suspense
└── main.jsx                 # React 19 application bootstrapping
```

---

## 🔍 Task-by-Task Implementation Details

### 1. Architecture & Routing
- **React Router Integration:** Uses `BrowserRouter`, `Routes`, `Route`, `RootLayout`, `NavBar`, and `<Outlet />`.
- **Nested Routes:** Child views are rendered through `<Outlet />` inside `RootLayout`, eliminating header/footer re-mounts.
- **Pure Routing in `App.jsx`:** `App.jsx` contains zero direct business logic or DOM markup—only lazy imports, `<Suspense>`, and route mappings.
- **Decoupled API Service:** All simulated API requests reside in `src/services/service.js`.

### 2. Home, About & Login
- **Home Page (`/`):**
  - High-impact cyber telemetry hero banner with `/src/assets/hero.png`.
  - Live metric counters (Monitored Assets, Readiness %, Average Health, Committed Budget).
  - Direct call-to-action cards navigating to `/items`, `/dashboard`, `/about`, and `/login`.
- **About Page (`/about`):**
  - **Developer Bio:** Yerassyl's developer profile, role, coursework attribution, skills, and GitHub repository link.
  - **Architecture Deep-Dive:** Explains nested routing, `useSearchParams` benefits, `useParams` dynamic loading, and `React.lazy` code splitting.
  - **Application Sitemap:** Complete visual route map with live paths.
- **Login Page (`/login`):**
  - High-tech terminal login interface with password show/hide toggle.
  - Clearance level selector (Class 1 Public to Class 5 Restricted).
  - One-click demo credentials autofill (Yerassyl Class 5, Dr. Rostova Class 4, Guest Class 2).
  - Active session state with Operator badge in the `NavBar` and session logout.

### 3. Items Registry (`/items`)
- **Reusable Cards:** Renders telemetry items using modular `ItemCard` components.
- **Search & 3 Filters:**
  - Search across name, assigned lead, sector location, and technical specifications.
  - Status Filter: *Active, In Maintenance, Deploying, Standby, Decommissioned*.
  - Category Filter: *Defense & Security, Power & Energy, Data Communications, Cyber Defense, AI & Robotics, Infrastructure*.
  - Priority Filter: *Critical, High, Medium, Low*.
  - Sorting: *Name A-Z / Z-A, Health High-Low / Low-High, Budget High-Low / Low-High, Priority, ID Newest / Oldest*.
  - Pagination: Previous/Next buttons with numbered page indicators.
- **`useSearchParams` URL Synchronization:**
  - Every filter, search query, sorting order, and page number updates the URL search parameters (e.g. `?search=quantum&category=Data+Communications&sort=health-desc&page=1`).
  - Refreshing the page, sharing the URL, or using browser Back/Forward restores the exact filter state automatically.
- **Loading, Error & Empty States:**
  - Animated shimmer skeleton cards during fetch.
  - Error alert with retry button if API fails.
  - Empty search state with a "Clear All Search Parameters" button.
- **CRUD Deployment:** "Deploy New Asset" button opens `CreateModal` to insert items via `createItem()`.

### 4. Item Details (`/items/:id`)
- **Dynamic Routing:** Reads `id` from URL via `useParams()`.
- **10+ Meaningful Specifications Displayed:**
  1. *Operational Status* (Active / Maintenance with quick cycle action)
  2. *Response Priority* (Threat SLA tier)
  3. *Officer in Charge* (Lead systems engineer)
  4. *Budget Allocation* (Formatted currency, e.g. `$245,000`)
  5. *System Health Rating* (Percentage with color-coded health gauge)
  6. *Security Clearance* (Class 1 to Class 5)
  7. *Physical Deployment* (Sector and facility location)
  8. *Last Certified Inspection* (Audit date)
  9. *Technical Specifications* (Quantum lattice, bandwidth, latency telemetry)
  10. *Operational Directives & Maintenance Logs*
- **Navigation Links:** Features both **Back** (`navigate(-1)`) and **All Items** (`<Link to="/items">`) links.
- **Stale Request & Race Condition Guard:** Cleanup function with `isCancelled = true` discards late responses when switching IDs rapidly.
- **Invalid ID Handling:** Non-existent or non-numeric IDs render a clean "Asset Not Found" recovery screen with a link back to registry.
- **Mutations:** In-place "Cycle Status" button, "Edit Specifications" modal, and "Decommission Asset" with confirmation and redirect.

### 5. Operations Dashboard (`/dashboard`)
- **5 Calculated Statistics from API Data:**
  1. *Total Monitored Assets* (Total units in scope)
  2. *Operational Readiness* (Percentage & count of active units)
  3. *Total Budget Committed* (Sum of budgets in scope)
  4. *Fleet Health Index* (Average hardware health score)
  5. *High-Priority Threats* (Count of critical SLA assets)
- **2+ Data Breakdowns:**
  1. *Department Distribution:* Visual progress bars with counts and budgets per department. **Every department row is an interactive link that navigates to `/items?category=...`!**
  2. *Operational Status Distribution:* Color-coded breakdown with counts and percentages. **Clicking any status navigates to `/items?status=...`!**
  3. *System Health Tiers:* Optimal (90-100%), Nominal (70-89%), Degraded (<70%).
- **Interactive Filter Affecting Statistics:**
  - Interactive department chips (*Entire Fleet, Defense & Security, Power & Energy, etc.*).
  - Selecting any chip dynamically recalculates all 5 statistics, budget totals, and breakdowns in real time.
- **Direct Asset Links:**
  - "Critical & High Priority Assets" table with direct links to `/items/:id` for fast triage.
  - "View All Registry Items" link navigating to `/items`.

### 6. Lazy Loading & Not Found
- **Lazy Loading (7 Pages):**
  - `HomePage`, `AboutPage`, `ItemsPage`, `ItemDetailPage`, `DashboardPage`, `LoginPage`, and `NotFoundPage` are loaded via `React.lazy(() => import(...))`.
  - Wrapped in `<Suspense fallback={<LoadingFallback />}>` featuring a radar ping spinner.
- **Custom 404 Route (`*`):**
  - Catches unmapped routes and displays a cyber-glitch 404 interface.
  - Shows the requested coordinate via `useLocation().pathname`.
  - Provides direct navigation back to **Home** (`/`) and **Registry** (`/items`).

---

## 🛠️ Local Development & Scripts

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📦 Pushing to GitHub

To submit your assignment repository link:
```bash
git init
git add .
git commit -m "feat: complete Task 5 Routing & Application Architecture with React Router, nested routes, useSearchParams, and lazy loading"
git branch -M main
git remote add origin https://github.com/etozheerassyl/react.git
git push -u origin main
```

---

## 🛡️ Verification Checklist

- [x] React Router installed and configured
- [x] Nested routing with `RootLayout`, `NavBar`, and `<Outlet />`
- [x] `App.jsx` focused purely on routing
- [x] Decoupled folder separation (`pages/`, `components/`, `services/`, `hooks/`, `styles/`)
- [x] API requests moved into `services/service.js`
- [x] Home page with short introduction, image, and navigation links
- [x] About page with developer bio and project architecture breakdown
- [x] Login page with styled placeholder authentication and session state
- [x] Items list with reusable Card components
- [x] Search, 2+ filters (Status, Category, Priority), sorting, and pagination
- [x] Filter synchronization with URL parameters using `useSearchParams`
- [x] Item details page using `useParams` displaying 10+ details
- [x] Back and All Items navigation links
- [x] Dashboard displaying 5 calculated statistics and 2+ breakdowns
- [x] Interactive filter affecting dashboard statistics in real time
- [x] Dashboard links to relevant items (`/items/:id`) and pages (`/items?category=...`)
- [x] 3+ pages lazy loaded with `React.lazy` and `Suspense` (7 pages total)
- [x] Custom 404 page with Home and Registry links
- [x] Invalid item ID handling with recovery view
- [x] Zero page reloads during navigation (`<Link>`, `<NavLink>`)
- [x] Support for direct URLs, browser Back/Forward, and page refresh
- [x] Consistent, responsive dark cyber aesthetic across all views

