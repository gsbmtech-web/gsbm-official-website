import { Ac1 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import InfoCard from '../ui/InfoCard';
import DotItem from '../ui/DotItem';
import { go } from '../../utils/scroll';

function QuickFacts({ rows }) {
  return (
    <div className="sbox">
      <div className="sbox-head">Quick Facts</div>
      <div className="sbox-body">
        {rows.map((r, i) => (
          <div className="srow" key={i}>
            <span className="srow-lbl">{r.label}</span>
            <span className="srow-val">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SidebarPromo() {
  return (
    <div className="sidebar-promo">
      <p className="sidebar-promo-badge">Admissions Open</p>
      <p className="sidebar-promo-title">MBA 2026–28</p>
      <p className="sidebar-promo-desc">Limited seats available. Early applications get priority.</p>
      <a
        href="#apply"
        className="btn btn-red sidebar-promo-btn"
        onClick={e => { e.preventDefault(); go('apply'); }}
        onTouchStart={e => { e.preventDefault(); go('apply'); }}
      >
        Apply Now
      </a>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="contact-info-box">
      <p className="contact-info-head">Get in Touch</p>
      <a href="tel:+919841283764" className="contact-info-row">
        <span>📞</span>
        <span>+91 98412 83764</span>
      </a>
      <a href="mailto:manageradmissionsGSBM@vinayakamissions.com" className="contact-info-row">
        <span>✉</span>
        <span>manageradmissionsGSBM@vinayakamissions.com</span>
      </a>
    </div>
  );
}

const quickFactsRows = [
  { label: 'Program',   value: 'MBA – 2 Years Full-Time' },
  { label: 'University', value: 'VMRF (DU)' },
  { label: 'Campus',    value: 'Chennai,India' },
  { label: 'Intake',    value: '120 seats / year' },
  { label: 'Approval',  value: 'AICTE Approved' },
  { label: 'Entrance',  value: 'TANCET / CAT / MAT / GSBM Test' },
];

const coreValues = ['Collaboration', 'Inclusivity', 'Responsibility', 'Cooperation', 'Learning', 'Excellence'];

export default function About() {
  return (
    <section className="sec" id="about">
      <div className="W">
        <div className="g21 as">
          <div>
            <SectionHeader
              kicker="About GSBM"
              title="Nurturing Tomorrow's Business Leaders and Contributors to Societal Development"
            />
            <p className="about-text" style={{ marginBottom: 12 }}>
              Established to bridge the gap between academic knowledge and real-world business challenges. 
              Ganesan School of Business Management (GSBM) produces 'professionals for results' with the 
              right mix of analytical skill, ethical grounding, and leadership confidence. 
              Ganesan School of Business Management(GSBM) was built on a clear founding philosophy: that management education must go beyond 
              classrooms to produce individuals who can lead organisations, solve real problems, and 
              operate with integrity.
            </p>

            <p className="about-text" style={{ marginBottom: 12 }}>
              Operating under Vinayaka Mission's Research Foundation (Deemed to be University to be University) in Chennai, 
              Ganesan School of Business Management(GSBM)combines the academic rigour of a Deemed to be University to be University with an intensely industry-connected 
              curriculum and a relentless focus on employability and placement outcomes.
            </p>

            <Ac1 title="Vision & Mission" defaultOpen>
              <div style={{ padding: '4px 0' }}>
                <div className="vmcard">
                  <p className="vmcard-lbl">Our Vision</p>
                  <p className="vmcard-txt">
                    To be a trusted institution that provides affordable management education with the skills
                    and values needed for successful and ethical careers.
                  </p>
                </div>
                <div className="vmcard r">
                  <p className="vmcard-lbl">Our Mission</p>
                  <p className="vmcard-txt">
                    To deliver accessible and practice-oriented management education that develops ethical,
                    skilled, and innovative professionals who contribute to sustainable growth and societal progress.
                  </p>
                </div>
              </div>
            </Ac1>

            <Ac1 title="Core Values">
              <div className="g2" style={{ gap: 8, padding: '4px 0' }}>
                {coreValues.map(v => <DotItem key={v} text={v} />)}
              </div>
            </Ac1>

            <Ac1 title="Achievements & Accreditations">
              <div style={{ padding: '4px 0' }}>
                <InfoCard
                  label="AICTE Approved"
                  value="Approved by the All India Council for Technical Education — the primary regulatory body for management education in India."
                />
                <InfoCard
                  label="VMRF Deemed to be University to be University"
                  value="MBA degree awarded by Vinayaka Mission's Research Foundation, a UGC-recognised Deemed to be University to be University with a track record spanning decades."
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
                  Ganesan School of Business Management Ganesan School of Business Management(GSBM) maintains active collaborations with industry bodies, corporations, and professional associations
                  to keep the curriculum live and ensure students gain real exposure through internships, live projects, and expert sessions.
                </p>
              </div>
            </Ac1>
          </div>

          <div className="pin">
            <QuickFacts rows={quickFactsRows} />
            <SidebarPromo />
            <ContactInfo />
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .sec {
          overflow-x: hidden; /* prevent horizontal scroll */
        }
        .section-header-subtitle,
        .about-text,
        .vmcard-txt,
        .srow-val,
        .sidebar-promo-desc,
        .contact-info-row,
        .info-card-value,
        .dot-item-text {
          font-family: var(--sans) !important;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text2);
        }

        .vmcard-txt {
          font-style: normal;
        }

        .sbox {
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .sbox-head {
          background: var(--burgundy);
          padding: 10px 16px;
          font-family: var(--sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #E8D5A8;
          border-bottom: 1px solid rgba(184,146,42,0.25);
          text-align: center; 
        }
        .sbox-body {
          padding: 12px;
          background: var(--white);
        }
        .srow {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 8px 0;
          border-bottom: 1px solid var(--border);
        }
        .srow:last-child {
          border-bottom: none;
        }
        .srow-lbl {
          font-weight: 700;
          font-size: 0.82rem;
          color: var(--navy);
          min-width: 110px;
          flex-shrink: 0;
          font-family: var(--sans);
        }
        .srow-val {
          font-family: var(--sans);
        }

        .sidebar-promo {
          background: var(--navy);
          padding: 24px 20px;
          margin-bottom: 16px;
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
          margin-bottom: 6px;
        }
        .sidebar-promo-title {
          font-family: var(--serif);
          font-size: 1.8rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .sidebar-promo-desc {
          margin-bottom: 20px;
           color: #fff;
        }
        .sidebar-promo-btn {
          display: block;
          width: 100%;
          text-align: center;
          justify-content: center;
          min-height: 44px;
        }

        .contact-info-box {
          padding: 16px;
          background: var(--cream);
          border: 1px solid var(--border);
        }
        .contact-info-head {
          font-family: var(--sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text3);
          margin-bottom: 12px;
        }
        .contact-info-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 8px;
          font-weight: 500;
          transition: color .15s;
          word-break: break-word;
          text-decoration: none;
          min-height: 44px;
        }
        .contact-info-row:hover {
          color: var(--burgundy);
        }

        .vmcard {
          padding: 16px 20px 16px 18px;
          border-left: 3px solid var(--gold);
          background: var(--sky);
          border-radius: 0 2px 2px 0;
          margin-bottom: 12px;
        }
        .vmcard.r {
          border-left-color: var(--burgundy);
        }
        .vmcard-lbl {
          font-family: var(--sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold2);
          margin-bottom: 6px;
        }
        .vmcard.r .vmcard-lbl {
          color: var(--burgundy);
        }
        .vmcard-txt {
          margin: 0;
        }

        .ac1:not(:last-child) {
          margin-bottom: 8px;
        }
      `}</style>
    </section>
  );
}