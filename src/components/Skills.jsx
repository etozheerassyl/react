import React, { useState } from 'react';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillsData = [
    { name: 'React 19', category: 'frontend', level: 90, icon: '⚛️', desc: 'Hooks, Component Lifecycle, Props & Context' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 88, icon: '⚡', desc: 'Async/Await, DOM manipulation, Functional programming' },
    { name: 'Modern CSS3', category: 'frontend', level: 92, icon: '🎨', desc: 'Flexbox, Grid, Custom Properties, Glassmorphism' },
    { name: 'HTML5 Semantic', category: 'frontend', level: 95, icon: '📄', desc: 'Clean, accessible, SEO-optimized markup' },
    { name: 'Vite & Tooling', category: 'tools', level: 85, icon: '⚡', desc: 'Ultra-fast bundler, HMR, and build optimization' },
    { name: 'Git & GitHub', category: 'tools', level: 88, icon: '🐙', desc: 'Version control, branch management, collaboration' },
    { name: 'GitHub Pages', category: 'tools', level: 90, icon: '🌐', desc: 'Static site hosting, automated deployment pipelines' },
    { name: 'npm & Ecosystem', category: 'tools', level: 86, icon: '📦', desc: 'Dependency management, scripts, and package lifecycle' },
    { name: 'Responsive Layouts', category: 'design', level: 92, icon: '📱', desc: 'Mobile-first design, fluid typography, media queries' },
    { name: 'UI Micro-Interactions', category: 'design', level: 85, icon: '✨', desc: 'Keyframe animations, stateful hover and focus states' },
    { name: 'Component Systems', category: 'design', level: 90, icon: '🧩', desc: 'Atomic design, reusability, modular CSS' },
    { name: 'Problem Solving', category: 'core', level: 92, icon: '🧠', desc: 'Algorithmic thinking, clean debugging, refactoring' },
  ];

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend & React' },
    { id: 'tools', label: 'Workflow & Deployment' },
    { id: 'design', label: 'UI/UX & Styling' },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory || (selectedCategory === 'frontend' && s.category === 'core'));

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Capabilities</span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-desc">
            A curated overview of my core technical stack, design competencies, and development workflows.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="skills-filter-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="skill-card glass-card">
              <div className="skill-top-row">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-badge">{skill.level}% Proficiency</span>
              </div>
              <h4 className="skill-name">{skill.name}</h4>
              <p className="skill-desc">{skill.desc}</p>
              
              {/* Animated Progress Bar */}
              <div className="skill-progress-bar-bg">
                <div 
                  className="skill-progress-fill" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
