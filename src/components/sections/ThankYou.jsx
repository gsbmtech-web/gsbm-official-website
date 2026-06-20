import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiPhone, FiArrowLeft } from 'react-icons/fi';

const ThankYou = () => {
  const navigate = useNavigate();

  // ── Google Ads Conversion Tag ──
  useEffect(() => {
    // Fire page_view for Google Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: '/thank-you/',
        page_title: 'Application Submitted'
      });
    }

    // Fire conversion event for Google Ads
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18134758434'
      });
    }
  }, []);

  return (
    <>
      <style>{`
        .ty-root {
          min-height: 100vh;
          background: #f6f5f2;
          font-family: 'Outfit', system-ui, sans-serif;
          color: #1a2340;
          display: flex;
          flex-direction: column;
        }

        /* ── NAV ── */
        .ty-nav {
          background: #1a2340;
          height: 52px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .ty-nav-logo { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: 0.05em; }
        .ty-back {
          display: flex; align-items: center; gap: 6px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.85);
          font-size: 13px; font-weight: 500;
          padding: 6px 12px; border-radius: 6px;
          cursor: pointer; font-family: inherit;
          transition: all 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .ty-back:hover { background: rgba(255,255,255,0.12); color: #fff; }

        /* ── BODY ── */
        .ty-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
        }

        .ty-card {
          background: #fff;
          border: 1px solid #e4e1d9;
          border-radius: 16px;
          padding: 48px 40px;
          max-width: 520px;
          width: 100%;
          text-align: center;
        }

        .ty-icon {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: #edfdf5;
          border: 2px solid #a3e6c4;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
          color: #1a7a4a;
        }

        .ty-badge {
          display: inline-block;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #c9a84c;
          border: 1px solid rgba(201,168,76,0.35);
          padding: 3px 10px; border-radius: 4px;
          margin-bottom: 14px;
        }

        .ty-title {
          font-size: clamp(1.4rem, 4vw, 1.9rem);
          font-weight: 700; color: #1a2340;
          margin-bottom: 12px; line-height: 1.2;
        }

        .ty-sub {
          font-size: 14px; color: #888;
          line-height: 1.7; margin-bottom: 32px;
          max-width: 380px; margin-left: auto; margin-right: auto;
        }
        .ty-sub strong { color: #1a2340; }

        .ty-divider { height: 1px; background: #e4e1d9; margin-bottom: 28px; }

        .ty-steps {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
          text-align: left;
        }

        .ty-step {
          display: flex; align-items: flex-start; gap: 12px;
          background: #f6f5f2; border-radius: 10px;
          padding: 14px 16px;
        }

        .ty-step-num {
          width: 24px; height: 24px; border-radius: 50%;
          background: #1a2340; color: #fff;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }

        .ty-step-text { font-size: 13px; color: #444; line-height: 1.5; }
        .ty-step-text strong { color: #1a2340; display: block; margin-bottom: 2px; }

        .ty-cta {
          width: 100%;
          background: #1a2340; color: #fff;
          border: none; border-radius: 8px;
          padding: 14px 20px; font-size: 15px; font-weight: 600;
          font-family: inherit; cursor: pointer;
          transition: background 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          text-decoration: none; margin-bottom: 12px;
          -webkit-tap-highlight-color: transparent;
        }
        .ty-cta:hover { background: #253060; }

        .ty-home-btn {
          width: 100%;
          background: transparent; color: #1a2340;
          border: 1px solid #e4e1d9; border-radius: 8px;
          padding: 12px 20px; font-size: 14px; font-weight: 500;
          font-family: inherit; cursor: pointer;
          transition: all 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          -webkit-tap-highlight-color: transparent;
        }
        .ty-home-btn:hover { background: #f6f5f2; border-color: #ccc; }

        /* ── FOOTER ── */
        .ty-footer {
          background: #eceae4; border-top: 1px solid #ddd8cf;
          padding: 12px 20px;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; flex-wrap: wrap; font-size: 11px; color: #aaa; text-align: center;
        }

        @media (max-width: 540px) {
          .ty-card { padding: 36px 20px; border-radius: 12px; }
          .ty-nav { height: 48px; padding: 0 14px; }
        }
      `}</style>

      <div className="ty-root">

        {/* ── Nav ── */}
        <nav className="ty-nav">
          <button className="ty-back" onClick={() => navigate('/')}>
            <FiArrowLeft size={14} strokeWidth={2} /><span>Home</span>
          </button>
          <span className="ty-nav-logo">GSBM</span>
          <div style={{ width: 80 }} />
        </nav>

        {/* ── Body ── */}
        <div className="ty-body">
          <div className="ty-card">

            <div className="ty-icon">
              <FiCheckCircle size={32} strokeWidth={1.5} />
            </div>

            <div className="ty-badge">MBA 2026–2028 · Application Received</div>

            <h1 className="ty-title">Application Submitted!</h1>

            <p className="ty-sub">
              Thank you for applying to <strong>GSBM, Chennai</strong>. Your application has been received and our admissions team will reach out within <strong>24 hours</strong>.
            </p>

            <div className="ty-divider" />

            <div className="ty-steps">
              <div className="ty-step">
                <div className="ty-step-num">1</div>
                <div className="ty-step-text">
                  <strong>Application Review</strong>
                  Our team will review your details within 24 hours.
                </div>
              </div>
              <div className="ty-step">
                <div className="ty-step-num">2</div>
                <div className="ty-step-text">
                  <strong>Interview Call</strong>
                  You'll receive a call to schedule your personal interview.
                </div>
              </div>
              <div className="ty-step">
                <div className="ty-step-num">3</div>
                <div className="ty-step-text">
                  <strong>Admission Confirmation</strong>
                  Complete your admission formalities and secure your seat.
                </div>
              </div>
            </div>

            <a href="tel:+918667690672" className="ty-cta">
              <FiPhone size={15} /> Call Admissions: +91 8667690672
            </a>

            <button className="ty-home-btn" onClick={() => navigate('/')}>
              <FiArrowLeft size={14} /> Back to Home
            </button>

          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="ty-footer">
          <span>© 2026 Ganesan School of Business Management</span>
        </footer>

      </div>
    </>
  );
};

export default ThankYou;