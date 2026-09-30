# ⚡ CYBER-GRID // APEX OPERATIVES TACTICAL DASHBOARD
### Task 3 – Rendering and State (React Single Page Application)

A high-tech Cyberpunk-themed Single-Page React Dashboard built with pure **React Functional Components** and **`useState`**. Designed for maximum visual impact, rich interactivity, and demonstration of React's reconciliation engine, state preservation, and key-based lifecycle.

---

## 🚀 Live Demo & Defense Quickstart

- **Local URL**: `http://localhost:5173/`
- **Tech Stack**: React 19, Vite, Lucide Icons, Pure Vanilla CSS (Glassmorphism & Neon Design Tokens)
- **Constraint Compliance**:
  - ✅ **NO** `useEffect`
  - ✅ **NO** Context API
  - ✅ **NO** Redux or external state management libraries
  - ✅ Pure functional components + `useState` + props + `.map()` with stable keys

---

## 🎮 Features Implemented

1. **Add and Remove Items**:
   - Recruit new operatives with custom callsign, real name, role, rank tier, status, energy level, specialty, and signature neon accent via `AddOperativeModal`.
   - Discharge / remove operatives from the roster with instant parent state update.
2. **Edit / Change Item Status**:
   - Inline status dropdown on each operative card (`Available`, `On Mission`, `Resting`, `Compromised`).
3. **Change Item Local State**:
   - Each card encapsulates its own independent child state:
     - `tacticalNotes`: live editable notes input.
     - `overclockBoost`: cyclic level booster (0 to 5) with calculated power output.
     - `selectedLoadout`: rig selection (`Tactical Cloak v4`, `EMP Disruptor`, etc.).
     - `isExpanded`: collapsible unit intel drawer.
4. **Filter Items**:
   - Filter by Role (`All`, `Netrunner`, `Infiltrator`, `Assault`, `Tech Medic`, `Recon`).
   - Filter by Status (`All`, `Available`, `On Mission`, `Resting`, `Compromised`).
   - Search by callsign, name, or specialty.
5. **Reorder or Reverse the List**:
   - Reorder manually using `Move Up` (▲) and `Move Down` (▼) buttons on each card.
   - Sort by **Rank** (`S > A > B`), **Energy** (High to Low / Low to High), or **Missions Completed**.
   - `Reverse List` toggle (`⇄`) to instantly flip array order.
6. **State Preservation**:
   - Thanks to stable keys (`key={`${item.id}-${item.keyVersion}`}`), typing notes or overclocking a unit preserves that state strictly on that unit during reordering, reversing, or filtering.
   - **Defense Feature**: Switch `Key Mode` in the header from **Stable ID** to **Index (Buggy)** to visually show examiners the anti-pattern where state bleeds into adjacent rows!
7. **Intentional State Reset using Keys**:
   - Each card contains two reset options:
     - `Reset State`: standard child setter reset.
     - `Key Reset`: triggers parent callback to increment `item.keyVersion`. React's reconciler detects the key change, unmounts the previous component instance, and mounts a fresh instance with empty initial state.
8. **Re-render Investigation via `console.log()`**:
   - Pure render-phase console logs with distinct colors and timestamps:
     - `[PARENT RENDER] <App />`
     - `[CHILD RENDER] <OperativeCard /> ID: ...`
     - `[RENDER] <ControlToolbar />`, `<StatsBar />`, `<Header />`

---

## 🛡️ Oral Defense Guide (Шпаргалка для сдачи)

### 1. What is Reconciliation?
Reconciliation is React's diffing algorithm that compares the previous Virtual DOM tree with the new Virtual DOM tree to calculate the minimal number of DOM manipulations required.

### 2. What is the role of `key`?
The `key` prop gives elements a stable identity across renders. When items reorder or filter:
- With a stable key (`item.id`): React matches existing components with new Virtual DOM nodes, preserving DOM nodes and their **local component state**.
- With index key (`index`): React matches children purely by their index position in the array. If the list reverses, index 0 receives data for the last element, but retains the local state of the old first element!

### 3. How does Key-Based State Reset work?
When a component's `key` changes, React does not reuse the existing instance. Instead, it **unmounts** the component (destroying its `useState` hooks) and mounts a brand new instance with default state.

---

## 🛠️ Running Locally

```bash
# Clone the repository
git clone <your-repo-link>
cd "task 3"

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
