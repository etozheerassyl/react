import React, { useState } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('bio');

  const pillars = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      title: 'Modular Architecture',
      description: 'Crafting modular, reusable React components with predictable state management and clean props interfaces.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m4.93 4.93 4.24 4.24"></path>
          <path d="m14.83 9.17 4.24-4.24"></path>
          <path d="m14.83 14.83 4.24 4.24"></path>
          <path d="m9.17 14.83-4.24 4.24"></path>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      ),
      title: 'Modern CSS & Polish',
      description: 'Designing bespoke user interfaces using vanilla CSS, modern variables, glassmorphic styling, and micro-interactions.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      ),
      title: 'Performance & Tooling',
      description: 'Leveraging Vite for blazing-fast Hot Module Replacement and ultra-compact production bundles for GitHub Pages.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      title: 'Continuous Growth',
      description: 'Constantly exploring modern web standards, testing methodologies, accessibility (a11y), and responsive design.',
    },
  ];

  const quickFacts = [
    { label: 'Name', value: 'Yerassyl' },
    { label: 'Role', value: 'Frontend Developer' },
    { label: 'Base Location', value: 'Planet Earth 🌍' },
    { label: 'Specialty', value: 'React SPAs & Interactive UIs' },
    { label: 'Code Soundtrack', value: 'Lo-Fi & Synthwave Beats' },
    { label: 'Current Focus', value: 'React 19 & Component Architecture' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Passionate Developer Building With <span className="gradient-text">Purpose</span>
          </h2>
          <p className="section-desc">
            Get to know my journey, development philosophy, and the principles that guide my code.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="tab-control-container">
          <button
            className={`tab-btn ${activeTab === 'bio' ? 'active' : ''}`}
            onClick={() => setActiveTab('bio')}
          >
            My Story & Journey
          </button>
          <button
            className={`tab-btn ${activeTab === 'pillars' ? 'active' : ''}`}
            onClick={() => setActiveTab('pillars')}
          >
            Core Philosophy
          </button>
          <button
            className={`tab-btn ${activeTab === 'facts' ? 'active' : ''}`}
            onClick={() => setActiveTab('facts')}
          >
            Quick Facts
          </button>
        </div>

        {/* Tab Content 1: Bio */}
        {activeTab === 'bio' && (
          <div className="about-bio-grid">
            <div className="about-narrative glass-card">
              <h3 className="narrative-heading">
                Hello there! I'm <span className="gradient-accent-text">Yerassyl</span>.
              </h3>
              <p className="narrative-text">
                I am a passionate software and web developer dedicated to building elegant, 
                high-performance digital experiences. My journey with coding started with a curiosity 
                for how pixels on a screen connect with human emotions and workflows.
              </p>
              <p className="narrative-text">
                With React, I found the perfect balance between structure and creativity. 
                Breaking complex interfaces down into reusable, maintainable components feels like 
                architecting digital Lego structures where every block has a distinct purpose.
              </p>
              <p className="narrative-text">
                When I'm not writing code or experimenting with modern UI animations, I enjoy studying 
                clean code paradigms, discovering new developer tools, and solving complex algorithmic challenges.
              </p>
              
              <div className="narrative-quote">
                <p>
                  "Good design is obvious. Great design is transparent and delightfully responsive."
                </p>
              </div>
            </div>

            <div className="about-stat-cards">
              <div className="stat-card glass-card">
                <span className="stat-icon">⚡</span>
                <span className="stat-val">SPA</span>
                <span className="stat-lbl">Single Page App Architecture</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-icon">🎨</span>
                <span className="stat-val">Pixel</span>
                <span className="stat-lbl">Detail-Oriented CSS Design</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-icon">🚀</span>
                <span className="stat-val">Vite</span>
                <span className="stat-lbl">Instant HMR & Build Speed</span>
              </div>
              <div className="stat-card glass-card">
                <span className="stat-icon">🌐</span>
                <span className="stat-val">GH Pages</span>
                <span className="stat-lbl">Seamless Cloud Deployment</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Pillars */}
        {activeTab === 'pillars' && (
          <div className="pillars-grid">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="pillar-card glass-card">
                <div className="pillar-icon-wrapper">{pillar.icon}</div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Quick Facts */}
        {activeTab === 'facts' && (
          <div className="facts-card glass-card">
            <h3 className="facts-title">At a Glance</h3>
            <div className="facts-grid">
              {quickFacts.map((fact, idx) => (
                <div key={idx} className="fact-item">
                  <span className="fact-label">{fact.label}</span>
                  <span className="fact-value">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
