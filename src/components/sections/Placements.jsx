// ===== FILE: src/components/sections/Placements.jsx =====
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import InfoCard from '../ui/InfoCard';

/* ─── STATIC DATA ─── */
const testimonials = [
  {
    quote: 'The placement training at Ganesan School of Business Management (GSBM) was exceptional. Mock interviews and GDs prepared me for every round at Deloitte. I walked in confident.',
    name: 'Priya Ramesh',
    role: 'Business Analyst, Deloitte · MBA 2023',
    av: 'P',
  },
  {
    quote: "The Finance specialisation gave me a solid foundation. The faculty's industry experience made complex banking concepts genuinely clear.",
    name: 'Arjun Srinivasan',
    role: 'Relationship Manager, HDFC Bank · MBA 2022',
    av: 'A',
  },
  {
    quote: 'The Hospital Management specialisation is rare and in demand. GSBM gave me exactly the edge I needed in this growing sector.',
    name: 'K. Murugan',
    role: 'Healthcare Operations, Apollo Hospitals · MBA 2023',
    av: 'K',
  },
];

export default function Placements() {
  return (
    <section className="sec-navy" id="placements">
      <div className="W">
        <SectionHeader
          kicker="Placement Record"
          title="Careers That Begin Before Graduation"
          subtitle="Our placement cell works year-round. From aptitude training to mock interviews to on-campus drives — we prepare every student, end to end."
          kickerClass="klt"
        />

        <Ac1 title="Our Recruiters">
          <Ac2 title="Companies That Hire From GSBM Are Currently Expanding" defaultOpen>
            <p className="body-text" style={{ marginBottom: 14 }}>
              GSBM is expanding — our recruiter base is growing steadily.
            </p>
            <p style={{ lineHeight: 1.85, fontStyle: 'italic', color: 'var(--gold)', fontWeight: 500 }}>
              ✦ Placement record improving year on year ✦
            </p>
          </Ac2>
        </Ac1>

        <Ac1 title="Career Development Program">
          <Ac2 title="What We Offer" defaultOpen>
            <InfoCard label="Aptitude & Reasoning" value="Structured practice sessions aligned with actual corporate selection test formats used by top companies." />
            <InfoCard label="Mock Interview Program" value="Full-length simulated interviews with faculty and visiting industry professionals, followed by detailed feedback sessions." />
            <InfoCard label="Group Discussion Rounds" value="Regular GD sessions on current affairs, business cases, and abstract topics with scoring and improvement tracking." />
            <InfoCard label="Resume & LinkedIn" value="Professional resume crafting workshops and personalised LinkedIn profile optimisation for maximum visibility." />
            <InfoCard label="Corporate Etiquette" value="Business email writing, meeting etiquette, professional dress code, and workplace behaviour workshops." />
          </Ac2>
        </Ac1>

        {/* FIXED: Student Success Stories – always open */}
        <Ac1 title="Student Success Stories" defaultOpen={true}>
          <div className="testimonials-grid">
            {testimonials.map((s, idx) => (
              <div className="tcard" key={idx}>
                <div className="tcard-mark">❝</div>  {/* Opening quote mark */}
                <p className="tcard-text">{s.quote}</p>
                 <div className="tcard-mark">❞</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="tcard-av">{s.av}</div>
                  <div>
                    <p className="tcard-name">{s.name}</p>
                    <p className="tcard-role">{s.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Ac1>
      </div>

      <style jsx="true">{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          color: black;
          padding: 20px 8px 10px 8px;
        }
        .tcard {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          border-left: 4px solid var(--gold);
          padding: 28px;
          border-radius: 0 8px 8px 0;
          transition: all 0.2s ease;
        }
        .tcard:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-3px);
        }
        .tcard-mark {
          font-size: 3rem;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 16px;
          opacity: 0.8;
          font-family: serif;
        }
        .tcard-text {
          font-family: var(--sans);
          font-size: 1rem;
          font-style: italic;
          line-height: 1.65;
          color: rgba(2, 2, 2, 0.9);
          margin-bottom: 24px;
          font-weight: 400;
        }
        .tcard-name {
          font-family: var(--sans);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--white);
          margin: 0;
        }
        .tcard-role {
          font-family: var(--sans);
          font-size: 0.75rem;
          color: rgba(14, 14, 14, 0.6);
          margin-top: 4px;
          margin-bottom: 0;
        }
        .tcard-av {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--navy);
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        @media (max-width: 1024px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 640px) {
          .testimonials-grid { grid-template-columns: 1fr; }
          .tcard { padding: 20px; }
        }
      `}</style>
    </section>
  );
}