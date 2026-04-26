import { memo, useState, useCallback, useMemo } from 'react';
import SectionHeader from '../ui/SectionHeader';
import chancellorImg    from '../../assets/leadership/chancellor.jpeg';
import patronImg        from '../../assets/leadership/patron.png';
import proChancellorImg from '../../assets/leadership/amirthavarshini.jpeg';
import deanImg          from '../../assets/leadership/Dean2.jpeg';
import './Leadership.css';

// ─── Static data — outside component, never recreated ────────────────────────
// ✅ PatronImg renamed to patronImg — React components must start with uppercase,
//    but plain variables (non-JSX) should be camelCase to avoid confusion.
//    Using PascalCase for a variable tricks linters into thinking it's a component.
const LEADERSHIP = [
  {
    id: 'ganesan',           // ✅ stable unique id — replaces array index as key
    name: 'Dr. A S Ganesan',
    title: 'Chief Patron, GSBM',
    subtitle: 'Chancellor, VMRF-DU',
    photo: chancellorImg,
    message:
      'India does not have a shortage of graduates. It has a shortage of professionals who are genuinely ready — to think independently, to lead responsibly, and to perform under the pressures that real organisations place on them. GSBM was established to close that gap, not incrementally, but decisively. We are not building a school for rankings or recognition. We are building one for outcomes — for students who will go on to run enterprises, lead teams, and contribute to this country\'s growth in ways that matter. That is the only measure I am interested in.',
  },
  {
    id: 'anuradha',
    name: 'Dr. Anuradha Ganesan',
    title: 'Patron, GSBM',
    subtitle: 'Vice President, VMRF-DU',
    photo: patronImg,
    message:
      'Medicine taught me that the best outcomes come from combining rigorous systems with genuine human care. That philosophy shapes everything we build at VMRF — including GSBM. A business school located within the same ecosystem as GIEC is not a coincidence; it is a statement of intent. We want our students to graduate not just as managers, but as problem-solvers who create value for the communities they serve.',
  },
  {
    id: 'amirthavarshini',
    name: 'Ms. Amirthavarshini Ganesan',
    title: 'Co-Patron, GSBM',
    subtitle: 'Director – Institutional Development and Strategy',
    subtitlee: 'Office of the Chancellor',
    photo: proChancellorImg,
    message:
      'As Patron of Ganesan School of Business Management, I am deeply committed to shaping a new generation of business leaders who lead with purpose and integrity. With my Economics graduation from the University of Chicago and an MBA from University College London, UK, and experience across healthcare and education, I strongly believe GSBM must blend cutting-edge knowledge with a strong human touch in this AI-driven era. Our focus remains on developing ethical decision-makers who prioritize sustainability, real-world impact, and genuine employability. Together, let us build business education that not only creates successful professionals but also responsible citizens committed to the greater social good.',
  },
  {
    id: 'balaganapathy',
    name: 'Prof. P.S. Balaganapathy',
    title: 'Director, GSBM',
    subtitle: null,
    photo: deanImg,
    message:
      'At GSBM, we believe education is not just about degrees — it is about shaping the character and capability of future leaders who will drive India\'s business growth. Every student who joins us carries the potential to change industries. We strive to provide a relaxed but disciplined ecosystem for students\' all-round development. The central focus is to transform students into confident, knowledgeable, and skilled individuals who are not only ready for various jobs but also conditioned to think and create jobs. Employability is the key idea.',
  },
];

const PREVIEW_CHARS = 320;

// ✅ Pure function — defined outside component, not recreated on render
const trimToWord = (str, max) => {
  if (str.length <= max) return str;
  const cut = str.lastIndexOf(' ', max);
  return str.slice(0, cut > 0 ? cut : max);
};

// ─── LeadershipCard ───────────────────────────────────────────────────────────
const LeadershipCard = memo(function LeadershipCard({ leader, index }) {
  const [expanded, setExpanded] = useState(false);

  // ✅ useCallback — stable toggle, not a new function on every render
  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  // ✅ useMemo — only recompute preview text when expanded state or leader changes
  const { isLong, displayed } = useMemo(() => {
    const long = leader.message.length > PREVIEW_CHARS;
    const text = expanded
      ? leader.message
      : trimToWord(leader.message, PREVIEW_CHARS) + (long ? '…' : '');
    return { isLong: long, displayed: text };
  }, [leader.message, expanded]);

  return (
    <div className="leadership-row">
      <div className="leadership-row-photo">
        <img
          src={leader.photo}
          alt={`Portrait of ${leader.name}, ${leader.title}`}
          width={280}
          height={320}
          // ✅ FIXED: loading was toggling between "eager"/"lazy" based on expanded
          //    state — this is wrong. The image is either in view or it isn't.
          //    Toggling eager on expand causes a redundant re-fetch hint to the browser.
          //    First card loads eagerly (above fold), rest are lazy.
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>

      <div className="leadership-content">
        <h3>{leader.name}</h3>
        <p className="leadership-title">{leader.title}</p>

        {/* ✅ Only render subtitle paragraphs if they have content */}
        {leader.subtitle  && <p className="leadership-title">{leader.subtitle}</p>}
        {leader.subtitlee && <p className="leadership-title">{leader.subtitlee}</p>}

        <div className="leadership-quote" aria-hidden="true">❝</div>

        {/*
          ✅ Removed style={{ whiteSpace: 'pre-line' }} inline style object.
          Move this to Leadership.css:
            .leadership-message { white-space: pre-line; }
        */}
        <p className="leadership-message">
          {displayed}
        </p>

        <div className="leadership-quote" aria-hidden="true">❞</div>

        {isLong && (
          <button
            className="leadership-readmore"
            onClick={toggle}
            aria-expanded={expanded}
            // ✅ Descriptive aria-label so screen readers announce intent clearly
            aria-label={
              expanded
                ? `Read less of ${leader.name}'s message`
                : `Read more of ${leader.name}'s message`
            }
          >
            {expanded ? 'Read Less ▲' : 'Read More ▼'}
          </button>
        )}
      </div>
    </div>
  );
});

// ─── Leadership ───────────────────────────────────────────────────────────────
const Leadership = memo(function Leadership() {
  return (
    <section className="sec-sky" id="leadership" aria-labelledby="leadership-heading">
      <div className="W">
        <SectionHeader
          id="leadership-heading"
          kicker="Our Leadership"
          title="Visionaries Guiding GSBM"
          subtitle="Meet the distinguished leaders who shape our institution's direction and uphold our commitment to excellence in management education."
          kickerClass="kgold"
        />
        <div className="leadership-rows">
          {LEADERSHIP.map((leader, index) => (
            // ✅ key uses stable id string, not array index
            <LeadershipCard key={leader.id} leader={leader} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Leadership;