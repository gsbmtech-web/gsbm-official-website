import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiPhone, FiMail } from 'react-icons/fi';

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
        .ap-root{min-height:100vh;background:#f6f5f2;font-family:'Segoe UI',system-ui,sans-serif;color:#1a2340;}
        .ap-nav{background:#1a2340;height:56px;display:flex;align-items:center;padding:0 32px;justify-content:space-between;position:sticky;top:0;z-index:50;}
        .ap-back{display:flex;align-items:center;gap:6px;background:transparent;border:1px solid rgba(255,255,255,0.25);color:rgba(255,255,255,0.8);font-size:13px;padding:6px 14px;border-radius:6px;cursor:pointer;font-family:inherit;transition:all 0.15s;}
        .ap-back:hover{background:rgba(255,255,255,0.1);color:#fff;}
        .ap-nav-brand{display:flex;align-items:center;gap:10px;}
        .ap-nav-logo{font-size:15px;font-weight:700;color:#fff;letter-spacing:0.05em;}
        .ap-nav-sep{color:rgba(255,255,255,0.2);font-size:18px;font-weight:200;}
        .ap-nav-tag{font-size:13px;color:rgba(255,255,255,0.45);}
        .ap-nav-secure{display:flex;align-items:center;gap:5px;font-size:12px;color:rgba(255,255,255,0.35);}
        .ap-hero{background:#1a2340;padding:36px 32px 40px;}
        .ap-hero-inner{max-width:1060px;margin:0 auto;}
        .ap-badge{display:inline-block;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c9a84c;border:1px solid rgba(201,168,76,0.35);padding:3px 10px;border-radius:4px;margin-bottom:14px;}
        .ap-h1{font-size:clamp(1.7rem,3vw,2.4rem);font-weight:700;color:#fff;margin:0 0 10px;line-height:1.2;}
        .ap-h1-sub{font-size:14px;color:rgba(255,255,255,0.5);margin:0;max-width:420px;line-height:1.6;}
        .ap-body{max-width:1060px;margin:0 auto;padding:32px 32px 64px;display:grid;grid-template-columns:260px 1fr;gap:24px;align-items:start;}
        .ap-sidebar{position:sticky;top:72px;}
        .ap-card{background:#fff;border:1px solid #e4e1d9;border-radius:10px;padding:16px;margin-bottom:12px;}
        .ap-card-label{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#aaa;margin:0 0 4px;display:block;}
        .ap-card-value{font-size:13px;font-weight:600;color:#1a2340;margin:0 0 3px;line-height:1.4;}
        .ap-card-meta{font-size:12px;color:#999;margin:0;line-height:1.45;}
        .ap-rule{height:1px;background:#e4e1d9;margin:4px 0 16px;}
        .ap-section-label{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#aaa;margin:0 0 10px;display:block;}
        .ap-contact-link{display:flex;align-items:center;gap:7px;font-size:13px;color:#1a2340;text-decoration:none;padding:5px 0;transition:color 0.15s;}
        .ap-contact-link:hover{color:#8b1a1a;}
        .ap-trow{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #ede9e0;font-size:12px;}
        .ap-trow:last-child{border-bottom:none;}
        .ap-trow-label{color:#666;}
        .ap-trow-date{font-weight:600;color:#8b1a1a;}
        .ap-panel{background:#fff;border:1px solid #e4e1d9;border-radius:12px;overflow:hidden;}
        .ap-panel-top{padding:20px 24px 16px;border-bottom:1px solid #ede9e0;}
        .ap-panel-title{font-size:18px;font-weight:700;color:#1a2340;margin:0 0 4px;}
        .ap-panel-hint{font-size:13px;color:#999;margin:0;}
        .ap-iframe{display:block;border:none;width:100%;}
        .ap-footer{background:#eceae4;border-top:1px solid #ddd8cf;padding:14px 32px;display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font-size:12px;color:#aaa;}
        .ap-footer-dot{opacity:0.4;}
        @media(max-width:860px){
          .ap-body{grid-template-columns:1fr;padding:20px 20px 48px;}
          .ap-sidebar{position:static;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;}
          .ap-card{margin-bottom:0;}
          .ap-rule{display:none;}
        }
        @media(max-width:560px){
          .ap-nav{padding:0 16px;}
          .ap-nav-tag,.ap-nav-sep{display:none;}
          .ap-hero{padding:24px 16px 28px;}
          .ap-sidebar{grid-template-columns:1fr;}
          .ap-footer{flex-direction:column;gap:3px;text-align:center;}
          .ap-footer-dot{display:none;}
        }
      `}</style>

      <div className="ap-root">

        {/* Nav */}
        <nav className="ap-nav">
          <button className="ap-back" onClick={handleBack}>
            <FiArrowLeft size={14} strokeWidth={2} />
            Back
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
            <p className="ap-h1-sub">Fill in your details below. Our team will reach out within 24 hours.</p>
          </div>
        </div>

        {/* Body */}
        <div className="ap-body">

          {/* Sidebar */}
          <aside className="ap-sidebar">
            <div className="ap-card">
              <span className="ap-card-label">Program</span>
              <p className="ap-card-value">MBA Full-Time</p>
              <p className="ap-card-meta">2 Years · July 2026 Intake</p>
            </div>
            <div className="ap-card">
              <span className="ap-card-label">University</span>
              <p className="ap-card-value">Vinayaka Mission's Research Foundation</p>
              <p className="ap-card-meta">Deemed University · UGC Recognised · NAAC Accredited</p>
            </div>
            <div className="ap-card">
              <span className="ap-card-label">Eligibility</span>
              <p className="ap-card-value">Any Bachelor's Degree</p>
              <p className="ap-card-meta">Min 50% aggregate · Final year students may apply</p>
            </div>

            <div className="ap-rule" />

            <span className="ap-section-label">Need Help?</span>
            <a href="tel:+919841283764" className="ap-contact-link">
              <FiPhone size={13} strokeWidth={2} /> +91 98412 83764
            </a>
            {/* <a href="mailto:manageradmissionsgsbm@vinayakamissions.com" className="ap-contact-link">
              <FiMail size={8} strokeWidth={1} />manageradmissionsgsbm@vinayakamissions.com
            </a> */}

            <span className="ap-section-label" style={{ marginTop: '18px' }}>Key Dates</span>
            {KEY_DATES.map(({ label, date }) => (
              <div className="ap-trow" key={label}>
                <span className="ap-trow-label">{label}</span>
                <span className="ap-trow-date">{date}</span>
              </div>
            ))}
          </aside>

          {/* Form */}
          <section className="ap-panel">
            <div className="ap-panel-top">
              <h2 className="ap-panel-title">Application Form</h2>
              <p className="ap-panel-hint">Takes about 3 minutes to complete</p>
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