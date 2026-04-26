import { memo } from 'react';
import './LogoStrip.css';

// ─── Static data outside component — not recreated on every render ────────────
const LOGOS = [
  {
    src: 'https://res.cloudinary.com/damisreoh/image/upload/q_auto,f_auto,w_200/v1777091913/Gemini_Generated_Image_qlkfz8qlkfz8qlkf_qxcdiv.png',
    alt: 'VMRF – Vinayaka Mission Research Foundation logo',
    width: 200,
    height: 80,
  },
  {
    src: 'https://res.cloudinary.com/damisreoh/image/upload/q_auto,f_auto,w_200/v1777091751/AICTE_umarzo.webp',
    alt: 'AICTE – All India Council for Technical Education logo',
    width: 200,
    height: 80,
  },
  {
    src: 'https://res.cloudinary.com/damisreoh/image/upload/q_auto,f_auto,w_200/v1777091950/NAAC_zlgthg.png',
    alt: 'NAAC – National Assessment and Accreditation Council logo',
    width: 200,
    height: 80,
  },
  {
    src: 'https://res.cloudinary.com/damisreoh/image/upload/q_auto,f_auto,w_200/v1777091881/25-_NEW_final_tfkexe.png',
    alt: '25 years of excellence logo',
    width: 200,
    height: 80,
  },
];

// ─── LogoStrip ────────────────────────────────────────────────────────────────
function LogoStrip() {
  return (
    <div
      className="logo-strip"
      role="list"
      aria-label="Accreditations and affiliations"
    >
      <div className="logo-strip-inner">
        {LOGOS.map((logo) => (
          // ✅ key uses alt string — stable and unique, not array index
          <div className="logo-strip-item" key={logo.alt} role="listitem">
            <img
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              // ✅ loading="lazy" — LogoStrip is BELOW the hero video.
              //    It is NOT above the fold so it should NOT be eager/high priority.
              //    eager + fetchPriority="high" was competing with your LCP (the video poster).
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(LogoStrip);