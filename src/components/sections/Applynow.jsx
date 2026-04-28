import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiPhone } from 'react-icons/fi';

const KEY_DATES = [
  { label: 'Applications Open', date: 'Jan 2026'  },
  { label: 'Last Date',         date: 'Jun 30'    },
  { label: 'Interviews',        date: 'May – Jun'  },
  { label: 'Commencement',      date: 'Jul 2026'  },
];

const ApplyNow = () => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <style>{`
        /* ── Root ── */
        .ap-root {
          min-height: 100vh;
          background: #f6f5f2;
          font-family: 'Outfit', system-ui, sans-serif;
          color: #1a2340;
          display: flex;
          flex-direction: column;
        }

        /* ── Nav ── */
        .ap-nav {
          background: #1a2340;
          height: 52px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 50;
          flex-shrink: 0;
        }
        .ap-back {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .ap-back:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .ap-nav-brand { display: flex; align-items: center; gap: 10px; }
        .ap-nav-logo  { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: 0.05em; }
        .ap-nav-sep   { color: rgba(255,255,255,0.18); font-weight: 200; }
        .ap-nav-tag   { font-size: 13px; color: rgba(255,255,255,0.42); }
        .ap-nav-secure {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; color: rgba(255,255,255,0.32);
        }

        /* ── Hero ── */
        .ap-hero { background: #1a2340; padding: 32px 24px 36px; flex-shrink: 0; }
        .ap-hero-inner { max-width: 1060px; margin: 0 auto; }
        .ap-badge {
          display: inline-block;
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #c9a84c;
          border: 1px solid rgba(201,168,76,0.32);
          padding: 3px 10px; border-radius: 4px; margin-bottom: 12px;
        }
        .ap-h1 {
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          font-weight: 700; color: #fff; margin: 0 0 8px; line-height: 1.2;
        }
        .ap-h1-sub { font-size: 14px; color: rgba(255,255,255,0.48); margin: 0; line-height: 1.6; }

        /* ── Body layout ── */
        .ap-body {
          max-width: 1060px;
          margin: 0 auto;
          padding: 28px 24px 56px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 20px;
          align-items: start;
          flex: 1;
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Sidebar ── */
        .ap-sidebar { position: sticky; top: 68px; display: flex; flex-direction: column; gap: 10px; }
        .ap-card {
          background: #fff; border: 1px solid #e4e1d9;
          border-radius: 10px; padding: 14px 16px;
        }
        .ap-card-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #aaa; margin: 0 0 4px; display: block;
        }
        .ap-card-value { font-size: 13px; font-weight: 600; color: #1a2340; margin: 0 0 2px; line-height: 1.4; }
        .ap-card-meta  { font-size: 11px; color: #999; margin: 0; line-height: 1.45; }

        .ap-divider { height: 1px; background: #e4e1d9; }

        .ap-help-card {
          background: #fff; border: 1px solid #e4e1d9;
          border-radius: 10px; padding: 14px 16px;
        }
        .ap-section-label {
          font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #aaa; margin: 0 0 10px; display: block;
        }
        .ap-contact-link {
          display: flex; align-items: center; gap: 7px;
          font-size: 13px; color: #1a2340; text-decoration: none;
          padding: 4px 0; transition: color 0.15s;
        }
        .ap-contact-link:hover { color: #8b1a1a; }

        .ap-dates-card {
          background: #fff; border: 1px solid #e4e1d9;
          border-radius: 10px; padding: 14px 16px;
        }
        .ap-trow {
          display: flex; justify-content: space-between;
          padding: 5px 0; border-bottom: 1px solid #ede9e0; font-size: 12px;
        }
        .ap-trow:last-child { border-bottom: none; }
        .ap-trow-label { color: #666; }
        .ap-trow-date  { font-weight: 600; color: #8b1a1a; }

        /* ── Form panel ── */
        .ap-panel {
          background: #fff; border: 1px solid #e4e1d9;
          border-radius: 12px; overflow: hidden;
        }
        .ap-panel-top {
          padding: 18px 22px 14px;
          border-bottom: 1px solid #ede9e0;
        }
        .ap-panel-title { font-size: 17px; font-weight: 700; color: #1a2340; margin: 0 0 3px; }
        .ap-panel-hint  { font-size: 12px; color: #999; margin: 0; }
        .ap-iframe { display: block; border: none; width: 100%; }

        /* ── Footer ── */
        .ap-footer {
          background: #eceae4; border-top: 1px solid #ddd8cf;
          padding: 12px 24px;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; flex-wrap: wrap;
          font-size: 11px; color: #aaa;
          flex-shrink: 0;
        }
        .ap-footer-dot { opacity: 0.35; }

        /* ══════════════════════════════
           TABLET ≤ 860px
           Sidebar moves above form
           ══════════════════════════════ */
        @media (max-width: 860px) {
          .ap-body {
            grid-template-columns: 1fr;
            padding: 20px 16px 48px;
            gap: 16px;
          }
          .ap-sidebar {
            position: static;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          /* Hide help + dates on tablet — not needed above form */
          .ap-help-card  { display: none; }
          .ap-dates-card { display: none; }
          .ap-divider    { display: none; }
        }

        /* ══════════════════════════════
           MOBILE ≤ 600px
           Hide ALL sidebar, form is #1
           ══════════════════════════════ */
        @media (max-width: 600px) {
          .ap-nav { padding: 0 14px; height: 48px; }
          .ap-nav-tag, .ap-nav-sep { display: none; }
          .ap-nav-secure { display: none; }

          .ap-hero { padding: 20px 14px 24px; }
          .ap-h1-sub { display: none; }

          .ap-body { padding: 14px 12px 40px; gap: 12px; }

          /* On mobile: hide sidebar entirely, form takes full width */
          .ap-sidebar { display: none; }

          .ap-panel { border-radius: 8px; }
          .ap-panel-top { padding: 14px 16px 12px; }
          .ap-panel-title { font-size: 15px; }

          .ap-footer {
            flex-direction: column; gap: 2px;
            text-align: center; font-size: 10px;
          }
          .ap-footer-dot { display: none; }
        }

        /* ══════════════════════════════
           SMALL MOBILE ≤ 380px
           ══════════════════════════════ */
        @media (max-width: 380px) {
          .ap-h1 { font-size: 1.4rem; }
          .ap-back span { display: none; }
          .ap-back { padding: 6px 10px; }
          .ap-hero { padding: 16px 12px 20px; }
        }
      `}</style>

      <div className="ap-root">

        {/* Nav */}
        <nav className="ap-nav">
          <button className="ap-back" onClick={handleBack}>
            <FiArrowLeft size={14} strokeWidth={2} />
            <span>Back</span>
          </button>
          <div className="ap-nav-brand">
            <span className="ap-nav-logo">GSBM</span>
            <span className="ap-nav-sep">|</span>
            <span className="ap-nav-tag">Admissions Portal</span>
          </div>
          <div className="ap-nav-secure">
            <FiLock size={11} strokeWidth={2} />
            Secure
          </div>
        </nav>

        {/* Hero */}
        <div className="ap-hero">
          <div className="ap-hero-inner">
            <div className="ap-badge">MBA 2026–2028 &nbsp;·&nbsp; Admissions Open</div>
            <h1 className="ap-h1">Apply to GSBM</h1>
            <p className="ap-h1-sub">Fill in your details. Our team will reach out within 24 hours.</p>
          </div>
        </div>

        {/* Body */}
        <div className="ap-body">

          {/* Sidebar — hidden on mobile, condensed on tablet */}
          <aside className="ap-sidebar">
            <div className="ap-card">
              <span className="ap-card-label">Program</span>
              <p className="ap-card-value">MBA Full-Time</p>
              <p className="ap-card-meta">2 Years · July 2026</p>
            </div>
            <div className="ap-card">
              <span className="ap-card-label">University</span>
              <p className="ap-card-value">Vinayaka Mission's Research Foundation</p>
              <p className="ap-card-meta">UGC Recognised · NAAC Accredited</p>
            </div>
            <div className="ap-card">
              <span className="ap-card-label">Eligibility</span>
              <p className="ap-card-value">Any Bachelor's Degree</p>
              <p className="ap-card-meta">Min 50% · Final year may apply</p>
            </div>

            {/* Hidden on tablet & mobile */}
            <div className="ap-divider" />

            <div className="ap-help-card">
              <span className="ap-section-label">Need Help?</span>
              <a href="tel:+918667690672" className="ap-contact-link">
                <FiPhone size={13} strokeWidth={2} />
                +91 98412 83764
              </a>
            </div>

            <div className="ap-dates-card">
              <span className="ap-section-label">Key Dates</span>
              {KEY_DATES.map(({ label, date }) => (
                <div className="ap-trow" key={label}>
                  <span className="ap-trow-label">{label}</span>
                  <span className="ap-trow-date">{date}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Form — always full width on mobile */}
          <section className="ap-panel">
            <div className="ap-panel-top">
              <h2 className="ap-panel-title">Application Form</h2>
              
            </div>
            <iframe
              src="https://forms.zohopublic.in/gsbmtechgm1/form/GSBMChennaiMBAPROGRAM/formperma/TJrU6LXsWTqAWh5ZbxgeWMkmSW2-aK-lzoJ2xn3iEjQ"
              title="GSBM MBA Application Form"
              width="100%"
              height="900"
              className="ap-iframe"
              allow="geolocation"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>

        </div>

        {/* Footer */}
        <footer className="ap-footer">
          <FiLock size={11} strokeWidth={2} />
          <span>Your information is encrypted and used solely for admissions purposes.</span>
          <span className="ap-footer-dot">·</span>
          <span>© 2026 Ganesan School of Business Management</span>
        </footer>

      </div>
    </>
  );
};

export default ApplyNow;