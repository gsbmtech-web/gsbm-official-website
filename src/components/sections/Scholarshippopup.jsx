import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Scholarshippopup.css';

/* Files in public/ are served from the site root — reference them by URL,
   never import them. A relative import reaching into public/ breaks the
   Vite build. Path is case-sensitive on Vercel. */
const scholarshipCreative = '/images/scholarship-popup/scholarship-popup.jpg';

/* ─────────────────────────────────────────────────────────────
   Seconds before the close button becomes active.
   Ads point to /apply, so this popup is never the ad landing
   page and doesn't affect ad approval. This value only affects
   organic ranking on the homepage — lower is safer there.
───────────────────────────────────────────────────────────── */
const CLOSE_DELAY_SECONDS = 10;

/* Set to false if you want the popup on EVERY homepage visit
   in the same browser session (more aggressive, more annoying). */
const SHOW_ONCE_PER_SESSION = true;

const SESSION_KEY = 'gsbm_scholarship_popup_seen';

/* GA4 event helper — silently no-ops if gtag isn't loaded yet,
   so this never breaks the popup. */
const track = (eventName, params = {}) => {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, { ...params, popup: 'scholarship_2026' });
    }
  } catch { /* tracking must never block the UI */ }
};

const ScholarshipPopup = () => {
  const navigate = useNavigate();

  const [open,      setOpen]      = useState(false);
  const [remaining, setRemaining] = useState(CLOSE_DELAY_SECONDS);
  const closeBtnRef = useRef(null);

  const canClose = remaining <= 0;

  /* ── Open immediately on mount ────────────────────────────── */
  useEffect(() => {
    if (SHOW_ONCE_PER_SESSION && sessionStorage.getItem(SESSION_KEY)) return;
    setOpen(true);
    track('popup_shown');
    if (SHOW_ONCE_PER_SESSION) sessionStorage.setItem(SESSION_KEY, '1');
  }, []);

  /* ── Countdown ────────────────────────────────────────────── */
  useEffect(() => {
    if (!open || remaining <= 0) return;
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [open, remaining]);

  /* ── Lock body scroll while open ──────────────────────────── */
  useEffect(() => {
    if (!open) return;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow     = 'hidden';
    document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      document.body.style.overflow     = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  const handleClose = useCallback(() => {
    if (!canClose) return;
    track('popup_dismissed');
    setOpen(false);
  }, [canClose]);

  /* ── Escape closes, but only once the timer is done ───────── */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  /* ── Click the creative → Apply Now page ──────────────────── */
  const handleApply = useCallback(() => {
    track('popup_clicked', { destination: '/apply' });
    setOpen(false);
    navigate('/apply');
  }, [navigate]);

  if (!open) return null;

  return (
    <div
      className="gsp-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Exclusive scholarship opportunity — MBA admissions 2026–28"
    >
      <div className="gsp-modal">

        {/* Close — disabled until the countdown finishes */}
        <button
          ref={closeBtnRef}
          type="button"
          className={`gsp-close${canClose ? ' gsp-close--ready' : ''}`}
          onClick={handleClose}
          disabled={!canClose}
          aria-label={canClose ? 'Close scholarship offer' : `Close available in ${remaining} seconds`}
        >
          {canClose ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <span className="gsp-count">{remaining}</span>
          )}
        </button>

        {/* The creative itself is the CTA */}
        <button type="button" className="gsp-creative-btn" onClick={handleApply}>
          <img
            src={scholarshipCreative}
            alt="Exclusive scholarship opportunity — up to ₹1.5 lakhs scholarship for the first 20 students. GSBM MBA admissions 2026–28 batch. Apply online now."
            className="gsp-creative"
            fetchPriority="high"
            decoding="async"
          />
          {/* <span className="gsp-tap-hint">Tap to apply online</span> */}
        </button>

      </div>
    </div>
  );
};

export default ScholarshipPopup;