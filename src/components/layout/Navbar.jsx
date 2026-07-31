import { useState, useEffect, useCallback, useRef, startTransition, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import vmrfLogoFull from '../../assets/mainlogo.png';
import './Navbar.css';

// ─── Static data — outside component, never recreated ────────────────────────
const NAV_ITEMS = [
  { label: 'Home',       id: 'home',       path: '/'            },
  { label: 'About',      id: 'about',      path: '/about'       },
  { label: 'Leadership', id: 'leadership', path: '/leadership'  },
  { label: 'Programs',   id: 'programs',   path: '/programs'    },
  { label: 'Campus',     id: 'campus',     path: '/campus'      },
  { label: 'Admissions', id: 'admissions', path: '/admissions'  },
  { label: 'Placements', id: 'placements', path: '/placements'  },
  { label: 'Contact',    id: 'contact',    path: '/contact'     },
];

const SECTION_IDS = NAV_ITEMS.map((i) => i.id).filter((id) => id !== 'home');

// Best-effort initial active item from the current URL, so there's no flash
// of "Home" highlighted before the IntersectionObserver corrects it.
const pathToId = (pathname) => {
  const match = NAV_ITEMS.find((i) => i.path === pathname);
  return match ? match.id : 'home';
};

// ─── Static SVG icons ─────────────────────────────────────────────────────────
const PhoneIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
);

const EmailIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const ArrowIcon = (
  <svg className="gsbm-apply-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ChevronIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const CloseIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" focusable="false">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ─── NavLink ──────────────────────────────────────────────────────────────────
const NavLink = memo(function NavLink({ item, isActive, onClick }) {
  const handleClick = useCallback(
    (e) => onClick(e, item.path),
    [onClick, item.path]
  );
  return (
    <a
      href={item.path}
      className={`gsbm-navlink${isActive ? ' gsbm-navlink--active' : ''}`}
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.label}
    </a>
  );
});

// ─── DrawerLink ───────────────────────────────────────────────────────────────
const DrawerLink = memo(function DrawerLink({ item, isActive, isOpen, index, onClick }) {
  const handleClick = useCallback(
    (e) => onClick(e, item.path),
    [onClick, item.path]
  );
  return (
    <a
      href={item.path}
      className={`gsbm-drawer-link${isActive ? ' gsbm-drawer-link--active' : ''}`}
      onClick={handleClick}
      style={{ '--delay': `${index * 45}ms` }}
      aria-current={isActive ? 'page' : undefined}
      tabIndex={isOpen ? 0 : -1}
    >
      <span>{item.label}</span>
      {ChevronIcon}
    </a>
  );
});

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const location = useLocation();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav,  setActiveNav]  = useState(() => pathToId(location.pathname));
  const navigate  = useNavigate();
  const drawerRef = useRef(null);
  const hamRef    = useRef(null);

  // ── Navigate to /apply ───────────────────────────────────────────────────────
  const goToApply = useCallback(() => {
    setMobileOpen(false);
    startTransition(() => navigate('/apply'));
  }, [navigate]);

  // ── Logo click ────────────────────────────────────────────────────────────────
  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      startTransition(() => navigate('/'));
    }
  }, [navigate, location.pathname]);

  // ── Scroll detection (navbar shrink/shadow state) ────────────────────────────
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section tracking via IntersectionObserver ─────────────────────────
  // On Home, every section id exists in the DOM, so this behaves like a
  // classic scroll-spy — the nav highlights whichever section you're
  // scrolled past. On a standalone page (e.g. /programs), only that one
  // section's id exists, so it naturally becomes — and stays — the active
  // item without any extra branching. Runs fresh on every mount, which
  // happens automatically on every route change since these are genuinely
  // separate pages now.
  useEffect(() => {
    const observers = SECTION_IDS.reduce((acc, id) => {
      const el = document.getElementById(id);
      if (!el) return acc;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveNav(id); },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0.1 }
      );
      obs.observe(el);
      acc.push(obs);
      return acc;
    }, []);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Body scroll lock ─────────────────────────────────────────────────────────
  useEffect(() => {
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    if (mobileOpen) {
      document.body.style.overflow     = 'hidden';
      document.body.style.paddingRight = `${scrollbarW}px`;
    } else {
      document.body.style.overflow     = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow     = '';
      document.body.style.paddingRight = '';
    };
  }, [mobileOpen]);

  // ── Escape key closes drawer ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        hamRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // ── Focus trap inside drawer ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex="0"]'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [mobileOpen]);

  // ── Nav click — plain route navigation ────────────────────────────────────────
  // Every item is a genuinely separate page now, so this is just a normal
  // client-side navigate. No scroll math needed here — the destination page
  // renders at the top (ScrollToTop in App.jsx resets scroll on every route
  // change) and, on Home, the browser is already there naturally.
  const handleNavClick = useCallback((e, path) => {
    e.preventDefault();
    setMobileOpen(false);
    startTransition(() => navigate(path));
  }, [navigate]);

  // ── Toggle mobile menu ────────────────────────────────────────────────────────
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile  = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── Top contact strip ──────────────────────────────────────────────── */}
      <div className="gsbm-topstrip" role="complementary" aria-label="Contact strip">
        <div className="gsbm-topstrip-inner">
          <span className="gsbm-topstrip-left">
            <span className="gsbm-dot" aria-hidden="true" />
            Ganesan School of Business Management
          </span>
          <div className="gsbm-topstrip-right">
            <a
              href="tel:+918667690672"
              className="gsbm-toplink"
              aria-label="Call admissions: +91 8667690672"
            >
              {PhoneIcon}
              +91 8667690672
            </a>
            <span className="gsbm-divider" aria-hidden="true" />
            <a
              href="mailto:admissions@gsbm.co.in"
              className="gsbm-toplink"
              aria-label="Email admissions office"
            >
              {EmailIcon}
              Admissions Enquiry
            </a>
          </div>
        </div>
      </div>

      {/* ── Main navbar ────────────────────────────────────────────────────── */}
      <header className={`gsbm-nav${scrolled ? ' gsbm-nav--scrolled' : ''}`}>
        <div className="gsbm-nav-inner">

          {/* Logo */}
          <a
            href="/"
            className="gsbm-logo-wrap"
            onClick={handleLogoClick}
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

          {/* Desktop nav */}
          <nav className="gsbm-nav-links" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                isActive={activeNav === item.id}
                onClick={handleNavClick}
              />
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
              {ArrowIcon}
            </button>
          </div>

          {/* Hamburger */}
          <button
            ref={hamRef}
            type="button"
            className={`gsbm-ham${mobileOpen ? ' gsbm-ham--open' : ''}`}
            onClick={toggleMobile}
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

      {/* ── Backdrop ───────────────────────────────────────────────────────── */}
      <div
        className={`gsbm-drawer-backdrop${mobileOpen ? ' gsbm-drawer-backdrop--open' : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
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
          <a href="/" onClick={handleLogoClick} aria-label="GSBM – Go to homepage">
            <img
              src={vmrfLogoFull}
              alt="GSBM"
              className="gsbm-drawer-logo"
              width={180}
              height={64}
              loading="lazy"
              decoding="async"
            />
          </a>
          <button
            type="button"
            className="gsbm-drawer-close"
            onClick={closeMobile}
            aria-label="Close navigation menu"
          >
            {CloseIcon}
          </button>
        </div>

        <nav className="gsbm-drawer-nav" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, i) => (
            <DrawerLink
              key={item.id}
              item={item}
              isActive={activeNav === item.id}
              isOpen={mobileOpen}
              index={i}
              onClick={handleNavClick}
            />
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
            <a
              href="tel:+918667690672"
              tabIndex={mobileOpen ? 0 : -1}
              aria-label="Call admissions: +91 8667690672"
            >
              +91 8667690672
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Navbar);