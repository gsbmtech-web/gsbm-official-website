// ===== FILE: src/components/sections/Faculty.jsx =====
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import DotItem from '../ui/DotItem';

/* ─── STATIC DATA ─── */
const FACULTY = [
  { name: 'Raman Pushkar',  title: 'Consultant, ex-VP Deutsche Bank',   area: 'Finance & Investment Banking' },
  { name: 'Prasanna Rao',   title: 'Vice President, Accenture',          area: 'Strategy & Consulting' },
  { name: 'Vimal M G',      title: 'Vice President, Barclays',           area: 'Banking & Financial Services' },
  { name: 'Ram Dheeraj G',  title: 'Associate Director, Novartis',       area: 'Healthcare & Pharma Management' },
];

const researchAreas = [
  'Strategic Management & Entrepreneurship',
  'Financial Markets & Behavioural Finance',
  'Consumer Behaviour & Digital Marketing',
  'HR Analytics & Organisational Behaviour',
  'Supply Chain Optimisation',
  'Healthcare Administration',
  'Business Intelligence & AI',
  'Sustainability & Corporate Governance',
];

export default function Faculty() {
  return (
    <section className="sec" id="faculty">
      <div className="W">
        <SectionHeader
          kicker="Faculty & Research"
          title="Academic Excellence Meets Industry Experience"
          subtitle="Our faculty bring doctoral credentials and real corporate experience into every classroom — ensuring students receive education that is both rigorous and genuinely relevant."
        />

        <Ac1 title="Faculty Overview & Teaching Philosophy" defaultOpen>
          <Ac2 title="Our Approach" defaultOpen>
            <p className="body-text" style={{ marginBottom: 12 }}>
              At Ganesan School of Business Management(GSBM), faculty are not just educators — they are practitioners, researchers, and mentors.
              Each faculty member is selected for both their academic depth and practical industry exposure,
              creating a learning environment that is simultaneously rigorous and relevant.
            </p>
            <p className="body-text">
              The teaching methodology combines case-based learning, industry simulations, live projects, and
              regular interaction with visiting professionals from leading organisations across India.
            </p>
          </Ac2>
        </Ac1>

        <Ac1 title="Faculty Profiles">
          <div className="faculty-grid">
            {FACULTY.map((f, idx) => {
              const initials = f.name
                .split(' ')
                .filter(w => w.length > 2 && !w.includes('.'))
                .slice(0, 2)
                .map(w => w[0])
                .join('');
              return (
                <div key={idx} className="fcard">
                  <div className="fcard-av">{initials}</div>
                  <div className="fcard-body">
                    <p className="fcard-name">{f.name}</p>
                    <p className="fcard-title">{f.title}</p>
                    <p className="fcard-area">{f.area}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Ac1>

        <Ac1 title="Research Areas">
          <Ac2 title="Active Research Domains" defaultOpen>
            <div className="g2" style={{ gap: 10 }}>
              {researchAreas.map(r => <DotItem key={r} text={r} />)}
            </div>
          </Ac2>
        </Ac1>

        <Ac1 title="Publications & Conferences">
          <Ac2 title="Research Output" defaultOpen>
            <p className="body-text" style={{ marginBottom: 12 }}>
             Ganesan School of Business Management(GSBM) faculty contribute actively to academic and industry research through peer-reviewed journal
              publications, conference papers, case studies, and textbook contributions.
            </p>
            <p className="body-text">
              The institution participates in national-level management conferences, bringing together academics
              and practitioners to exchange perspectives on the most pressing business challenges of the day.
            </p>
          </Ac2>
        </Ac1>
      </div>

      <style jsx="true">{`
        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 10px 8px;
        }
        .fcard {
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          background: var(--white);
          text-align: center;
          transition: all .22s;
        }
        .fcard:hover {
          box-shadow: 0 8px 30px rgba(28,24,20,.1);
          transform: translateY(-3px);
          border-color: var(--gold);
        }
        .fcard-av {
          width: 100%; height: 150px;
          background: var(--parchment);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--serif);
          font-size: 2.4rem;
          font-weight: 600;
          color: var(--burgundy);
        }
        .fcard-body { padding: 16px 14px 20px; }
        .fcard-name {
          font-family: var(--serif);
          font-size: 1.15rem;
          color: var(--navy);
          margin-bottom: 4px;
        }
        .fcard-title {
          font-family: var(--sans);
          font-size: 0.75rem;
          color: var(--burgundy);
          font-weight: 600;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .fcard-area {
          font-family: var(--sans);
          font-size: 0.82rem;
          color: var(--text2);
        }
        @media (max-width: 1024px) {
          .faculty-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .faculty-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
        }
        @media (max-width: 480px) {
          .faculty-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}