import { memo } from 'react';
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import InfoCard from '../ui/InfoCard';
import './Placements.css';

const testimonials = [
  {
    id: 'priya',
    quote: 'The placement training at GSBM was exceptional. Mock interviews and GDs prepared me for every round at Deloitte. I walked in confident.',
    name: 'Priya Ramesh',
    role: 'Business Analyst, Deloitte · MBA 2023',
    av: 'P',
  },
  {
    id: 'arjun',
    quote: "The Finance specialisation gave me a solid foundation. The faculty's industry experience made complex banking concepts genuinely clear.",
    name: 'Arjun Srinivasan',
    role: 'Relationship Manager, HDFC Bank · MBA 2022',
    av: 'A',
  },
  {
    id: 'murugan',
    quote: 'The Hospital Management specialisation is rare and in demand. GSBM gave me exactly the edge I needed in this growing sector.',
    name: 'K. Murugan',
    role: 'Healthcare Operations, Apollo Hospitals · MBA 2023',
    av: 'K',
  },
];

// Flat primitive props — memo's shallow comparison is semantically correct
const TestimonialCard = memo(({ quote, name, role, av }) => (
  <div className="tcard">
    {/* Quote marks moved to CSS ::before / ::after on .tcard-text —
        removes two DOM nodes per card and silences screen reader announcement */}
    <p className="tcard-text">{quote}</p>
    <div className="tcard-author">
      <div className="tcard-av" aria-hidden="true">{av}</div>
      <div>
        <p className="tcard-name">{name}</p>
        <p className="tcard-role">{role}</p>
      </div>
    </div>
  </div>
));

const Placements = () => (
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
          <p className="body-text placements-mb14">
            GSBM is expanding — our recruiter base is growing steadily.
          </p>
          {/* ✦ decorative markers moved to CSS ::before/::after on this class */}
          <p className="placements-gold-italic">
            Placement record improving year on year
          </p>
        </Ac2>
      </Ac1>

      <Ac1 title="Career Development Program">
        <Ac2 title="What We Offer" defaultOpen>
          <InfoCard label="Aptitude & Reasoning"   value="Structured practice sessions aligned with actual corporate selection test formats used by top companies." />
          <InfoCard label="Mock Interview Program"  value="Full-length simulated interviews with faculty and visiting industry professionals, followed by detailed feedback sessions." />
          <InfoCard label="Group Discussion Rounds" value="Regular GD sessions on current affairs, business cases, and abstract topics with scoring and improvement tracking." />
          <InfoCard label="Resume & LinkedIn"        value="Professional resume crafting workshops and personalised LinkedIn profile optimisation for maximum visibility." />
          <InfoCard label="Corporate Etiquette"      value="Business email writing, meeting etiquette, professional dress code, and workplace behaviour workshops." />
        </Ac2>
      </Ac1>

      <Ac1 title="Student Success Stories" defaultOpen>
        <div className="testimonials-grid">
          {testimonials.map(({ id, quote, name, role, av }) => (
            <TestimonialCard
              key={id}
              quote={quote}
              name={name}
              role={role}
              av={av}
            />
          ))}
        </div>
      </Ac1>
    </div>
  </section>
);

export default Placements;