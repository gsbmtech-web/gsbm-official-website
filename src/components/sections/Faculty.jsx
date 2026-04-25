import { memo } from 'react';
import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import DotItem from '../ui/DotItem';
import './Faculty.css';

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

const FacultyCard = memo(({ faculty }) => {
  const initials = faculty.name
    .split(' ')
    .filter(w => w.length > 2 && !w.includes('.'))
    .slice(0, 2)
    .map(w => w[0])
    .join('');

  return (
    <div className="fcard">
      <div className="fcard-av" aria-hidden="true">{initials}</div>
      <div className="fcard-body">
        <p className="fcard-name">{faculty.name}</p>
        <p className="fcard-title">{faculty.title}</p>
        <p className="fcard-area">{faculty.area}</p>
      </div>
    </div>
  );
});

const Faculty = () => {
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
            <p className="body-text faculty-mb12">
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
            {FACULTY.map((faculty, idx) => (
              <FacultyCard key={idx} faculty={faculty} />
            ))}
          </div>
        </Ac1>

        <Ac1 title="Research Areas">
          <Ac2 title="Active Research Domains" defaultOpen>
            <div className="faculty-research-grid">
              {researchAreas.map(r => <DotItem key={r} text={r} />)}
            </div>
          </Ac2>
        </Ac1>

        <Ac1 title="Publications & Conferences">
          <Ac2 title="Research Output" defaultOpen>
            <p className="body-text faculty-mb12">
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
    </section>
  );
};

export default memo(Faculty);