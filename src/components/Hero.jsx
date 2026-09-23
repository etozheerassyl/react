import React from 'react';
import avatarImg from '../assets/avatar.jpg';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Text & Intro */}
        <div className="hero-content">
          <div className="status-pill">
            <span className="status-dot"></span>
            <span>Available for New Opportunities</span>
          </div>

          <h1 className="hero-heading">
            Hello, I'm <br />
            <span className="gradient-text">Yerassyl</span>
          </h1>

          <p className="hero-role">
            Frontend & React Developer <span className="role-divider">•</span> Creative Problem Solver
          </p>

          <p className="hero-description">
            Passionate about transforming creative concepts into clean, functional, 
            and visually captivating Single Page Applications using React and modern CSS. 
            Welcome to my self-promotional interactive portfolio!
          </p>

          <div className="hero-actions">
            <a href="#about" className="btn btn-primary">
              <span>About Me</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>

            <a href="#contact" className="btn btn-secondary">
              <span>Get in Touch</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero-social-btn"
              title="GitHub Profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">React 19</span>
              <span className="metric-label">Modern Core</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">100%</span>
              <span className="metric-label">Component-Driven</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">Clean</span>
              <span className="metric-label">Vanilla CSS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Avatar Card */}
        <div className="hero-visual">
          <div className="avatar-frame-wrapper">
            <div className="ambient-glow-circle glow-1"></div>
            <div className="ambient-glow-circle glow-2"></div>
            
            <div className="avatar-card glass-card">
              <div className="avatar-image-container">
                <img
                  src={avatarImg}
                  alt="Yerassyl - React Developer"
                  className="avatar-image"
                  loading="eager"
                />
                <div className="avatar-badge">
                  <span className="badge-pulse"></span>
                  <span>Code • Create • Solve</span>
                </div>
              </div>

              <div className="avatar-card-info">
                <h3 className="avatar-card-name">Yerassyl</h3>
                <p className="avatar-card-subtitle">Building Interactive Web Apps</p>
                <div className="avatar-tags">
                  <span className="tag">React</span>
                  <span className="tag">Vite</span>
                  <span className="tag">SPA</span>
                  <span className="tag">UI/UX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
