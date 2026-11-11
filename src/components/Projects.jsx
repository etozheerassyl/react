import React from 'react';

export default function Projects() {
  const projects = [
    {
      id: 6,
      title: 'Aegis Core — Caching & Firebase Auth',
      badge: 'Task 6 (Current Assignment)',
      description:
        'Extended React Router platform with TanStack Query server-data caching (30s staleTime, 5m gcTime), mutation-driven cache invalidation, AbortSignal race-condition defense, VITE_ env configuration, and Firebase Auth (Email/Password, Google Sign-In, /signup, protected /profile).',
      tags: ['React 19', 'TanStack Query', 'Firebase Auth', 'Google Sign-In', 'Protected Routes', 'Cache Invalidation'],
      github: 'https://github.com/etozheerassyl/react/tree/main/task-6',
      demo: 'https://etozheerassyl.github.io/react/task-6/',
      featured: true,
      stats: 'Query Cache • Firebase Auth',
    },
    {
      id: 5,
      title: 'Aegis Core — Routing & Architecture',
      badge: 'Task 5',
      description:
        'Advanced React Router application featuring nested routes with RootLayout & Outlet, useSearchParams URL parameter synchronization, dynamic useParams routes, on-demand React.lazy & Suspense code splitting, and real-time operations dashboard.',
      tags: ['React 19', 'React Router v7', 'useSearchParams', 'useParams', 'React.lazy', 'Suspense'],
      github: 'https://github.com/etozheerassyl/react/tree/main/task-5',
      demo: 'https://etozheerassyl.github.io/react/task-5/',
      featured: false,
      stats: 'React Router • URL Sync • Lazy Loading',
    },
    {
      id: 4,
      title: 'CineVault — Film Discovery Platform',
      badge: 'Midterm Project',
      description:
        'Comprehensive cinema catalog application with multi-criteria filtering, local storage persistence, responsive modal inspection sheets, and real-time movie telemetry.',
      tags: ['React 19', 'Vite', 'Lucide React', 'Persistence', 'Client-side Filtering'],
      github: 'https://github.com/etozheerassyl/react/tree/main/midterm',
      demo: 'https://etozheerassyl.github.io/react/midterm/',
      featured: false,
      stats: 'Movie Discovery • Rich Filters',
    },
    {
      id: 3,
      title: 'Aegis Core — Async React & Simulated API',
      badge: 'Task 4',
      description:
        'Simulated asynchronous React application demonstrating useEffect lifecycle synchronization, race-condition mitigation with cleanup flags, stale-closure guards, and live network latency inspector.',
      tags: ['React 19', 'useEffect', 'Race Condition Defense', 'Async API'],
      github: 'https://github.com/etozheerassyl/react/tree/main/task-4',
      demo: 'https://etozheerassyl.github.io/react/task-4/',
      featured: false,
      stats: 'Race Condition Defense • Live Telemetry',
    },
    {
      id: 2,
      title: 'Cyberpunk Operatives Dashboard',
      badge: 'Task 3',
      description:
        'High-tech operative registry with dynamic state management, reactive filtering, real-time stats aggregation, and state reconciliation demo.',
      tags: ['React 19', 'State Management', 'Immutability', 'Cyberpunk UI'],
      github: 'https://github.com/etozheerassyl/react/tree/main/task-3',
      demo: 'https://etozheerassyl.github.io/react/task-3/',
      featured: false,
      stats: 'State Management • Reactive Filters',
    },
    {
      id: 1,
      title: 'Self-Promotional React Portfolio SPA',
      badge: 'Task 2',
      description:
        'A sleek, responsive Single Page Application built with React 19 and Vite. Features modular architecture, custom vanilla CSS design system, and configured for seamless GitHub Pages deployment.',
      tags: ['React 19', 'Vite', 'Vanilla CSS', 'GitHub Pages', 'SPA'],
      github: 'https://github.com/etozheerassyl/react',
      demo: 'https://etozheerassyl.github.io/react/',
      featured: false,
      stats: 'Modular • Fast • Responsive',
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Coursework &amp; Assignments</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-desc">
            Explore my interactive coursework projects demonstrating component design, routing architecture, state handling, and modern UI engineering.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className={`project-card glass-card ${project.featured ? 'project-featured' : ''}`}>
              <div className="project-top">
                <span className="project-badge">{project.badge}</span>
                <span className="project-stats-pill">{project.stats}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn btn-secondary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Repository</span>
                </a>

                <a
                  href={project.demo}
                  className="project-link-btn btn-primary"
                >
                  <span>Live Preview</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
