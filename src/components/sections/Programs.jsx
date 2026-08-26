import { Ac1, Ac2 } from '../ui/Accordion';
import SectionHeader from '../ui/SectionHeader';
import DotItem from '../ui/DotItem';
import InfoCard from '../ui/InfoCard';
import './Programs.css';

const SPECIALISATIONS = [
  'Marketing Management',
  'Banking & Finance Management',
  'Human Resource Management',
  'Business Analytics & Artificial Intelligence',
  'Logistics & Supply Chain Management',
  'Operations Management',
  'Hospital & Healthcare Management',
  'Specialisation Designed By Students',
];

const CERTIFICATIONS = [
  'Digital Marketing & SEO',
  'Financial Modelling & Valuation',
  'Data Analytics (Python + Excel)',
  'Supply Chain Management Tools',
  'Business Communication',
  'Leadership & Personality Development',
];

const WORKSHOP_TOPICS = [
  'Leadership & Entrepreneurship',
  'Business Strategy & Innovation',
  'AI in Business Decision-Making',
  'Digital Transformation',
  'Financial Markets — Live',
  'Supply Chain Disruptions',
  'Healthcare Management Trends',
  'Startup Ecosystems & Funding',
];

const Programs = () => {
  return (
    <section className="sec-sky" id="programs">
      <div className="W">
        <SectionHeader
          kicker="Programs Offered"
          title="MBA with Specialisations Designed by Students, Industry & Faculty"
          subtitle="Every program at GSBM is designed to develop industry ready professionals with the knowledge, exposure and confidence to contribute from day one. Students are coached, mentored and prepared through a combination of academic learning, industry exposure and personalised development."
          kickerClass="kred"
          ruleClass="sh-rule-blue"
        />

        <Ac1 title="MBA Degree Program — 2 Years Full-Time" defaultOpen>
          <Ac2 title="Program Overview" defaultOpen>
            <p className="body-text program-mb">
              A full time MBA program that combines rigorous management education with hands on exposure through case studies, industry simulations, live projects and expert sessions.
            </p>
            <p className="body-text">
              Designed to develop decision makers with strong analytical ability, ethical values and a global business perspective, preparing graduates to be both leadership ready and career ready.
            </p>
          </Ac2>
          <Ac2 title="Specialisations Available">
            <div className="programs-grid">
              {SPECIALISATIONS.map(s => <DotItem key={s} text={s} />)}
            </div>
          </Ac2>
        </Ac1>

        <Ac1 title="Industry-Integrated Certification Programs">
          <Ac2 title="Overview" defaultOpen>
            <p className="body-text">
              Short term certification programs offered alongside the MBA curriculum, designed to strengthen job readiness through relevant technical and functional skills that complement the core MBA program
            </p>
          </Ac2>
          <Ac2 title="Available Certifications">
            <div className="programs-grid">
              {CERTIFICATIONS.map(c => <DotItem key={c} text={c} />)}
            </div>
          </Ac2>
        </Ac1>

        <Ac1 title="Placement Training & Career Development">
          <Ac2 title="Overview" defaultOpen>
            <p className="body-text">
              Career development is embedded throughout the MBA program. Every student undergoes structured preparation across aptitude, communication, interviews, personal branding and workplace readiness.
            </p>
          </Ac2>
          <Ac2 title="Training Modules">
            <InfoCard label="Aptitude & Logical Reasoning" value="Structured mock tests aligned with actual Corporate selection formats used by top companies." />
            <InfoCard label="Soft Skills & Communication" value="Business writing, Presentation delivery, Professional communication, and Workplace etiquette." />
            <InfoCard label="Resume & LinkedIn Building" value="Crafting results-driven resumes and building an effective LinkedIn presence for Visibility." />
            <InfoCard label="Mock Interviews & Group Discussions" value="Full-length Simulated interviews and GD rounds with detailed, Constructive feedback from Faculty and Industry professionals." />
          </Ac2>
        </Ac1>

        <Ac1 title="Workshops, Seminars & Guest Lectures">
          <Ac2 title="Overview" defaultOpen>
            <p className="body-text">
              Regular sessions with CEOs, senior leaders and domain experts give students direct exposure to how businesses operate and how experienced professionals approach real world challenges.
            </p>
          </Ac2>
          <Ac2 title="Topics Covered">
            <div className="programs-grid">
              {WORKSHOP_TOPICS.map(t => <DotItem key={t} text={t} />)}
            </div>
          </Ac2>
        </Ac1>
      </div>
    </section>
  );
};

export default Programs;