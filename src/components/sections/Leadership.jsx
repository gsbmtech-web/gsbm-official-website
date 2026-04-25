import { memo, useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import chancellorImg from '../../assets/leadership/chancellor.jpeg';
import PatronImg from '../../assets/leadership/patron.png';
import proChancellorImg from '../../assets/leadership/amirthavarshini.jpeg';
import csoImg from '../../assets/leadership/cso.png';
import deanImg from '../../assets/leadership/Dean2.jpeg';
import './Leadership.css';

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
    subtitle: 'Vice President, VMRF-DU',
    photo: PatronImg,
    message: 'Medicine taught me that the best outcomes come from combining rigorous systems with genuine human care. That philosophy shapes everything we build at VMRF — including GSBM. A business school located within the same ecosystem as GIEC is not a coincidence; it is a statement of intent. We want our students to graduate not just as managers, but as problem-solvers who create value for the communities they serve.',
  },
  {
    name: 'Ms. Amirthavarshini Ganesan',
    title: 'Co - Patron, GSBM',
    subtitle: 'Director - institutional Development and strategy',
    subtitlee: 'office of the chancellor',
    photo: proChancellorImg,
    message: `As Patron of Ganesan School of Business Management, I am deeply committed to shaping a new generation of business leaders who lead with purpose and integrity. With my Economics graduation from the University of Chicago and an MBA from University College London, UK, and experience across healthcare and education, I strongly believe GSBM must blend cutting-edge knowledge with a strong human touch in this AI-driven era.Our focus remains on developing ethical decision-makers who prioritize sustainability, real-world impact, and genuine employability.Together, let us build business education that not only creates successful professionals but also responsible citizens committed to the greater social good.`,
  },
  {
    name: 'Prof P.S. Balaganapathy',
    title: 'Director, GSBM',
    photo: deanImg,
    message: `At GSBM, we believe education is not just about degrees — it is about shaping the character and capability of future leaders who will drive India's business growth.Every student who joins us carries the potential to change industries. We strive to provide a relaxed but disciplined ecosystem for students' all-round development.The central focus is to transform students into confident, knowledgeable, and skilled individuals who are not only ready for various jobs but also conditioned to think and create jobs. Employability is the key idea.`,
  },
];

const trimToWord = (str, max) => {
  if (str.length <= max) return str;
  const cut = str.lastIndexOf(' ', max);
  return str.slice(0, cut > 0 ? cut : max);
};

const LeadershipCard = memo(({ leader }) => {
  const [expanded, setExpanded] = useState(false);
  const PREVIEW = 320;
  const isLong = leader.message.length > PREVIEW;
  const displayed = expanded
    ? leader.message
    : trimToWord(leader.message, PREVIEW) + (isLong ? '…' : '');

  return (
    <div className="leadership-row">
      <div className="leadership-row-photo">
        <img
          src={leader.photo}
          alt={leader.name}
          loading={expanded ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="leadership-content">
        <h3>{leader.name}</h3>
        <p className="leadership-title">{leader.title}</p>
        <p className="leadership-title">{leader.subtitle}</p>
        {leader.subtitlee && <p className="leadership-title">{leader.subtitlee}</p>}
        <div className="leadership-quote" aria-hidden="true">❝</div>
        <p className="leadership-message" style={{ whiteSpace: 'pre-line' }}>
          {displayed}
        </p>
        <div className="leadership-quote" aria-hidden="true">❞</div>
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
});

const Leadership = memo(() => {
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
    </section>
  );
});

export default Leadership;