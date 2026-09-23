import React from 'react';
import avatarImg from '../assets/elon_and_me.png';

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
              href="https://github.com/etozheerassyl"
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

            <a
              href="https://t.me/etozheerasyl"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero-social-btn"
              title="Telegram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span>Telegram</span>
            </a>

            <a
              href="https://www.instagram.com/etozheerasyl/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline hero-social-btn"
              title="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
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
