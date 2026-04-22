import { useState, useEffect, useRef } from 'react';

import vmrfLogoFull from '../../assets/mainlogo.png'

export default function Navbar() {
  const logoSrc = vmrfLogoFull;
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [applyOpen, setApplyOpen]   = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [activeNav, setActiveNav]   = useState('home');
  const [form, setForm]             = useState({
    name: '', email: '', phone: '', program: '', message: ''
  });
  const modalRef = useRef(null);

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Lock body scroll when modal/mobile open ── */
  useEffect(() => {
    document.body.style.overflow = (applyOpen || mobileOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [applyOpen, mobileOpen]);

  /* ── Close modal on backdrop click ── */
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setApplyOpen(false);
      setSubmitted(false);
    }
  };

  /* ── Close modal on Escape ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setApplyOpen(false); setSubmitted(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveNav(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const navItems = [
    { label: 'Home',       id: 'home' },
    { label: 'About',      id: 'about' },
    { label: 'Leadership', id: 'leadership' },
    { label: 'Programs',   id: 'programs' },
    { label: 'Campus',     id: 'campus' },
    { label: 'Admissions', id: 'admissions' },
    { label: 'Contact',    id: 'contact' },
  ];

  const programs = [
    'MBA – Full Time',
    'MBA – Executive',
    'MBA – Distance Learning',
    'BBA',
    'Ph.D. in Management',
    'Certificate Programs',
  ];

  /* ─────────────────────── RENDER ─────────────────────── */
  return (
    <>
      {/* ── TOP STRIP ── */}
      <div className="gsbm-topstrip">
        <div className="gsbm-topstrip-inner">
          <span className="gsbm-topstrip-left">
            <span className="gsbm-dot" />
            Ganesan School of Business Management
          </span>
          <div className="gsbm-topstrip-right">
            <a href="tel:+919841283764" className="gsbm-toplink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              +91 98412 83764
            </a>
            <span className="gsbm-divider" />
            <a href="mailto:manageradmissionsGSBM@vinayakamissions.com" className="gsbm-toplink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Admissions Enquiry
            </a>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header className={`gsbm-nav${scrolled ? ' gsbm-nav--scrolled' : ''}`}>
        <div className="gsbm-nav-inner">

          {/* LOGO */}
          <a
            href="#home"
            className="gsbm-logo-wrap"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="GSBM Home"
          >
            <img
              src={vmrfLogoFull}
              alt="Ganesan School of Business Management"
              className="gsbm-logo-img"
            />
          </a>

          {/* NAV LINKS — desktop */}
          <nav className="gsbm-nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`gsbm-navlink${activeNav === item.id ? ' gsbm-navlink--active' : ''}`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* APPLY NOW — desktop */}
          <div className="gsbm-nav-cta">
            <button
              className="gsbm-apply-btn"
              onClick={() => setApplyOpen(true)}
              aria-haspopup="dialog"
            >
              Apply Now
              <svg className="gsbm-apply-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* HAMBURGER — mobile */}
          <button
            className={`gsbm-ham${mobileOpen ? ' gsbm-ham--open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`gsbm-drawer-backdrop${mobileOpen ? ' gsbm-drawer-backdrop--open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`gsbm-drawer${mobileOpen ? ' gsbm-drawer--open' : ''}`}
        aria-label="Mobile navigation"
        role="navigation"
      >
        <div className="gsbm-drawer-head">
          <img src={vmrfLogoFull} alt="GSBM" className="gsbm-drawer-logo" />
          <button
            className="gsbm-drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav className="gsbm-drawer-nav">
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`gsbm-drawer-link${activeNav === item.id ? ' gsbm-drawer-link--active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <span>{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </a>
          ))}
        </nav>

        <div className="gsbm-drawer-footer">
          <button
            className="gsbm-drawer-apply"
            onClick={() => { setMobileOpen(false); setApplyOpen(true); }}
          >
            Apply Now →
          </button>
          <div className="gsbm-drawer-contact">
            <a href="tel:+919841283764">📞 +91 98412 83764</a>
          </div>
        </div>
      </aside>

      {/* ── APPLY NOW MODAL ── */}
      {applyOpen && (
        <div
          className="gsbm-modal-backdrop"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Apply Now"
        >
          <div className="gsbm-modal" ref={modalRef}>
            {/* Modal Header */}
            <div className="gsbm-modal-header">
              <div className="gsbm-modal-header-left">
                <img src={vmrfLogoFull} alt="GSBM" className="gsbm-modal-logo" />
                <div>
                  <h2 className="gsbm-modal-title">Apply Now</h2>
                  <p className="gsbm-modal-subtitle">Begin your journey at GSBM</p>
                </div>
              </div>
              <button
                className="gsbm-modal-close"
                onClick={() => { setApplyOpen(false); setSubmitted(false); }}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            {!submitted ? (
              <form className="gsbm-modal-form" onSubmit={handleSubmit} noValidate>
                <div className="gsbm-form-row">
                  <div className="gsbm-form-group">
                    <label className="gsbm-label" htmlFor="apply-name">Full Name *</label>
                    <input
                      id="apply-name"
                      className="gsbm-input"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="gsbm-form-group">
                    <label className="gsbm-label" htmlFor="apply-email">Email Address *</label>
                    <input
                      id="apply-email"
                      className="gsbm-input"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="gsbm-form-row">
                  <div className="gsbm-form-group">
                    <label className="gsbm-label" htmlFor="apply-phone">Phone Number *</label>
                    <input
                      id="apply-phone"
                      className="gsbm-input"
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleFormChange}
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <div className="gsbm-form-group">
                    <label className="gsbm-label" htmlFor="apply-program">Program of Interest *</label>
                    <select
                      id="apply-program"
                      className="gsbm-input gsbm-select"
                      name="program"
                      value={form.program}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select a program</option>
                      {programs.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="gsbm-form-group gsbm-form-group--full">
                  <label className="gsbm-label" htmlFor="apply-message">Message (Optional)</label>
                  <textarea
                    id="apply-message"
                    className="gsbm-input gsbm-textarea"
                    name="message"
                    placeholder="Tell us about yourself or any specific queries..."
                    value={form.message}
                    onChange={handleFormChange}
                    rows={3}
                  />
                </div>

                <div className="gsbm-modal-actions">
                  <p className="gsbm-form-note">
                    Our admissions team will contact you within 24 hours.
                  </p>
                  <button type="submit" className="gsbm-modal-submit">
                    Submit Application
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </form>
            ) : (
              /* Success state */
              <div className="gsbm-modal-success">
                <div className="gsbm-success-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="gsbm-success-title">Application Received!</h3>
                <p className="gsbm-success-msg">
                  Thank you, <strong>{form.name || 'Applicant'}</strong>. Our admissions team will reach out to you at <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  className="gsbm-modal-submit"
                  onClick={() => { setApplyOpen(false); setSubmitted(false); setForm({ name:'', email:'', phone:'', program:'', message:'' }); }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────── STYLES ─────────────── */}
      <style>{`
        /* ── CSS VARIABLES ── */
        :root {
          --gsbm-navy:    #1B2A4A;
          --gsbm-burg:    #6A1B1A;
          --gsbm-gold:    #C9A84C;
          --gsbm-gold-lt: #E8C97A;
          --gsbm-white:   #FFFFFF;
          --gsbm-off:     #F8F6F1;
          --gsbm-border:  #E5E0D8;
          --gsbm-text:    #1B2A4A;
          --gsbm-muted:   #6B7280;
          --gsbm-sans:    'Trebuchet MS', 'Segoe UI', sans-serif;
          --gsbm-nav-h:   115px;
          --gsbm-strip-h: 34px;
          --gsbm-shadow:  0 8px 32px rgba(27,42,74,0.10);
          --gsbm-shadow-lg: 0 24px 64px rgba(27,42,74,0.18);
        }

        /* ── TOP STRIP ── */
        .gsbm-topstrip {
          background: var(--gsbm-navy);
          height: var(--gsbm-strip-h);
          display: flex;
          align-items: center;
          border-bottom: 2px solid var(--gsbm-gold);
        }
        .gsbm-topstrip-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .gsbm-topstrip-left {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--gsbm-sans);
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.72);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gsbm-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gsbm-gold);
          flex-shrink: 0;
          animation: gsbm-pulse 2s ease-in-out infinite;
        }
        @keyframes gsbm-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }
        .gsbm-topstrip-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .gsbm-toplink {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--gsbm-sans);
          font-size: 0.68rem;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .gsbm-toplink:hover { color: var(--gsbm-gold); }
        .gsbm-divider {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,0.2);
        }

        /* ── MAIN NAVBAR ── */
        .gsbm-nav {
          position: sticky;
          top: 0;
          z-index: 900;
          background: var(--gsbm-white);
          border-bottom: 1px solid var(--gsbm-border);
          transition: box-shadow 0.3s, background 0.3s;
          height: var(--gsbm-nav-h);
        }
        .gsbm-nav--scrolled {
          box-shadow: var(--gsbm-shadow);
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .gsbm-nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 0;
        }

        /* ── LOGO ── */
        .gsbm-logo-wrap {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
          margin-right: 32px;
          /* Key trick: contain the logo to a fixed height; let width flow naturally */
          height: 420px;
          transition: opacity 0.2s, transform 0.2s;
        }
        .gsbm-logo-wrap:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .gsbm-logo-img {
          height: 160%;           /* fill exactly 60px tall */
          width: auto;            /* natural width — no distortion */
          max-width: 220px;       /* prevents very wide logos from going overboard */
          object-fit: contain;
          object-position: left center;
          display: block;
        }
        /* Shrink slightly when scrolled */
        .gsbm-nav--scrolled .gsbm-logo-wrap {
          height: 52px;
        }

        /* Fallback placeholder */
        .gsbm-logo-placeholder {
          height: 60px;
          width: 160px;
          background: var(--gsbm-navy);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gsbm-logo-placeholder-text {
          font-family: var(--gsbm-sans);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--gsbm-gold);
          letter-spacing: 0.1em;
        }

        /* ── NAV LINKS ── */
        .gsbm-nav-links {
          display: flex;
          align-items: stretch;
          height: 100%;
          flex: 1;
          justify-content: center;
          gap: 2px;
        }
        .gsbm-navlink {
          display: flex;
          align-items: center;
          padding: 0 16px;
          font-family: var(--gsbm-sans);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gsbm-navy);
          text-decoration: none;
          position: relative;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .gsbm-navlink::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px; right: 16px;
          height: 3px;
          background: var(--gsbm-gold);
          border-radius: 2px 2px 0 0;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .gsbm-navlink:hover,
        .gsbm-navlink--active {
          color: var(--gsbm-burg);
        }
        .gsbm-navlink:hover::after,
        .gsbm-navlink--active::after {
          transform: scaleX(1);
        }

        /* ── APPLY BUTTON ── */
        .gsbm-nav-cta {
          flex-shrink: 0;
          margin-left: 24px;
        }
        .gsbm-apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gsbm-burg);
          color: var(--gsbm-white);
          font-family: var(--gsbm-sans);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 11px 28px;
          border: 2px solid var(--gsbm-burg);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }
        .gsbm-apply-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gsbm-gold);
          transform: translateX(-101%);
          transition: transform 0.3s ease;
        }
        .gsbm-apply-btn:hover::before { transform: translateX(0); }
        .gsbm-apply-btn:hover {
          color: var(--gsbm-navy);
          border-color: var(--gsbm-gold);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(201,168,76,0.35);
        }
        .gsbm-apply-btn > * { position: relative; z-index: 1; }
        .gsbm-apply-arrow { transition: transform 0.2s; }
        .gsbm-apply-btn:hover .gsbm-apply-arrow { transform: translateX(3px); }

        /* ── HAMBURGER ── */
        .gsbm-ham {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: 1px solid var(--gsbm-border);
          border-radius: 6px;
          padding: 9px 10px;
          cursor: pointer;
          margin-left: auto;
          transition: border-color 0.2s, background 0.2s;
        }
        .gsbm-ham:hover {
          background: var(--gsbm-off);
          border-color: var(--gsbm-gold);
        }
        .gsbm-ham span {
          display: block;
          width: 22px; height: 2px;
          background: var(--gsbm-navy);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .gsbm-ham--open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .gsbm-ham--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .gsbm-ham--open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE DRAWER ── */
        .gsbm-drawer-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(27,42,74,0.45);
          z-index: 940;
          opacity: 0;
          transition: opacity 0.3s;
          backdrop-filter: blur(3px);
        }
        .gsbm-drawer-backdrop--open {
          opacity: 1;
        }
        .gsbm-drawer {
          position: fixed;
          top: 0; right: 0;
          width: min(340px, 88vw);
          height: 100dvh;
          background: var(--gsbm-white);
          z-index: 950;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.32,0.72,0,1);
          box-shadow: -8px 0 40px rgba(27,42,74,0.15);
        }
        .gsbm-drawer--open { transform: translateX(0); }

        .gsbm-drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 2px solid var(--gsbm-gold);
          background: var(--gsbm-off);
        }
        .gsbm-drawer-logo {
          height: 238px;
          width: auto;
          max-width: 320px;
          object-fit: contain;
        }
        .gsbm-drawer-logo-text {
          font-family: var(--gsbm-sans);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--gsbm-navy);
        }
        .gsbm-drawer-close {
          width: 36px; height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--gsbm-border);
          border-radius: 6px;
          color: var(--gsbm-navy);
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .gsbm-drawer-close:hover {
          background: var(--gsbm-off);
          border-color: var(--gsbm-gold);
        }

        .gsbm-drawer-nav {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }
        .gsbm-drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          font-family: var(--gsbm-sans);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--gsbm-navy);
          text-decoration: none;
          border-bottom: 1px solid var(--gsbm-border);
          transition: background 0.15s, color 0.15s, padding-left 0.2s;
          animation: gsbm-slideIn 0.35s ease both;
        }
        @keyframes gsbm-slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .gsbm-drawer-link:hover,
        .gsbm-drawer-link--active {
          background: rgba(201,168,76,0.08);
          color: var(--gsbm-burg);
          padding-left: 30px;
        }

        .gsbm-drawer-footer {
          padding: 20px 24px;
          border-top: 2px solid var(--gsbm-gold);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .gsbm-drawer-apply {
          width: 100%;
          background: var(--gsbm-burg);
          color: var(--gsbm-white);
          font-family: var(--gsbm-sans);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 14px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .gsbm-drawer-apply:hover {
          background: var(--gsbm-gold);
          color: var(--gsbm-navy);
          transform: translateY(-1px);
        }
        .gsbm-drawer-contact {
          text-align: center;
        }
        .gsbm-drawer-contact a {
          font-family: var(--gsbm-sans);
          font-size: 0.82rem;
          color: var(--gsbm-muted);
          text-decoration: none;
        }
        .gsbm-drawer-contact a:hover { color: var(--gsbm-burg); }

        /* ── MODAL ── */
        .gsbm-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(27,42,74,0.6);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(6px);
          animation: gsbm-fadeIn 0.2s ease;
        }
        @keyframes gsbm-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .gsbm-modal {
          background: var(--gsbm-white);
          border-radius: 12px;
          width: 100%;
          max-width: 680px;
          max-height: 90dvh;
          overflow-y: auto;
          box-shadow: var(--gsbm-shadow-lg);
          border: 1px solid var(--gsbm-border);
          animation: gsbm-slideUp 0.3s cubic-bezier(0.34,1.2,0.64,1);
        }
        @keyframes gsbm-slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .gsbm-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px 20px;
          border-bottom: 2px solid var(--gsbm-gold);
          background: var(--gsbm-off);
          border-radius: 12px 12px 0 0;
          gap: 16px;
        }
        .gsbm-modal-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .gsbm-modal-logo {
          height: 52px;
          width: auto;
          max-width: 160px;
          object-fit: contain;
        }
        .gsbm-modal-title {
          font-family: var(--gsbm-sans);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--gsbm-navy);
          margin: 0 0 2px;
        }
        .gsbm-modal-subtitle {
          font-family: var(--gsbm-sans);
          font-size: 0.78rem;
          color: var(--gsbm-muted);
          margin: 0;
          letter-spacing: 0.02em;
        }
        .gsbm-modal-close {
          width: 36px; height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--gsbm-border);
          border-radius: 6px;
          color: var(--gsbm-navy);
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .gsbm-modal-close:hover {
          background: var(--gsbm-burg);
          border-color: var(--gsbm-burg);
          color: white;
        }

        /* ── FORM ── */
        .gsbm-modal-form {
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .gsbm-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .gsbm-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .gsbm-form-group--full {
          grid-column: 1 / -1;
        }
        .gsbm-label {
          font-family: var(--gsbm-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--gsbm-navy);
        }
        .gsbm-input {
          width: 100%;
          padding: 11px 14px;
          font-family: var(--gsbm-sans);
          font-size: 0.88rem;
          color: var(--gsbm-text);
          background: var(--gsbm-white);
          border: 1.5px solid var(--gsbm-border);
          border-radius: 6px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
          box-sizing: border-box;
        }
        .gsbm-input:focus {
          border-color: var(--gsbm-gold);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.15);
        }
        .gsbm-input::placeholder { color: #aaa; }
        .gsbm-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231B2A4A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }
        .gsbm-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .gsbm-modal-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-top: 4px;
        }
        .gsbm-form-note {
          font-family: var(--gsbm-sans);
          font-size: 0.72rem;
          color: var(--gsbm-muted);
          margin: 0;
          flex: 1;
        }
        .gsbm-modal-submit {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gsbm-burg);
          color: var(--gsbm-white);
          font-family: var(--gsbm-sans);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 13px 32px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .gsbm-modal-submit:hover {
          background: var(--gsbm-gold);
          color: var(--gsbm-navy);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(201,168,76,0.35);
        }

        /* ── SUCCESS STATE ── */
        .gsbm-modal-success {
          padding: 48px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
        }
        .gsbm-success-icon {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(106,27,26,0.08);
          border: 2px solid var(--gsbm-burg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gsbm-burg);
          animation: gsbm-popIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes gsbm-popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .gsbm-success-title {
          font-family: var(--gsbm-sans);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gsbm-navy);
          margin: 0;
        }
        .gsbm-success-msg {
          font-family: var(--gsbm-sans);
          font-size: 0.9rem;
          color: var(--gsbm-muted);
          max-width: 380px;
          line-height: 1.6;
          margin: 0;
        }
/* ── RESPONSIVE ── */
@media (max-width: 1200px) {
  .gsbm-navlink { padding: 0 11px; font-size: 0.73rem; }
  .gsbm-logo-wrap { height: 80px; margin-right: 20px; }
  .gsbm-apply-btn { padding: 10px 18px; font-size: 0.73rem; }
}

@media (max-width: 1024px) {
  .gsbm-nav-links, .gsbm-nav-cta { display: none; }
  .gsbm-ham { display: flex; }
  .gsbm-drawer-backdrop { display: block; }
  :root { --gsbm-nav-h: 90px; }
  .gsbm-nav-inner { justify-content: space-between; position: relative; }
  .gsbm-logo-wrap {
    position: absolute;
    left: 25%;
    transform: translateX(-50%);
    margin: 0;
    height: 70px;
  }
  .gsbm-logo-img { object-position: center center; }
}

@media (max-width: 768px) {
  .gsbm-topstrip { display: none; }
  :root { --gsbm-nav-h: 80px; }
  .gsbm-logo-wrap { height: 60px; }
  .gsbm-nav-inner { padding: 0 1.2rem; }
  .gsbm-form-row { grid-template-columns: 1fr; }
  .gsbm-modal { border-radius: 10px; }
  .gsbm-modal-form { padding: 20px; }
  .gsbm-modal-header { padding: 18px 20px 16px; }
  .gsbm-modal-logo { height: 40px; }
}

@media (max-width: 480px) {
  :root { --gsbm-nav-h: 72px; }
  .gsbm-logo-wrap { height: 82px; }
  .gsbm-nav-inner { padding: 0 1rem; }
  .gsbm-modal-header-left { gap: 10px; }
  .gsbm-modal-title { font-size: 1.1rem; }
  .gsbm-modal-actions { flex-direction: column; align-items: stretch; }
  .gsbm-modal-submit { justify-content: center; }
}      `}</style>
    </>
  );
}