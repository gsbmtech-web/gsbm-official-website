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
import './Campus.css';

// ─── Static data — outside component, never recreated ────────────────────────
const CAMPUS_PHOTOS = [
  { src: campusImg1,  label: 'Smart Classroom'         },
  { src: campusImg2,  label: 'MBA Seminar Hall'         },
  { src: campusImg3,  label: 'MBA Seminar Hall – View 2'},
  { src: campusImg4,  label: 'Meeting Room'             },
  { src: campusImg5,  label: 'Discussion Spaces'        },
  { src: campusImg6,  label: 'Discussion Spaces – View 2'},
  { src: campusImg14, label: 'Sports Ground'            },
  { src: campusImg7,  label: 'Basketball Court'         },
  { src: campusImg8,  label: 'Sports Ground – View 2'   },
  { src: campusImg9,  label: 'Sports Ground – View 3'   },
  { src: campusImg10, label: 'Library'                  },
  { src: campusImg11, label: 'Computer Lab'             },
  { src: campusImg12, label: 'Auditorium'               },
  { src: campusImg13, label: 'Auditorium – View 2'      },
];

const VIDEO_POSTER = 'https://res.cloudinary.com/damisreoh/video/upload/so_2,w_1280/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.jpg';
const VIDEO_SRC    = 'https://res.cloudinary.com/damisreoh/video/upload/q_auto,f_auto/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.mp4';
const VIDEO_DL     = VIDEO_SRC;

// ─── GalleryItem — memoised so scroll/state changes don't re-render all 14 ───
const GalleryItem = memo(function GalleryItem({ photo, index, onOpen }) {
  // ✅ useCallback with stable [onOpen, index] deps — not inline arrow in map
  const handleClick = useCallback(() => onOpen(index), [onOpen, index]);
  const handleKey   = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(index);
    }
  }, [onOpen, index]);

  return (
    <div
      className="campus-scroll-item"
      onClick={handleClick}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-label={`View full size: ${photo.label}`}
    >
      <div className="campus-scroll-img-wrapper">
        <img
          src={photo.src}
          alt={photo.label}
          className="campus-scroll-img"
          // ✅ First 3 images load eagerly — likely visible on mount.
          //    Rest are lazy — only fetched when scrolled into view.
          loading={index < 3 ? 'eager' : 'lazy'}
          decoding="async"
          width={320}
          height={240}
        />
        <div className="campus-scroll-overlay" aria-hidden="true">
          <div className="campus-scroll-overlay-content">
            <span className="campus-scroll-zoom-icon" aria-hidden="true">🔍</span>
            <h4 className="campus-scroll-title">{photo.label}</h4>
          </div>
        </div>
      </div>
      <div className="campus-scroll-caption">
        <span className="caption-title">{photo.label}</span>
        <span className="caption-badge" aria-hidden="true" />
      </div>
    </div>
  );
});

// ─── CampusGallery ────────────────────────────────────────────────────────────
const CampusGallery = memo(function CampusGallery() {
  const [lightboxOpen,   setLightboxOpen]   = useState(false);
  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [showLeftArrow,  setShowLeftArrow]  = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollRef   = useRef(null);
  const closeBtnRef = useRef(null);

  // ── Scroll arrow visibility ──────────────────────────────────────────────────
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

  // ── Navigation ───────────────────────────────────────────────────────────────
  const nextImage = useCallback(
    () => setCurrentIndex((p) => (p + 1) % CAMPUS_PHOTOS.length), []
  );
  const prevImage = useCallback(
    () => setCurrentIndex((p) => (p - 1 + CAMPUS_PHOTOS.length) % CAMPUS_PHOTOS.length), []
  );

  // ── Lightbox open / close with body scroll lock ───────────────────────────
  const openLightbox = useCallback((idx) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeBtnRef.current?.focus());
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  // ✅ Cleanup overflow lock if component unmounts while lightbox is open
  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  // ── Keyboard navigation — only active when lightbox is open ─────────────────
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

  // ── Scroll helpers ───────────────────────────────────────────────────────────
  const scrollLeft  = useCallback(
    () => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' }), []
  );
  const scrollRight = useCallback(
    () => scrollRef.current?.scrollBy({ left:  320, behavior: 'smooth' }), []
  );

  return (
    <>
      <div className="campus-scroll-gallery">
        <div className="campus-scroll-wrapper">
          {showLeftArrow && (
            <button
              type="button"
              className="campus-scroll-btn left"
              onClick={scrollLeft}
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
              // ✅ key uses label + idx — label alone could theoretically
              //    clash if two photos had the same label
              <GalleryItem
                key={`${photo.label}-${idx}`}
                photo={photo}
                index={idx}
                onOpen={openLightbox}
              />
            ))}
          </div>

          {showRightArrow && (
            <button
              type="button"
              className="campus-scroll-btn right"
              onClick={scrollRight}
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

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="campus-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Image lightbox: ${CAMPUS_PHOTOS[currentIndex].label}`}
          onClick={closeLightbox}
        >
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
            aria-label={`Previous image (${currentIndex === 0 ? CAMPUS_PHOTOS.length : currentIndex} of ${CAMPUS_PHOTOS.length})`}
          >
            ‹
          </button>

          <button
            type="button"
            className="campus-lightbox-next"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label={`Next image (${(currentIndex + 2) > CAMPUS_PHOTOS.length ? 1 : currentIndex + 2} of ${CAMPUS_PHOTOS.length})`}
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
              // ✅ No loading="lazy" in lightbox — user explicitly opened this image
              decoding="async"
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

// ─── Campus ───────────────────────────────────────────────────────────────────
function Campus() {
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

        {/* ── Campus tour video ── */}
        <div className="campus-video-section">
          <div className="section-label-row">
            <span className="section-label">Campus Tour Video</span>
            <div className="section-label-line" />
          </div>
          <div className="video-wrapper">
            {/*
              ✅ preload="none" — campus video is below the fold. No need to
              fetch anything until the user explicitly clicks play.
              Was "metadata" which still fetches the first chunk unnecessarily.
            */}
            <video
              controls
              preload="none"
              poster={VIDEO_POSTER}
              aria-label="GSBM campus tour video"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              <p>
                Your browser does not support HTML video.{' '}
                <a href={VIDEO_DL}>Download the video</a>
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

        {/* ── Gallery ── */}
        <div>
          <div className="section-label-row">
            <span className="section-label">Campus Gallery</span>
            <div className="section-label-line" />
            <span className="section-label-hint">Click any image to enlarge</span>
          </div>
          <CampusGallery />
        </div>

      </div>
    </section>
  );
}

export default memo(Campus);