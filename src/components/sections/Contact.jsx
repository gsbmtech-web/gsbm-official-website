// ===== FILE: src/components/sections/Contact.jsx =====
import { useState } from 'react';
import { Ac1 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import { go } from '../../utils/scroll';

/* ─── STATIC DATA ─── */
const SPECS = [
  'Marketing Management',
  'Banking & Finance Management',
  'Human Resource Management',
  'Business Analytics & Artificial Intelligence',
  'Logistics & Supply Chain Management',
  'Operations Management',
  'Hospital & Healthcare Management',
];

const socialLinks = [
  { name: 'Instagram',  url: 'https://www.instagram.com/domavcampus/' },
  { name: 'Facebook',   url: 'https://www.facebook.com/DoMAVCampus' },
  { name: 'LinkedIn',   url: 'https://www.linkedin.com/in/dom-avcampus/' },
  { name: 'Twitter / X', url: 'https://x.com/DoMAVCampus' },
  { name: 'YouTube',    url: 'https://www.youtube.com/@DepartmentofManagement' },
];

/* ─── Apply Form (inline, exact from original) ─── */
function ApplyForm({ compact = false }) {
  const [f, setF] = useState({ name: '', phone: '', email: '', qual: '', spec: '', msg: '' });
  const [done, setDone] = useState(false);

  const set = e => setF(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    setDone(true);
  };

  if (done) {
    return (
      <div className="form-success">
        <div className="form-success-icon">✓</div>
        <h3>Application Received</h3>
        <p>Thank you, {f.name}. Our admissions team will contact you within 24 hours.</p>
        <p className="form-success-phone">+91 98412 83764</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="apply-form" noValidate>
      <div className="form-grid">
        <div className="fg">
          <label htmlFor="af-name">Full Name *</label>
          <input id="af-name" name="name" type="text" required placeholder="Your full name" value={f.name} onChange={set} autoComplete="name" />
        </div>
        <div className="fg">
          <label htmlFor="af-phone">Phone *</label>
          <input id="af-phone" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" value={f.phone} onChange={set} autoComplete="tel" />
        </div>
        <div className="fg">
          <label htmlFor="af-email">Email *</label>
          <input id="af-email" name="email" type="email" required placeholder="your@email.com" value={f.email} onChange={set} autoComplete="email" />
        </div>
        <div className="fg">
          <label htmlFor="af-qual">Qualification *</label>
          <select id="af-qual" name="qual" required value={f.qual} onChange={set}>
            <option value="">Select</option>
            <option>B.E / B.Tech</option>
            <option>B.Com / BBA / BBM</option>
            <option>B.Sc</option>
            <option>B.A</option>
            <option>Other Graduate</option>
          </select>
        </div>
        <div className="fg fg-full">
          <label htmlFor="af-spec">Preferred Specialisation (optional)</label>
          <select id="af-spec" name="spec" value={f.spec} onChange={set}>
            <option value="">Select (optional)</option>
            {SPECS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {!compact && (
          <div className="fg fg-full">
            <label htmlFor="af-msg">Message / Query</label>
            <textarea id="af-msg" name="msg" rows={3} placeholder="Any questions about the program..." value={f.msg} onChange={set} />
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-red btn-block">Submit Application</button>
      <p className="form-privacy">We respect your privacy. No spam, ever.</p>
    </form>
  );
}

/* ─── Sidebar Promo (inline) ─── */
function SidebarPromo() {
  return (
    <div className="sidebar-promo">
      <p className="sidebar-promo-badge">Admissions Open</p>
      <p className="sidebar-promo-title">MBA 2026–28</p>
      <p className="sidebar-promo-desc">Limited seats available. Early applications get priority.</p>
      <a href="#apply" className="btn btn-red sidebar-promo-btn" onClick={e => { e.preventDefault(); go('apply'); }}>
        Apply Now
      </a>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="sec-sky" id="contact">
      <div className="W">
        <div className="g21 as">
          {/* Left column */}
          <div>
            <SectionHeader
              kicker="Contact Us"
              title="We're Here to Help"
              subtitle="Reach our admissions team for any query about the MBA program, eligibility, fees, campus visits, or anything else."
              kickerClass="kred"
            />

            <div className="g2" style={{ gap: 16, marginBottom: 32 }}>
              <div className="contact-card">
                <p className="contact-card-icon">📞</p>
                <p className="contact-card-label">Manager Admissions</p>
                <a href="tel:+919841283764" className="contact-card-value">+91 98412 83764</a>
              </div>
              <div className="contact-card">
                <p className="contact-card-icon">📞</p>
                <p className="contact-card-label">Counselor Tel</p>
                <div className="contact-card-value">
                  <a href="tel:9791476444">+91 9791476444 , +91 9791658444</a><br />

                </div>
              </div>
              <div className="contact-card">
                <p className="contact-card-icon">📧</p>
                <p className="contact-card-label">Email</p>
                <a href="mailto:manageradmissionsgsbm@vinayakamissions.com" className="contact-card-value">
                  manageradmissionsgsbm@vinayakamissions.com
                </a>
              </div>
              <div className="contact-card">
                <p className="contact-card-icon">📍</p>
                <p className="contact-card-label">Address</p>
                <p className="contact-card-value">
                 Vinayaka Nagar, Rajiv Gandhi Salai (Old Mahabalipuram Road),Chennai - 603 104
                </p>
              </div>
              <div className="contact-card">
                <p className="contact-card-icon">💬</p>
                <p className="contact-card-label">WhatsApp</p>
                <a href="https://wa.me/919841283764" className="contact-card-value">+91 98412 83764</a>
              </div>
            </div>

            <Ac1 title="Send Us a Message">
              <div style={{ padding: '10px 8px 4px' }}>
                <ApplyForm compact={false} />
              </div>
            </Ac1>

            <Ac1 title="Campus Location & Map">
              <div style={{ padding: '12px 8px' }}>
                <p className="body-text" style={{ marginBottom: 16 }}>
                  GSBM is located in ., on the Old Mahabalipuram Road (Old Mahabalipuram Road),
                  approximately 35 km from Chennai city centre. Easily accessible by road with regular bus and cab connectivity.
                </p>
                <iframe
                  title="GSBM Campus Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.18!2d80.1951!3d12.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5259c3c97b6a6b%3A0x80c7f7b9d5a2e2c1!2sAarupadai%20Veedu%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1"
                  style={{ width: '100%', height: 320, border: 'none', filter: 'grayscale(10%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Ac1>
          </div>

          {/* Right sidebar */}
          <div className="pin">
            {/* <div className="sbox">
              <div className="sbox-head">Follow Us</div>
              <div className="sbox-body">
                {socialLinks.map((social, idx) => (
                  <div className="srow" key={idx}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
                      {social.name} →
                    </a>
                  </div>
                ))}
              </div>
            </div> */}
            <SidebarPromo />
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .contact-card {
          padding: 24px;
          background: var(--white);
          border: 1px solid var(--border);
          border-top: 4px solid var(--burgundy);
          box-shadow: var(--shadow-sm);
        }
        .contact-card-icon { font-size: 1.5rem; color: var(--navy); margin-bottom: 8px; }
        .contact-card-label {
          font-family: var(--sans);
          font-size: 0.9rem;
          font-weight:  700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text3);
          margin-bottom: 5px;
        }
        .contact-card-value {
          font-family: var(--sans);
          font-size: 0.95rem;
          color: var(--navy);
          font-weight: 500;
          line-height: 1.65;
          word-break: break-word;
        }
        a.contact-card-value:hover { color: var(--burgundy); }

        .sbox {
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .sbox-head {
          background: var(--burgundy);
          padding: 12px 16px;
          font-family: var(--sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #E8D5A8;
          border-bottom: 1px solid rgba(184,146,42,0.25);
        }
        .sbox-body { padding: 16px; background: var(--white); }
        .srow {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 9px 0;
          border-bottom: 1px solid var(--border);
          font-family: var(--sans);
          font-size: 0.92rem;
        }
        .srow:last-child { border-bottom: none; }
        .social-link {
          font-family: var(--sans);
          color: var(--burgundy);
          font-weight: 600;
          font-size: 0.9rem;
          transition: color .14s;
        }
        .social-link:hover { color: var(--gold); }

        .sidebar-promo {
          background: var(--navy);
          padding: 28px 24px;
          margin-bottom: 18px;
          text-align: center;
          box-shadow: var(--shadow-md);
        }
        .sidebar-promo-badge {
          font-family: var(--sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--cream);
          margin-bottom: 8px;
        }
        .sidebar-promo-title {
          font-family: var(--serif);
          font-size: 1.8rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .sidebar-promo-desc {
          font-family: var(--sans);
          font-size: 0.85rem;
          color: rgba(255,255,255,.6);
          margin-bottom: 24px;
          line-height: 1.7;
        }
        .sidebar-promo-btn {
          display: block;
          width: 100%;
          text-align: center;
          justify-content: center;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .fg { margin-bottom: 16px; }
        .fg-full { grid-column: 1 / -1; }
        .fg label {
          display: block;
          font-family: var(--sans);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--navy);
          margin-bottom: 6px;
        }
        .fg input,
        .fg select,
        .fg textarea {
          width: 100%;
          padding: 12px 14px;
          font-family: var(--sans);
          font-size: 1rem;
          color: var(--text);
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 1px;
          outline: none;
          transition: border-color .18s;
          -webkit-appearance: none;
          appearance: none;
        }
        .fg input:focus,
        .fg select:focus,
        .fg textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(184,146,42,0.08);
        }
        .fg textarea { resize: vertical; }
        .form-success {
          text-align: center;
          padding: 36px 16px;
        }
        .form-success-icon {
          width: 52px; height: 52px;
          background: var(--burgundy);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px;
          color: #fff;
          font-size: 1.3rem;
        }
        .form-success h3 {
          font-family: var(--serif);
          font-size: 1.4rem;
          color: var(--navy);
          margin-bottom: 8px;
        }
        .form-success p {
          font-family: var(--sans);
          color: var(--text2);
          font-size: 0.9rem;
          line-height: 1.8;
        }
        .form-success-phone {
          font-weight: 600;
          color: var(--burgundy);
          margin-top: 8px;
        }
        .form-privacy {
          font-family: var(--sans);
          font-size: 0.68rem;
          color: var(--text3);
          text-align: center;
          margin-top: 9px;
        }

        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr; }
          .fg-full { grid-column: 1; }
        }
      `}</style>
    </section>
  );
}