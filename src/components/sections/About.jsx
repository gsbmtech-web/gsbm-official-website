import { memo, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ac1 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import InfoCard from '../ui/InfoCard';
import DotItem from '../ui/DotItem';
import './About.css';

/* ─── Static data ─────────────────────────────────────────────────────────── */
const QUICK_FACTS = [
  { label: 'Program',    value: 'MBA – 2 Years Full-Time' },
  { label: 'University', value: 'VMRF - DU' },
  { label: 'Campus',     value: 'Chennai, India' },
  { label: 'Intake',     value: '120 seats / year' },
  { label: 'Approval',   value: 'AICTE Approved' },
  { label: 'Entrance',   value: 'TANCET / CAT / MAT / GSBM Test' },
];

const CORE_VALUES = ['Collaboration', 'Inclusivity', 'Responsibility', 'Cooperation', 'Learning', 'Excellence'];


const QuickFacts = memo(function QuickFacts({ rows }) {
  return (
    <div className="about-sbox">
      <div className="about-sbox-head">Quick Facts</div>
      <div className="about-sbox-body">
        {rows.map((r) => (
          <div className="about-srow" key={r.label}>
            <span className="about-srow-lbl">{r.label}</span>
            <span className="about-srow-val">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

const SidebarPromo = memo(function SidebarPromo() {
  const navigate = useNavigate();
  const handleApply = (e) => {
    e.preventDefault();
    startTransition(() => navigate('/apply'));
  };
  return (
    <div className="about-sidebar-promo">
      <p className="about-promo-badge">Admissions Open</p>
      <p className="about-promo-title">MBA 2026–2028</p>
      <p className="about-promo-desc">Limited seats available. Early applications get priority.</p>
      {/* href="/apply" keeps right-click "Open in new tab" working */}
      <a href="/apply" className="btn btn-red about-promo-btn" onClick={handleApply}>
        Apply Now
      </a>
    </div>
  );
});

const ContactInfo = memo(function ContactInfo() {
  return (
    <div className="about-contact-box">
      <p className="about-contact-head">Get in Touch</p>
      <a href="tel:+919841283764" className="about-contact-row">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
        </svg>
        <span>+91 98412 83764</span>
      </a>
      <a href="mailto:manageradmissionsgsbm@vinayakamissions.com" className="about-contact-row">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span>manageradmissionsgsbm@vinayakamissions.com</span>
      </a>
    </div>
  );
});

/* ─── Main section ─────────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section className="sec" id="about" aria-labelledby="about-heading">
      <div className="W">
        <div className="g21 as">

          {/* Left column */}
          <div>
            <SectionHeader
              id="about-heading"
              kicker="About GSBM"
              title="Nurturing Tomorrow's Business Leaders and Contributors to Societal Development"
            />

            <p className="about-text" style={{ marginBottom: 12 }}>
              Established to bridge the gap between academic knowledge and real-world business
              challenges, Ganesan School of Business Management (GSBM) produces 'professionals
              for results' with the right mix of analytical skill, ethical grounding, and
              leadership confidence. Built on a clear founding philosophy: that management
              education must go beyond classrooms to produce individuals who can lead
              organisations, solve real problems, and operate with integrity.
            </p>

            <p className="about-text" style={{ marginBottom: 12 }}>
              Operating under Vinayaka Mission's Research Foundation (Deemed to be University)
              in Chennai, GSBM combines academic rigour with an intensely industry-connected
              curriculum and a relentless focus on employability and placement outcomes.
            </p>

            <Ac1 title="Vision & Mission" defaultOpen>
              <div style={{ padding: '4px 0' }}>
                <div className="vmcard">
                  <p className="vmcard-lbl">Our Vision</p>
                  <p className="vmcard-txt">
                    To be a trusted institution that provides affordable management education
                    with the skills and values needed for successful and ethical careers.
                  </p>
                </div>
                <div className="vmcard vmcard--red">
                  <p className="vmcard-lbl">Our Mission</p>
                  <p className="vmcard-txt">
                    To deliver accessible and practice-oriented management education that
                    develops ethical, skilled, and innovative professionals who contribute
                    to sustainable growth and societal progress.
                  </p>
                </div>
              </div>
            </Ac1>

            <Ac1 title="Core Values">
              <div className="g2" style={{ gap: 8, padding: '4px 0' }}>
                {CORE_VALUES.map((v) => <DotItem key={v} text={v} />)}
              </div>
            </Ac1>

            <Ac1 title="Achievements & Accreditations">
              <div style={{ padding: '4px 0' }}>
                <InfoCard
                  label="AICTE Approved"
                  value="Approved by the All India Council for Technical Education — the primary regulatory body for management education in India."
                />
                <InfoCard
                  label="VMRF Deemed to be University"
                  value="MBA degree awarded by Vinayaka Mission's Research Foundation, a UGC-recognised Deemed to be University with a track record spanning decades."
                />
                <InfoCard
                  label="NAAC Accredited"
                  value="The parent university holds NAAC accreditation, ensuring academic quality standards are upheld across all programs."
                />
              </div>
            </Ac1>

            <Ac1 title="Collaborations">
              <div style={{ padding: '4px 0' }}>
                <p className="about-text" style={{ marginBottom: 8 }}>
                  GSBM maintains active collaborations with industry bodies, corporations, and
                  professional associations to keep the curriculum live and ensure students
                  gain real exposure through internships, live projects, and expert sessions.
                </p>
              </div>
            </Ac1>
          </div>

          {/* Sticky sidebar */}
          <div className="pin">
            <QuickFacts rows={QUICK_FACTS} />
            <SidebarPromo />
            <ContactInfo />
          </div>

        </div>
      </div>
    </section>
  );
}