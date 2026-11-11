# React Coursework & Applications — Yerassyl

> A collection of React applications, architectural showcases, and coursework assignments deployed to GitHub Pages.

---

## Live Demonstrations & Projects

| Project / Assignment | Description | Directory | Live GitHub Pages Link |
|---|---|---|---|
| **Task 6: Caching & Firebase Auth** | TanStack Query server-data caching, mutation-driven invalidation, `VITE_` env config ([`.env.example`](./task-6/.env.example)), Firebase Email/Password & Google Sign-In, `/signup`, and protected `/profile`. | [`/task-6`](./task-6) | [Live Preview](https://etozheerassyl.github.io/react/task-6/) |
| **Task 5: Routing & Architecture** | React Router v7, nested routes, URL sync with `useSearchParams`, `useParams`, `React.lazy`, and operations dashboard. | [`/task-5`](./task-5) | [Live Preview](https://etozheerassyl.github.io/react/task-5/) |
| **Midterm: CineVault** | Movie discovery SPA with multi-criteria filtering, persistence, and modal inspection. | [`/midterm`](./midterm) | [Live Preview](https://etozheerassyl.github.io/react/midterm/) |
| **Task 4: Async React & Telemetry** | Simulated async API, `useEffect` lifecycle sync, race-condition defense, and live network lab. | [`/task-4`](./task-4) | [Live Preview](https://etozheerassyl.github.io/react/task-4/) |
| **Task 3: Cyberpunk Operatives** | Operative registry with reactive filtering, stats aggregation, and state reconciliation demo. | [`/task-3`](./task-3) | [Live Preview](https://etozheerassyl.github.io/react/task-3/) |
| **Task 2: Developer Portfolio** | Self-promotional SPA portfolio with modular architecture and dark design system. | Root (`/`) | [Live Preview](https://etozheerassyl.github.io/react/) |

---

## Task 6 Caching & Invalidation Overview

See the full documentation in [`task-6/README.md`](./task-6/README.md) and environment template in [`task-6/.env.example`](./task-6/.env.example).

- **Caching Strategy:** Server queries (`items` lists, individual asset details, and dashboard stats) are cached via **TanStack Query** using normalized query keys (`["assets", "list", filters]`, `["assets", "detail", id]`, `["assets", "dashboard", category]`) with a **30s `staleTime`** fresh window (stale-while-revalidate on mount/focus) and **5m `gcTime`** eviction. `AbortSignal` is passed to all queries to prevent outdated requests from overwriting newer results.
- **When Cache Is Invalidated:** Creating an asset invalidates `["assets"]`; updating an asset writes the updated record to `["assets", "detail", id]` and invalidates `["assets", "list"]` + `["assets", "dashboard"]`; deleting an asset removes `["assets", "detail", id]` and invalidates `["assets", "list"]` + `["assets", "dashboard"]`; resetting the database invalidates `["assets"]`.

---

## CI/CD Deployment

Projects are built and published via GitHub Actions ([`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)):
- **Root Portfolio:** [https://etozheerassyl.github.io/react/](https://etozheerassyl.github.io/react/)
- **Task 6 Application:** [https://etozheerassyl.github.io/react/task-6/](https://etozheerassyl.github.io/react/task-6/)
