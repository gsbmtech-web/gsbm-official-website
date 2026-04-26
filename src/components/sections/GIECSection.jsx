import { useState, useCallback } from 'react';
import giecLogo from '../../assets/clogos/Giec.jpeg';
import iicLogo  from '../../assets/clogos/Iic.png';
import ediiLogo from '../../assets/clogos/Edii.png';
import msmeLogo from '../../assets/clogos/Msme.png';
import './GIECSection.css';

const PARTNERS = [
  {
    id: 'iic',
    name: "Institution's Innovation Council",
    src: iicLogo,
    alt: "Institution's Innovation Council logo",
  },
  {
    id: 'edii',
    name: 'EDII-TN',
    src: ediiLogo,
    alt: 'EDII Tamil Nadu logo',
  },
  {
    id: 'msme',
    name: 'MSME',
    src: msmeLogo,
    alt: 'MSME logo',
  },
];

const PartnerCard = ({ src, alt, name }) => {
  const [imgError, setImgError] = useState(false);
  const handleError = useCallback(() => setImgError(true), []);

  return (
    <div className="giec-partner-card">
      {imgError ? (
        <div className="giec-partner-fallback giec-partner-fallback--visible">
          <span>{name}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="giec-partner-logo"
          loading="lazy"
          decoding="async"
          width={160}
          height={100}
          onError={handleError}
        />
      )}
    </div>
  );
};

const GIECSection = () => (
  <section className="sec-sky giec-section" aria-labelledby="giec-heading">
    <div className="W">

      {/* GIEC Logo + Part of GSBM tag */}
      <div className="giec-brand fu d1">
        <img
          src={giecLogo}
          alt="Ganesan Incubation and Entrepreneurship Centre"
          className="giec-logo"
          loading="lazy"
          decoding="async"
          width={420}
          height={210}
        />
        <span className="giec-partof">— Part of GSBM</span>
      </div>

      {/* Two-col body */}
      <div className="giec-body">

        {/* Left: text */}
        <div className="giec-text-col fu d2">
          <p className="giec-eyebrow">Incubation &amp; Entrepreneurship</p>

          <h2 id="giec-heading" className="giec-heading">
            Ganesan Incubation and<br />
            Entrepreneurship Centre
          </h2>

          <p className="giec-tagline">
            Empowering Entrepreneurs with End-to-End Startup Support
          </p>

          <p className="body-text giec-desc">
            From co-founder pairing to funding access, training, and
            incubation, we offer the infrastructure, mentorship, and networks
            you need to turn your vision into a thriving, impactful venture.
          </p>
        </div>

        {/* Right: ecosystem partners */}
        <div className="giec-partners-col fu d3">
          <p className="giec-partners-label">Ecosystem Partners</p>
          <div className="giec-partners-grid">
            {PARTNERS.map((p) => (
              <PartnerCard key={p.id} src={p.src} alt={p.alt} name={p.name} />
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default GIECSection;