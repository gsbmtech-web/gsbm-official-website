// ===== FILE: src/components/sections/Hero.jsx =====
import { go } from '../../utils/scroll';
import vmrfLogoFull from '../../assets/vmrflogo.png';
import aicteLogo    from '../../assets/logos/aicte.webp';
import naacLogo     from '../../assets/logos/naac.png';
import yearslogo    from '../../assets/logos/years.png';

const logos = [
  { src: vmrfLogoFull, alt: 'VMRF',     dark: true  },
  { src: aicteLogo,    alt: 'AICTE',    dark: false },
  { src: naacLogo,     alt: 'NAAC',     dark: false },
  { src: yearslogo,    alt: '25 Years', dark: false },
];

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* ── VIDEO BACKGROUND ── */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/damisreoh/video/upload/f_auto,q_auto,w_1920/so_0/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.jpg"
      >
        <source
          src="https://res.cloudinary.com/damisreoh/video/upload/f_auto,q_auto/AVIT_New_Video_eb764176d4_online-video-cutter.com_esmbi5.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── OVERLAYS ── */}
      <div className="hero-overlay" />
      <div className="hero-topbar" />
      <div className="hero-leftbar" />

      {/* ── MAIN GRID ── */}
      <div className="hero-grid-wrap">

        {/* ════════ LEFT COLUMN ════════ */}
        <div className="hero-left">

          {/* 1 · SCHOOL NAME */}
          <div className="school-block">
            <span className="school-eyebrow">Est. 2009 &nbsp;·&nbsp; Deemed to be University</span>
            <h2 className="school-name">
              Ganesan School<br />of Business Management
            </h2>
          </div>

          {/* 2 · BADGE */}
          <div className="badge-block">
            <div className="badge">
              <span className="badge-dot" />
              <span className="badge-text">MBA Admissions Open &nbsp;·&nbsp; 2026 – 2028</span>
            </div>
          </div>

          {/* 3 · HEADLINE */}
          <div className="headline-block">
            <h1 className="headline">
              <span className="hl-phrase hl-white">Shape Your Future.</span>
              <span className="hl-sep">&mdash;</span>
              <em className="hl-phrase hl-gold">Lead with Purpose.</em>
            </h1>
          </div>

          {/* 4 · TAGLINE */}
          <p className="tagline">
            Building Careers.&nbsp;&nbsp;Delivering Results.&nbsp;&nbsp;Shaping Leaders.
          </p>

          {/* 5 · DESCRIPTION */}
          <p className="desc">
            A boutique MBA institution under&nbsp;
            <strong>Vinayaka Mission's Research Foundation (Deemed to be University)</strong>, Chennai.
            Industry-integrated curriculum, experienced faculty, and relentless focus on
            employability — built over 25&nbsp;years of commitment to student success.
          </p>

          {/* 6 · BUTTONS */}
          <div className="hero-btns">
            <a href="#apply" className="btn-primary" onClick={e=>{e.preventDefault();go('apply')}}>
              Apply Now <span className="btn-arr">→</span>
            </a>
            <a href="#programs" className="btn-ghost" onClick={e=>{e.preventDefault();go('programs')}}>
              Explore Program
            </a>
            <a href="/application-form.pdf" download="GSBM_Application_Form_2026.pdf" className="btn-ghost">
              ↓ Download Application
            </a>
          </div>

          {/* 7 · MOBILE LOGOS — shown only on small screens */}
          <div className="logos-mobile">
            <div className="logos-mobile-grid">
              {logos.map((l, i) => (
                <div className={`logo-pill-sm${l.dark ? ' logo-pill-dark' : ''}`} key={i}>
                  <img src={l.src} alt={l.alt} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>

        </div>{/* /hero-left */}

        {/* ════════ RIGHT COLUMN — LOGOS (desktop) ════════ */}
        <div className="hero-right">
          <div className="logos-stack">
            {logos.map((l, i) => (
              <div
                className={`logo-card${l.dark ? ' logo-card-dark' : ''}`}
                key={i}
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                <img src={l.src} alt={l.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

      </div>{/* /hero-grid-wrap */}

      {/* ── SCROLL HINT ── */}
      <div className="scroll-hint">
        <span className="scroll-txt">Scroll</span>
        <span className="scroll-arr">↓</span>
      </div>

      <style jsx="true">{`
        /* ─────────────── TOKENS ─────────────── */
        .hero {
          --gold:   #C9A84C;
          --gold2:  #F0D070;
          --red:    #C8391A;
          --white:  #FFFFFF;
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* ─────────────── VIDEO ─────────────── */
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
          z-index: 0;
          will-change: transform;
        }

        /* ─────────────── OVERLAYS ─────────────── */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            rgba(0,0,0,0.68) 0%,
            rgba(0,0,0,0.28) 45%,
            rgba(0,0,0,0.08) 80%
          );
          z-index: 1;
          pointer-events: none;
        }
        .hero-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold2), var(--gold), transparent);
          background-size: 300% 100%;
          animation: shimmer 5s linear infinite;
          z-index: 20;
        }
        @keyframes shimmer {
          0%   { background-position: 0% 0%; }
          100% { background-position: 300% 0%; }
        }
        .hero-leftbar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, transparent, rgba(201,168,76,0.8) 30%, rgba(200,57,26,0.7) 70%, transparent);
          z-index: 20;
          box-shadow: 0 0 8px rgba(201,168,76,0.3);
        }

        /* ─────────────── MAIN GRID ─────────────── */
        .hero-grid-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 56px;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 56px;
          align-items: center;
          min-height: 100vh;
        }

        /* ─────────────── LEFT COLUMN ─────────────── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 110px 0 90px;
          animation: heroIn 0.8s ease both;
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* SCHOOL NAME */
        .school-block { margin-bottom: 26px; animation: fadeUp 0.6s ease 0.05s both; }
        .school-eyebrow {
          display: block;
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.95);
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
          margin-bottom: 12px;
        }
        .school-name {
          font-family: 'Georgia', serif;
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0;
          background: linear-gradient(135deg, #EDD36A 0%, #FFF0A0 40%, #C89828 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.5));
        }

        /* BADGE */
        .badge-block { margin-bottom: 34px; animation: fadeUp 0.6s ease 0.13s both; }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 1.5px solid rgba(200,57,26,0.85);
          border-radius: 6px;
          padding: 12px 28px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(0,0,0,0.25);
          box-shadow: 0 0 0 1px rgba(201,168,76,0.2), 0 8px 28px rgba(0,0,0,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .badge:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
        .badge-dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #E8552A;
          flex-shrink: 0;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0   rgba(232,85,42,0.8); }
          70%  { box-shadow: 0 0 0 12px rgba(232,85,42,0);   }
          100% { box-shadow: 0 0 0 0   rgba(232,85,42,0);    }
        }
        .badge-text {
          font-family: 'Georgia', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: white;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }

        /* HEADLINE */
        .headline-block { margin-bottom: 20px; animation: fadeUp 0.6s ease 0.22s both; }
        .headline {
          font-family: 'Georgia', serif;
          font-weight: 700;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.25em 1rem;
          line-height: 1.07;
        }
        .hl-phrase {
          font-size: clamp(2.7rem, 5vw, 4.5rem);
          display: inline-block;
          text-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }
        .hl-white { color: var(--white); font-style: normal; }
        .hl-sep {
          font-size: clamp(1.6rem, 2.2vw, 2.4rem);
          color: rgba(201,168,76,0.7);
          font-weight: 300;
          font-style: normal;
          align-self: center;
        }
        .hl-gold {
          font-style: italic;
          color: #E2CB78;
          position: relative;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
        }
        .hl-gold::after {
          content: '';
          position: absolute;
          bottom: -6px; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, var(--gold), #f5d742, transparent);
          transform: scaleX(0);
          transform-origin: left;
          animation: drawLine 1s ease 1.1s forwards;
        }
        @keyframes drawLine { to { transform: scaleX(1); } }

        /* TAGLINE */
        .tagline {
          font-family: 'Georgia', serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          font-style: italic;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.05em;
          margin: 0 0 16px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          animation: fadeUp 0.6s ease 0.3s both;
        }

        /* DESCRIPTION */
        .desc {
          font-family: 'Trebuchet MS', sans-serif;
          font-size: clamp(0.92rem, 1.2vw, 1.05rem);
          line-height: 1.85;
          color: rgba(255,255,255,0.8);
          max-width: 660px;
          margin: 0 0 46px;
          text-shadow: 0 1px 4px rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          background: rgba(0,0,0,0.1);
          padding: 6px 0;
          border-radius: 4px;
          animation: fadeUp 0.6s ease 0.36s both;
        }
        .desc strong { color: white; font-weight: 600; text-shadow: 0 0 6px rgba(0,0,0,0.5); }

        /* BUTTONS */
        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease 0.44s both;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 36px;
          background: linear-gradient(135deg, #B52E14 0%, #D84820 100%);
          color: #fff;
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          box-shadow: 0 6px 24px rgba(180,46,20,0.6);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: none;
          white-space: nowrap;
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(180,46,20,0.75); }
        .btn-arr { transition: transform 0.2s; }
        .btn-primary:hover .btn-arr { transform: translateX(6px); }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #B52E14 0%, #D84820 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #fff;
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.35);
          border-radius: 4px;
          box-shadow: 0 12px 32px rgba(3,3,3,0.75);
          transition: all 0.25s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-ghost:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(201,168,76,0.15);
          transform: translateY(-2px);
        }

        /* ═══════════ RIGHT COLUMN — LOGOS (Desktop) ═══════════ */
        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 110px 0 90px;
        }
        .logos-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
        }


        /* ── LOGO CARD (sharp, HD) ── */
        .logo-card {
          width: 440px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        
          padding: 26px;
          box-sizing: border-box;
          animation: logoIn 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
          transition: transform 0.3s ease, box-shadow 0.25s ease;
          will-change: transform;
          /* ← KEY: force GPU compositing for crisp sub-pixel rendering */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        .logo-card-dark {
        //   background: rgba(18,18,24,0.92);
        //   box-shadow:
        //     0 14px 40px rgba(0,0,0,0.7),
        //     0 0 0 2px rgba(201,168,76,0.55);
        }
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.65) translateX(28px) translateZ(0); }
          to   { opacity: 1; transform: scale(1)    translateX(0)    translateZ(0); }
        }
        .logo-card:hover {
          transform: scale(1.07) translateX(-5px) translateZ(0);
          box-shadow:
            0 20px 50px rgba(0,0,0,0.65),
            0 0 0 2px var(--gold);
        }

        /* ── LOGO IMAGE (sharp, no blur) ── */
        .logo-card img {
          width: 100%;
          height: 100px;    /* fixed height — fills the card nicely */
          object-fit: contain;
          object-position: center;
          display: block;
          /* Force crisp rendering */
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          /* Anti-alias without blur */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }



        /* ─────────────── SCROLL HINT ─────────────── */
        .scroll-hint {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          z-index: 20;
          animation: bob 3s ease-in-out infinite;
        }
        @keyframes bob {
          0%,100% { transform: translateX(-50%) translateY(0);  }
          50%      { transform: translateX(-50%) translateY(8px); }
        }
        .scroll-txt {
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .scroll-arr { font-size: 1rem; color: rgba(255,255,255,0.45); }

        /* ═══════════ MOBILE LOGOS ═══════════ */
        .logos-mobile { display: none; }



        .logos-mobile-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          width: 100%;
        }

        /* ── Mobile logo pill ── */
        .logo-pill-sm {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: rgba(255,255,255,0.96);
          box-shadow:
            0 2px 0 rgba(255,255,255,0.7) inset,
            0 8px 20px rgba(0,0,0,0.5),
            0 0 0 1px rgba(201,168,76,0.25);
          padding: 10px 6px;
          box-sizing: border-box;
          aspect-ratio: 1 / 1.15;
          /* Force GPU layer for sharp rendering */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        .logo-pill-dark {
          background: rgba(18,18,24,0.9);
          box-shadow:
            0 8px 20px rgba(0,0,0,0.7),
            0 0 0 1.5px rgba(201,168,76,0.5);
        }
        .logo-pill-sm img {
          width: 100%;
          height: auto;
          max-height: 52px;
          object-fit: contain;
          object-position: center;
          display: block;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }


        /* ═══════════════ RESPONSIVE ═══════════════ */

        /* ── Large desktop ── */
        @media (min-width: 1441px) {
          .hero-grid-wrap { padding: 0 80px; gap: 80px; }
          .logo-card { width: 160px; height: 160px; }
          .logo-card img { height: 116px; }
        }

        /* ── Medium desktop ── */
        @media (max-width: 1200px) {
          .hero-grid-wrap {
            grid-template-columns: 1fr 240px;
            gap: 40px;
            padding: 0 36px;
          }
          .logo-card { width: 120px; height: 120px; padding: 12px; }
          .logo-card img { height: 82px; }
          .logos-stack { gap: 14px; }
        }

        /* ── Tablet landscape ── */
        @media (max-width: 1024px) {
          .hero-grid-wrap {
            grid-template-columns: 1fr 200px;
            gap: 32px;
            padding: 0 28px;
          }
          .logo-card { width: 104px; height: 104px; padding: 10px; border-radius: 16px; }
          .logo-card img { height: 68px; }
          .logos-stack { gap: 12px; }
          .logo-label { font-size: 0.55rem; }
        }

        /* ── Tablet portrait & below — switch to mobile logos ── */
        @media (max-width: 900px) {
          .hero-grid-wrap {
            grid-template-columns: 1fr;
            padding: 0 24px;
            gap: 0;
            min-height: unset;
          }
          .hero-right { display: none; }
          .logos-mobile {
            display: flex;
            flex-direction: column;
            margin-top: 40px;
            padding-top: 28px;
            border-top: 1px solid rgba(255,255,255,0.18);
          }
          .logos-mobile-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          .hero-left { padding: 88px 0 72px; }
        }

        /* ── Mobile large ── */
        @media (max-width: 640px) {
          .hero-grid-wrap { padding: 0 18px; }
          .hl-phrase { font-size: clamp(2rem, 8vw, 2.8rem); }
          .hl-sep    { display: none; }
          .headline  { flex-direction: column; gap: 6px; }
          .hero-btns { flex-direction: column; gap: 10px; }
          .btn-primary, .btn-ghost { justify-content: center; width: 100%; }
          .hero-left { padding: 80px 0 60px; }
          .desc { backdrop-filter: blur(4px); background: rgba(0,0,0,0.2); }
          /* 4-col on 640 still works but use 2-col below */
          .logos-mobile-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }
          .logo-pill-sm { padding: 8px 4px; border-radius: 12px; }
          .logo-pill-sm img { max-height: 42px; }
          .logo-pill-label { font-size: 0.48rem; }
        }

        /* ── Mobile small ── */
        @media (max-width: 420px) {
          .hero-grid-wrap { padding: 0 14px; }
          .hl-phrase { font-size: clamp(1.8rem, 9vw, 2.3rem); }
          .school-name { font-size: clamp(1.7rem, 7vw, 2.2rem); }
          .badge-text { font-size: 0.72rem; letter-spacing: 0.14em; }
          .badge { padding: 10px 16px; }
          /* On very small screens: 2 per row looks cleaner */
          .logos-mobile-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            max-width: 280px;
          }
          .logo-pill-sm { padding: 14px 10px; border-radius: 16px; aspect-ratio: 1 / 1.1; }
          .logo-pill-sm img { max-height: 56px; }
          .logo-pill-label { font-size: 0.55rem; }
        }

        /* ── Tiny phones ── */
        @media (max-width: 360px) {
          .hero-grid-wrap { padding: 0 12px; }
          .hero-left { padding: 68px 0 56px; }
          .logos-mobile-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 260px;
          }
        }
      `}</style>
    </section>
  );
}