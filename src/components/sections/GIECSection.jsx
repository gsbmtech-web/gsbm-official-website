import React from "react";

/* ── GIECSection ──────────────────────────────────────────────────────────────
   Uses your existing index.css variables & utility classes.
   ✅ GIEC logo — large & bold, no wordmark
   ✅ Partner logos — big, no box, no bg, no border
   ✅ 100% responsive: desktop → tablet → mobile → small mobile
   ──────────────────────────────────────────────────────────────────────────── */

const PARTNERS = [
  {
    id: "iic",
    name: "Institution's Innovation Council",
    src: "./src/assets/clogos/Iic.png",
    alt: "Institution's Innovation Council logo",
  },
  {
    id: "edii",
    name: "EDII-TN",
    src: "./src/assets/clogos/Edii.png",
    alt: "EDII Tamil Nadu logo",
  },
  {
    id: "msme",
    name: "MSME",
    src: "./src/assets/clogos/Msme.png",
    alt: "MSME logo",
  },
];

export default function GIECSection() {
  return (
    <section className="sec-sky giec-section" aria-labelledby="giec-heading">
      <div className="W">

        {/* ── GIEC Logo — large, bold, no wordmark ── */}
        <div className="giec-brand fu d1">
          <img
            src="./src/assets/clogos/Giec.jpeg"
            alt="Ganesan Incubation and Entrepreneurship Centre"
            className="giec-logo"
          />
        </div>

        {/* ── Two-col body ── */}
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
                <div className="giec-partner-card" key={p.id}>
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="giec-partner-logo"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextSibling)
                        e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="giec-partner-fallback" style={{ display: "none" }}>
                    <span>{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>{/* /giec-body */}
      </div>{/* /W */}

      {/* ── Scoped styles ── */}
      <style>{`

        /* ── Section shell ── */
        .giec-section {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        /* ── GIEC Logo — LARGE & BOLD ── */
        .giec-brand {
          margin-bottom: 48px;
        }
        .giec-logo {
          height: 250px;
          width: auto;
          max-width: 420px;
          object-fit: contain;
          display: block;
        }

        /* ── Two-col grid (desktop) ── */
        .giec-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        /* ── Text column ── */
        .giec-eyebrow {
          font-family: var(--sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold2);
          margin-bottom: 12px;
        }
        .giec-heading {
          font-family: var(--serif);
          font-size: clamp(1.65rem, 2.8vw, 2.4rem);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.18;
          margin-bottom: 14px;
        }
        .giec-tagline {
          font-family: var(--sans);
          font-size: 1rem;
          font-weight: 500;
          color: var(--burgundy);
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .giec-desc {
          margin-bottom: 28px;
          max-width: 480px;
        }

        /* ── Partners column ── */
        .giec-partners-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .giec-partners-label {
          font-family: var(--sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text3);
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }

        /* ── Partner logos: NO box, NO bg, NO border — just big clean logos ── */
        .giec-partners-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px 24px;
          align-items: center;
        }
        .giec-partner-card {
          background: transparent;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.22s ease, filter 0.22s ease;
        }
        .giec-partner-card:hover {
          transform: translateY(-4px);
          filter: brightness(1.1);
        }
        .giec-partner-logo {
          width: 100%;
          max-width: 100%;
          height: 100px;
          object-fit: contain;
          display: block;
        }
        .giec-partner-fallback {
          display: none;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: var(--sans);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text3);
          line-height: 1.3;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE BREAKPOINTS
           ═══════════════════════════════════════ */

        /* ── Tablet landscape ≤ 1024px ── */
        @media (max-width: 1024px) {
          .giec-body {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .giec-desc {
            max-width: 100%;
          }
          .giec-partner-logo {
            height: 90px;
          }
        }

        /* ── Tablet portrait ≤ 768px ── */
        @media (max-width: 768px) {
          .giec-brand { margin-bottom: 36px; }
          .giec-logo { height: 88px; max-width: 340px; }
          .giec-body { gap: 36px; }
          .giec-heading { font-size: clamp(1.45rem, 5vw, 2rem); }
          .giec-partners-grid { gap: 24px 16px; }
          .giec-partner-logo { height: 80px; }
        }

        /* ── Mobile ≤ 600px ── */
        @media (max-width: 600px) {
          .giec-logo { height: 72px; max-width: 280px; }
          .giec-partners-grid { gap: 20px 12px; }
          .giec-partner-logo { height: 68px; }
        }

        /* ── Small mobile ≤ 400px ── */
        @media (max-width: 400px) {
          .giec-brand { margin-bottom: 24px; }
          .giec-logo { height: 60px; max-width: 240px; }
          .giec-heading { font-size: 1.35rem; }
          .giec-tagline { font-size: 0.9rem; }
          /* Stack partner logos vertically so each has room */
          .giec-partners-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .giec-partner-logo { height: 64px; width: auto; }
        }
      `}</style>
    </section>
  );
}