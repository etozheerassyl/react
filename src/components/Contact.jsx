import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yerassyl.developer@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Let's Connect</span>
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-desc">
            Have an interesting project, question, or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Privacy-Safe Info Cards */}
          <div className="contact-info-col">
            <div className="contact-card glass-card">
              <h3 className="contact-card-title">Contact Channels</h3>
              <p className="contact-card-subtitle">
                Adhering to privacy best practices with safe, non-sensitive communication channels.
              </p>

              <div className="contact-items-list">
                {/* Location (Safe & Creative) */}
                <div className="contact-item">
                  <div className="contact-item-icon">🌍</div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">Location / Base</span>
                    <span className="contact-item-value">Planet Earth (Solar System)</span>
                  </div>
                </div>

                {/* GitHub */}
                <div className="contact-item">
                  <div className="contact-item-icon">🐙</div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">GitHub</span>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item-link"
                    >
                      github.com/yerassyl
                    </a>
                  </div>
                </div>

                {/* Safe Email */}
                <div className="contact-item">
                  <div className="contact-item-icon">✉️</div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">Safe Developer Email</span>
                    <span className="contact-item-value">yerassyl.developer@example.com</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="copy-btn"
                    title="Copy Email Address"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                {/* Social Handle */}
                <div className="contact-item">
                  <div className="contact-item-icon">💬</div>
                  <div className="contact-item-content">
                    <span className="contact-item-label">Social / Community</span>
                    <span className="contact-item-value">@yerassyl_dev</span>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="privacy-badge">
                <span className="privacy-badge-icon">🔒</span>
                <span>Privacy Protected: No sensitive personal numbers or private addresses listed.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-col">
            <div className="contact-form-card glass-card">
              <h3 className="form-card-title">Send a Quick Message</h3>
              <p className="form-card-subtitle">
                Fill out the form below to initiate a conversation or project inquiry.
              </p>

              {submitted ? (
                <div className="form-success-banner">
                  <div className="success-icon">🎉</div>
                  <h4>Message Received!</h4>
                  <p>Thank you for reaching out, {formData.name || 'friend'}! I'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="interactive-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Your Email (or Handle)
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      required
                      placeholder="Hello Yerassyl, I really like your React portfolio..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-input form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    <span>Send Message</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
