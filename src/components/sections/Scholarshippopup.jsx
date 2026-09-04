import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Scholarshippopup.css';

/* Files in public/ are served from the site root — reference them by URL,
   never import them. A relative import reaching into public/ breaks the
   Vite build. Path is case-sensitive on Vercel. */
const CREATIVE_DIR = '/images/scholarship-popup';

/* ─────────────────────────────────────────────────────────────
   Explicit calendar → creative map. Not a formula — a lookup table,
   because the requested sequence isn't a straight countdown: it
   holds at "8" for the opening days, decrements daily from there,
   then holds at "1" for the closing days instead of continuing down.

   Dates are IST (Asia/Kolkata), matched against the visitor's current
   IST calendar date. Any date not listed here — before 4 Sept, or
   any date after 14 Sept — means the popup simply doesn't show, so
   this table is also what auto-pauses the campaign after the 14th.

   To run this for a future cohort, replace the table (and the image
   files it points at).
───────────────────────────────────────────────────────────── */
const DAY_COUNT_BY_DATE = {
  '2026-09-04': 8,
  '2026-09-05': 7,
  '2026-09-06': 6,
  '2026-09-07': 5,
  '2026-09-08': 4,
  '2026-09-09': 3,
  '2026-09-10': 2,
  '2026-09-11': 1,
  '2026-09-12': 1,
  '2026-09-13': 1,
  '2026-09-14': 1,
};

// en-CA locale formats as YYYY-MM-DD, which is exactly what the table above
// is keyed by — avoids any manual UTC-offset math.
const getTodayIST = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());

/* ─────────────────────────────────────────────────────────────
   Seconds before the close button becomes active.
   Ads point to /apply, so this popup is never the ad landing
   page and doesn't affect ad approval. This value only affects
   organic ranking on the homepage — lower is safer there.
───────────────────────────────────────────────────────────── */
const CLOSE_DELAY_SECONDS = 5;

/* Set to false if you want the popup on EVERY homepage visit
   in the same browser session (more aggressive, more annoying). */
const SHOW_ONCE_PER_SESSION = true;

/* Keyed per calendar date (not just "seen ever this session") so a
   visitor who leaves a tab open overnight still sees tomorrow's
   updated "X days left" creative once, instead of being stuck with
   whatever day-count they first saw. Uses the same IST date as the
   lookup table above so the two stay in sync. */
const sessionKeyForToday = (todayIST) => `gsbm_scholarship_popup_seen_${todayIST}`;

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

  // Computed once per mount — stable for the lifetime of this popup instance.
  const todayIST      = getTodayIST();
  const clampedDays   = DAY_COUNT_BY_DATE[todayIST];
  // Not in the table → before the campaign starts, or after 14 Sept. Either
  // way, the popup simply doesn't run — this is what auto-pauses it.
  const isCampaignLive = clampedDays !== undefined;
  const scholarshipCreative = isCampaignLive
    ? `${CREATIVE_DIR}/scholarship-popup-${clampedDays}.jpg`
    : null;
  const daysLeftLabel = isCampaignLive
    ? `${clampedDays} day${clampedDays === 1 ? '' : 's'} left`
    : '';

  /* ── Open immediately on mount — but never outside the dates in the table ── */
  useEffect(() => {
    if (!isCampaignLive) return;
    if (SHOW_ONCE_PER_SESSION && sessionStorage.getItem(sessionKeyForToday(todayIST))) return;
    setOpen(true);
    track('popup_shown', { days_left: clampedDays });
    if (SHOW_ONCE_PER_SESSION) sessionStorage.setItem(sessionKeyForToday(todayIST), '1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    track('popup_dismissed', { days_left: clampedDays });
    setOpen(false);
  }, [canClose, clampedDays]);

  /* ── Escape closes, but only once the timer is done ───────── */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  /* ── Click the creative → Apply Now page ──────────────────── */
  const handleApply = useCallback(() => {
    track('popup_clicked', { destination: '/apply', days_left: clampedDays });
    setOpen(false);
    navigate('/apply');
  }, [navigate, clampedDays]);

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
            alt={`Exclusive scholarship opportunity — up to ₹1.5 lakhs scholarship for the first 20 students. GSBM MBA admissions 2026–28 batch. ${daysLeftLabel}. Apply online now.`}
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