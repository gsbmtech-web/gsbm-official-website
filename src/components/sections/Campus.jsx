// ===== FILE: src/components/sections/Campus.jsx =====
import { useState, useRef, useEffect, useCallback } from 'react';
import SectionHeader from '../ui/SectionHeader';
import { FiMonitor, FiBook, FiCpu, FiActivity, FiHome, FiTruck } from 'react-icons/fi';

// Campus photos — use explicit imports so Vite resolves them correctly
import campusImg1 from '../../assets/Image 1.JPG';
import campusImg2 from '../../assets/image1.3.JPG';
import campusImg3 from '../../assets/image1.6.JPG';
import campusImg4 from '../../assets/image2.JPG';
import campusImg5 from '../../assets/image3.JPG';
import campusImg6 from '../../assets/image4.JPG';

/* ─── STATIC DATA ─── */
const CAMPUS_PHOTOS = [
  { src: campusImg1, label: 'Smart Classroom' },
  { src: campusImg2, label: 'MBA Seminar Hall' },
  { src: campusImg3, label: 'MBA Seminar Hall' },
  { src: campusImg4, label: 'Library & Digital Resource Centre' },
  { src: campusImg5, label: 'Workshop & Collaboration Space' },
  { src: campusImg6, label: 'Campus Grounds — GSBM' },
];

const highlights = [
  { icon: FiMonitor, title: 'Smart Classrooms', desc: 'Air-conditioned classrooms with interactive boards and AV systems for immersive learning.' },
  { icon: FiBook, title: 'Modern Library', desc: 'Extensive collection of books, journals, and digital resources with quiet study zones.' },
  { icon: FiCpu, title: 'Computer Labs', desc: 'High-speed internet, ERP software, and analytics tools for hands-on training.' },
  { icon: FiActivity, title: 'Sports Complex', desc: 'Indoor and outdoor facilities including cricket, volleyball, basketball, and gym.' },
  { icon: FiHome, title: 'Hostel Facilities', desc: 'Separate hostels for boys and girls with 24/7 security, WiFi, and mess facilities.' },
  { icon: FiTruck, title: 'Transport', desc: 'Bus connectivity across Chennai routes for day scholars and commuting students.' },
];

const stats = [
  { value: '48', label: 'Acres Campus' },
  { value: '15+', label: 'Smart Classrooms' },
  { value: '50,000+', label: 'Library Volumes' },
  { value: '100%', label: 'WiFi Campus' },
];

/* ══════════════════════════════════════
   CAMPUS GALLERY — horizontal scroll (inline, exact from original)
══════════════════════════════════════ */
function CampusGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 20);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });
    checkScrollPosition();
    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

  const openLightbox = idx => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = useCallback(() =>
    setCurrentIndex(prev => (prev + 1) % CAMPUS_PHOTOS.length), []);
  const prevImage = useCallback(() =>
    setCurrentIndex(prev => (prev - 1 + CAMPUS_PHOTOS.length) % CAMPUS_PHOTOS.length), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = e => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <>
      <div className="campus-scroll-gallery">
        <div className="campus-scroll-header">
          <div className="section-label-row">
            <span className="section-label">360° Campus Experience</span>
            <div className="section-label-line" />
            <span className="section-label-hint">Swipe or click arrows →</span>
          </div>
        </div>

        <div className="campus-scroll-wrapper">
          {showLeftArrow && (
            <button
              className="campus-scroll-btn left"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>
          )}

          <div
            className="campus-scroll-container"
            ref={scrollContainerRef}
            tabIndex={0}
            role="region"
            aria-label="Campus photo gallery"
          >
            {CAMPUS_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="campus-scroll-item"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                aria-label={`View ${photo.label}`}
                onKeyDown={e => e.key === 'Enter' && openLightbox(idx)}
              >
                <div className="campus-scroll-img-wrapper">
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="campus-scroll-img"
                    loading="lazy"
                  />
                  <div className="campus-scroll-overlay">
                    <div className="campus-scroll-overlay-content">
                      <span className="campus-scroll-zoom-icon">🔍</span>
                      <h4 className="campus-scroll-title">{photo.label}</h4>
                    </div>
                  </div>
                </div>
                <div className="campus-scroll-caption">
                  <span className="caption-title">{photo.label}</span>
                  <span className="caption-badge">Explore</span>
                </div>
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              className="campus-scroll-btn right"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              ›
            </button>
          )}
        </div>

        <div className="campus-scroll-indicators">
          <div className="scroll-hint-text">⇠ Scroll to explore more ⇢</div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="campus-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button className="campus-lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button
            className="campus-lightbox-prev"
            onClick={e => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="campus-lightbox-next"
            onClick={e => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="campus-lightbox-inner" onClick={e => e.stopPropagation()}>
            <img
              src={CAMPUS_PHOTOS[currentIndex].src}
              alt={CAMPUS_PHOTOS[currentIndex].label}
              className="campus-lightbox-img"
            />
            <div className="campus-lightbox-caption">
              <span className="campus-lightbox-num">
                {String(currentIndex + 1).padStart(2, '0')} / {String(CAMPUS_PHOTOS.length).padStart(2, '0')}
              </span>
              <span className="campus-lightbox-title">{CAMPUS_PHOTOS[currentIndex].label}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════
   MAIN CAMPUS SECTION
══════════════════════════════════════ */
export default function Campus() {
  return (
    <section className="sec" id="campus">
      <div className="W">
        <SectionHeader
          kicker="Campus Life"
          title="Infrastructure & Facilities"
          kickerClass="kblue"
        />

        <p className="campus-intro">
          A modern, vibrant campus designed for learning, collaboration, and growth — where every space inspires excellence.
          Ganesan School of Business Management(GSBM) operates within a sprawling campus in Chennai — a green oasis on the Old Mahabalipuram Road IT corridor.
          State-of-the-art infrastructure, smart classrooms, and recreational facilities create the perfect environment for holistic development.
        </p>

        {/* Campus Tour Video */}
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
            >
              <source
                src="https://res.cloudinary.com/damisreoh/video/upload/q_60,f_auto,du_10/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
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

        {/* Campus Highlights */}
        <div style={{ marginTop: 48 }}>
          <p className="section-label" style={{ textAlign: 'center', display: 'block', marginBottom: 24 }}>
            Campus Highlights
          </p>
          <div className="g3" style={{ gap: 20 }}>
            {highlights.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="icard" style={{ textAlign: 'center' }}>
                  <div className="icard-ico" style={{ margin: '0 auto 16px' }}>
                    <IconComponent size={28} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Stats Strip */}
        {/* <div className="campus-stats-strip">
          {stats.map((s, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <p className="campus-stat-value">{s.value}</p>
              <p className="campus-stat-label">{s.label}</p>
            </div>
          ))}
        </div> */}
      </div>

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
        .video-caption {
          font-family: var(--sans);
          font-size: 0.8rem;
          color: var(--text3);
          text-align: center;
          margin-top: 12px;
        }

        .icard {
          padding: 28px 24px;
          background: var(--white);
          border: 1px solid var(--border);
          border-top: 2px solid var(--gold);
          border-radius: 2px;
          transition: all .22s;
        }
        .icard:hover {
          border-top-color: var(--burgundy);
          box-shadow: 0 8px 32px rgba(28,24,20,.08);
          transform: translateY(-3px);
        }
        .icard-ico {
          width: 46px; height: 46px;
          background: var(--burgundy);
          border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
        }
        .icard h3 {
          font-family: var(--serif);
          font-size: 1.25rem;
          color: var(--navy);
          margin-bottom: 9px;
        }
        .icard p {
          font-family: var(--sans);
          font-size: 1rem;
          color: var(--text2);
          line-height: 1.78;
        }

        .campus-stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 48px;
          padding: 32px;
          background: var(--cream);
          border: 1px solid var(--border);
        }
        .campus-stat-value {
          font-family: var(--serif);
          font-size: 2.6rem;
          font-weight: 700;
          color: var(--burgundy);
          line-height: 1;
          margin-bottom: 8px;
        }
        .campus-stat-label {
          font-family: var(--sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text2);
        }

        /* Gallery Styles */
        .campus-scroll-gallery { margin: 32px 0 20px; position: relative; }
        .campus-scroll-header { margin-bottom: 20px; }

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
          transition: transform .3s, box-shadow .3s;
          border-radius: 4px;
          overflow: hidden;
          background: var(--white);
          box-shadow: var(--shadow-sm);
        }
        .campus-scroll-item:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }

        .campus-scroll-img-wrapper {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: var(--parchment);
        }
        .campus-scroll-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .campus-scroll-item:hover .campus-scroll-img { transform: scale(1.08); }

        .campus-scroll-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(28,24,20,0.9) 0%, rgba(28,24,20,0.3) 60%, transparent 100%);
          opacity: 0;
          transition: opacity .35s;
          display: flex; align-items: flex-end;
          padding: 16px;
        }
        .campus-scroll-item:hover .campus-scroll-overlay { opacity: 1; }

        .campus-scroll-overlay-content {
          transform: translateY(12px);
          transition: transform .35s;
        }
        .campus-scroll-item:hover .campus-scroll-overlay-content { transform: translateY(0); }

        .campus-scroll-zoom-icon { font-size: 1.2rem; color: var(--gold); display: block; margin-bottom: 6px; }
        .campus-scroll-title {
          font-family: var(--serif);
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
        }
        .campus-scroll-caption {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 14px;
          background: var(--white);
          border-top: 1px solid var(--border);
        }
        .caption-title {
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--navy);
        }
        .caption-badge {
          font-family: var(--sans);
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--burgundy);
          background: rgba(160,82,45,0.1);
          padding: 3px 8px;
          border-radius: 20px;
          transition: background .2s;
        }
        .campus-scroll-item:hover .caption-badge {
          background: var(--burgundy);
          color: #fff;
        }

        .campus-scroll-btn {
          position: absolute;
          top: 40%; transform: translateY(-50%);
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.95);
          border: 1px solid var(--gold);
          border-radius: 50%;
          font-size: 28px;
          color: var(--burgundy);
          display: flex; align-items: center; justify-content: center;
          transition: all .2s;
          z-index: 10;
          box-shadow: var(--shadow-md);
          backdrop-filter: blur(4px);
        }
        .campus-scroll-btn:hover {
          background: var(--gold);
          color: var(--navy);
          transform: translateY(-50%) scale(1.05);
        }
        .campus-scroll-btn.left { left: -18px; }
        .campus-scroll-btn.right { right: -18px; }

        .campus-scroll-indicators { text-align: center; margin-top: 24px; }
        .scroll-hint-text {
          font-family: var(--sans);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--text3);
          font-weight: 500;
          animation: gentlePulse 1.8s infinite;
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.5; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(4px); }
        }

        /* Lightbox */
        .campus-lightbox {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.93);
          z-index: 9999;
          display: flex; align-items: center; justify-content: center;
        }
        .campus-lightbox-inner {
          max-width: 90vw; max-height: 90vh;
          position: relative;
        }
        .campus-lightbox-img {
          max-width: 90vw; max-height: 80vh;
          object-fit: contain;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .campus-lightbox-caption {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 4px 0;
        }
        .campus-lightbox-num {
          font-family: var(--sans);
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
        }
        .campus-lightbox-title {
          font-family: var(--sans);
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        .campus-lightbox-close,
        .campus-lightbox-prev,
        .campus-lightbox-next {
          position: absolute;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          border-radius: 50%;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          transition: background .18s;
          z-index: 10001;
        }
        .campus-lightbox-close { top: 16px; right: 16px; font-size: 1rem; }
        .campus-lightbox-prev { left: -56px; top: 50%; transform: translateY(-50%); }
        .campus-lightbox-next { right: -56px; top: 50%; transform: translateY(-50%); }
        .campus-lightbox-close:hover,
        .campus-lightbox-prev:hover,
        .campus-lightbox-next:hover {
          background: var(--burgundy);
          border-color: var(--burgundy);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .campus-stats-strip { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .campus-scroll-item { flex: 0 0 260px; }
          .campus-scroll-btn { width: 34px; height: 34px; font-size: 24px; }
          .campus-scroll-btn.left { left: -12px; }
          .campus-scroll-btn.right { right: -12px; }
          .campus-lightbox-prev { left: 8px; }
          .campus-lightbox-next { right: 8px; }
        }
        @media (max-width: 640px) {
          .campus-scroll-item { flex: 0 0 240px; }
          .campus-scroll-btn { display: none; }
          .campus-stats-strip { grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px; }
          .campus-stat-value { font-size: 2.1rem; }
        }
      `}</style>
    </section>
  );
}