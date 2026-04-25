import { memo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';   // ← add this
import { go } from '../../utils/scroll';
import vmrfLogoFull from '../../assets/vmrflogo.png';
import aicteLogo    from '../../assets/logos/aicte.webp';
import naacLogo     from '../../assets/logos/naac.png';
import yearslogo    from '../../assets/logos/years.png';
import './Hero.css';

const logos = [
  { src: vmrfLogoFull, alt: 'VMRF',     dark: true  },
  { src: aicteLogo,    alt: 'AICTE',    dark: false },
  { src: naacLogo,     alt: 'NAAC',     dark: false },
  { src: yearslogo,    alt: '25 Years', dark: false },
];

function Hero() {
  const heroRef = useRef(null);
 const navigate = useNavigate();

const handleApplyClick = () => {
  startTransition(() => {
    navigate('/apply');
  });
};


  useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        heroRef.current?.classList.add('hero-animations-ready');
      });
    } else {
      heroRef.current?.classList.add('hero-animations-ready');
    }
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/damisreoh/video/upload/f_auto,q_auto,w_auto/so_0/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.jpg"
      >
        <source
          src="https://res.cloudinary.com/damisreoh/video/upload/f_auto,q_auto/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" />
      <div className="hero-topbar" />
      <div className="hero-leftbar" />

      <div className="hero-grid-wrap">
        <div className="hero-left">
          <div className="school-block">
            <h2 className="school-name">
              Ganesan School<br />of Business Management
            </h2>
          </div>

          <div className="badge-block">
            <div className="badge">
              <span className="badge-dot" />
              <span className="badge-text">MBA Admissions Open &nbsp;·&nbsp; 2026 – 2028</span>
            </div>
          </div>

          <div className="headline-block">
            <h1 className="headline">
              <span className="hl-phrase hl-white">Shape Your Future.</span>
              <span className="hl-sep">&mdash;</span>
              <em className="hl-phrase hl-gold">Lead with Purpose.</em>
            </h1>
          </div>

          <p className="tagline">
            Building Careers.&nbsp;&nbsp;Delivering Results.&nbsp;&nbsp;Shaping Leaders.
          </p>

          <p className="desc">
            A boutique MBA institution under&nbsp;
            <strong>Vinayaka Mission's Research Foundation (Deemed to be University)</strong>, Chennai.
            Industry-integrated curriculum, experienced faculty, and relentless focus on
            employability — built over 25&nbsp;years of commitment to student success.
          </p>

          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() => navigate('/apply')}
              aria-label="Apply now for MBA program"
            >
              Apply Now <span className="btn-arr">→</span>
            </button>
            <button
              className="btn-ghost"
              onClick={() => go('programs')}
              aria-label="Explore our MBA programs"
            >
              Explore Program
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span className="scroll-txt">Scroll</span>
        <span className="scroll-arr">↓</span>
      </div>
    </section>
  );
}

export default memo(Hero);