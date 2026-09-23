import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">Yerassyl</span>
            <p className="footer-tagline">
              Self-promotional Single Page Application (SPA) built for Task 2 using modern React & GitHub Pages.
            </p>
          </div>

          <div className="footer-nav">
            <a href="#about" className="footer-link">About</a>
            <a href="#skills" className="footer-link">Skills</a>
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>

          <button onClick={scrollToTop} className="back-to-top-btn" title="Back to Top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
            <span>Top</span>
          </button>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Yerassyl • Crafted with React & Vanilla CSS. Deployed via GitHub Pages.
          </p>
          <div className="footer-badges">
            <span className="badge-micro">React 19</span>
            <span className="badge-micro">Vite</span>
            <span className="badge-micro">SPA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
