// ===== FILE: src/components/layout/Footer.jsx =====
import { go } from '../../utils/scroll';
import LogoImg from '../../assets/Gsbmlogo.png';

export default function Footer() {
  const footerLinks = [
    { label: 'About GSBM', id: 'about' },
    { label: 'Leadership', id: 'leadership' },
    { label: 'Programs', id: 'programs' },
    { label: 'Campus', id: 'campus' },
    { label: 'Admissions', id: 'admissions' },
    { label: 'Faculty', id: 'faculty' },
    { label: 'Placements', id: 'placements' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="footer">
      <div className="footer-g">
        <div>
          <img src={LogoImg} alt="GSBM" className="footer-logo" />
          <p className="ft">
            Ganesan School of Business Management, under Vinayaka Mission's Research Foundation (Deemed to be University), Chennai.
            Building employable, ethical, and industry-ready leaders.
          </p>
          <a href="#apply" className="btn btn-wh btn-wh-filled footer-apply-btn" onClick={e => { e.preventDefault(); go('apply'); }}>
            Apply Now →
          </a>
        </div>
        <div>
          <p className="fh">Quick Links</p>
          {footerLinks.map((link, i) => (
            <a key={i} href={`#${link.id}`} className="fl" onClick={e => { e.preventDefault(); go(link.id); }}>
              {link.label}
            </a>
          ))}
        </div>
        <div>
         
        </div>
        <div>
          <p className="fh">Contact</p>
          <div className="fci">
            <span className="fci-i">📍</span>
            <span>Vinayaka Nagar, Old Mahabalipuram Road,Chennai – 603 104</span>
          </div>
          <div className="fci">
            <span className="fci-i">📞</span>
            <a href="tel:+919841283764">+91 98412 83764</a>
          </div>
          <div className="fci">
            <span className="fci-i">✉</span>
            <a href="mailto:manageradmissionsGSBM@vinayakamissions.com">manageradmissionsGSBM@vinayakamissions.com</a>
          </div>
        </div>
      </div>
      <div className="footer-stripe" />
      <div className="footer-bot">
        <div className="footer-bot-in">
          <span className="fcopy">© 2026 Ganesan School of Business Management. All rights reserved.</span>
          <span className="fcredit">Designed by <span>Ariar Technology</span></span>
        </div>
      </div>

      <style jsx="true">{`
        .footer {
          background: var(--burgundy);
          padding: 64px 0 0;
          border-top: 2px solid rgba(184,146,42,0.3);
        }
        .footer-g {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 56px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
        }

        /* ── LOGO — matches navbar exactly ── */
        .footer-logo {
          height: 170px;
          width: auto;
          max-width: 480px;
          object-fit: contain;
          object-position: left center;
          display: block;
          margin-bottom: 18px;
          /* Sharp GPU rendering — same as navbar */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        .fh {
          font-family: var(--sans);
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #E8D5A8;
          margin-bottom: 16px;
        }
        .fl {
          display: block;
          font-family: var(--sans);
          font-size: 0.88rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
          transition: color .14s;
          text-decoration: none;
        }
        .fl:hover { color: #E8D5A8; }
        .ft {
          font-family: var(--sans);
          font-size: 0.88rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.85;
          margin-bottom: 20px;
        }
        .footer-apply-btn {
          background: transparent;
          color: rgba(255,255,255,0.75);
          border: 1.5px solid rgba(255,255,255,0.3);
          font-size: 0.78rem;
          padding: 9px 18px;
          transition: all .2s;
        }
        .footer-apply-btn:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--navy);
        }
        .fsoc {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }
        .fsoc-link {
          width: 32px; height: 32px;
          border-radius: 1px;
          border: 1px solid rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.55);
          font-family: var(--sans);
          font-size: 0.7rem;
          font-weight: 700;
          transition: all .15s;
          text-decoration: none;
        }
        .fsoc-link:hover {
          background: rgba(184,146,42,0.2);
          border-color: var(--gold);
          color: #E8D5A8;
        }
        .fci {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          margin-bottom: 11px;
          font-family: var(--sans);
          font-size: 0.88rem;
          color: rgba(255,255,255,0.55);
          word-break: break-word;
        }
        .fci-i { color: var(--gold); flex-shrink: 0; }
        .fci a { color: rgba(255,255,255,0.55); transition: color .14s; text-decoration: none; }
        .fci a:hover { color: #E8D5A8; }
        .footer-stripe {
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--gold2), var(--gold), transparent);
        }
        .footer-bot {
          background: rgba(0,0,0,0.25);
          padding: 15px 2rem;
        }
        .footer-bot-in {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .fcopy {
          font-family: var(--sans);
          font-size: 0.7rem;
          color: rgba(255,255,255,0.35);
        }
        .fcredit {
          font-family: var(--sans);
          font-size: 0.7rem;
          color: rgba(255,255,255,0.3);
        }
        .fcredit span {
          color: #E8D5A8;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .footer-g { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 768px) {
          .footer-g { grid-template-columns: 1fr 1fr; }
          .footer-logo { height: 64px; }
        }
        @media (max-width: 640px) {
          .footer-g { grid-template-columns: 1fr; gap: 28px; padding: 0 1rem 40px; }
          .footer { padding: 48px 0 0; }
          .footer-bot { padding: 14px 1rem; }
          .footer-logo { height: 56px; }
        }
      `}</style>
    </footer>
  );
}