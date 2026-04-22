// ===== FILE: src/components/sections/Leadership.jsx =====
import { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import chancellorImg from '../../assets/leadership/chancellor.jpeg';
import PatronImg from '../../assets/leadership/patron.png';
import proChancellorImg from '../../assets/leadership/amirthavarshini.jpeg';
import csoImg from '../../assets/leadership/cso.png';
import deanImg from '../../assets/leadership/Dean2.png';


/* ══════════════════════════════════════
   LEADERSHIP DATA
══════════════════════════════════════ */
const LEADERSHIP = [
  {
  name: "Dr. A S GANESAN",
  title: "Chief Patron, GSBM",
  subtitle: "Chancellor, VMRF-DU",
  photo: chancellorImg,  
  message: "India does not have a shortage of graduates. It has a shortage of professionals who are genuinely ready — to think independently, to lead responsibly, and to perform under the pressures that real organisations place on them. GSBM was established to close that gap, not incrementally, but decisively. We are not building a school for rankings or recognition. We are building one for outcomes — for students who will go on to run enterprises, lead teams, and contribute to this country's growth in ways that matter. That is the only measure I am interested in."
},
  {
    name: 'Dr. Anuradha Ganesan',
    title: 'Patron, GSBM',
    subtitle: 'Vice President, VMRF-DU ',
    photo: PatronImg,
    message : 'Medicine taught me that the best outcomes come from combining rigorous systems with genuine human care. That philosophy shapes everything we build at VMRF — including GSBM. A business school located within the same ecosystem as GIEC is not a coincidence; it is a statement of intent. We want our students to graduate not just as managers, but as problem-solvers who create value for the communities they serve.',
  },
  {
    name: 'Ms. Amirthavarshini Ganesan',
    title: 'Co - Patron, GSBM',
    photo: proChancellorImg,
    message: `As Patron of Ganesan School of Business Management, I am deeply committed to shaping a new generation of business leaders who lead with purpose and integrity.
With my Economics graduation from the University of Chicago and an MBA from University College London, UK, and experience across healthcare and education, I strongly believe GSBM must blend cutting-edge knowledge with a strong human touch in this AI-driven era.
Our focus remains on developing ethical decision-makers who prioritize sustainability, real-world impact, and genuine employability.
Together, let us build business education that not only creates successful professionals but also responsible citizens committed to the greater social good.`,
  },
  {
    name: 'Mr. J. Suresh Samuel',
    title: 'Chief Strategy Officer, VMRF-DU',
    photo: csoImg,
    message: `The businesses I have worked with across four continents consistently struggled to find one thing: managers who could think, decide, and lead under pressure. GSBM exists to build exactly that — professionals with both the rigour and the resilience that real organisations demand. Management education that stays close to industry does not just improve employability; it improves enterprises. That is the standard we are committed to here.`,
  },
  {
    name: 'Prof P.S. Balaganapathy',
    title: 'Director, GSBM',
    photo: deanImg,
    message: `At GSBM, we believe education is not just about degrees — it is about shaping the character and capability of future leaders who will drive India's business growth.
Every student who joins us carries the potential to change industries. We strive to provide a relaxed but disciplined ecosystem for students' all-round development.
The central focus is to transform students into confident, knowledgeable, and skilled individuals who are not only ready for various jobs but also conditioned to think and create jobs. Employability is the key idea.`,
  },
];

/* ══════════════════════════════════════
   LEADERSHIP CARD (inline, exact from original)
══════════════════════════════════════ */
function LeadershipCard({ leader }) {
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 320;

  const trimToWord = (str, max) => {
    if (str.length <= max) return str;
    const cut = str.lastIndexOf(' ', max);
    return str.slice(0, cut > 0 ? cut : max);
  };

  const isLong = leader.message.length > PREVIEW;
  const displayed = expanded
    ? leader.message
    : trimToWord(leader.message, PREVIEW) + (isLong ? '…' : '');

  return (
    <div className="leadership-row">
      <div className="leadership-row-photo">
        <img src={leader.photo} alt={leader.name} loading="lazy" />
      </div>
      <div className="leadership-content">
        <h3>{leader.name}</h3>
        <p className="leadership-title">{leader.title}</p>
        <p className="leadership-title">{leader.subtitle}</p>
        <div className="leadership-quote">❝</div>
        <p className="leadership-message" style={{ whiteSpace: 'pre-line' }}>{displayed}</p>
         <div className="leadership-quote">❞</div>
        {isLong && (
          <button
            className="leadership-readmore"
            onClick={() => setExpanded(prev => !prev)}
            aria-expanded={expanded}
          >
            {expanded ? 'Read Less ▲' : 'Read More ▼'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN LEADERSHIP SECTION
══════════════════════════════════════ */
export default function Leadership() {
  return (
    <section className="sec-sky" id="leadership">
      <div className="W">
        <SectionHeader
          kicker="Our Leadership"
          title="Visionaries Guiding GSBM"
          subtitle="Meet the distinguished leaders who shape our institution's direction and uphold our commitment to excellence in management education."
          kickerClass="kgold"
        />
        <div className="leadership-rows">
          {LEADERSHIP.map((leader, idx) => (
            <LeadershipCard key={idx} leader={leader} />
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .leadership-rows {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-top: 20px;
        }
        .leadership-row {
          display: flex;
          gap: 48px;
          align-items: flex-start;
          background: var(--white);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
          padding: 32px;
          transition: transform .3s, box-shadow .3s;
        }
        .leadership-row:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .leadership-row-photo {
          flex: 0 0 260px;
          max-width: 260px;
        }
        .leadership-row-photo img {
          width: 100%;
          height: auto;
          aspect-ratio: 1;
          object-fit: cover;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: transform .4s;
        }
        .leadership-row:hover .leadership-row-photo img {
          transform: scale(1.02);
        }
        .leadership-content {
          flex: 1;
        }
        .leadership-content h3 {
          font-family: var(--serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 6px;
        }
        .leadership-title {
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--burgundy);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 4px;
        }
        .leadership-quote {
          font-size: 2rem;
          color: var(--gold);
          line-height: 1;
          margin: 12px 0 8px;
          opacity: 0.6;
        }
        .leadership-message {
          font-family: var(--sans);
          font-size: 0.98rem;
          color: var(--text2);
          line-height: 1.88;
        }
        .leadership-readmore {
          background: none;
          border: none;
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--burgundy);
          margin-top: 10px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: color .15s;
        }
        .leadership-readmore:hover {
          color: var(--gold);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .leadership-row {
            flex-direction: column;
            gap: 24px;
            padding: 24px;
          }
          .leadership-row-photo {
            flex: 0 0 auto;
            max-width: 200px;
            margin: 0 auto;
          }
          .leadership-content h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}