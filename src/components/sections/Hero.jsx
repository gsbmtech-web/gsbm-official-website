import { memo, useEffect, useRef, useCallback, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { go } from '../../utils/scroll';
import vmrfLogoFull from '../../assets/vmrflogo.png';
import aicteLogo    from '../../assets/logos/aicte.webp';
import naacLogo     from '../../assets/logos/naac.png';
import yearslogo    from '../../assets/logos/years.png';
import './Hero.css';

// ─── Static data outside component — no re-creation on every render ──────────


const VIDEO_SRC    = 'https://res.cloudinary.com/damisreoh/video/upload/f_auto,q_auto/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.mp4';
const VIDEO_POSTER = 'https://res.cloudinary.com/damisreoh/video/upload/f_auto,q_auto,w_auto/so_0/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.jpg';

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef   = useRef(null);
  const navigate  = useNavigate();

  // ✅ useCallback — stable reference, no new function on every render
  const handleApplyClick = useCallback(() => {
    startTransition(() => {
      navigate('/apply');
    });
  }, [navigate]);

  // ✅ useCallback — stable reference for Explore button
  const handleExploreClick = useCallback(() => {
    go('programs');
  }, []);

  // ✅ Animations: use requestIdleCallback so it never blocks first paint
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => {
        el.classList.add('hero-animations-ready');
      });
      // ✅ Cleanup — cancel if component unmounts before idle fires
      return () => cancelIdleCallback(id);
    } else {
      el.classList.add('hero-animations-ready');
    }
  }, []); // ✅ empty deps — runs once on mount only, correct

  return (
    <section className="hero" id="home" ref={heroRef}>

      {/*
        ✅ VIDEO OPTIMIZATIONS:
        - poster loads a static image instantly so users see something immediately
        - preload="none" — do NOT preload video data on page load (was "metadata",
          which still fetches the first chunk). Let the browser prioritise HTML/CSS/JS.
        - The video auto-plays once the browser is ready — no need to preload.
      */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={VIDEO_POSTER}
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-topbar"  aria-hidden="true" />
      <div className="hero-leftbar" aria-hidden="true" />

      <div className="hero-grid-wrap">
        <div className="hero-left">

          <div className="school-block">
            <h2 className="school-name">
              Ganesan School<br />of Business Management
            </h2>
          </div>

          <div className="badge-block">
            <div className="badge">
              <span className="badge-dot" aria-hidden="true" />
              <span className="badge-text">MBA Admissions Open &nbsp;·&nbsp; 2026 – 2028</span>
            </div>
          </div>

          <div className="headline-block">
            <h1 className="headline">
              <span className="hl-phrase hl-white">Shape Your Future.</span>
              <span className="hl-sep" aria-hidden="true">&mdash;</span>
              <em className="hl-phrase hl-gold">Lead with Purpose.</em>
            </h1>
          </div>

          <p className="tagline">
            Building Careers.&nbsp;&nbsp;Delivering Results.&nbsp;&nbsp;Shaping Leaders.
          </p>

          <p className="desc">
            A boutique MBA institution under&nbsp;
            <strong>Vinayaka Mission's Research Foundation (Deemed to be University)</strong>,
            Chennai. Industry-integrated curriculum, experienced faculty, and relentless focus on
            employability — built over 25&nbsp;years of commitment to student success.
          </p>

          <div className="hero-btns">
            {/* ✅ useCallback handlers — no inline arrow functions */}
            <button
              className="btn-primary"
              onClick={handleApplyClick}
              aria-label="Apply now for MBA program"
            >
              Apply Now <span className="btn-arr" aria-hidden="true">→</span>
            </button>

            <button
              className="btn-ghost"
              onClick={handleExploreClick}
              aria-label="Explore our MBA programs"
            >
              Explore Program
            </button>
          </div>

          
          
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-txt">Scroll</span>
        <span className="scroll-arr">↓</span>
      </div>

    </section>
  );
}

export default memo(Hero);