import { useState, useEffect, useCallback, useRef, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import vmrfLogoFull from '../../assets/mainlogo.png';
import './Navbar.css';

// ─── Static data — outside component so it's never recreated ─────────────────
const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Leadership', id: 'leadership' },
  { label: 'Programs', id: 'programs' },
  { label: 'Campus', id: 'campus' },
  { label: 'Admissions', id: 'admissions' },
{ label: 'Placements', id: 'placements' },
  { label: 'Contact', id: 'contact' },
];

const SECTION_IDS = NAV_ITEMS.map((i) => i.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  const hamRef = useRef(null);

  // ── Navigate to /apply (non-urgent transition) ──────────────────────────────
  const goToApply = useCallback(() => {
    setMobileOpen(false);
    startTransition(() => navigate('/apply'));
  }, [navigate]);

  // ── Scroll detection (RAF-throttled, passive) ───────────────────────────────
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section tracking via IntersectionObserver ────────────────────────
  useEffect(() => {
    const observers = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveNav(id); },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Body scroll lock + scrollbar compensation ────────────────────────────────
  useEffect(() => {
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarW}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [mobileOpen]);

  // ── Escape key closes drawer ─────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        hamRef.current?.focus(); // return focus to trigger
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // ── Focus trap inside drawer ─────────────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex="0"]'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [mobileOpen]);

  // ── Smooth scroll to section ─────────────────────────────────────────────────
  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    setActiveNav(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector('.gsbm-nav');
    const navH = nav ? nav.getBoundingClientRect().height : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* ── Top contact strip ─────────────────────────────────────────────── */}
      <div className="gsbm-topstrip" role="complementary" aria-label="Contact strip">
        <div className="gsbm-topstrip-inner">
          <span className="gsbm-topstrip-left">
            <span className="gsbm-dot" aria-hidden="true" />
            Ganesan School of Business Management
          </span>
          <div className="gsbm-topstrip-right">
            <a href="tel:+919841283764" className="gsbm-toplink" aria-label="Call admissions: +91 98412 83764">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              +91 98412 83764
            </a>
            <span className="gsbm-divider" aria-hidden="true" />
            <a href="mailto:manageradmissionsGSBM@vinayakamissions.com" className="gsbm-toplink" aria-label="Email admissions">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Admissions Enquiry
            </a>
          </div>
        </div>
      </div>

      {/* ── Main navbar ───────────────────────────────────────────────────── */}
      <header className={`gsbm-nav${scrolled ? ' gsbm-nav--scrolled' : ''}`}>
        <div className="gsbm-nav-inner">

          {/* Logo — uses imported asset (not hardcoded /src/ path) */}
          <a
            href="#home"
            className="gsbm-logo-wrap"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="GSBM – Go to homepage"
          >
            <img
              src={vmrfLogoFull}
              alt="GSBM – Ganesan School of Business Management"
              className="gsbm-logo-img"
              width={200}
              height={80}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
            />
          </a>

          {/* Desktop nav links */}
          <nav className="gsbm-nav-links" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`gsbm-navlink${activeNav === item.id ? ' gsbm-navlink--active' : ''}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={activeNav === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="gsbm-nav-cta">
            <button
              type="button"
              className="gsbm-apply-btn"
              onClick={goToApply}
              aria-label="Apply now for MBA 2026–2028"
            >
              <span>Apply Now</span>
              <svg className="gsbm-apply-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Hamburger (mobile) */}
          <button
            ref={hamRef}
            type="button"
            className={`gsbm-ham${mobileOpen ? ' gsbm-ham--open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="gsbm-drawer"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

        </div>
      </header>

      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      <div
        className={`gsbm-drawer-backdrop${mobileOpen ? ' gsbm-drawer-backdrop--open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ──────────────────────────────────────────────────
           - role="dialog" (not "navigation") with aria-modal for screen readers
           - Focus trap wired above via useEffect
      ────────────────────────────────────────────────────────────────────── */}
      <div
        id="gsbm-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
        className={`gsbm-drawer${mobileOpen ? ' gsbm-drawer--open' : ''}`}
      >
        <div className="gsbm-drawer-head">
          <img
            src={vmrfLogoFull}
            alt="GSBM"
            className="gsbm-drawer-logo"
            width={180}
            height={64}
            loading="lazy"
            decoding="async"
          />
          <button
            type="button"
            className="gsbm-drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="gsbm-drawer-nav" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`gsbm-drawer-link${activeNav === item.id ? ' gsbm-drawer-link--active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
              style={{ animationDelay: mobileOpen ? `${i * 45}ms` : '0ms' }}
              aria-current={activeNav === item.id ? 'page' : undefined}
              tabIndex={mobileOpen ? 0 : -1}
            >
              <span>{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          ))}
        </nav>

        <div className="gsbm-drawer-footer">
          <button
            type="button"
            className="gsbm-drawer-apply"
            onClick={goToApply}
            tabIndex={mobileOpen ? 0 : -1}
            aria-label="Apply now for MBA 2026–2028"
          >
            Apply Now
          </button>
          <div className="gsbm-drawer-contact">
            <a href="tel:+919841283764" tabIndex={mobileOpen ? 0 : -1} aria-label="Call +91 98412 83764">
              +91 98412 83764
            </a>
          </div>
        </div>
      </div>
    </>
  );
}