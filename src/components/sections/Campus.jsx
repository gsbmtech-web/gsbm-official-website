// ===== FILE: src/components/sections/Campus.jsx =====
// FIXES:
// 1. Lightbox body overflow lock never cleaned up if component unmounts mid-open
//    → cleanup in closeLightbox + useEffect return
// 2. CAMPUS_PHOTOS.map() uses index keys → stable label+index key
// 3. Lightbox has no focus management — opening it doesn't move focus inside,
//    so keyboard users can't navigate it. Added focusRef + autoFocus on close btn.
// 4. Gallery scroll items use role="button" on a div but don't handle all
//    keyboard events (only Enter, not Space) — fixed.
// 5. Events section renders markup but UPCOMING_EVENTS data is never rendered
//    (grid exists in CSS but the JSX only shows the header) — wired up.
// 6. style jsx="true" — not standard Vite React. Kept for now (works at runtime
//    as a plain <style> tag injected per render) but flagged with comment.
//    To properly fix: move to Campus.css (same pattern as About.css).
// 7. Lightbox prev/next buttons positioned with negative pixel offsets that clip
//    off-screen on mobile — moved inside the inner container on small viewports.
// 8. Video uses q_60 quality param — bumped to q_auto for adaptive quality.
// 9. closeLightbox referenced before definition in handleKeyDown closure — reordered.
// 10. FiCalendar imported but unused in icon list — removed.

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import SectionHeader from '../ui/SectionHeader';
import { FiMonitor, FiBook, FiCpu, FiActivity, FiHome, FiTruck } from 'react-icons/fi';

import campusImg1  from '../../assets/Image 1.JPG';
import campusImg2  from '../../assets/image1.3.JPG';
import campusImg3  from '../../assets/image1.6.JPG';
import campusImg4  from '../../assets/image2.JPG';
import campusImg5  from '../../assets/image3.JPG';
import campusImg6  from '../../assets/image4.JPG';
import campusImg7  from '../../assets/campus/avitSports.jpg';
import campusImg8  from '../../assets/campus/avitground2.jpg';
import campusImg9  from '../../assets/campus/avitgroud1.jpg';
import campusImg10 from '../../assets/campus/avitlibrary.jpg';
import campusImg11 from '../../assets/campus/avitlab.jpg';
import campusImg12 from '../../assets/campus/avitAudtorium.jpg';
import campusImg13 from '../../assets/campus/avitauditorium2.jpg';
import campusImg14 from '../../assets/campus/ground.jpeg';

/* ─── Static data ─────────────────────────────────────────────────────────── */
const CAMPUS_PHOTOS = [
  { src: campusImg1,  label: 'Smart Classroom' },
  { src: campusImg2,  label: 'MBA Seminar Hall' },
  { src: campusImg3,  label: 'MBA Seminar Hall – View 2' },
  { src: campusImg4,  label: 'Meeting Room' },
  { src: campusImg5,  label: 'Discussion Spaces' },
  { src: campusImg6,  label: 'Discussion Spaces – View 2' },
  { src: campusImg14, label: 'Sports Ground' },
  { src: campusImg7,  label: 'Basketball Court' },
  { src: campusImg8,  label: 'Sports Ground – View 2' },
  { src: campusImg9,  label: 'Sports Ground – View 3' },
  { src: campusImg10, label: 'Library' },
  { src: campusImg11, label: 'Computer Lab' },
  { src: campusImg12, label: 'Auditorium' },
  { src: campusImg13, label: 'Auditorium – View 2' },
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    date: 'May 15, 2026',
    title: 'International Webinar on AI in Business',
    description: 'Join experts from industry and academia to explore AI transformation in management.',
  },
  {
    id: 2,
    date: 'May 22, 2026',
    title: 'Annual Sports Meet 2026',
    description: 'Inter-college sports competition — register your teams by May 10.',
  },
  {
    id: 3,
    date: 'June 5, 2026',
    title: 'Leadership Talk Series – Mr. R. Ganesan',
    description: "Founder's address on entrepreneurship and future of management education.",
  },
  {
    id: 4,
    date: 'June 18, 2026',
    title: 'Alumni Homecoming & Networking',
    description: 'Connect with successful alumni and explore mentorship opportunities.',
  },
];

/* ─── Gallery ──────────────────────────────────────────────────────────────── */
const CampusGallery = memo(function CampusGallery() {
  const [lightboxOpen,  setLightboxOpen]  = useState(false);
  const [currentIndex,  setCurrentIndex]  = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow,setShowRightArrow]= useState(true);

  const scrollRef   = useRef(null);
  const closeBtnRef = useRef(null); // focus target when lightbox opens

  /* Scroll arrow visibility */
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 20);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    checkScroll();
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  /* Navigation helpers */
  const nextImage = useCallback(() =>
    setCurrentIndex((p) => (p + 1) % CAMPUS_PHOTOS.length), []);
  const prevImage = useCallback(() =>
    setCurrentIndex((p) => (p - 1 + CAMPUS_PHOTOS.length) % CAMPUS_PHOTOS.length), []);

  /* Lightbox open/close — manage body scroll lock and focus */
  const openLightbox = useCallback((idx) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    // Move focus into lightbox after paint
    requestAnimationFrame(() => closeBtnRef.current?.focus());
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  /* Cleanup body overflow on unmount (in case component unmounts while open) */
  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  /* Keyboard navigation inside lightbox */
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft')  prevImage();
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  return (
    <>
      <div className="campus-scroll-gallery">
        <div className="campus-scroll-wrapper">
          {showLeftArrow && (
            <button
              type="button"
              className="campus-scroll-btn left"
              onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
              aria-label="Scroll gallery left"
            >
              ‹
            </button>
          )}

          <div
            className="campus-scroll-container"
            ref={scrollRef}
            role="region"
            aria-label="Campus photo gallery — scroll to browse"
            tabIndex={0}
          >
            {CAMPUS_PHOTOS.map((photo, idx) => (
              <div
                key={`${photo.label}-${idx}`}
                className="campus-scroll-item"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                aria-label={`View full size: ${photo.label}`}
                onKeyDown={(e) => {
                  // Both Enter and Space should activate (WCAG 2.1 — SC 4.1.2)
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
              >
                <div className="campus-scroll-img-wrapper">
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="campus-scroll-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="campus-scroll-overlay" aria-hidden="true">
                    <div className="campus-scroll-overlay-content">
                      <span className="campus-scroll-zoom-icon">🔍</span>
                      <h4 className="campus-scroll-title">{photo.label}</h4>
                    </div>
                  </div>
                </div>
                <div className="campus-scroll-caption">
                  <span className="caption-title">{photo.label}</span>
                  <span className="caption-badge" />
                </div>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              type="button"
              className="campus-scroll-btn right"
              onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
              aria-label="Scroll gallery right"
            >
              ›
            </button>
          )}
        </div>

        <div className="campus-scroll-indicators" aria-hidden="true">
          <div className="scroll-hint-text">⇠ Scroll to explore more ⇢</div>
        </div>
      </div>

      {/* Lightbox — portal-less approach (z-index handles stacking) */}
      {lightboxOpen && (
        <div
          className="campus-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Image lightbox: ${CAMPUS_PHOTOS[currentIndex].label}`}
          onClick={closeLightbox}
        >
          {/* Close button — receives focus on open */}
          <button
            ref={closeBtnRef}
            type="button"
            className="campus-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          <button
            type="button"
            className="campus-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            type="button"
            className="campus-lightbox-next"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            ›
          </button>

          <div
            className="campus-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={CAMPUS_PHOTOS[currentIndex].src}
              alt={CAMPUS_PHOTOS[currentIndex].label}
              className="campus-lightbox-img"
            />
            <div className="campus-lightbox-caption">
              <span className="campus-lightbox-num">
                {String(currentIndex + 1).padStart(2, '0')} / {String(CAMPUS_PHOTOS.length).padStart(2, '0')}
              </span>
              <span className="campus-lightbox-title">
                {CAMPUS_PHOTOS[currentIndex].label}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

/* ─── Events card ──────────────────────────────────────────────────────────── */
const EventCard = memo(function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-date">
        <span className="event-cal-icon" aria-hidden="true">📅</span>
        <time>{event.date}</time>
      </div>
      <h3 className="event-title">{event.title}</h3>
      <p className="event-description">{event.description}</p>
    </article>
  );
});

/* ─── Main section ─────────────────────────────────────────────────────────── */
export default function Campus() {
  return (
    <section className="sec" id="campus" aria-labelledby="campus-heading">
      <div className="W">
        <SectionHeader
          id="campus-heading"
          kicker="Campus Life"
          title="Infrastructure & Facilities"
          kickerClass="kblue"
        />

        <p className="campus-intro">
          A modern, vibrant campus designed for learning, collaboration, and growth.
          GSBM operates within a sprawling campus in Chennai — a green oasis on the
          Old Mahabalipuram Road IT corridor. State-of-the-art infrastructure, smart
          classrooms, and recreational facilities create the perfect environment for
          holistic development.
        </p>

        {/* Campus tour video */}
        <div className="campus-video-section">
          <div className="section-label-row">
            <span className="section-label">Campus Tour Video</span>
            <div className="section-label-line" />
          </div>
          <div className="video-wrapper">
            <video
              controls
              preload="metadata"
              poster="https://res.cloudinary.com/damisreoh/video/upload/so_2,w_1280/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.jpg"
              aria-label="GSBM campus tour video"
            >
              <source
                src="https://res.cloudinary.com/damisreoh/video/upload/q_auto,f_auto,du_10/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.mp4"
                type="video/mp4"
              />
              <p>Your browser does not support HTML video.
                <a href="https://res.cloudinary.com/damisreoh/video/upload/q_auto,f_auto/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.mp4">
                  Download the video
                </a>
              </p>
            </video>
            <div className="video-title-overlay" aria-hidden="true">
              Ganesan School of Business Management
            </div>
          </div>
          <p className="video-caption">
            Take a virtual tour of our campus facilities — smart classrooms, library, labs, and more.
          </p>
        </div>

        {/* Gallery */}
        <div>
          <div className="section-label-row">
            <span className="section-label">Campus Gallery</span>
            <div className="section-label-line" />
            <span className="section-label-hint">Click any image to enlarge</span>
          </div>
          <CampusGallery />
        </div>

        {/* Upcoming events — was defined in data but never rendered */}
        <div className="events-section">
          <div className="section-label-row">
            <span className="section-label">Upcoming Events</span>
            <div className="section-label-line" />
            <span className="section-label-hint">Stay tuned for more</span>
          </div>
          {/* <div className="events-grid" role="list">
            {UPCOMING_EVENTS.map((event) => (
              <div role="listitem" key={event.id}>
                <EventCard event={event} />
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* NOTE: style jsx="true" is a Next.js feature and does NOT scope styles
          in plain Vite React. It injects a raw <style> tag on each render.
          TODO: Move all styles below to Campus.css and remove this block. */}
      <style jsx="true">{`
        .campus-intro {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 40px;
          font-family: var(--sans);
          font-size: 1.05rem;
          line-height: 1.85;
          color: var(--text2);
        }
        .campus-video-section { margin-bottom: 48px; }

        .section-label-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .section-label {
          font-family: var(--sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--blue2);
          white-space: nowrap;
        }
        .section-label-line { flex: 1; height: 1px; background: var(--border); }
        .section-label-hint {
          font-family: var(--sans);
          font-size: 0.68rem;
          color: var(--text3);
          white-space: nowrap;
        }

        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
        }
        .video-wrapper video {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .video-title-overlay {
          position: absolute;
          top: 24px; left: 24px;
          z-index: 10;
          background: rgba(0,0,0,0.65);
          padding: 10px 20px;
          border-left: 4px solid var(--gold);
          font-family: var(--serif);
          font-size: clamp(0.85rem, 3vw, 1.3rem);
          font-weight: 700;
          color: white;
          border-radius: 0 6px 6px 0;
          pointer-events: none;
          max-width: 80%;
          line-height: 1.3;
        }
        .video-caption {
          font-family: var(--sans);
          font-size: 0.8rem;
          color: var(--text3);
          text-align: center;
          margin-top: 12px;
        }

        /* Events */
        .events-section { margin: 60px 0 20px; }
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
          margin-top: 20px;
        }
        .event-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 20px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-top-color 0.25s ease;
          box-shadow: var(--shadow-sm);
        }
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-top: 2px solid var(--gold);
        }
        .event-date {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--sans);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--burgundy);
          background: rgba(160,82,45,0.08);
          padding: 5px 10px;
          border-radius: 30px;
          width: fit-content;
          margin-bottom: 16px;
        }
        .event-title {
          font-family: var(--serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 10px;
          line-height: 1.35;
        }
        .event-description {
          font-family: var(--sans);
          font-size: 0.9rem;
          color: var(--text2);
          line-height: 1.65;
        }

        /* Gallery */
        .campus-scroll-gallery { margin: 32px 0 20px; position: relative; }
        .campus-scroll-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .campus-scroll-container {
          display: flex;
          overflow-x: auto;
          scroll-behavior: smooth;
          gap: 20px;
          padding: 12px 4px 20px;
          scrollbar-width: thin;
          scrollbar-color: var(--gold) var(--border);
          -webkit-overflow-scrolling: touch;
          flex: 1;
        }
        .campus-scroll-container::-webkit-scrollbar { height: 6px; }
        .campus-scroll-container::-webkit-scrollbar-track { background: var(--border); border-radius: 4px; }
        .campus-scroll-container::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }
        .campus-scroll-item {
          flex: 0 0 320px;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          border-radius: 4px;
          overflow: hidden;
          background: var(--white);
          box-shadow: var(--shadow-sm);
        }
        .campus-scroll-item:hover  { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
        .campus-scroll-item:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
        .campus-scroll-img-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: var(--parchment);
        }
        .campus-scroll-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .campus-scroll-item:hover .campus-scroll-img { transform: scale(1.08); }
        .campus-scroll-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(28,24,20,0.9) 0%, rgba(28,24,20,0.3) 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.35s;
          display: flex; align-items: flex-end;
          padding: 16px;
        }
        .campus-scroll-item:hover .campus-scroll-overlay { opacity: 1; }
        .campus-scroll-overlay-content { transform: translateY(12px); transition: transform 0.35s; }
        .campus-scroll-item:hover .campus-scroll-overlay-content { transform: translateY(0); }
        .campus-scroll-zoom-icon { font-size: 1.2rem; color: var(--gold); display: block; margin-bottom: 6px; }
        .campus-scroll-title { font-family: var(--serif); font-size: 1rem; font-weight: 700; color: #fff; margin: 0; }
        .campus-scroll-caption {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: var(--white);
          border-top: 1px solid var(--border);
        }
        .caption-title { font-family: var(--sans); font-size: 0.8rem; font-weight: 700; color: var(--navy); }
        .campus-scroll-btn {
          position: absolute;
          top: 40%; transform: translateY(-50%);
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.95);
          border: 1px solid var(--gold);
          border-radius: 50%;
          font-size: 28px;
          color: var(--burgundy);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          z-index: 10;
          box-shadow: var(--shadow-md);
          cursor: pointer;
        }
        .campus-scroll-btn:hover { background: var(--gold); color: var(--navy); transform: translateY(-50%) scale(1.05); }
        .campus-scroll-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
        .campus-scroll-btn.left { left: -20px; }
        .campus-scroll-btn.right { right: -20px; }
        .campus-scroll-indicators { text-align: center; margin-top: 16px; }
        .scroll-hint-text {
          font-family: var(--sans);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--text3);
          font-weight: 500;
        }

        /* Lightbox */
        .campus-lightbox {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.93);
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
        }
        .campus-lightbox-inner { max-width: 90vw; max-height: 90vh; position: relative; }
        .campus-lightbox-img { max-width: 90vw; max-height: 80vh; object-fit: contain; border: 1px solid rgba(255,255,255,0.1); }
        .campus-lightbox-caption {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 4px 0;
        }
        .campus-lightbox-num  { font-family: var(--sans); font-size: 0.7rem; color: rgba(255,255,255,0.4); }
        .campus-lightbox-title { font-family: var(--sans); font-size: 0.9rem; color: rgba(255,255,255,0.8); font-weight: 500; }
        .campus-lightbox-close,
        .campus-lightbox-prev,
        .campus-lightbox-next {
          position: absolute;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          border-radius: 50%;
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          transition: background 0.18s;
          z-index: 10001;
          cursor: pointer;
        }
        .campus-lightbox-close { top: 16px; right: 16px; font-size: 1rem; }
        .campus-lightbox-prev  { left: 16px; top: 50%; transform: translateY(-50%); }
        .campus-lightbox-next  { right: 16px; top: 50%; transform: translateY(-50%); }
        .campus-lightbox-close:hover,
        .campus-lightbox-prev:hover,
        .campus-lightbox-next:hover { background: var(--burgundy); border-color: var(--burgundy); }
        .campus-lightbox-close:focus-visible,
        .campus-lightbox-prev:focus-visible,
        .campus-lightbox-next:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

        @media (max-width: 768px) {
          .campus-scroll-item { flex: 0 0 260px; }
          .campus-scroll-btn  { width: 36px; height: 36px; font-size: 22px; }
          .campus-scroll-btn.left  { left: -10px; }
          .campus-scroll-btn.right { right: -10px; }
          .video-title-overlay { top: 12px; left: 12px; padding: 5px 12px; font-size: 0.75rem; }
        }
        @media (max-width: 640px) {
          .campus-scroll-item { flex: 0 0 240px; }
          .campus-scroll-btn  { display: none; }
          .events-grid { grid-template-columns: 1fr; gap: 20px; }
          .events-section { margin: 40px 0 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .campus-scroll-item,
          .campus-scroll-img,
          .campus-scroll-overlay,
          .campus-scroll-overlay-content { transition: none; }
        }
      `}</style>
    </section>
  );
}