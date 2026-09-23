import React from 'react';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Self-Promotional React SPA',
      badge: 'Current Assignment (Task 2)',
      description:
        'A sleek, responsive Single Page Application built with React 19 and Vite. Features modular architecture, custom vanilla CSS design system, and configured for seamless GitHub Pages deployment.',
      tags: ['React 19', 'Vite', 'Vanilla CSS', 'GitHub Pages', 'SPA'],
      github: 'https://github.com/etozheerassyl/react',
      demo: 'https://etozheerassyl.github.io/react/',
      featured: true,
      stats: 'Modular • Fast • Responsive',
    },
    {
      id: 2,
      title: 'Dynamic Habit & Task Tracker',
      badge: 'Productivity App',
      description:
        'A rich interactive dashboard helping developers track daily coding goals, manage task priority queues, and visualize habit streaks with client-side persistence.',
      tags: ['React', 'Custom Hooks', 'LocalStorage', 'CSS Grid'],
      github: 'https://github.com',
      demo: '#',
      featured: false,
      stats: 'Persistent State • Micro-animations',
    },
    {
      id: 3,
      title: 'DevLens - Resource Hub',
      badge: 'Developer Tool',
      description:
        'A curated knowledge base and code snippet repository featuring instant search filtering, copy-to-clipboard functionality, and glassmorphic UI cards.',
      tags: ['React', 'JavaScript', 'Responsive UI', 'Search Engine'],
      github: 'https://github.com',
      demo: '#',
      featured: false,
      stats: 'Fast Search • Clean UX',
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Featured Work</span>
          <h2 className="section-title">
            Projects & <span className="gradient-text">Creations</span>
          </h2>
          <p className="section-desc">
            Explore a selection of interactive projects demonstrating component design, state handling, and modern UI practices.
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
