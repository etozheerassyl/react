# 🛡️ Task 4 — Async React: Effects & Simulated API

> Fully operational React application integrated with a simulated asynchronous API, demonstrating `useEffect`, dependency management, cleanup functions, race-condition mitigation, and stale-closure prevention.

---

## 🚀 Live Demo & Deployment
- **Deployment Ready:** Build output generated in `/dist` via `npm run build`.
- **Defense Guide:** Full conceptual walkthrough and Q&A in [DEFENSE_GUIDE.md](file:///c:/Users/yerassyl/D/projects/react/task%204/DEFENSE_GUIDE.md).

---

## 🌟 Key Features

1. **Extended Data Schema (13 Meaningful Fields)**
   - Every registry asset contains:
     - `id`, `name`, `category`, `status`, `priority`, `assignedTo`, `budget`, `systemHealth`, `securityClearance`, `location`, `lastInspection`, `specifications`, `maintenanceNotes`.
2. **`useEffect` List Loading & Lifecycle Synchronization**
   - Loads paginated item list with search, category/status filtering, and sorting.
   - Handles **Loading** (animated shimmer skeletons), **Error** (alert cards with retry), **Empty** (clear filter action), and **Success** states.
3. **Async Item Details & Extended Specifications**
   - Selecting an item triggers an asynchronous call via `useEffect`, showing a dedicated loading skeleton and rendering deep technical telemetry.
4. **Full CRUD Operations**
   - **Create:** Modal form registering new assets with full metadata.
   - **Edit:** Modal form modifying existing asset attributes.
   - **Remove:** Deletion with confirmation and atomic state updates.
5. **Status Update Quick Action**
   - In-place "Cycle Status" and transition dropdown that updates the asset through the simulated API (`updateItem()`).
6. **Reload Button**
   - Prominent header button to refresh the asset list from the API on demand.
7. **Race Condition Prevention**
   - `useEffect` cleanup function with `isCancelled = true` flag. Rapidly switching between assets safely discards late-arriving responses.
8. **Stale Closure Defense**
   - Captured target ID at action initiation, functional state updaters (`prev => ...`), and target ID matching guard.
9. **Interactive Defense Lab & Live Network Inspector**
   - Interactive live simulation of race conditions.
   - Real-time telemetry log table.
   - Live latency and error-rate configuration sliders.

---

## 🔒 Restrictions Compliance Checklist

- [x] **No hooks other than `useState` and `useEffect`**: Absolutely no `useRef`, `useCallback`, `useMemo`, `useReducer`, `useContext`.
- [x] **No custom hooks**: All state and effects live directly inside component definitions.
- [x] **No debouncing**: Standard search submit and clear actions without debounce timers.
- [x] **No external fetching libraries**: Zero Axios, TanStack Query, or SWR.
- [x] **No direct `localStorage` access from components**: All persistence is encapsulated inside `src/api/fakeApi.js`.

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```

---

## 🚢 Deployment Guide

### Deploy to Vercel (Recommended — Free & Instant)
1. Push this repository to GitHub (see below).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework preset: **Vite** (detected automatically).
5. Click **"Deploy"**.

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
2. Select your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy site"**.

---

## 📦 Pushing to GitHub

To submit your GitHub repository link:
```bash
git init
git add .
git commit -m "feat: complete Task 4 Async React with effects, race condition mitigation, and defense lab"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```
